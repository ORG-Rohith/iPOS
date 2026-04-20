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
  ) {}

  // ─── CREATE ───────────────────────────────────────────────
  async create(dto: CreateTenantDto): Promise<Tenant> {
    // Generate slug from name if not provided
    const slug = dto.slug || this.generateSlug(dto.name);

    // Check slug uniqueness
    const existing = await this.tenantRepo.findOne({ where: { slug } });
    if (existing) {
      throw new ConflictException(`Tenant with slug "${slug}" already exists.`);
    }

    const tenant = this.tenantRepo.create({
      uuid: uuidv4(),
      name: dto.name,
      slug,
      country: dto.country,
      currency: dto.currency,
      timezone: dto.timezone ?? null,
      business_type: dto.business_type ?? null,
      tax_id: dto.tax_id ?? null,
      status: 'active',
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
  async findOne(id: number): Promise<Tenant> {
    const tenant = await this.tenantRepo.findOne({
      where: { id },
      relations: ['outlets'],
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant #${id} not found`);
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
  async update(id: number, dto: UpdateTenantDto): Promise<Tenant> {
    const tenant = await this.findOne(id);
    Object.assign(tenant, dto);
    return this.tenantRepo.save(tenant);
  }

  // ─── SOFT DELETE (set status inactive) ───────────────────
  async remove(id: number): Promise<{ message: string }> {
    const tenant = await this.findOne(id);
    tenant.status = 'inactive';
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
}
