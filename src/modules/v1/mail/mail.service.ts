import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateMailDto } from './dto/create-mail.dto';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendMail(data: CreateMailDto): void {
    this.transporter.sendMail({
      from: `"${process.env.APP_NAME}" <${process.env.MAIL_ID}>`,
      to: data.receiver,
      subject: data.subject,
      text: data.text,
    });
  }
}
