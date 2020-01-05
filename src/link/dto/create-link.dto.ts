import { IsString, IsDefined, IsOptional, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsDefined()
  @IsString()
  @IsUrl()
  locationUrl: string;

  @IsOptional()
  @IsString()
  customAlias?: string;
}
