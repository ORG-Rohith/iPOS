import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository, ILike } from "typeorm";
import { BusinessOwner } from "./entity/business-owner.entity";
import { Subscription } from "../subscriptions/entity/subscription.entity";
import { CreateBusinessOwnerDto } from "./dto/create-business-owner.dto";
import { UpdateBusinessOwnerDto } from "./dto/update-business-owner.dto";

@Injectable()
export class BusinessOwnersService {
  constructor(
    @InjectRepository(BusinessOwner)
    private businessOwnerRepository: Repository<BusinessOwner>,

    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,

    private dataSource: DataSource
  ) { }

  // =========================
  // CREATE (SAFE TRANSACTION)
  // =========================
  async create(dto: CreateBusinessOwnerDto): Promise<BusinessOwner> {
    return await this.dataSource.transaction(async (manager) => {
      const ownerRepo = manager.getRepository(BusinessOwner);
      const subRepo = manager.getRepository(Subscription);

      const owner = ownerRepo.create(dto);
      const savedOwner = await ownerRepo.save(owner);

      if (dto.subscriptions?.length) {
        const subscriptions = dto.subscriptions.map((sub) =>
          subRepo.create({
            plan_id: sub.plan_id,
            quantity: sub.quantity,
            business_owner: savedOwner, // ✅ FIXED (IMPORTANT)
          })
        );

        await subRepo.save(subscriptions);
      }

      return ownerRepo.findOne({
        where: { id: savedOwner.id },
        relations: ["subscriptions", "subscriptions.plan", "tenants"],
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
      relations: ["subscriptions", "subscriptions.plan", "tenants"],
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

      const owner = await ownerRepo.findOne({
        where: { id },
      });

      if (!owner) {
        throw new NotFoundException();
      }

      Object.assign(owner, dto);
      await ownerRepo.save(owner);

      // ⚠️ Only replace if provided
      if (dto.subscriptions) {
        await subRepo.delete({
          business_owner: { id },
        });

        const newSubs = dto.subscriptions.map((sub) =>
          subRepo.create({
            plan_id: sub.plan_id,
            quantity: sub.quantity,
            business_owner: owner,
          })
        );

        await subRepo.save(newSubs);
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