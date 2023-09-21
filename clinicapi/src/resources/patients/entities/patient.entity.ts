import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Min } from 'class-validator'

/**
 * Paciente entity para nuestra base de datos
 */
@Entity('PATIENTS')
export class PatientEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { length: 150, nullable: false })
  name: string

  @Column('varchar', { length: 150, nullable: false })
  lastname: string

  @Column('varchar', { length: 50, nullable: false })
  phone: string

  @Column('varchar', { length: 75, nullable: false })
  email: string

  @Column('integer', { nullable: false })
  @Min(0)
  age: number

  @Column('varchar', { length: 255, nullable: true, default: null })
  address: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
