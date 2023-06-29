import { ref, type Ref } from "vue"
import type { IUsers } from "@/interfaces/users"
import type { IPagination } from "@/interfaces/pagination"
// import { useAlertStore } from "@/stores"

import API from "@/plugins/api"

class UserService {
  private users: Ref<IUsers[]>
  private user: Ref<IUsers>
  private pagination: Ref<IPagination>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private alert: any

  constructor() {
    this.users = ref<IUsers[]>([])
    this.user = ref<IUsers>(Object.assign({}))
    this.pagination = ref<IPagination>(Object.assign({}))
    // this.alert = useAlertStore()
  }

  showUsers(): Ref<IUsers[]> {
    return this.users
  }

  showUser(): Ref<IUsers> {
    return this.user
  }

  getPagination(): Ref<IPagination> {
    return this.pagination
  }

  async getUsers(params = {}): Promise<void> {
    try {
      const { data } = await API.get("/api/users", params)
      this.users.value = await data.users
      this.pagination.value = await data.pagination
    } catch (err) {
      // this.alert.error(err)
    }
  }

  async getUser(id: number): Promise<void> {
    try {
      const { data } = await API.get(`/api/users/${id}`)
      this.user.value = await data
    } catch (err) {
      // this.alert.error(err)
    }
  }

  async createUser(params = {}): Promise<void> {
    try {
      await API.post("api/users", params)
      // this.alert.success("User created successfully")
    } catch (err) {
      // this.alert.error(err)
    }
  }

  async updateUser(id: number, data = {}): Promise<void> {
    try {
      await API.put(`/api/users/${id}`, data)
      // this.alert.success("Role updated successfully")
    } catch (err) {
      // this.alert.error(err)
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await API.delete(`/api/users/${id}`)
      // this.alert.success("User deleted successfully")
    } catch (err) {
      // this.alert.error(err)
    }
  }
}

export default new UserService()
