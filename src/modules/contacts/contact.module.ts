import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { contactProvieder } from './contact.provider';
import { ContactService } from './contact.service';
import { DatabaseModule } from './../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactController],
  providers: [contactProvieder, ContactService],
})
export class ContactModule {}
