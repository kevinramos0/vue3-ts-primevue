import { AxiosError } from "axios"
import { defineStore } from "pinia"
import { toast } from "@/main"
import { ToastSeverity } from "primevue/api"


export const menu = {
  namespaced: true,
  state: {
    miniDrawer: true,
  },
  getters: {},
  mutations: {
    fullDrawer(state, payload) {
      state.miniDrawer = payload.miniDrawer;
    },
  },
  actions: {},
  modules: {},
};


export const useAlertStore = defineStore({
  id: "alert",
  state: () => ({
    alert: toast,
  }),
  actions: {
    success(title: "Sucesss", body = "", lifeTime = 2500) {
      this.alert.add({ severity: ToastSeverity.SUCCESS, summary: title, detail: body, life: lifeTime })
    },
    info(err: unknown, body = "", lifeTime = 2500) {
      const title = err instanceof AxiosError ? err.response?.data.message : err
      this.alert.add({ severity: ToastSeverity.INFO, summary: title, detail: body, life: lifeTime })
    },
    warning(err: unknown, body = "", lifeTime = 2500) {
      const title = err instanceof AxiosError ? err.response?.data.message : err
      this.alert.add({ severity: ToastSeverity.WARN, summary: title, detail: body, life: lifeTime })
    },
    error(err: unknown, body = "", lifeTime = 2500) {
      const title = err instanceof AxiosError ? err.response?.data.message : err
      this.alert.add({ severity: ToastSeverity.ERROR, summary: title, detail: body, life: lifeTime })
    },
  },
})
