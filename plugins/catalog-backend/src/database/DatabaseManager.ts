/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { getVoidLogger, resolvePackagePath } from '@backstage/backend-common';
import Knex from 'knex';
import { Logger } from 'winston';
import { CommonDatabase } from './CommonDatabase';
import { Database } from './types';
import { v4 as uuidv4 } from 'uuid';

const migrationsDir = resolvePackagePath(
  '@backstage/plugin-catalog-backend',
  'migrations',
);

export type CreateDatabaseOptions = {
  logger: Logger;
};

const defaultOptions: CreateDatabaseOptions = {
  logger: getVoidLogger(),
};

export class DatabaseManager {
  public static async createDatabase(
    knex: Knex,
    options: Partial<CreateDatabaseOptions> = {},
  ): Promise<Database> {
    await knex.migrate.latest({
      directory: migrationsDir,
    });
    const { logger } = { ...defaultOptions, ...options };
    return new CommonDatabase(knex, logger);
  }

  public static async createInMemoryDatabase(
    options: Partial<CreateDatabaseOptions> = {},
  ): Promise<Database> {
    const knex = Knex({
      client: 'sqlite3',
      connection: ':memory:',
      useNullAsDefault: true,
    });
    knex.client.pool.on('createSuccess', (_eventId: any, resource: any) => {
      resource.run('PRAGMA foreign_keys = ON', () => {});
    });
    return DatabaseManager.createDatabase(knex, options);
  }

  public static async createTestDatabase(): Promise<Database> {
    const config: Knex.Config<any> = {
      /*
      client: 'pg',
      connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'postgres',
      },
      */
      client: 'sqlite3',
      connection: ':memory:',
      useNullAsDefault: true,
    };

    let knex = Knex(config);
    if (typeof config.connection !== 'string') {
      const tempDbName = `d${uuidv4().replace(/-/g, '')}`;
      await knex.raw(`CREATE DATABASE ${tempDbName};`);
      knex = Knex({
        ...config,
        connection: {
          ...config.connection,
          database: tempDbName,
        },
      });
    }

    knex.client.pool.on('createSuccess', (_eventId: any, resource: any) => {
      resource.run('PRAGMA foreign_keys = ON', () => {});
    });
    await knex.migrate.latest({
      directory: migrationsDir,
    });

    const { logger } = defaultOptions;
    return new CommonDatabase(knex, logger);
  }
}
