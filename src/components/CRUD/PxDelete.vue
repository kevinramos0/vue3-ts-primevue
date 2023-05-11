<template>
  <Button @click="hiddenModal" icon="pi pi-trash" class="p-button-rounded p-button-text text-red-600 hover:bg-red-300 hover:text-white" v-tooltip.bottom="tooltip" />
  <Dialog :visible="show" header="Confirm Delete" :modal="true" :draggable="false" @update:visible="hiddenModal">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="name"
        >Are you sure you want to delete <b>{{ name }}</b
        >?</span
      >
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" text @click="hiddenModal" />
      <Button label="Yes" icon="pi pi-check" text @click="deleteItem(id)" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"

const show = ref(false)

defineProps({
  tooltip: {
    type: String,
    required: true,
    default: "Delete",
  },
  id: {
    type: Number,
    required: true,
    default: 0,
  },
  name: {
    type: String,
    required: true,
    default: "",
  },
})
const emit = defineEmits(["delete"])

const hiddenModal = (): void => {
  show.value = !show.value
}

const deleteItem = (id: number): void => {
  emit("delete", id)
  hiddenModal()
}
</script>

<style scoped></style>
