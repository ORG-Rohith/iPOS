import { Outlet } from "src/core/outlets/outlets.entity";
import { Entity, Unique, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn } from "typeorm";
import { Role } from "../roles/roles.entity";
import { User } from "../users/users.entity";

@Entity('auth_user_roles')
@Unique(['user_id', 'role_id', 'outlet_id'])
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.roles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column()
  role_id: number;

  @ManyToOne(() => Outlet, (outlet) => outlet.userRoles, { nullable: true })
  @JoinColumn({ name: 'outlet_id' })
  outlet: Outlet;

  @Column({ nullable: true })
  outlet_id: number;

  @CreateDateColumn()
  created_on: Date;
}