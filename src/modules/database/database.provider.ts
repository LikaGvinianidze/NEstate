import { config } from './../../common/config/config';
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () =>
    await createConnection({
      ...config.database,
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
      migrations: [
        __dirname + '/../../migrations/*{.ts,.js}',
      ],
    }),
  },
];
