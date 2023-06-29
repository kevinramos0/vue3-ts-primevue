<template>
  <div class="md:flex justify-content-between">
    <div class="">
      <px-input-search v-model="search.name" :place-holder="'Name'" class="mb-4" />
    </div>
    <div>
      <px-search-status @changeStatus="filterStatus($event)" />
    </div>
  </div>
  <DataTable :value="modules" responsive-layout="scroll">
    <Column field="name" header="Name"></Column>
    <Column field="nameRoute" header="Name Route"></Column>
    <Column field="icon" header="Icon"></Column>
    <Column field="isActive" header="Status">
      <template #body="slotProps">
        <span :class="'modules-badge status-' + slotProps.data.isActive">
          {{ slotProps.data.isActive ? "Active" : "Inactive" }}
        </span>
      </template>
    </Column>
    <Column field="isPublic" header="Public">
      <template #body="slotProps">
        <span :class="'modules-badge public-' + slotProps.data.isPublic">
          {{ slotProps.data.isPublic ? "Si" : "No" }}
        </span>
      </template>
    </Column>
    <Column field="description" header="Description"></Column>
    <Column field="" header="Actions">
      <template #body>
        <Button icon="pi pi-eye" class="p-button-rounded p-button-text text-blue-600 hover:bg-blue-300 hover:text-white" v-tooltip.bottom="'Show module'" />
        <Button icon="pi pi-pencil" class="p-button-rounded p-button-text text-orange-600 hover:bg-orange-300 hover:text-white" v-tooltip.bottom="'Edit module'" />
        <Button icon="pi pi-trash" class="p-button-rounded p-button-text text-red-600 hover:bg-red-300 hover:text-white" v-tooltip.bottom="'Delete module'" />
      </template>
    </Column>
  </DataTable>
  <PxPaginator :rows="paginator.limit" :total="totalModules" :paginator="paginator" :limit-paginate="modules.length" @show-paginate="showPaginate" />
</template>

<script setup lang="ts">
import { onMounted, computed, watch, reactive } from "vue"
import ModuleService from "@/services/modules/moduleServices"
import PxInputSearch from "@/components/PxInputSearch.vue"
import PxSearchStatus from "@/components/PxSearchStatus.vue"
import PxPaginator from "@/components/PxPaginator.vue"

import type { IPaginator } from "@/interfaces/paginate"
import type { IModuleSearch } from "@/views/Modules/interfaces/search.interface"

const modules = ModuleService.showModules()

const paginator = reactive<IPaginator>({
  pagination: true,
  limit: 10,
  offset: 1,
})

const search = reactive<IModuleSearch>({
  name: "",
  active: null,
})
const getModules = async (): Promise<void> => {
  const { pagination, limit, offset } = paginator
  const { name, active } = search
  await ModuleService.getModules({
    pagination,
    limit,
    offset,
    name,
    active,
  })
}
const filterStatus = async (status: { name?: string; value: boolean | null }) => {
  status ? (search.active = status.value) : (search.active = null)
  await getModules()
}

const totalModules = computed(() => {
  const { total } = ModuleService.getPagination().value
  return total
})

const showPaginate = async (value: { page: number; rows: number }): Promise<void> => {
  const { page, rows } = value
  paginator.limit = rows
  paginator.offset = page + 1
  await getModules()
}

watch(
  () => search.name,
  async (newValue) => {
    search.name = newValue
    await getModules()
  }
  // { deep: true } el nuevo valor y el antiguo serán el mismo
)

onMounted(async () => {
  await getModules()
})
</script>

<style scoped></style>
