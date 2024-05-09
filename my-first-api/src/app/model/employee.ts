import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;
  
  @Column()
  email: string;

  @Column()
  adresse: string;

  @Column()
  Phone: string;

}
