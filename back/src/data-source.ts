import 'reflect-metadata'
import { DataSource } from 'typeorm'

import * as dotenv from 'dotenv'
import { User } from './entities/User'
import { Project } from './entities/Project'
import { TaskColumn } from './entities/TaskColumn'
import { Task } from './entities/Task'

dotenv.config()

console.log(__dirname)

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === 'dev' ? true : false,
  logging: process.env.NODE_ENV === 'dev' ? true : false,
  entities: [User, Project, TaskColumn, Task],
  migrations: [__dirname + '/migrations/*.ts'],
  subscribers: [],
})
