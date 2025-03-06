import { IsLowercase, IsString } from 'class-validator';

export class CreateCategorieDto {
  @IsString()
  @IsLowercase()
  name: string;
}
