import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Report')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  details: string;
  @Column()
  createdDate: Date;
  @Column()
  authorType: string;
  //
  @Column()
  userId: number;
  //
  @Column()
  postId: number;
  //
  @Column()
  jobId: number;
  //
  @Column()
  handledBy: number;
}
