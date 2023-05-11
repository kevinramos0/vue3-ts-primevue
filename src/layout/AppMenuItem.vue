<template>
  <li :class="{ 'layout-root-menuitem': root, 'active-menuitem': isActiveMenu }">
    <div v-if="root" class="layout-menuitem-root-text">{{ item.label }}</div>
    <router-link v-if="item.to" :class="[item.class, { 'active-route': checkActiveRoute(item.to) }]" tabindex="0" :to="{ name: item.to }">
      <i :class="item.icon" class="layout-menuitem-icon"></i>
      <span class="layout-menuitem-text">{{ item.label }}</span>
    </router-link>
    <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
      <app-menu-item v-for="(child, i) in item.items" :key="child" :index="i" :item="child" :parent-item-key="itemKey" :root="false"> </app-menu-item>
    </ul>
  </li>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  index: {
    type: Number,
    default: 0,
  },
  root: {
    type: Boolean,
    default: true,
  },
  parentItemKey: {
    type: String,
    default: "",
  },
})

const isActiveMenu = ref<boolean>(false)
const itemKey = ref<string>("")

onBeforeMount(() => {
  itemKey.value = props.parentItemKey ? props.parentItemKey + "-" + props.index : String(props.index)
})

const checkActiveRoute = (to: string) => {
  return route.name === to
}
</script>

<style lang="scss" scoped></style>
