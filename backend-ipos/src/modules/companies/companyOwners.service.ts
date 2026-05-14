import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { BusinessOwner } from "./entity/companyOwner.entity";
import { BusinessOwnerContact } from "./entity/companyOwnerContact.entity";
import { Subscription } from "../licences/entity/licence.entity";
import { CreateBusinessOwnerDto } from "./dto/createCompanyOwner.dto";
import { UpdateBusinessOwnerDto } from "./dto/updateCompnayOwner.dto";

@Injectable()
export class BusinessOwnersService {
  constructor(
    @InjectRepository(BusinessOwner)
    private businessOwnerRepository: Repository<BusinessOwner>,

    @InjectRepository(BusinessOwnerContact)
    private contactRepository: Repository<BusinessOwnerContact>,

    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,

    private dataSource: DataSource
  ) { }

  // =========================
  // RELATIONS TO LOAD
  // =========================
  private readonly defaultRelations = [
    "subscriptions",
    "subscriptions.plan",
    "tenants",
    "owners",
  ];

  // =========================
  // CREATE
  // =========================
  async create(dto: CreateBusinessOwnerDto): Promise<BusinessOwner> {
    return await this.dataSource.transaction(async (manager) => {
      const ownerRepo = manager.getRepository(BusinessOwner);
      const subRepo = manager.getRepository(Subscription);
      const contactRepo = manager.getRepository(BusinessOwnerContact);

      // ================================
      // 1. CHECK IF OWNER EXISTS
      // ================================
      let owner = await ownerRepo.findOne({
        where: { email: dto.email },
        relations: this.defaultRelations,
      });

      // ================================
      // 2. IF EXISTS → RETURN DIRECTLY
      // ================================
      if (owner) {
        return owner;
      }

      // ================================
      // 3. CREATE OWNER
      // ================================
      owner = ownerRepo.create(dto);
      const savedOwner = await ownerRepo.save(owner);

      // ================================
      // 4. CREATE SUBSCRIPTIONS (IF ANY)
      // ================================
      if (dto.subscriptions?.length) {
        const subscriptions = dto.subscriptions.map((sub) =>
          subRepo.create({
            plan: { id: sub.plan_id },
            quantity: sub.quantity ?? 1,

            custom_max_tenants: sub.custom_max_tenants ?? null,
            custom_max_outlets: sub.custom_max_outlets ?? null,
            custom_max_users: sub.custom_max_users ?? null,
            custom_max_devices: sub.custom_max_devices ?? null,

            status: sub.status ?? "active",
            start_date: sub.start_date ? new Date(sub.start_date) : new Date(),
            end_date: sub.end_date ? new Date(sub.end_date) : null,
            auto_renew: sub.auto_renew ?? true,

            business_owner: savedOwner,
          })
        );

        await subRepo.save(subscriptions);
      }

      // ================================
      // 5. CREATE OWNERS / CONTACTS (IF ANY)
      // ================================
      if (dto.owners?.length) {
        const contacts = dto.owners.map((c) =>
          contactRepo.create({
            name: c.name,
            email: c.email,
            phone: c.phone ?? null,
            role: c.role ?? "Owner",
            is_primary: c.is_primary ?? false,
            business_owner: savedOwner,
          })
        );

        await contactRepo.save(contacts);
      }

      // ================================
      // 6. RETURN FULL DATA
      // ================================
      return ownerRepo.findOne({
        where: { id: savedOwner.id },
        relations: this.defaultRelations,
      });
    });
  }

  // =========================
  // GET ALL
  // =========================
  async findAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }): Promise<{ data: BusinessOwner[]; total: number; page: number; limit: number }> {
    const page = params?.page && params.page > 0 ? params.page : 1;
    const limit = params?.limit && params.limit > 0 ? params.limit : 10;
    const skip = (page - 1) * limit;

    const queryBuilder = this.businessOwnerRepository
      .createQueryBuilder('businessOwner')
      .leftJoinAndSelect('businessOwner.subscriptions', 'subscriptions')
      .leftJoinAndSelect('subscriptions.plan', 'plan')
      .leftJoinAndSelect('businessOwner.tenants', 'tenants')
      .leftJoinAndSelect('businessOwner.owners', 'owners')
      .where('businessOwner.is_deleted = :isDeleted', { isDeleted: false });

    if (params?.search) {
      queryBuilder.andWhere(
        '(businessOwner.name ILIKE :search OR businessOwner.email ILIKE :search)',
        { search: `%${params.search}%` }
      );
    }

    if (params?.status) {
      queryBuilder.andWhere('businessOwner.status = :status', { status: params.status });
    }

    const [data, total] = await queryBuilder
      .orderBy('businessOwner.created_on', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  // =========================
  // GET ONE
  // =========================
  async findOne(id: number): Promise<BusinessOwner> {
    const owner = await this.businessOwnerRepository.findOne({
      where: { id, is_deleted: false },
      relations: this.defaultRelations,
    });

    if (!owner) {
      throw new NotFoundException(`BusinessOwner ${id} not found`);
    }

    return owner;
  }

  // =========================
  // UPDATE (SAFE VERSION)
  // =========================
  async update(
    id: number,
    dto: UpdateBusinessOwnerDto
  ): Promise<BusinessOwner> {
    return await this.dataSource.transaction(async (manager) => {
      const ownerRepo = manager.getRepository(BusinessOwner);
      const subRepo = manager.getRepository(Subscription);
      const contactRepo = manager.getRepository(BusinessOwnerContact);

      const owner = await ownerRepo.findOne({
        where: { id },
      });

      if (!owner) {
        throw new NotFoundException();
      }

      Object.assign(owner, dto);
      await ownerRepo.save(owner);

      // ⚠️ Replace subscriptions if provided
      if (dto.subscriptions) {
        await subRepo.delete({
          business_owner: { id },
        });

        const newSubs = dto.subscriptions.map((sub) =>
          subRepo.create({
            plan: { id: sub.plan_id },
            quantity: sub.quantity,
            custom_max_tenants: sub.custom_max_tenants ?? null,
            custom_max_outlets: sub.custom_max_outlets ?? null,
            custom_max_users: sub.custom_max_users ?? null,
            custom_max_devices: sub.custom_max_devices ?? null,
            status: sub.status ?? 'active',
            start_date: sub.start_date ? new Date(sub.start_date) : new Date(),
            end_date: sub.end_date ? new Date(sub.end_date) : null,
            auto_renew: sub.auto_renew ?? true,
            business_owner: owner,
          })
        );

        await subRepo.save(newSubs);
      }

      // ⚠️ Replace owners/contacts if provided
      if (dto.owners) {
        await contactRepo.delete({
          business_owner: { id },
        });

        if (dto.owners.length > 0) {
          const newContacts = dto.owners.map((c) =>
            contactRepo.create({
              name: c.name,
              email: c.email,
              phone: c.phone ?? null,
              role: c.role ?? "Owner",
              is_primary: c.is_primary ?? false,
              business_owner: owner,
            })
          );

          await contactRepo.save(newContacts);
        }
      }

      return this.findOne(id);
    });
  }

  // =========================
  // SOFT DELETE
  // =========================
  async remove(id: number): Promise<void> {
    const owner = await this.findOne(id);
    owner.is_deleted = true;
    await this.businessOwnerRepository.save(owner);
  }
}