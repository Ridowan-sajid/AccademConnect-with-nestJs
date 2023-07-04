import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { DbModule } from 'src/Db/db.module';

@Module({
  imports: [DbModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
