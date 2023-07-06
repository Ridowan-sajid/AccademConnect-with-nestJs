import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { Hr } from './hiring.entity';
import { Student } from './student.entity';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  text: string;
  @CreateDateColumn()
  createdDate: Date;

  //
  @ManyToOne(() => Post, (post) => post.comments)
  post: number;
  //
  @ManyToOne(() => Hr, (hr) => hr.comments)
  hr: number;
  //
  @ManyToOne(() => Student, (student) => student.comments)
  student: number;
  //

  @ManyToOne(() => Comment, (comment) => comment.childComments, {
    nullable: true,
  })
  parentComment: Comment;

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  childComments: Comment[];
}
