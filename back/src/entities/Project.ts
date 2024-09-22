import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { TaskColumn } from './TaskColumn'

@Entity({ name: 'Projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @OneToMany(() => TaskColumn, (col) => col.project)
  columns: TaskColumn[]
}
