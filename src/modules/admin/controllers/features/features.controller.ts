import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared';
import { CreateFeatureDto } from '../../dto/create-feature.dto';
import { FeaturesService } from '../../services';

@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresServices: FeaturesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFeatureDto: CreateFeatureDto, @Request() req) {
    return this.featuresServices.create(createFeatureDto, req.user.id);
  }
}
