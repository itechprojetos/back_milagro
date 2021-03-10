import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import {
  UsersModule,
  CompaniesModule,
  AdminModule,
  SubscriptionsModule,
} from './modules';

import { mail } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: mail.local.host,
          port: mail.local.port,
          secure: false,
          auth: {
            user: mail.local.username,
            pass: mail.local.passport,
          },
        },
        defaults: {
          from: '"Milagro" <no-replay@milagro.cc>',
        },
        preview: true,
        template: {
          dir: process.cwd() + '/templates/emails/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    UsersModule,
    CompaniesModule,
    AdminModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
