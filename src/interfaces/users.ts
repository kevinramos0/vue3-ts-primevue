export interface IUsers {
  id: number
  email: string
  isActive: boolean
  isVerified: boolean
  profile?: {
    id: number
    name: string
  }
  createdAt?: string
  updatedAt?: string
}
