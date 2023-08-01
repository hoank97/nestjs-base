import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
