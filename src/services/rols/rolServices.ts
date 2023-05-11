import { ref, type Ref } from "vue"
import type { IRols } from "@/interfaces/rols"
import type { IPagination } from "@/interfaces/pagination"
// import { useAlertStore } from "@/stores"

import API from "@/plugins/api"

class RolService {
  private rols: Ref<IRols[]>
  private rol: Ref<IRols>
  private pagination: Ref<IPagination>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private alert: any

  constructor() {
    this.rols = ref<IRols[]>([])
    this.rol = ref<IRols>(Object.assign({}))
    this.pagination = ref<IPagination>(Object.assign({}))
    // this.alert = useAlertStore()
  }

  showRols(): Ref<IRols[]> {
    return this.rols
  }

  showRol(): Ref<IRols> {
    return this.rol
  }

  getPagination(): Ref<IPagination> {
    return this.pagination
  }

  async getRols(params = {}): Promise<void> {
    try {
      const { data } = await API.get("/api/rols", params)

      this.rols.value = await data.rols
      this.pagination.value = await data.pagination
    } catch (err) {
      // this.alert.error(err)
    }
  }
  async getRol(id: number): Promise<void> {
    try {
      const { data } = await API.get(`/api/rols/${id}`)
      this.rol.value = await data
    } catch (err) {
      // this.alert.error(err)
    }
  }

  async createRol(data = {}): Promise<void> {
    try {
      await API.post(`/api/rols`, data)
      // this.alert.success("Role created successfully")
    } catch (err) {
      // this.alert.error(err)
    }
  }

  async updateRol(id: number, data = {}): Promise<void> {
    try {
      await API.put(`/api/rols/${id}`, data)
      // this.alert.success("Role updated successfully")
    } catch (err) {
      // this.alert.error(err)
    }
  }

  async deleteRol(id: number): Promise<void> {
    try {
      await API.delete(`/api/rols/${id}`)
      // this.alert.success("Role deleted successfully")
    } catch (err) {
      // this.alert.error(err)
    }
  }
}

export default new RolService()
