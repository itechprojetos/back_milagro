import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlanDto } from '../../dto/create-plan.dto';
import { Feature, Plan, Product } from '../../entities';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
  ) {}

  async create(createPlanDto: CreatePlanDto, user_id: string): Promise<Plan> {
    const {
      type,
      name,
      price,
      total,
      visible,
      active,
      features,
      products,
    } = createPlanDto;

    let plan = await this.planRepository.findOne({ where: { name } });

    if (plan) {
      throw new UnauthorizedException('Plan name already exists.');
    }

    plan = this.planRepository.create({
      user_id,
      type,
      name,
      price,
      total,
      visible,
      active,
    });

    const arrayFeatures = await this.featureRepository.findByIds(features);
    const arrayProducts = await this.productRepository.findByIds(products);

    plan.features = arrayFeatures;
    plan.products = arrayProducts;

    await this.planRepository.save(plan);

    return plan;

    // Verificar a lógica da criação de planos... preço e total...
  }
}
