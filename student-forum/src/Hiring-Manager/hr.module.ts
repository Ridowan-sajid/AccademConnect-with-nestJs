import { Module } from '@nestjs/common';
import { HrController } from './hr.controller';
import { HrService } from './hr.service';

@Module({
  imports: [],
  controllers: [HrController],
  providers: [HrService],
})
export class HrModule {}
