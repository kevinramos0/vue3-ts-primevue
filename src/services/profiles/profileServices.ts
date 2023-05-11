import { ref, type Ref } from "vue"
import API from "@/plugins/api"
// import { useAlertStore } from "@/stores"
import type { IProfiles } from "@/interfaces/profiles"
import type { IPagination } from "@/interfaces/pagination"

class ProfileService {
  private profiles: Ref<IProfiles[]>
  private profile: Ref<IProfiles>
  private pagination: Ref<IPagination>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private alert: any

  constructor() {
    this.profiles = ref<IProfiles[]>([])
    this.profile = ref<IProfiles>(Object.assign({}))
    this.pagination = ref<IPagination>(Object.assign({}))
  }

  showProfiles(): Ref<IProfiles[]> {
    return this.profiles
  }

  showProfile(): Ref<IProfiles> {
    return this.profile
  }

  getPagination(): Ref<IPagination> {
    return this.pagination
  }

  async getProfiles(params = {}): Promise<void> {
    try {
      const { data } = await API.get("/api/profiles", params)

      this.profiles.value = await data.profiles
      this.pagination.value = await data.pagination
    } catch (err) {
      // this.alert.error(err)
    }
  }
  async getProfile(id: number): Promise<void> {
    try {
      const { data } = await API.get(`/api/profiles/${id}`)
      this.profile.value = await data
    } catch (err) {
      // this.alert.error(err)
    }
  }

  async createProfile(data = {}): Promise<void> {
    try {
      await API.post(`/api/profiles`, data)
      // this.alert.success("Profile created successfully")
    } catch (err) {
      // this.alert.error(err)
    }
  }

  async updateProfile(id: number, data = {}): Promise<void> {
    try {
      await API.put(`/api/profiles/${id}`, data)
      // this.alert.success("Profile updated successfully")
    } catch (err) {
      // this.alert.error(err)
    }
  }

  async deleteProfile(id: number): Promise<void> {
    try {
      await API.delete(`/api/profiles/${id}`)
      // this.alert.success("Profile deleted successfully")
    } catch (err) {
      // this.alert.error(err)
    }
  }
}

export default new ProfileService()
