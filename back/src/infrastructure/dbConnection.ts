import 'reflect-metadata'
import { DataSource } from 'typeorm'

import * as dotenv from 'dotenv'
import { User } from '../domain/entities/User'
import { Project } from '../domain/entities/Project'
import { TaskColumn } from '../domain/entities/TaskColumn'
import { Task } from '../domain/entities/Task'

dotenv.config()

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
