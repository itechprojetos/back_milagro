import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { CompaniesService } from './services';

import { CompaniesController } from './controllers';

import { Company } from './entities';
import { User } from '../users/entities';
import { CompanyMiddleware } from 'src/shared/middlewares';

import { jwt } from 'src/config';

const { secret, signOptions } = jwt;

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, User]),
    JwtModule.register({
      secret,
      signOptions,
    }),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CompanyMiddleware)
      .exclude({
        path: 'companies',
        method: RequestMethod.POST,
      })
      .forRoutes(CompaniesController);
  }
}
