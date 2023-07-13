import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Moderator } from './moderator.entity';
import { Student } from './student.entity';
import { Hr } from './hiring.entity';
import { Admin } from './admin.entity';

@Entity('adminProfile')
export class AdminProfile {
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

  @OneToOne(() => Admin, (admin) => admin.adminProfile)
  @JoinColumn()
  admin: number;
}
