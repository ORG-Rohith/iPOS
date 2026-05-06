import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Role } from './entity/roles.entity';
import { RolePermission } from './role-permissions.entity';
import { Permission } from 'src/modules/permissions/entity/permissions.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { RequestUser } from '../users/types/jwt-payload.type';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);

  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,

    @InjectRepository(RolePermission)
    private readonly rolePermissionRepo: Repository<RolePermission>,

    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) { }

  // ─── CREATE ROLE ──────────────────────────────────────────
  async create(dto: CreateRoleDto): Promise<Role> {
    // Check duplicate
    const existing = await this.roleRepo.findOne({
      where: {
        name: dto.name,
        tenant_id: dto.tenant_id ?? null,
      },
    });

    if (existing) {
      throw new ConflictException(`Role "${dto.name}" already exists.`);
    }

    const role = this.roleRepo.create({
      uuid: uuidv4(),
      name: dto.name,
      display_name: dto.display_name ?? dto.name,
      tenant_id: dto.tenant_id ?? null,
      is_system: dto.is_system ?? false,
    });

    const saved = await this.roleRepo.save(role);

    // Assign permissions if provided
    if (dto.permission_ids?.length) {
      await this.assignPermissions(saved.id, dto.permission_ids);
    }

    this.logger.log(`✅ Role created: ${saved.name}`);
    return this.findOne(saved.id);
  }

  // ─── GET ALL ROLES ────────────────────────────────────────
  async findAll(user: RequestUser): Promise<Role[]> {
    const isPlatformAdmin = user.roles.some(r =>
      r.roleName.toLowerCase().includes('platform') ||
      r.roleName.toLowerCase().includes('super')
    );

    const whereCondition: any[] = [{ is_system: true }];

    if (!isPlatformAdmin && user.tenantId) {
      whereCondition.push({ tenant_id: user.tenantId });
    } else if (isPlatformAdmin) {
      // Platform admin sees everything
      return this.roleRepo.find({
        relations: ['permissions', 'permissions.permission'],
        order: { created_on: 'DESC' },
      });
    }

    return this.roleRepo.find({
      where: whereCondition,
      relations: ['permissions', 'permissions.permission'],
      order: { created_on: 'DESC' },
    });
  }

  // ─── GET ONE ROLE ─────────────────────────────────────────
  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepo.findOne({
      where: { id },
      relations: ['permissions', 'permissions.permission'],
    });

    if (!role) throw new NotFoundException(`Role #${id} not found`);
    return role;
  }

  // ─── ASSIGN PERMISSIONS TO ROLE ───────────────────────────
  async assignPermissions(
    roleId: number,
    permissionIds: number[],
  ): Promise<{ message: string }> {
    const role = await this.roleRepo.findOne({ where: { id: roleId } });
    if (!role) throw new NotFoundException(`Role #${roleId} not found`);

    for (const permId of permissionIds) {
      const permission = await this.permissionRepo.findOne({
        where: { id: permId },
      });

      if (!permission) {
        this.logger.warn(`Permission #${permId} not found. Skipping.`);
        continue;
      }

      // Skip if already assigned
      const exists = await this.rolePermissionRepo.findOne({
        where: { role_id: roleId, permission_id: permId },
      });

      if (exists) continue;

      const rp = this.rolePermissionRepo.create({
        role_id: roleId,
        permission_id: permId,
      });

      await this.rolePermissionRepo.save(rp);
    }

    return { message: 'Permissions assigned successfully.' };
  }

  // ─── REMOVE PERMISSION FROM ROLE ─────────────────────────
  async removePermission(
    roleId: number,
    permissionId: number,
  ): Promise<{ message: string }> {
    const rp = await this.rolePermissionRepo.findOne({
      where: { role_id: roleId, permission_id: permissionId },
    });

    if (!rp)
      throw new NotFoundException('Permission not assigned to this role');

    await this.rolePermissionRepo.remove(rp);
    return { message: 'Permission removed from role.' };
  }

  // ─── DELETE ROLE ──────────────────────────────────────────
  async remove(id: number): Promise<{ message: string }> {
    const role = await this.findOne(id);

    if (role.is_system) {
      throw new ConflictException('System roles cannot be deleted.');
    }

    await this.roleRepo.remove(role);
    return { message: `Role "${role.name}" deleted.` };
  }
}
