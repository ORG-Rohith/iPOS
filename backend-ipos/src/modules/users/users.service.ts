import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entity/users.entity';
import { Repository } from 'typeorm/repository/Repository.js';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from '../user-roles/entity/user-roles.entity';
import { Role } from '../roles/entity/roles.entity';
import { RequestUser } from './types/jwt-payload.type';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(UserRole)
    private readonly userRoleRepo: Repository<UserRole>,
  ) { }

  async register(dto: any) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      email: dto.email,
      password_hash: hashedPassword,
      name: dto.name,
      tenant_id: dto.tenant_id,
    });

    return this.userRepo.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({ where: { email } });
  }

  async adminUser(dto: CreateUserDto) {
    const passwordHash = bcrypt.hashSync(dto.password, 10);
    const role = await this.seedSuperAdminRole(dto.name);
    const user = new User();
    user.uuid = uuidv4();
    user.email = dto.email;
    user.password_hash = passwordHash;
    user.name = dto.name;
    user.is_active = true;

    const savedUser = await this.userRepo.save(user);
    const userRole = new UserRole();
    userRole.user_id = savedUser.id;
    userRole.role_id = role.id;
    await this.userRoleRepo.save(userRole);
    this.logger.log(
      `✅ Admin user created: ${savedUser.email} with role ${role.name}`,
    );
  }

  private async seedSuperAdminRole(userName: string): Promise<Role> {
    // Check if role already exists
    const existing = await this.roleRepo.findOne({
      where: { name: userName, is_system: true },
    });

    if (existing) {
      this.logger.log(`✅ ${userName} role already exists. Skipping.`);
      return existing;
    }

    // ✅ Only use fields that exist in your Role entity
    const role = new Role();
    role.uuid = uuidv4();
    role.name = userName;
    role.display_name = 'platform Administrator';
    role.is_system = true;
    // role.tenant_id = null;  // null = platform-level, not tenant-specific

    const saved = await this.roleRepo.save(role);
    this.logger.log('✅ Super Admin role created.');
    return saved;
  }

  async findAll(user: RequestUser): Promise<any[]> {
    const isPlatformAdmin = user.roles.some(r =>
      r.roleName.toLowerCase().includes('platform') ||
      r.roleName.toLowerCase().includes('super')
    );

    const whereCondition: any = {};
    if (!isPlatformAdmin) {
      if (user.tenantId) {
        whereCondition.tenant_id = user.tenantId;
      } else {
        // If not platform admin and no tenant_id, show only self as a safety fallback
        whereCondition.id = user.id;
      }
    }

    const users = await this.userRepo.find({
      where: whereCondition,
      relations: ['roles', 'roles.role'],
    });

    return users.map(user => {
      const activeUserRole = user.roles && user.roles.length > 0 ? user.roles[0] : null;
      return {
        ...user,
        role: activeUserRole ? activeUserRole.role : null,
        role_id: activeUserRole ? activeUserRole.role_id : null,
        outlet_id: activeUserRole ? activeUserRole.outlet_id : null,
      };
    });
  }

  async findOne(id: number): Promise<any> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['roles', 'roles.role'],
    });
    if (!user) return null;

    const activeUserRole = user.roles && user.roles.length > 0 ? user.roles[0] : null;
    return {
      ...user,
      role: activeUserRole ? activeUserRole.role : null,
      role_id: activeUserRole ? activeUserRole.role_id : null,
      outlet_id: activeUserRole ? activeUserRole.outlet_id : null,
    };
  }

  async create(dto: CreateUserDto) {
    const user = new User();
    user.uuid = uuidv4();
    user.email = dto.email;
    if (dto.password) {
      user.password_hash = await bcrypt.hash(dto.password, 10);
    }
    user.name = dto.name;
    user.is_active = dto.is_active ?? true;
    if (dto.tenant_id) {
      user.tenant_id = dto.tenant_id;
    }
    const savedUser = await this.userRepo.save(user);

    if (dto.role_id) {
      const userRole = new UserRole();
      userRole.user_id = savedUser.id;
      userRole.role_id = dto.role_id;

      await this.userRoleRepo.save(userRole);
    }

    return this.findOne(savedUser.id);
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new Error('User not found');

    if (dto.email) user.email = dto.email;
    if (dto.name) user.name = dto.name;
    if (dto.is_active !== undefined) user.is_active = dto.is_active;
    if (dto.password) {
      user.password_hash = await bcrypt.hash(dto.password, 10);
    }
    user.tenant_id = dto.tenant_id;

    await this.userRepo.save(user);

    if (dto.role_id !== undefined) {
      // For simplicity, find existing role mapping and update or create new one
      let userRole = await this.userRoleRepo.findOne({ where: { user_id: id } });
      if (!userRole) {
        userRole = new UserRole();
        userRole.user_id = id;
      }
      userRole.role_id = dto.role_id;
      await this.userRoleRepo.save(userRole);
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (user) {
      await this.userRoleRepo.delete({ user_id: id });
      await this.userRepo.remove(user);
    }
    return { success: true };
  }
}
