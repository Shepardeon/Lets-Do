import { DataSource, Repository } from 'typeorm'
import { User, UserRole } from '../entities/User'
import { useEncrypt } from '../utils/encrypt'

export const dbSeed = async (db: DataSource) => {
  const userRepository = db.getRepository(User)
  await seedUsers(userRepository)
}

async function seedUsers(rep: Repository<User>) {
  const anyUser = (await rep.count()) > 0
  const encrypt = useEncrypt()
  if (anyUser) return

  console.log('No existing user found, seeding Users...')

  const pass = await encrypt.encryptAsync('password')
  await rep.insert({
    username: 'admin',
    password: pass,
    role: UserRole.Admin,
  })
}
