import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Tenant } from './entity/tenants.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { encrypt, decrypt } from 'src/shared/utils/aes.util';

@Injectable()
export class TenantsService {
  private readonly PII_FIELDS = [
    "email",
    "phone",
    "contact_name",
    "address",
    "postal_code",
    "tax_id",
    "registration_number",
  ];
  private readonly logger = new Logger(TenantsService.name);

  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepo: Repository<Tenant>,
  ) { }

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
    const encryptedData = this.encryptPII(dto);

    // 🏗 Create tenant
    const tenant = this.tenantRepo.create({
      ...encryptedData,

      slug,
      currency,
      country_code: countryCode,
      timezone,

      // Ensure defaults (optional, entity already handles)
      status: 'Active',
      onboarding_complete: false,
    });

    const saved = await this.tenantRepo.save(tenant);
    const tenantSaved: Tenant = Array.isArray(saved) ? saved[0] : saved;


    this.logger.log(`✅ Tenant created: ${tenantSaved.name} (${tenantSaved.slug})`);
    return this.decryptPII(tenantSaved);
  }

  // ─── GET ALL ──────────────────────────────────────────────
  async findAll(): Promise<Tenant[]> {
    const tenants = await this.tenantRepo.find({
      order: { created_on: 'DESC' },
    });
    return tenants.map(t => this.decryptPII(t));
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

    return this.decryptPII(tenant);
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

    return this.decryptPII(tenant);
  }

  // ─── UPDATE ───────────────────────────────────────────────
  async update(uuid: string, dto: UpdateTenantDto): Promise<Tenant> {
    const tenant = await this.findOne(uuid);
    Object.assign(tenant, dto);
    const saved = await this.tenantRepo.save(tenant);
    return this.decryptPII(saved);
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

  private encryptPII(data: any) {
    const result = { ...data };

    for (const field of this.PII_FIELDS) {
      const value = result[field];

      if (
        value &&
        typeof value === "string" &&
        !value.startsWith("v1:")
      ) {
        result[field] = encrypt(value);
      }
    }

    return result;
  }

  private decryptPII(data: any) {
    const result = { ...data };

    for (const field of this.PII_FIELDS) {
      const value = result[field];

      if (value && typeof value === "string") {
        result[field] = decrypt(value);
      }
    }

    return result;
  }
}
