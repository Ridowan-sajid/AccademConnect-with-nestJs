import { Module } from '@nestjs/common';
import { HrController } from './hr.controller';
import { HrService } from './hr.service';
import { DbModule } from 'src/Db/db.module';

@Module({
  imports: [DbModule],
  controllers: [HrController],
  providers: [HrService],
})
export class HrModule {}
