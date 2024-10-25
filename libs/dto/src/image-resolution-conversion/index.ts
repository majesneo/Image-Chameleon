import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class ResolutionOptionsDto {
  @IsOptional()
  @IsBoolean()
  mobile?: boolean;

  @IsOptional()
  @IsBoolean()
  tablet?: boolean;

  @IsOptional()
  @IsBoolean()
  desktop?: boolean;
}

export class ImageResolutionConversionDto {
  @IsNotEmpty()
  @IsString()
  fileId: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ResolutionOptionsDto)
  options: ResolutionOptionsDto;

  @IsNotEmpty()
  @IsString()
  originalFileName: string;
}
