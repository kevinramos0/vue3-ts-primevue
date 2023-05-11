import { storeToRefs } from "pinia"
import axios from "axios"
import router from "@/router"
// import Alert from "@/plugins/alert"
import TokenService from "@/services/users/token"
import { useAuthStore } from "@/stores"

export default function axiosSetUp() {
  // point to your API endpoint
  axios.defaults.baseURL = "http://localhost:8002"
  // Add a request interceptor
  axios.interceptors.request.use(
    async (config) => {
      // Do something before request is sent
      config.headers["Content-Type"] = "application/json"
      const token = await TokenService.getLocalAccessToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      // Do something with request error
      Promise.reject(error)
    }
  )

  // Add a response interceptor
  axios.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const authStore = useAuthStore()
      const { userData } = storeToRefs(authStore)
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const originalRequest = error.config
      if (error.response.status === 401 && originalRequest.url.includes("/api/auth/refresh/")) {
        await authStore.logout()
        return Promise.reject(error)
      } else if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
          const refreshToken = await TokenService.getLocalRefreshToken()
          const rs = await axios.post(`/api/auth/refresh/${refreshToken}`)
          const { token } = rs.data
          userData.value.user && (userData.value.user.token = token)
          TokenService.updateLocalAccessToken(token)
          return axios(originalRequest)
        } catch (err) {
          // errorAlert("The session has expired, please login again")
          TokenService.removeUser()
          setTimeout(() => {
            router.push({ name: "login" })
          }, 2000)

          return Promise.reject(err)
        }
      } else if (error.response.status === 403) {
        router.push({ name: "forbidden" })
      }
      // errorAlert(error)
      return Promise.reject(error)
    }
  )
}
