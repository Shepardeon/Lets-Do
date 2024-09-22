import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { TaskColumn } from './TaskColumn'
import { User } from './User'

@Entity({ name: 'Projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @ManyToOne(() => User, (user) => user.projects)
  user: User

  @OneToMany(() => TaskColumn, (col) => col.project)
  columns: TaskColumn[]
}
