import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Migrator } from '@mikro-orm/migrations';
import { DefaultLogger, defineConfig, GeneratedCacheAdapter, LogContext, LoggerNamespace, Options } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SeedManager } from '@mikro-orm/seeder';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Logger } from '@nestjs/common';
// import metadata from './temp/metadata.json';

const isProd = process.env.NODE_ENV === 'production';

class ORMLogger extends DefaultLogger {
  private readonly logger = new Logger(ORMLogger.name);
  log(namespace: LoggerNamespace, message: string, context?: LogContext) {
    this.logger.log(`[${namespace}] ${message}`);
  }
}

const config: Options = {
  // type: 'postgresql',

  // Database connection settings
  // dbName: 'bluu-erp-final',
  // host: process.env.DB_HOST || 'localhost',
  // port: +(process.env.DB_PORT || 5432),
  // user: process.env.DB_USER || 'postgres',
  // password: process.env.DB_PASSWORD || '',

  clientUrl: process.env.DATABASE_URL,

  // Entity configuration
  entities: ['./dist/src/db/entities'],
  entitiesTs: ['./src/db/entities'],

  preferTs: true,

  // Migrations configuration
  migrations: {
    path: './dist/db/migrations',
    pathTs: './src/db/migrations',
    tableName: 'migrations',
    transactional: true,
    allOrNothing: true,
    safe: true,
  },

  // Discovery configuration
  discovery: {
    // disableDynamicFileAccess: isProd,
    // warnWhenNoEntities: true,
    // requireEntitiesArray: false,
  },

  // Seeding configuration
  // seeder: {
  //   path: './dist/db/seeders',
  //   pathTs: './src/db/seeders',
  //   defaultSeeder: 'DatabaseSeeder',
  //   glob: '!(*.d).{js,ts}',
  //   emit: 'ts',
  // },

  // Performance and behavior settings
  metadataProvider: TsMorphMetadataProvider,

  // metadataPath: join(__dirname, 'temp/metadata.json'),

  // Debug settings
  debug: !isProd,
  loggerFactory: (options) => new ORMLogger(options),
  // logger: msg => dbLogger.log(msg),

  // metadataCache: {
  //   enabled: isProd,
  //   combined: true,
  //   pretty: true,
  //   adapter: GeneratedCacheAdapter,
  //   options: { data: require('./temp/metadata.json') },
  // },

  // metadataCache: metadataCacheConfig,

  highlighter: new SqlHighlighter(),

  // Pool settings
  pool: {
    min: 1,
    max: 3,
  },

  // Timezone and encoding
  timezone: 'UTC+1',
  charset: 'utf8',

  // Additional features
  validateRequired: true, // validate required fields
  forceUtcTimezone: true,
  strict: true,
  // ensureIndexes: true,

  extensions: [
    SeedManager,
    Migrator,
    EntityGenerator
  ]
};

export default defineConfig(config)