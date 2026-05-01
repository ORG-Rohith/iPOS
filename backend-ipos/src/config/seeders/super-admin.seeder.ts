import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../../auth/users/users.entity';
import { Role } from '../../auth/roles/roles.entity';
import { UserRole } from '../../auth/user-roles/user-roles.entity';

@Injectable()
export class SuperAdminSeeder implements OnApplicationBootstrap {
  private readonly logger = new Logger(SuperAdminSeeder.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,

    @InjectRepository(UserRole)
    private readonly userRoleRepo: Repository<UserRole>,
  ) { }

  async onApplicationBootstrap() {
    const role = await this.seedSuperAdminRole();
    await this.seedSuperAdminUser(role);
  }

  // ─────────────────────────────────────────
  // SEED SUPER ADMIN ROLE
  // ─────────────────────────────────────────
  private async seedSuperAdminRole(): Promise<Role> {
    // Check if role already exists
    const existing = await this.roleRepo.findOne({
      where: { name: 'Super Admin', is_system: true },
    });

    if (existing) {
      this.logger.log('✅ Super Admin role already exists. Skipping.');
      return existing;
    }

    // ✅ Only use fields that exist in your Role entity
    const role = new Role();
    role.uuid = uuidv4();
    role.name = 'Super Admin';
    role.display_name = 'Super Administrator';
    role.is_system = true;
    // role.tenant_id = null;  // null = platform-level, not tenant-specific

    const saved = await this.roleRepo.save(role);
    this.logger.log('✅ Super Admin role created.');
    return saved;
  }

  // ─────────────────────────────────────────
  // SEED SUPER ADMIN USER
  // ─────────────────────────────────────────
  private async seedSuperAdminUser(role: Role): Promise<void> {
    const email = process.env.SUPER_ADMIN_EMAIL || 'alekyaallu0518@gmail.com';
    const password = process.env.SUPER_ADMIN_PASSWORD || 'Alekya@123';
    const name = process.env.SUPER_ADMIN_NAME || 'Super Admin';

    // CHECK: Already exists?
    const existingUser = await this.userRepo.findOne({ where: { email } });

    if (existingUser) {
      this.logger.log(`✅ Super Admin already exists (${email}). Skipping.`);
      return;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // ✅ Create user using only fields from your User entity
    const user = new User();
    user.uuid = uuidv4();
    user.email = email;
    user.password_hash = passwordHash;
    user.name = name;
    user.is_active = true;
    // user.tenant_id     = null; // null = Platform Super Admin

    const savedUser = await this.userRepo.save(user);
    this.logger.log(`✅ Super Admin user created: ${email}`);

    // ✅ Assign role using only fields from your UserRole entity
    const userRole = new UserRole();
    userRole.user_id = savedUser.id;
    userRole.role_id = role.id;
    // userRole.outlet_id = null; // null = platform-wide, no outlet restriction

    await this.userRoleRepo.save(userRole);
    this.logger.log(`✅ Super Admin role assigned.`);

    // Print credentials
    this.logger.log('─────────────────────────────────────');
    this.logger.log('🚀 Super Admin Ready:');
    this.logger.log(`   Email    : ${email}`);
    this.logger.log(`   Password : ${password}`);
    this.logger.log('─────────────────────────────────────');
  }
}