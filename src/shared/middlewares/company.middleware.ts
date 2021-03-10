import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/modules/companies/entities';
import { Repository } from 'typeorm';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

@Injectable()
export class CompanyMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private jwtService: JwtService,
  ) {}

  async use(req: any, res: any, next: () => void) {
    const [, token] = req.headers.authorization.split(' ');
    const slug = req.headers.company;

    const decoded = this.jwtService.verify(token);
    const { sub } = decoded as ITokenPayload;

    const company = await this.companyRepository
      .createQueryBuilder('companies')
      .innerJoinAndSelect('companies.users', 'user', 'user.id = :user_id', {
        user_id: sub,
      })
      .where('companies.slug = :slug', { slug: slug })
      .getOne();

    if (!company) {
      throw new UnauthorizedException(
        'Sorry, You do not have permission to this company',
      );
    }

    req.company = company;

    next();
  }
}
