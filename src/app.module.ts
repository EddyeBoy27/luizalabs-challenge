import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GlobalExceptionFilter } from './middlewares/global.exception.filter';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/authentication/auth.module';
import { ProductModule } from './modules/products/products.module';
import { WishListModule } from './modules/wishlist/wishlist.module';
import { RolesGuard } from './modules/authentication/guards/role.guard';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get<string>(
          'mongodb.user',
        )}:${configService.get<string>(
          'mongodb.password',
        )}@${configService.get<string>(
          'mongodb.host',
        )}:${configService.get<string>(
          'mongodb.port',
        )}/${configService.get<string>('mongodb.database')}?authSource=admin`,
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([
      {
        limit: 1,
        ttl: 60,
      },
    ]),
    AuthModule,
    UsersModule,
    ProductModule,
    WishListModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
