import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Offer')
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  letter: string;
  @Column()
  createdDate: Date;

  //
  @Column()
  studentId: number;
  @Column()
  jobId: number;
  @Column()
  hrId: number;
}
