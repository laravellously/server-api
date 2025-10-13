"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migrations_1 = require("@mikro-orm/migrations");
const postgresql_1 = require("@mikro-orm/postgresql");
const reflection_1 = require("@mikro-orm/reflection");
const seeder_1 = require("@mikro-orm/seeder");
const sql_highlighter_1 = require("@mikro-orm/sql-highlighter");
const common_1 = require("@nestjs/common");
const entity_generator_1 = require("@mikro-orm/entity-generator");
class ORMLogger extends postgresql_1.DefaultLogger {
    logger = new common_1.Logger(ORMLogger.name);
    log(namespace, message, context) {
        this.logger.log(`[${namespace}] ${message}`);
    }
}
const config = {
    dbName: 'bluu-erp-final',
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    entities: ['./dist/db/entities'],
    entitiesTs: ['./src/db/entities'],
    preferTs: true,
    migrations: {
        path: './dist/db/migrations',
        pathTs: './src/db/migrations',
        tableName: 'migrations',
        transactional: true,
        allOrNothing: true,
        safe: true,
    },
    metadataProvider: reflection_1.TsMorphMetadataProvider,
    debug: process.env.NODE_ENV !== 'production',
    loggerFactory: (options) => new ORMLogger(options),
    highlighter: new sql_highlighter_1.SqlHighlighter(),
    pool: {
        min: 2,
        max: 10,
    },
    timezone: 'UTC+1',
    charset: 'utf8',
    validateRequired: true,
    forceUtcTimezone: true,
    strict: true,
    extensions: [
        seeder_1.SeedManager,
        migrations_1.Migrator,
        entity_generator_1.EntityGenerator
    ]
};
exports.default = (0, postgresql_1.defineConfig)(config);
//# sourceMappingURL=mikro-orm.config.js.map