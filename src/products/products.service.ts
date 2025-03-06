import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from './prisma.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async createProductCategorie(categorieDto: CreateCategorieDto) {
    const categorie = await this.prisma.categorie.findFirst({
      where: {
        name: categorieDto.name,
      },
      select: {
        id: true,
      },
    });

    if (categorie) throw new BadRequestException('Categorie ya existe');

    return this.prisma.categorie.create({
      data: categorieDto,
    });
  }

  getAllCategories() {
    return this.prisma.categorie.findMany({});
  }

  async findAll() {
    const products = await this.prisma.product.findMany();
    return products;
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        brand: true,
        description: true,
        image: true,
        price: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!product) throw new NotFoundException('Producto inexistente');

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
