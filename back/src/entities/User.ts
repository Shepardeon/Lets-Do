import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

export enum UserRole {
  User,
  Admin,
}

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  username: string

  @Column({ nullable: false })
  role: UserRole
}
