export const ENV: string = process.env.NEXT_PUBLIC_ENV || 'development'

export const API_URL = {
  development: 'http://localhost:4000',
  production: 'http://localhost:4000',
}[ENV]
