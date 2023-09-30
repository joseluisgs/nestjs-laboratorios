import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity({
  name: 'ROLES',
  engine: 'InnoDB',
})
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  name: string

  @Column({
    name: 'description',
    type: 'varchar',
    length: 250,
    nullable: false,
  })
  description_: string

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

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[]
}
