import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  uid?: number;

  @Column()
  id: number;

  @Column()
  name: string;

  @Column('simple-array')
  types: string[];

  // Optional column for pokemon image url
  @Column({ nullable: true })
  imageUrl: string;
}