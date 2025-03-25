import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from './prisma.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { RpcException } from '@nestjs/microservices';
import { ProductsStockDto } from './dto/product-stock.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const categorieExists = await this.prisma.categorie.findFirst({
      where: {
        id: createProductDto.categoryId,
      },
    });

    if (!categorieExists)
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Categoria no encontrada',
      });

    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async validateProducts(ids: number[]) {
    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
        price: true,
        stock: true,
      },
    });

    if (products.length !== ids.length)
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Algunos productos no fueros encontrados',
      });
    return products;
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

    if (categorie)
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Categoria ya existe',
      });

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

    if (!product)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Producto no encontrado',
      });

    return product;
  }

  async remove(id: number) {
    const productExists = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!productExists)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Producto inexistente',
      });

    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }

  async updateStockProducts(productsStock: ProductsStockDto) {
    try {
      await Promise.all(
        productsStock.products.map((product) => {
          return this.prisma.product.update({
            where: {
              id: product.id,
            },
            data: {
              stock: {
                decrement: product.quantity,
              },
            },
          });
        }),
      );
      return true;
    } catch (error) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al actualizar stock',
      });
    }
  }
}
