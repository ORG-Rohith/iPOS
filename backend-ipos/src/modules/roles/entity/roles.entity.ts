import { Tenant } from "src/modules/tenants/entity/tenants.entity";
import { UserRole } from "src/modules/user-roles/entity/user-roles.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from "typeorm";
import { RolePermission } from "../role-permissions.entity";

@Entity('auth_roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @ManyToOne(() => Tenant, { nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ nullable: true })
  tenant_id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  display_name: string;

  @Column({ default: false })
  is_system: boolean;

  @CreateDateColumn()
  created_on: Date;

  // 🔥 RELATION
  @OneToMany(() => RolePermission, (rp) => rp.role)
  permissions: RolePermission[];

  @OneToMany(() => UserRole, (ur) => ur.role)
  users: UserRole[];
}