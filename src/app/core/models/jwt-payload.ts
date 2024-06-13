export interface JwtPayload {
  id: string
  email: string
  name: string
  phone: string
  iat: number
  exp: number
}
