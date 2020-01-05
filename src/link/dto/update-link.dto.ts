import { IsString, IsDefined, IsOptional, IsUrl } from 'class-validator';

export class UpdateLinkDto {
  @IsDefined()
  @IsString()
  alias?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  locationUrl?: string;

  @IsOptional()
  @IsString()
  customAlias?: string;
}
