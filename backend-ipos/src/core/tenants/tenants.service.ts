import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Tenant } from './tenants.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantsService {
  private readonly logger = new Logger(TenantsService.name);

  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepo: Repository<Tenant>,
  ) { }

  // ─── CREATE ───────────────────────────────────────────────
  // async create(dto: CreateTenantDto): Promise<Tenant> {
  //   // Generate slug from name if not provided
  //   const slug = dto.slug || this.generateSlug(dto.name);

  //   // Check slug uniqueness
  //   const existing = await this.tenantRepo.findOne({ where: { slug } });
  //   if (existing) {
  //     throw new ConflictException(`Tenant with slug "${slug}" already exists.`);
  //   }
  //   if (dto.country === "India") {
  //     dto.currency = "INR";
  //   } else if (dto.country === "Australia") {
  //     dto.currency = "AUD"
  //   } else {
  //     dto.currency = "INR"
  //   }


  //   const tenant = this.tenantRepo.create({
  //     uuid: uuidv4(),
  //     name: dto.name,
  //     slug,
  //     country: dto.country,
  //     currency: dto.currency,
  //     timezone: dto.timezone ?? null,
  //     business_type: dto.business_type ?? null,
  //     tax_id: dto.tax_id ?? null,
  //     settings: dto.settings ?? null,
  //     status: 'active',
  //     onboarding_complete: false,
  //   });

  //   const saved = await this.tenantRepo.save(tenant);
  //   this.logger.log(`✅ Tenant created: ${saved.name} (${saved.slug})`);
  //   return saved;
  // }
  async create(dto: CreateTenantDto): Promise<Tenant> {
    // Generate slug
    const slug = dto.slug || this.generateSlug(dto.name);

    // Check slug uniqueness
    const existing = await this.tenantRepo.findOne({ where: { slug } });
    if (existing) {
      throw new ConflictException(`Tenant with slug "${slug}" already exists.`);
    }

    // 🌍 Currency mapping (clean approach)
    const currencyMap: Record<string, string> = {
      India: 'INR',
      Australia: 'AUD',
    };
    const countryCodeMap: Record<string, string> = {
      India: 'IN',
      Australia: 'AU',
    };

    const currency = dto.currency || currencyMap[dto.country] || 'INR';
    const countryCode = countryCodeMap[dto.country_code] || 'IN';
    const timezone = dto.timezone || 'Asia/Kolkata';

    // 🏗 Create tenant
    const tenant = this.tenantRepo.create({
      ...dto, // 🔥 maps all matching fields automatically

      slug,
      currency,
      country_code: countryCode,
      timezone,

      // Ensure defaults (optional, entity already handles)
      status: 'Active',
      onboarding_complete: false,
    });

    const saved = await this.tenantRepo.save(tenant);

    this.logger.log(`✅ Tenant created: ${saved.name} (${saved.slug})`);
    return saved;
  }

  // ─── GET ALL ──────────────────────────────────────────────
  async findAll(): Promise<Tenant[]> {
    return this.tenantRepo.find({
      order: { created_on: 'DESC' },
    });
  }

  // ─── GET ONE ──────────────────────────────────────────────
  async findOne(uuid: string): Promise<Tenant> {
    const tenant = await this.tenantRepo.findOne({
      where: { uuid },
      relations: ['outlets'],
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant #${uuid} not found`);
    }

    return tenant;
  }

  // ─── GET BY UUID ──────────────────────────────────────────
  async findByUuid(uuid: string): Promise<Tenant> {
    const tenant = await this.tenantRepo.findOne({
      where: { uuid },
      relations: ['outlets'],
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant not found`);
    }

    return tenant;
  }

  // ─── UPDATE ───────────────────────────────────────────────
  async update(uuid: string, dto: UpdateTenantDto): Promise<Tenant> {
    const tenant = await this.findOne(uuid);
    Object.assign(tenant, dto);
    return this.tenantRepo.save(tenant);
  }

  // ─── SOFT DELETE (set status inactive) ───────────────────
  async remove(uuid: string): Promise<{ message: string }> {
    const tenant = await this.findOne(uuid);
    tenant.status = 'Terminated';
    await this.tenantRepo.save(tenant);
    return { message: `Tenant "${tenant.name}" deactivated successfully.` };
  }

  // ─── GENERATE SLUG ────────────────────────────────────────
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  // ─── STATS ────────────────────────────────────────────────
  async getStats() {
    const [total, active, trial, totalOutlets] = await Promise.all([
      this.tenantRepo.count(),
      this.tenantRepo.count({ where: { status: 'Active' } }),
      this.tenantRepo.count({ where: { status: 'Trial' } }),
      this.tenantRepo
        .createQueryBuilder('tenant')
        .leftJoin('tenant.outlets', 'outlet')
        .select('COUNT(outlet.id)', 'count')
        .getRawOne()
        .then(res => parseInt(res.count, 10) || 0),
    ]);

    return {
      total,
      active,
      trial,
      totalOutlets,
    };
  }
}
