<template>
  <div class="md:flex justify-content-between">
    <div class="">
      <px-input-search v-model="search.name" :place-holder="'Name'" class="mb-4" />
    </div>
    <div>
      <px-search-status @changeStatus="filterStatus($event)" />
    </div>
  </div>
  <DataTable :value="rols" responsive-layout="scroll">
    <Column field="name" header="name"></Column>
    <Column field="isActive" header="Status">
      <template #body="slotProps">
        <span :class="'rols-badge status-' + slotProps.data.isActive">
          {{ slotProps.data.isActive ? "Active" : "Inactive" }}
        </span>
      </template>
    </Column>
    <Column field="description" header="Description"></Column>
    <Column field="" header="Actions">
      <template #body>
        <Button icon="pi pi-eye" class="p-button-rounded p-button-text text-blue-600 hover:bg-blue-300 hover:text-white" v-tooltip.bottom="'Show Rol'" />
        <Button icon="pi pi-pencil" class="p-button-rounded p-button-text text-orange-600 hover:bg-orange-300 hover:text-white" v-tooltip.bottom="'Edit Rol'" />
        <Button icon="pi pi-trash" class="p-button-rounded p-button-text text-red-600 hover:bg-red-300 hover:text-white" v-tooltip.bottom="'Delete Rol'" />
      </template>
    </Column>
  </DataTable>
  <PxPaginator :rows="paginator.limit" :total="totalRols" :paginator="paginator" :limit-paginate="rols.length" @show-paginate="showPaginate" />
</template>

<script setup lang="ts">
import { onMounted, computed, watch, reactive } from "vue"
import RolService from "@/services/rols/rolServices"
import PxInputSearch from "@/components/PxInputSearch.vue"
import PxSearchStatus from "@/components/PxSearchStatus.vue"
import PxPaginator from "@/components/PxPaginator.vue"
import type { IPaginator } from "@/interfaces/paginate"
import type { IRolsSearch } from "@/views/Rols/interfaces/search.interface"

const rols = RolService.showRols()
const paginator = reactive<IPaginator>({
  pagination: true,
  limit: 10,
  offset: 1,
})

const search = reactive<IRolsSearch>({
  name: "",
  active: null,
})

const getRols = async (): Promise<void> => {
  const { pagination, limit, offset } = paginator
  const { name, active } = search
  await RolService.getRols({
    pagination,
    limit,
    offset,
    name,
    active,
  })
}

const filterStatus = async (status: { name?: string; value: boolean | null }) => {
  status ? (search.active = status.value) : (search.active = null)
  await getRols()
}

const totalRols = computed(() => {
  const { total } = RolService.getPagination().value
  return total
})

const showPaginate = async (value: { page: number; rows: number }): Promise<void> => {
  const { page, rows } = value
  paginator.limit = rows
  paginator.offset = page + 1
  await getRols()
}

watch(
  () => search.name,
  async (newValue) => {
    search.name = newValue
    await getRols()
  }
  // { deep: true } el nuevo valor y el antiguo serán el mismo
)

onMounted(async () => {
  await getRols()
})
</script>

<style scoped></style>
