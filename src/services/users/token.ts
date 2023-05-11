import type { IUserAuth } from "@/interfaces/auth"

class TokenService {
  async getLocalRefreshToken() {
    const user: IUserAuth = await JSON.parse(localStorage.getItem("user") || "{}")
    return user?.refreshToken
  }
  async getLocalAccessToken() {
    const user: IUserAuth = await JSON.parse(localStorage.getItem("user") || "{}")
    return user?.token
  }
  async updateLocalAccessToken(token: string) {
    const user: IUserAuth = await JSON.parse(localStorage.getItem("user") || "{}")
    user.token = token
    localStorage.setItem("user", JSON.stringify(user))
  }
  async getUser() {
    const user: IUserAuth = await JSON.parse(localStorage.getItem("user") || "{}")
    return user
  }
  setUser(user: IUserAuth) {
    localStorage.setItem("user", JSON.stringify(user))
  }
  removeUser() {
    localStorage.removeItem("user")
  }
}
export default new TokenService()
