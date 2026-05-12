import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOutletDto } from './dto/create-outlet.dto';
import { UpdateOutletDto } from './dto/update-outlet.dto';
import { decrypt, encrypt } from 'src/shared/utils/aes.util';
import { Outlet } from './entity/outlets.entity';

@Injectable()
export class OutletsService {
  private readonly PII_FIELDS = ["email", "phone", "address_line1", "postal_code"];
  constructor(
    @InjectRepository(Outlet)
    private readonly outletsRepository: Repository<Outlet>,
  ) { }

  async create(createOutletDto: CreateOutletDto): Promise<Outlet> {
    const encryptedData = this.encryptPII(createOutletDto);

    const outlet = this.outletsRepository.create(encryptedData);
    const saved = await this.outletsRepository.save(outlet);

    return this.decryptPII(saved);
  }

  async findAll(tenantId?: string): Promise<Outlet[]> {
    console.log(tenantId)
    const where = tenantId ? { tenant_id: tenantId } : {};

    const outlets = await this.outletsRepository.find({
      where,
      relations: ['manager', 'tenant'],
    });
    return outlets.map(o => this.decryptPII(o));
  }

  async findOne(idOrUuid: string | number): Promise<Outlet> {
    let outlet: Outlet;
    if (typeof idOrUuid === 'number' || !isNaN(Number(idOrUuid))) {
      outlet = await this.outletsRepository.findOne({
        where: { id: Number(idOrUuid) },
        relations: ['manager', 'tenant'],
      });
    } else {
      outlet = await this.outletsRepository.findOne({
        where: { uuid: String(idOrUuid) },
        relations: ['manager', 'tenant'],
      });
    }

    if (!outlet) {
      throw new NotFoundException(`Outlet with ID/UUID ${idOrUuid} not found`);
    }
    return this.decryptPII(outlet);
  }

  async update(idOrUuid: string | number, updateOutletDto: UpdateOutletDto): Promise<Outlet> {
    const outlet = await this.findOne(idOrUuid);
    const encryptedData = this.encryptPII(updateOutletDto);
    Object.assign(outlet, encryptedData);
    const saved = await this.outletsRepository.save(outlet);
    return this.decryptPII(saved);
  }

  async remove(idOrUuid: string | number): Promise<void> {
    const outlet = await this.findOne(idOrUuid);
    await this.outletsRepository.remove(outlet);
  }

  private encryptPII(data: any) {
    const result = { ...data };

    for (const field of this.PII_FIELDS) {
      const value = result[field];

      if (
        value &&
        typeof value === "string" &&
        !value.startsWith("v1:") // avoid double encryption
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
        result[field] = decrypt(value); // safe because decrypt handles plain + encrypted
      }
    }

    return result;
  }

  async findOutletByTenantId(tenantId: string): Promise<Outlet[]> {
    const outlets = await this.outletsRepository.find({
      where: { tenant_id: tenantId }
    });
    if (!outlets) {
      throw new NotFoundException(`Outlet with tenant ID ${tenantId} not found`);
    }
    return await Promise.all(
      outlets.map(outlet =>
        this.decryptPII(outlet)
      )
    );
  }
}
