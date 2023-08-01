import { PartialType } from '@nestjs/mapped-types';
import { CreateMailDto } from './create-mail';

export class UpdateMailDto extends PartialType(CreateMailDto) {}
