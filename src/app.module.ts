import { LoggingInterceptor } from '@algoan/nestjs-logging-interceptor';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';
import { HttpErrorFilter } from './shared/http-error.filter';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/demo'), UsersModule],
  controllers: [AppController],
  providers: [
      AppService,
      {
        provide:APP_FILTER,
        useClass:HttpErrorFilter
      },
      {
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor,
      }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.ALL });
  }
}
