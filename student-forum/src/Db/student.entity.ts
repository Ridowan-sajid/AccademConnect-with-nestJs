import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Moderator } from './moderator.entity';
import { Post } from './post.entity';

@Entity('Student')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  age: string;
  // age: number;
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

  //Many to many
  //   @Column()
  //   connection: string[];

  @Column()
  profileImg: string;
  @Column()
  password: string;
  @Column()
  type: string;
  @Column()
  createdType: string;

  @ManyToOne(() => Moderator, (moderator) => moderator.students)
  createdBy: number;

  @OneToMany(() => Post, (post) => post.student)
  posts: Post[];
}
