import KeyvSqlite from '@keyv/sqlite';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TerminusModule } from '@nestjs/terminus';
import { AuthModule } from "@thallesp/nestjs-better-auth";
import { Keyv } from 'keyv';
import config from '../mikro-orm.config';
import { AppController } from './app.controller';
import { auth } from './lib/auth';
import { CoreModule } from './module/core/core.module';
import { UsersModule } from './module/users/users.module';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: () => config
    }),
    HttpModule,
    TerminusModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      cache: true,
      validate: (config: Record<string, unknown>) => {
        // Add environment validation here
        return config;
      },
    }),
    CacheModule.register({
      ttl: 60 * 60, // 1 hour in seconds (more readable)
      max: 1000, // Maximum number of items in cache
      stores: new Keyv({
        stats: true,
        emitErrors: true,
        namespace: 'app-cache',
        store: new KeyvSqlite({
          uri: 'sqlite://cache.sqlite',
          busyTimeout: 10000,
        }),
      }),
    }),
    AuthModule.forRoot({
      auth,
      isGlobal: true,
      disableBodyParser: true,
    }),
    // ZitadelAuthModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (config: ConfigService): ZitadelAuthModuleConfig => {
    //     return {
    //       authority: config.getOrThrow<string>('IDP_AUTHORITY'),
    //       authorization: {
    //         type: config.getOrThrow<'jwt-profile'>('IDP_AUTHORIZATION_TYPE'),
    //         profile: {
    //           type: config.getOrThrow<'application'>(
    //             'IDP_AUTHORIZATION_PROFILE_TYPE',
    //           ),
    //           keyId: config.getOrThrow<string>(
    //             'IDP_AUTHORIZATION_PROFILE_KEY_ID',
    //           ),
    //           key: config.getOrThrow<string>('IDP_AUTHORIZATION_PROFILE_KEY'),
    //           appId: config.getOrThrow<string>(
    //             'IDP_AUTHORIZATION_PROFILE_APP_ID',
    //           ),
    //           clientId: config.getOrThrow<string>(
    //             'IDP_AUTHORIZATION_PROFILE_CLIENT_ID',
    //           ),
    //         },
    //       },
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
    // MikroOrmModule.forRoot({
    //   driver: PostgreSqlDriver,
    //   // Database connection settings
    //   dbName: 'bluu-erp-final',
    //   host: process.env.DB_HOST || 'localhost',
    //   port: +(process.env.DB_PORT || 5432),
    //   user: process.env.DB_USER || 'postgres',
    //   password: process.env.DB_PASSWORD || '',
    //   entities: ['./dist/db/entities'],
    //   entitiesTs: ['./src/db/entities'],
    //   preferTs: true,
    //   debug: true,
    //   metadataProvider: TsMorphMetadataProvider
    //   // debug: process.env.NODE_ENV !== 'production',
    //   // validateRequired: true,
    // }),
    // TemporalModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     connection: {
    //       address: configService.get<string>('TEMPORAL_ADDRESS') || 'temporal:7233',
    //       // namespace: configService.get<string>('TEMPORAL_NAMESPACE'),
    //     },
    //     taskQueue: configService.get<string>('TEMPORAL_TASK_QUEUE') || 'main-queue',
    //     // worker: {
    //     //   autoStart: true,
    //     // },
    //     logLevel: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    //     enableLogger: true,
    //     autoRestart: true,
    //   }),
    // }),
    CoreModule,
    UsersModule
  ],
  controllers: [AppController],
})
export class AppModule { }
