import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity('Post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  details: string;
  @Column()
  createdDate: Date;
  @Column()
  updatedDate: Date;

  //
  @ManyToOne(() => Student, (student) => student.posts)
  student: number;
}
