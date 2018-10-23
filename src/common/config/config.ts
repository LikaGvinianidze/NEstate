'use strict';

import * as dotenv from 'dotenv';

dotenv.config();

/**
 * @param   {mixed}   key
 * @param   {mixed}   defaultValue
 * @returns {mixed}
 */
const _getEnv = (key, defaultValue) => process.env[key] || defaultValue;

export const config = {
  server: {
    port: _getEnv('NODE_PORT', 3030),
  },
  database: {
    type: _getEnv('DB_TYPE', ''),
    host: _getEnv('DB_HOST', ''),
    port: _getEnv('DB_PORT', ''),
    username: _getEnv('DB_USER', ''),
    password: _getEnv('DB_PASSWORD', ''),
    database: _getEnv('DB_DATABASE', ''),
  },
  redis: {
    host: _getEnv('REDIS_HOST', ''),
    port: _getEnv('REDIS_PORT', ''),
    prefix: _getEnv('REDIS_PREFIX', ''),
  },
  secret: _getEnv('SECRET_KEY', ''),
};
