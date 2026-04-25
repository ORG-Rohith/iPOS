import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Outlet } from './outlets.entity';
import { CreateOutletDto } from './dto/create-outlet.dto';
import { UpdateOutletDto } from './dto/update-outlet.dto';

@Injectable()
export class OutletsService {
  constructor(
    @InjectRepository(Outlet)
    private readonly outletsRepository: Repository<Outlet>,
  ) { }

  async create(createOutletDto: CreateOutletDto): Promise<Outlet> {
    const outlet = this.outletsRepository.create(createOutletDto);
    return await this.outletsRepository.save(outlet);
  }

  async findAll(tenantId?: string): Promise<Outlet[]> {
    const where = tenantId ? { tenant_id: tenantId } : {};
    return await this.outletsRepository.find({
      where,
      relations: ['manager', 'tenant'],
    });
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
    return outlet;
  }

  async update(idOrUuid: string | number, updateOutletDto: UpdateOutletDto): Promise<Outlet> {
    const outlet = await this.findOne(idOrUuid);
    Object.assign(outlet, updateOutletDto);
    return await this.outletsRepository.save(outlet);
  }

  async remove(idOrUuid: string | number): Promise<void> {
    const outlet = await this.findOne(idOrUuid);
    await this.outletsRepository.remove(outlet);
  }
}
