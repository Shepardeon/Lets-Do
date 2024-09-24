import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

export const useAuthService = () => {
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

  function validateCode(code: string) {
    return code === process.env.INVITE_CODE
  }

  return {
    encryptAsync,
    compareStringAsync,
    encrypt,
    compareString,
    generateToken,
    validateCode,
  }
}
