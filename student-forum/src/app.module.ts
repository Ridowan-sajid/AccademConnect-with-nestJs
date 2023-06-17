import { Module } from '@nestjs/common';
import { AdminModule } from './Admin/admin.module';
import { HrModule } from './Hiring-Manager/hr.module';
import { ModeratorModule } from './Moderator/moderator.module';
import { StudentModule } from './Student/student.module';

@Module({
  imports: [AdminModule, HrModule, ModeratorModule, StudentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
