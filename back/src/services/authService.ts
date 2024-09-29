import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export class AuthService {
  async encryptAsync(str: string) {
    return bcrypt.hash(str, 12)
  }

  async compareAsync(str: string, hash: string) {
    return bcrypt.compare(str, hash)
  }

  generateToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_SECRET ?? '', {
      expiresIn: process.env.JWT_EXPIRE,
    })
  }
}
