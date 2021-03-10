import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeatureDto } from '../../dto/create-feature.dto';

import { Feature } from '../../entities';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
  ) {}

  async create(
    createFeatureDto: CreateFeatureDto,
    user_id: string,
  ): Promise<Feature> {
    const { name } = createFeatureDto;

    let feature = await this.featureRepository.findOne({ where: { name } });

    if (feature) {
      throw new UnauthorizedException('Feature name already exists.');
    }

    feature = await this.featureRepository.create({
      user_id,
      ...createFeatureDto,
    });

    await this.featureRepository.save(feature);

    return feature;
  }
}
