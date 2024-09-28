import { User } from '@prisma/client'
import { ICrudRepository } from './crudRepository'
import { prisma } from '../prisma'

export class UserRepository implements ICrudRepository<User> {
  async insertAsync(record: User): Promise<User> {
    return await prisma.user.create({ data: record })
  }

  async insertListAsync(records: User[]): Promise<void> {
    await prisma.user.createMany({ data: records })
  }

  async getByIdAsync(id: number): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } })
  }

  async listAsync(): Promise<User[]> {
    return await prisma.user.findMany()
  }

  async updateAsync(record: User): Promise<User> {
    return await prisma.user.update({ where: { id: record.id }, data: record })
  }

  async deleteAsync(record: User): Promise<void> {
    await prisma.user.delete({ where: { id: record.id } })
  }
}
