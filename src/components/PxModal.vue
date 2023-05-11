<template>
  <div>
    <Dialog :visible="isOpen" modal header="Header" :style="{ width: '50vw' }">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <component :is="view" v-model="model"></component>
      <button v-for="(action, i) in actions" :key="i" class="btn" @click="action.callback(model)">
        {{ action.label }}
      </button>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import { storeToRefs } from "pinia"
import { useModal } from "@/stores"

const modal = useModal()

// reactive container to save the payload returned by the mounted view
const model = reactive({})

// convert all state properties to reactive references to be used on view
const { isOpen, view, actions } = storeToRefs(modal)
</script>

<style scoped></style>
