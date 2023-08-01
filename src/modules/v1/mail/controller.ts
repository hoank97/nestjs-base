import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMailDto } from './dto/create-mail';

@Controller('mail')
@ApiTags('Mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  sendMail(@Body() data: CreateMailDto) {
    return this.mailService.sendMail(data);
  }
}
