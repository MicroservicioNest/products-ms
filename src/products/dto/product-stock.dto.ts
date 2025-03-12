import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';

export class ProductsStockDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductStockDto)
  products: ProductStockDto[];
}

class ProductStockDto {
  @IsNumber()
  @IsInt()
  @Min(1)
  id: number;

  @IsNumber()
  @IsInt()
  @Min(1)
  quantity: number;
}
