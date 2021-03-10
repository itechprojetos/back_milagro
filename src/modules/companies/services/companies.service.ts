import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from '../dto/create-company.dto';

import { User } from 'src/modules/users/entities';
import { Company } from '../entities';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createCompanyDto: CreateCompanyDto,
    user_id: string,
  ): Promise<Company> {
    const { name } = createCompanyDto;

    const user = await this.userRepository.findOne(user_id);

    let company = await this.companyRepository.findOne({ where: { name } });

    if (company) {
      throw new UnauthorizedException('Company Name already exists');
    }

    company = this.companyRepository.create({
      user_id: user_id,
      ...createCompanyDto,
    });

    company.users = [user];

    await this.companyRepository.save(company);

    return company;
  }

  async findOne(req: any): Promise<Company> {
    return req.company;
  }
}
