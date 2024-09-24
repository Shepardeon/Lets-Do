import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Project } from './Project'

export enum UserRole {
  User = 'User',
  Admin = 'Admin',
}

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  username: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: false })
  role: UserRole

  @OneToMany(() => Project, (proj) => proj.user)
  projects: Project[]
}
