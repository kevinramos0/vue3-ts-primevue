<template>
  <ul class="layout-menu">
    <!-- eslint-disable-next-line vue/no-v-for-template-key -->
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item :item="item" :index="i"></app-menu-item>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue"

import AppMenuItem from "./AppMenuItem.vue"

interface IModel {
  label: string
  items?: {
    label?: string
    icon?: string
    to?: string
  }[]
}

const model: Ref<IModel[]> = ref([
  {
    label: "Home",
    items: [{ label: "Dashboard", icon: "pi pi-fw pi-home", to: "home" }],
  },
  {
    label: "Users Management",
    items: [
      { label: "Users", icon: "pi pi-fw pi-users", to: "users" },
      { label: "Profiles", icon: "pi pi-fw pi-id-card", to: "profiles" },
      { label: "Rols", icon: "pi pi-fw pi-cog", to: "rols" },
      { label: "Routes", icon: "pi pi-fw pi-list", to: "modules" },
    ],
  },
])
</script>

<style lang="scss" scoped></style>
