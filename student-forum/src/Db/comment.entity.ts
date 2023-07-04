import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  text: string;
  @Column()
  createdDate: Date;
  @Column()
  authorType: string;

  //
  @Column()
  postId: number;
  //
  @Column()
  authorId: number;
  //
  @Column()
  rootId: number;
}
