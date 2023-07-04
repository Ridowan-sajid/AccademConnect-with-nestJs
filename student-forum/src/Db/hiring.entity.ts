import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from './job.entity';

@Entity('Hr')
export class Hr {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  age: number;
  @Column()
  phone: string;
  @Column()
  email: string;
  @Column()
  gender: string;
  @Column()
  createdDate: Date;
  @Column()
  updatedDate: Date;

  //   //Many to many
  //   @Column()
  //   connection: string[];

  @Column()
  profileImg: string;
  @Column()
  password: string;
  //   @Column()
  //   type: string;
  //   @Column()
  //   createdBy: number;
  @OneToMany(() => Job, (moderator) => moderator.hr)
  jobs: Job[];
}
