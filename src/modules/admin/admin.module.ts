import { Module } from '@nestjs/common';
import { ProductsService, FeaturesService, PlansService } from './services';
import {
  PlansController,
  FeaturesController,
  ProductsController,
} from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature, Plan, Product } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Feature, Product, Plan])],
  providers: [ProductsService, FeaturesService, PlansService],
  controllers: [PlansController, FeaturesController, ProductsController],
})
export class AdminModule {}
