import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { RolePermission } from "../../roles/role-permissions.entity";

@Entity('auth_permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  module: string;

  @CreateDateColumn()
  created_on: Date;

  @OneToMany(() => RolePermission, (rp) => rp.permission)
  roles: RolePermission[];
}