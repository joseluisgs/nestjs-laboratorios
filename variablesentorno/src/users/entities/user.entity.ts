// Son las entidades de la base de datos, las definimos con anotaciones y sus opciones
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('USERS') // Nombre de la tabla
export class User {
  @PrimaryGeneratedColumn() // Columna de clave primaria autoincrementable
  id: number

  @Column('varchar', { length: 255, nullable: false, name: 'first_name' })
  firstname: string

  @Column('varchar', { length: 255, nullable: false, name: 'last_name' })
  lastname: string

  @Column('varchar', { length: 255, nullable: true, default: 'no address' })
  address: string

  @Column('varchar', {
    length: 150,
    nullable: false,
    name: 'single_status',
    default: false,
  })
  single: boolean
}
