import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StepOneFlowDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(11, 11, { message: 'BVN must be exactly 11 characters' })
  bvn: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  businessName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @ApiProperty()
  @IsEmail()
  email: string
}

export class StepTwoFlowDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  industry: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  streetAddress: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  orgId: string
}