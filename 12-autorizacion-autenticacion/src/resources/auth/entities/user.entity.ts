import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { RoleEntity } from './role.entity'

@Entity({
  name: 'USERS',
  engine: 'InnoDB',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string

  @Column({
    name: 'email',
    type: 'varchar',
    length: 150,
    unique: true,
    nullable: false,
  })
  email: string

  @Column({
    name: 'username',
    type: 'varchar',
    length: 150,
    unique: true,
    nullable: false,
  })
  username: string

  @Column({
    name: 'password',
    type: 'varchar',
    length: 250,
    nullable: false,
  })
  password: string

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP', // Valor por defecto: la fecha y hora actual
  })
  createdAt: Date

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    nullable: false,
    onUpdate: 'CURRENT_TIMESTAMP',
    default: () => 'CURRENT_TIMESTAMP', // Valor por defecto: la fecha y hora actual
  })
  updatedAt: Date

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_ROLE_USER',
  })
  role: RoleEntity
}
