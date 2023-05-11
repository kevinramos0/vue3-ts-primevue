import { defineStore } from "pinia"
import router from "@/router"
import token from "@/services/users/token"
import API from "@/plugins/api"
import { AxiosError } from "axios"
import { useAlertStore } from "./alert"

const getUserStore = localStorage.getItem("user")
const user = getUserStore ? JSON.parse(getUserStore) : null
const userData = user ? { isLogged: true, user } : { isLogged: false, user }

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    userData,
    userInfo: "",
  }),
  persist: true,
  actions: {
    async login(email: string, password: string): Promise<void> {
      const alertStore = useAlertStore()
      try {
        const { data } = await API.post("/api/auth/login", { email, password })
        const user = {
          token: data.token as string,
          refreshToken: data.refreshToken as string,
        }
        // update pinia state
        this.userData.user = user
        this.userData.isLogged = true
        this.userInfo = data.user.email
        // store user details and jwt in local storage to keep user logged in between page refreshes
        token.setUser(this.userData.user)
        // redirect to previous url or default to home page
        setTimeout(() => {
          router.push({ name: "home" })
        }, 1500)
      } catch (err) {
        const message = err instanceof AxiosError ? err.response?.data.message : "Error Inesperated"
        alertStore.error(message)
      }
    },

    async logout(): Promise<void> {
      try {
        await API.post("/api/auth/logout", {}).then(() => {
          token.removeUser()
          this.userData.user = null
          this.userData.isLogged = false
        })
        router.push({ name: "login" })
      } catch (e) {
        // error(e)
      }
    },

    // updateToken(token: string, state: boolean) {
    //   this.userData.user && (this.userData.user.token = token)
    //   this.userData.isLogged = state
    // },
  },
})
