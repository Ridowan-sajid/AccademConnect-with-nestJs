import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Hr } from './hiring.entity';

@Entity('Job')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  details: string;
  @Column()
  type: string;
  //   @Column()
  //   keyword: string[];

  //

  @ManyToOne(() => Hr, (hr) => hr.jobs)
  hr: number;
  //
  //   @Column()
  //   letterId: string;
}
