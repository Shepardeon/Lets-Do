import { User } from '@prisma/client'
import { ICrudRepository } from './crudRepository'
import { prisma } from '../prisma'
import { AuthService } from '../../services/authService'
import { ServiceLocator } from '../../services/serviceLocator'
import { IAuthService } from '../../services'

export class UserRepository implements ICrudRepository<User> {
  private authService: AuthService

  constructor() {
    this.authService = ServiceLocator.getService(IAuthService)
  }

  async insertAsync(record: User): Promise<User> {
    record.password = await this.authService.encryptAsync(record.password)
    return await prisma.user.create({ data: record })
  }

  async insertListAsync(records: User[]): Promise<void> {
    records = await Promise.all(
      records.map(async (r) => ({
        ...r,
        password: await this.authService.encryptAsync(r.password),
      }))
    )
    await prisma.user.createMany({ data: records })
  }

  async getByIdAsync(id: number): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } })
  }

  async listAsync(): Promise<User[]> {
    return await prisma.user.findMany()
  }

  async updateAsync(record: User): Promise<User> {
    record.password = await this.authService.encryptAsync(record.password)
    return await prisma.user.update({ where: { id: record.id }, data: record })
  }

  async deleteAsync(record: User): Promise<void> {
    await prisma.user.delete({ where: { id: record.id } })
  }
}
