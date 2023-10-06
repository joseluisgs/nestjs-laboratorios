import { Column, Entity, PrimaryColumn } from 'typeorm'

export enum Continent {
  ASIA = 'Asia',
  EUROPE = 'Europe',
  NORTH_AMERICA = 'North America',
  AFRICA = 'Africa',
  OCEANIA = 'Oceania',
  ANTARCTICA = 'Antarctica',
  SOUTH_AMERICA = 'South America',
}

@Entity({
  name: 'country',
  engine: 'InnoDB',
})
export class Country {
  //   `Code` char(3) NOT NULL DEFAULT '',
  @PrimaryColumn('char', {
    name: 'Code',
    length: 3,
    nullable: false,
    default: '',
  })
  code: string
  //   `Name` char(52) NOT NULL DEFAULT '',
  @Column('char', {
    name: 'Name',
    length: 52,
    nullable: false,
    default: '',
  })
  name: string
  //   `Continent` enum('Asia','Europe','North America','Africa','Oceania','Antarctica','South America') NOT NULL DEFAULT 'Asia',
  @Column({
    type: 'enum',
    name: 'Continent',
    enum: Continent,
    nullable: false,
    default: Continent.ASIA,
  })
  continent: string
  //   `Region` char(26) NOT NULL DEFAULT '',
  @Column('char', {
    name: 'Region',
    length: 26,
    nullable: false,
    default: '',
  })
  region: string
  //   `SurfaceArea` decimal(10,2) NOT NULL DEFAULT '0.00',
  @Column({
    type: 'decimal',
    name: 'SurfaceArea',
    nullable: false,
    default: 0.0,
    precision: 10,
    scale: 2,
  })
  surfaceArea: string
  //   `IndepYear` smallint DEFAULT NULL,
  @Column({
    name: 'IndepYear',
    type: 'smallint',
    nullable: true,
    default: null,
  })
  indepYear: string
  //   `Population` int NOT NULL DEFAULT '0',
  @Column({
    name: 'Population',
    type: 'int',
    nullable: false,
    default: 0,
  })
  population: string
  //   `LifeExpectancy` decimal(3,1) DEFAULT NULL,
  @Column({
    type: 'decimal',
    name: 'LifeExpectancy',
    nullable: true,
    default: null,
    precision: 3,
    scale: 1,
  })
  lifeExpectancy: string
  //   `GNP` decimal(10,2) DEFAULT NULL,
  @Column({
    name: 'GNP',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: null,
  })
  gnp: string
  //   `GNPOld` decimal(10,2) DEFAULT NULL,
  @Column({
    name: 'GNPOld',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: null,
  })
  gnpOld: string
  //   `LocalName` char(45) NOT NULL DEFAULT '',
  @Column({
    name: 'LocalName',
    type: 'char',
    length: 45,
    nullable: false,
    default: '',
  })
  localName: string
  //   `GovernmentForm` char(45) NOT NULL DEFAULT '',
  @Column({
    name: 'GovernmentForm',
    type: 'char',
    length: 45,
    nullable: false,
    default: '',
  })
  governmentForm: string
  //   `HeadOfState` char(60) DEFAULT NULL,
  @Column({
    name: 'HeadOfState',
    type: 'char',
    length: 60,
    nullable: true,
    default: null,
  })
  headOfState: string
  //   `Capital` int DEFAULT NULL,
  @Column({
    name: 'Capital',
    type: 'int',
    nullable: true,
    default: null,
  })
  capital: string
  //   `Code2` char(2) NOT NULL DEFAULT '',
  @Column({
    name: 'Code2',
    type: 'char',
    length: 2,
    nullable: false,
    default: '',
  })
  code2: string
}
