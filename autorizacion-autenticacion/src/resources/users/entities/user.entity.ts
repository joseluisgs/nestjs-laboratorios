import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'USERS',
  engine: 'InnoDB'
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', { length: 150, nullable: false, unique: true })
  email: string;

  @Column('varchar', { name: 'user_name', length: 150, nullable: false, unique: true })
  username: string;

  @Column('varchar', { length: 255, nullable: false })
  password: string;

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at'})
  updatedAt: Date;
}
