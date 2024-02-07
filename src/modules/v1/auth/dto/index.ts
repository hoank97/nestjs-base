import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'hoank@gmail.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '1234',
  })
  @IsString()
  @MinLength(4)
  password: string;
}

export class LoginDto extends RegisterDto {}

export class RefreshTokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjp7ImVtYWlsIjoiaG9hbmsxQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHdHdm0ucHVtU3NuSS8xUi5lSS50Y2U3VzBiZ3NaQ3VQVEpDWW81Qnd4b0dSNHJaTDlVZUdHIn0sImlhdCI6MTcwNzMwMTQwMSwiZXhwIjoxNzA3Mzg3ODAxfQ.F-B0zLbUGTehn4zL5kXc6wPuQRLUvXpihgE5mJbH4ZU',
  })
  @IsString()
  refreshToken: string;
}
