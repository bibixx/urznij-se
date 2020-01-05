import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';

@Module({
  imports: [],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
