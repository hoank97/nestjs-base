import { Module } from '@nestjs/common';
import { MailService } from './service';
import { MailController } from './controller';
import { BullModule } from '@nestjs/bull';
import { MailProcessor } from './processor';

@Module({
  imports: [BullModule.registerQueue({ name: 'sendMail' })],
  controllers: [MailController],
  providers: [MailService, MailProcessor],
})
export class MailModule {}
