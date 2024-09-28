import { UserRepository } from '../lib/repositories/userRepository'
import { AuthService } from '../services/authService'
import { ServiceLocator } from '../services/serviceLocator'
import { IAuthService, IUserRepository } from '../services'

export default function BuildAppService() {
  ServiceLocator.registerService(IAuthService, new AuthService())
  ServiceLocator.registerService(IUserRepository, new UserRepository())
}
