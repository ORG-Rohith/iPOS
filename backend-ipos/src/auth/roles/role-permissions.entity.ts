import { Entity, Unique, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn } from "typeorm";
import { Permission } from "../permissions/permissions.entity";
import { Role } from "./roles.entity";

@Entity('auth_role_permissions')
@Unique(['role_id', 'permission_id'])
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, (role) => role.permissions)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column()
  role_id: number;

  @ManyToOne(() => Permission, (perm) => perm.roles)
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;

  @Column()
  permission_id: number;

  @CreateDateColumn()
  created_on: Date;
}