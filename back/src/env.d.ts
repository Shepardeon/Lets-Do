declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_PORT: number
      NODE_ENV: 'dev' | 'prod'
      DATABASE_URL: string
      JWT_SECRET: string
      JWT_EXPIRE: number
    }
  }
}

export {}
