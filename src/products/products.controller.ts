import { Controller, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('create.product')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern('create.categorie')
  createCategorie(@Payload() createCategorieDto: CreateCategorieDto) {
    return this.productsService.createProductCategorie(createCategorieDto);
  }

  @MessagePattern('validate.products')
  validateProducts(@Payload('ids') ids: number[]) {
    return this.productsService.validateProducts(ids);
  }

  @MessagePattern('get.categories')
  getAllCategories() {
    return this.productsService.getAllCategories();
  }

  @MessagePattern('get.products')
  findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern('get.product')
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @MessagePattern('remove.product')
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
