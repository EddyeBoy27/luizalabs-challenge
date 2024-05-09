import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { ThrottlerModule } from '@nestjs/throttler';

describe('AppModule', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
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
        AppModule,
      ],
    }).compile();

    app = appModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should initialize the app', () => {
    expect(app).toBeDefined();
  });
});
