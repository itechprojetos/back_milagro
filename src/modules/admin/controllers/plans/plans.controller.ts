import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared';
import { CreatePlanDto } from '../../dto/create-plan.dto';
import { PlansService } from '../../services';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPlanDto: CreatePlanDto, @Request() req) {
    return this.plansService.create(createPlanDto, req.user.id);
  }
}
