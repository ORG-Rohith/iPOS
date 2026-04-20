import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './users.entity';
import { Repository } from 'typeorm/repository/Repository.js';
import { CreateUserDto } from './dto/create-users.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from '../user-roles/user-roles.entity';
import { Role } from '../roles/roles.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(UserRole)
    private readonly userRoleRepo: Repository<UserRole>,
  ) {}

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
}
