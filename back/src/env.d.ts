declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_PORT: number
      NODE_ENV: 'dev' | 'prod'
      DATABASE_URL: string
    }
  }
}

export {}
