import { Migrator } from '@mikro-orm/migrations';
import { DefaultLogger, defineConfig, LogContext, LoggerNamespace, Options } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SeedManager } from '@mikro-orm/seeder';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Logger } from '@nestjs/common';
import { EntityGenerator } from '@mikro-orm/entity-generator';

// const dbLogger = new Logger('DB')

class ORMLogger extends DefaultLogger {
  private readonly logger = new Logger(ORMLogger.name);
  log(namespace: LoggerNamespace, message: string, context?: LogContext) {
    // Create your own implementation for output:
    this.logger.log(`[${namespace}] ${message}`);

    // OR Utilize DefaultLogger's implementation:
    // super.log(namespace, message, context)
  }
}

const config: Options = {
  // type: 'postgresql',

  // Database connection settings
  dbName: 'bluu-erp-final',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',

  // Entity configuration
  entities: ['./dist/db/entities'],
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
  // discovery: {
  //   warnWhenNoEntities: true,
  //   requireEntitiesArray: true,
  // },

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
  // cache: {
  //   enabled: true,
  //   options: { cacheDir: './temp' },
  // },

  // Debug settings
  debug: process.env.NODE_ENV !== 'production',
  loggerFactory: (options) => new ORMLogger(options),
  // logger: msg => dbLogger.log(msg),

  highlighter: new SqlHighlighter(),

  // Pool settings
  pool: {
    min: 2,
    max: 10,
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