import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TaskColumn } from './TaskColumn'

@Entity({ name: 'Tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  order: number

  @ManyToOne(() => TaskColumn, (col) => col.tasks)
  column: TaskColumn
}
