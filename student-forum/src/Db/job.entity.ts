import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hr } from './hiring.entity';
import { Offer } from './offer.entity';
import { Report } from './report.entity';

@Entity('Job')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  details: string;

  @ManyToOne(() => Hr, (hr) => hr.jobs)
  hr: number;

  @OneToMany(() => Offer, (offer) => offer.jobId)
  letters: Offer[];

  // @OneToMany(() => Report, (report) => report.job)
  // reports: Report[];
}
