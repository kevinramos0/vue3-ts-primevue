<template>
  <div class="layout-topbar">
    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
      <i class="pi pi-bars"></i>
    </button>
    <router-link :to="{ name: 'home' }" class="layout-topbar-logo">
      <span>API USERS MANAGEMENT</span>
    </router-link>

    <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
      <i class="pi pi-ellipsis-v"></i>
      <!-- <span>Profile</span> -->
    </button>

    <div class="layout-topbar-menu mr-0" :class="topbarMenuClasses">
      <!-- <i class="pi pi-moon mr-2 mt-2" style="font-size: 1.5rem; cursor: pointer" @click="darkMode"></i> -->
      <SplitButton :label="userInfo" :model="items" class="p-button-text p-button-secondary mb-2"></SplitButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useLayout } from "@/layout/composables/layout"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores"
import { storeToRefs } from "pinia"

interface Items {
  label: string
  icon: string
  command: () => void
}

const authStore = useAuthStore()
const { userInfo } = storeToRefs(authStore)
const router = useRouter()

const { onMenuToggle } = useLayout()

const topbarMenuActive = ref<boolean>(false)

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value
}

const topbarMenuClasses = computed(() => {
  return {
    "layout-topbar-menu-mobile-active": topbarMenuActive.value,
  }
})
// const darkMode = () => alert("Home")
const items = ref<Items[]>([
  {
    label: "Profile",
    icon: "pi pi-user",
    command: () => {
      router.push({ name: "home", replace: true })
    },
  },
  {
    label: "Logout",
    icon: "pi pi-sign-out",
    command: () => {
      authStore.logout()
    },
  },
])
</script>

<style lang="scss" scoped></style>
