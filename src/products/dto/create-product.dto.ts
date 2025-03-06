import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  brand: string;

  @IsNumber()
  @Min(0)
  categoryId: number;
}
