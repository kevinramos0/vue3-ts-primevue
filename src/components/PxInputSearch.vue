<template>
  <div class="p-inputgroup flex-1">
    <span class="p-inputgroup-addon font-bold">{{ placeHolder }}</span>
    <span class="p-float-label">
      <InputText id="search" type="text" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"> </InputText>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    default: "",
    required: true,
  },
  placeHolder: {
    type: String,
    default: "Search",
    required: false,
  },
})
</script>

<style scoped></style>
