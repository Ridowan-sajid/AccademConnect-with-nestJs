import { Module } from '@nestjs/common';
import { ModeratorController } from './moderator.controller';
import { ModeratorService } from './moderator.service';
import { DbModule } from 'src/Db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ModeratorController],
  providers: [ModeratorService],
})
export class ModeratorModule {}
