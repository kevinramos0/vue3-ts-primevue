<template>
  <div class="p-inputgroup flex-1">
    <span class="p-inputgroup-addon font-bold">Status</span>
    <!-- eslint-disable-next-line vue/no-v-model-argument -->
    <SelectButton v-model:model-value="value" :options="options" option-label="name" @change="$emit('changeStatus', value)" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"

interface IStatus {
  name: string
  value: boolean
}

const value = ref<boolean | null>(null)
const options = reactive<IStatus[]>([
  { name: "Active", value: true },
  { name: "Inactive", value: false },
])
</script>

<style scoped></style>
