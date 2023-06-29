<template>
  <div class="md:flex justify-content-between">
    <div class="">
      <px-input-search v-model="search.name" :place-holder="'Name'" class="mb-4" />
    </div>
    <div>
      <px-search-status @changeStatus="filterStatus($event)" />
    </div>
  </div>
  <DataTable :value="profiles" responsive-layout="scroll">
    <Column field="name" header="Name"></Column>
    <Column field="isActive" header="Status">
      <template #body="slotProps">
        <span :class="'profiles-badge status-' + slotProps.data.isActive">
          {{ slotProps.data.isActive ? "Active" : "Inactive" }}
        </span>
      </template>
    </Column>
    <Column field="description" header="Description"></Column>
    <Column field="" header="Actions">
      <template #body="slotProps">
        <Button icon="pi pi-eye" class="p-button-rounded p-button-text text-blue-600 hover:bg-blue-300 hover:text-white" v-tooltip.bottom="'Show Profile'" />
        <Button icon="pi pi-pencil" class="p-button-rounded p-button-text text-orange-600 hover:bg-orange-300 hover:text-white" v-tooltip.bottom="'Edit Profile'" />
        <px-delete :tooltip="'Delete Profile'" :id="slotProps.data.id" :name="slotProps.data.name" @delete="deleteProfile" />
      </template>
    </Column>
  </DataTable>
  <PxPaginator :rows="paginator.limit" :total="totalProfiles" :paginator="paginator" :limit-paginate="profiles.length" @show-paginate="showPaginate" />
</template>

<script setup lang="ts">
import { onMounted, computed, watch, reactive } from "vue"
import ProfileService from "@/services/profiles/profileServices"
import PxInputSearch from "@/components/PxInputSearch.vue"
import PxSearchStatus from "@/components/PxSearchStatus.vue"
import PxDelete from "@/components/CRUD/PxDelete.vue"
import type { IPaginator } from "@/interfaces/paginate"
import type { IProfileSearch } from "@/views/Profiles/interfaces/search.interface"
import PxPaginator from "@/components/PxPaginator.vue"

const profiles = ProfileService.showProfiles()

const paginator = reactive<IPaginator>({
  pagination: true,
  limit: 10,
  offset: 1,
})

const search = reactive<IProfileSearch>({
  name: "",
  active: null,
})

const getProfiles = async (): Promise<void> => {
  const { pagination, limit, offset } = paginator
  const { name, active } = search
  await ProfileService.getProfiles({
    pagination,
    limit,
    offset,
    name,
    active,
  })
}

const deleteProfile = async (id: number): Promise<void> => {
  await ProfileService.deleteProfile(id)
  await getProfiles()
}

const showPaginate = async (value: { page: number; rows: number }): Promise<void> => {
  const { page, rows } = value
  paginator.limit = rows
  paginator.offset = page + 1
  await getProfiles()
}

const filterStatus = async (status: { name?: string; value: boolean | null }) => {
  status ? (search.active = status.value) : (search.active = null)
  await getProfiles()
}

const totalProfiles = computed(() => {
  const { total } = ProfileService.getPagination().value
  return total
})

watch(
  () => search.name,
  async (newValue) => {
    search.name = newValue
    await getProfiles()
  }
  // { deep: true } el nuevo valor y el antiguo serán el mismo
)

onMounted(async () => {
  await getProfiles()
})
</script>

<style scoped></style>
