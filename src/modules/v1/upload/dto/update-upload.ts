import { PartialType } from '@nestjs/mapped-types';
import { CreateUploadDto } from './create-upload';

export class UpdateUploadDto extends PartialType(CreateUploadDto) {}
