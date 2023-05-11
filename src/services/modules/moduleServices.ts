import { ref, type Ref } from "vue"
import type { IModules } from "@/interfaces/modules"
import type { IPagination } from "@/interfaces/pagination"
// import { useAlertStore } from "@/stores"
import API from "@/plugins/api"

class ModuleService {
  private modules: Ref<IModules[]>
  private module: Ref<IModules>
  private pagination: Ref<IPagination>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private alert: any

  constructor() {
    this.modules = ref<IModules[]>([])
    this.pagination = ref<IPagination>(Object.assign({}))
    this.module = ref<IModules>(Object.assign({}))
    // this.alert = useAlertStore()
  }

  showModules(): Ref<IModules[]> {
    return this.modules
  }

  showModule(): Ref<IModules> {
    return this.module
  }

  getPagination(): Ref<IPagination> {
    return this.pagination
  }

  async getModules(params = {}): Promise<void> {
    try {
      const { data } = await API.get("/api/modules", params)

      this.modules.value = await data.modules
      this.pagination.value = await data.pagination
    } catch (err) {
      // this.alert.error(err)
    }
  }

  async getModule(id: number): Promise<void> {
    try {
      const { data } = await API.get(`api/modules/${id}`)
      this.module.value = data
    } catch (err) {
      // this.alert.error(err)
    }
  }

  async createModule(data = {}): Promise<void> {
    try {
      await API.post("api/modules", data)
      // this.alert.success("Module created successfully")
    } catch (err) {
      // this.alert.error(err)
    }
  }

  async updateModule(id: number, data = {}): Promise<void> {
    try {
      await API.put(`api/modules/${id}`, data)
      // this.alert.success("Module updated successfully")
    } catch (err) {
      // this.alert.error(err)
    }
  }

  async deleteModule(id: number): Promise<void> {
    try {
      await API.delete(`api/modules/${id}`)
      // this.alert.success("Module deleted successfully")
    } catch (err) {
      // this.alert.error(err)
    }
  }
}

export default new ModuleService()
