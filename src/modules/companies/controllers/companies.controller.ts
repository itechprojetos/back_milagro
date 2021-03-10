import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { CreateCompanyDto } from '../dto/create-company.dto';

import { CompaniesService } from '../services';

import { JwtAuthGuard } from 'src/shared';

@Controller('companies')
@UseGuards(JwtAuthGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto, @Request() req) {
    return this.companiesService.create(createCompanyDto, req.user.id);
  }

  @Get()
  findAll(@Request() req) {
    return this.companiesService.findOne(req);
  }
}
