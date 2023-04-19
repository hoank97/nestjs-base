import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMailDto } from './dto/create-mail.dto';

@Controller('Mail')
@ApiTags('Mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  sendMail(@Body() data: CreateMailDto): void {
    return this.mailService.sendMail(data);
  }
}
