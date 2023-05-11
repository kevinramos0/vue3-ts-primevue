import { useAlertStore } from "@/stores"

import API from "@/plugins/api"

class AuthService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private alert: any

  constructor() {
    this.alert = useAlertStore()
  }

  async resetPassword(email: string): Promise<void> {
    try {
      const { data } = await API.post("/api/auth/reset/password", { email })
      this.alert.info(data.message, "", 3000)
      return Promise.resolve()
    } catch (err) {
      this.alert.error(err)
      return Promise.reject()
    }
  }

  async createPassword(token: string | null, password: string): Promise<void> {
    try {
      const { data } = await API.post(`/api/auth/create/password/${token}`, { password })
      this.alert.success(data.message)
      return Promise.resolve()
    } catch (err) {
      this.alert.error(err)
      return Promise.reject()
    }
  }

  async verifyUser(token: string): Promise<void> {
    try {
      const { data } = await API.post(`/api/auth/verify/account/${token}`, {})
      this.alert.success(data.message)
      return Promise.resolve()
    } catch (err) {
      this.alert.error(err)
      return Promise.reject()
    }
  }
}

export default new AuthService()
