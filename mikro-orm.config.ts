import { DefaultLogger, LoggerNamespace, LogContext, defineConfig } from "@mikro-orm/postgresql";
import { Logger } from "@nestjs/common";
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

class ORMLogger extends DefaultLogger {
  private readonly logger = new Logger(ORMLogger.name);
  log(namespace: LoggerNamespace, message: string, context?: LogContext) {
    this.logger.log(`[${namespace}] ${message}`);
  }
}

export default defineConfig({
  clientUrl: process.env.DATABASE_URL,
  entities: ['./dist/src/db/entities'],
  entitiesTs: ['./src/db/entities'],
  loggerFactory: (options) => new ORMLogger(options),
  debug: true,
  highlighter: new SqlHighlighter(),
})