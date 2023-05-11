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
  <Paginator :rows="paginator.limit" :total-records="total" @page="show($event)" :rows-per-page-options="itemsPerPage">
    <template #start="slotProps"> Showing {{ slotProps.state.first + 1 }} to {{ limitPaginate }} of {{ total }} </template>
  </Paginator>
</template>

<script setup lang="ts">
import { onMounted, computed, watch, reactive } from "vue"
import RolService from "@/services/rols/rolServices"
import PxInputSearch from "@/components/PxInputSearch.vue"
import PxSearchStatus from "@/components/PxSearchStatus.vue"
import type { IPaginator } from "@/interfaces/paginate"
import type { IRolsSearch } from "@/views/Rols/interfaces/search.interface"

const rols = RolService.showRols()
const itemsPerPage = reactive<number[]>([5, 10, 15, 25, 50, 100])
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

const total = computed(() => {
  const { total } = RolService.getPagination().value
  return total
})

const show = async (value: { page: number; rows: number }): Promise<void> => {
  const { page, rows } = value
  paginator.limit = rows
  paginator.offset = page + 1
  await getRols()
}

/** CALCULA LIMITE DE PAGINA ACTUAL */
const limitPaginate = computed(() => {
  return paginator.offset * paginator.limit < total.value ? paginator.offset * rols.value.length : total.value
})

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
