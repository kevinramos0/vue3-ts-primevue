<template>
  <!-- eslint-disable-next-line vue/no-v-model-argument -->
  <Dialog :visible="modelValue" :draggable="false" :modal="true" class="p-fluid" :style="{ width: '550px' }" @update:visible="emit('close')">
    <template #header>
      <span class="font-bold text-lg">
        <i class="pi pi-user pr-2" style="font-size: 1.6rem"> </i>
        {{ userData.email }}</span
      >
    </template>
    <div class="card">
      <div class="flex justify-content-around">
        <span class="">
          Status: <span :class="'users-badge status-' + userData.isActive"> {{ userData.isActive ? "Active" : "Inactive" }}</span>
        </span>
        <span>
          Verified: <span :class="'users-badge verified-' + userData.isVerified"> {{ userData.isVerified ? "Yes" : "No" }}</span>
        </span>
        <span>
          Profile: <span :class="`profiles-badge ${userData.profile?.name ? 'bg-orange-100' : 'bg-red-100'}`"> {{ userData.profile?.name ?? "No profile Assigned" }}</span>
        </span>
      </div>
      <div class="flex justify-content-around mt-4">
        <span>
          Created: <span class="users-badge"> {{ userData.createdAt ? filter.date(userData.createdAt) : "" }} </span>
        </span>
        <span>
          Updated: <span class="users-badge"> {{ userData.updatedAt ? filter.date(userData.updatedAt) : "" }}</span>
        </span>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { watch } from "vue"
import UserService from "@/services/users/users"
import { inject } from "vue"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const filter = inject<any>("filters")

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: Number,
    required: true,
    default: 0,
  },
})
const emit = defineEmits(["close"])

const userData = UserService.showUser()

const getUser = async (id: number) => {
  await UserService.getUser(id)
}

watch(
  () => props.user,
  async (id) => {
    await getUser(id)
  },
  { deep: true }
)
</script>

<style scoped></style>
