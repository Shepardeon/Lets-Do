import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'

export const useEncrypt = () => {
  dotenv.config()

  async function encryptAsync(str: string) {
    return bcrypt.hash(str, 12)
  }

  async function compareStringAsync(str: string, hash: string) {
    return bcrypt.compare(str, hash)
  }

  function encrypt(str: string) {
    return bcrypt.hashSync(str, 12)
  }

  function compareString(str: string, hash: string) {
    return bcrypt.compareSync(str, hash)
  }

  function generateToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    })
  }

  return {
    encryptAsync,
    compareStringAsync,
    encrypt,
    compareString,
    generateToken,
  }
}
