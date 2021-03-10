import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities';

import { CreateProductDto } from '../../dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    user_id: string,
  ): Promise<Product> {
    const { name } = createProductDto;
    let product = await this.productRepository.findOne({ where: { name } });

    if (product) {
      throw new UnauthorizedException('Product name already exists.');
    }

    product = this.productRepository.create({
      user_id,
      ...createProductDto,
    });

    await this.productRepository.save(product);

    return product;
  }
}
