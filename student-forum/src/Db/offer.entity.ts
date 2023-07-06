import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';
import { Job } from './job.entity';
import { Hr } from './hiring.entity';

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
  @ManyToOne(() => Student, (student) => student.letters)
  studentId: number;
  @ManyToOne(() => Job, (job) => job.letters)
  jobId: number;
  @ManyToOne(() => Hr, (hr) => hr.letters)
  hrId: number;
}
