import { DataSource, Repository } from 'typeorm'
import { User, UserRole } from '../../domain/entities/User'
import { useAuthService } from '../../app/services/authService'

export const dbSeed = async (db: DataSource) => {
  const userRepository = db.getRepository(User)
  await seedUsers(userRepository)
}

async function seedUsers(rep: Repository<User>) {
  const anyUser = (await rep.count()) > 0
  const auth = useAuthService()
  if (anyUser) return

  console.log('No existing user found, seeding Users...')

  const pass = await auth.encryptAsync('password')
  await rep.insert({
    username: 'admin',
    password: pass,
    role: UserRole.Admin,
  })
}
