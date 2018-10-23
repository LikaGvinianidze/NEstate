import { DispatchError } from './common/filters/dispatch-erros';
import { NestFactory } from '@nestjs/core';
import * as passport from 'passport';
import * as session from 'express-session';
import * as RedisStore from 'connect-redis';
import { AppModule } from './app.module';
import { config } from './common/config/config';
import { getConnection } from 'typeorm';

async function bootstrap() {
  /*
    Create Nest Appliation
  */
  const app = await NestFactory.create(AppModule);

  /*
    Filters, View config
  */
  app.useGlobalFilters(new DispatchError());

  app.useStaticAssets(__dirname + '/public');
  app.setBaseViewsDir(__dirname + '/views');
  app.setViewEngine('ejs');

  /*
    Passport initialze
  */
  const Store = RedisStore(session);
  app.use(session({
    store: new Store(
      {
        host: config.redis.host,
        port: config.redis.port,
        prefix: config.redis.prefix,
      },
    ),
    key: 'nestate.sid',
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  /*
    Starting a Server
  */
  const conn = getConnection(); // Get current DB connection

  // Run pending migrations before server start
  conn.runMigrations()
    .then(async () => {
      await app.listen(config.server.port);
    });
}
bootstrap();
