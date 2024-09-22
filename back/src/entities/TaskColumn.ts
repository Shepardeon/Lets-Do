import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Project } from './Project'
import { Task } from './Task'

@Entity({ name: 'TaskColumns' })
export class TaskColumn {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  order: number

  @ManyToOne(() => Project, (proj) => proj.columns)
  project: Project

  @OneToMany(() => Task, (task) => task.column)
  tasks: Task[]
}
