import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Admin } from './admin.entity';
import { Student } from './student.entity';

@Entity('Moderator')
export class Moderator {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  age: string;
  //   @Column()
  //   age: number;
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
  @Column()
  education: string;
  @Column()
  profileImg: string;
  @Column()
  password: string;
  @Column()
  status: string;

  //
  @ManyToOne(() => Admin, (admin) => admin.moderators)
  createdBy: number;

  @OneToMany(() => Student, (student) => student.createdBy)
  students: Student[];
}
