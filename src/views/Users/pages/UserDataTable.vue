<template>
  <div class="md:flex justify-content-between">
    <div class="">
      <px-input-search v-model="search.email" :place-holder="'Email'" class="mb-4" />
    </div>
    <div>
      <px-search-status @changeStatus="filterStatus($event)" />
    </div>
  </div>
  <DataTable :value="users" selection-mode="single" data-key="id" :meta-key-selection="false" responsive-layout="scroll" @rowSelect="showUser">
    <template #header>
      <div style="text-align: right">
        <Button class="p-button p-button-success font-bold pb-2" @click="dialog = !dialog">
          <span class="pl-2">ADD USER</span>
          <i class="pi pi-plus pl-2" style="font-size: 1.2rem"></i>
        </Button>
      </div>
    </template>
    <Column field="email">
      <template #header>
        <span class="text-center">Email</span>
      </template>
    </Column>
    <Column field="isActive" header="Status">
      <template #body="slotProps">
        <span :class="'users-badge status-' + slotProps.data.isActive">
          {{ slotProps.data.isActive ? "Active" : "Inactive" }}
        </span>
      </template>
    </Column>
    <Column field="isVerified" header="Verified">
      <template #body="slotProps">
        <span :class="'users-badge verified-' + slotProps.data.isVerified">
          {{ slotProps.data.isVerified ? "Yes" : "No" }}
        </span>
      </template>
    </Column>
    <Column field="profile.name" header="Profile"></Column>
    <Column field="" header="Actions">
      <template #body="slotProps">
        <!-- <Button @click="showUser(slotProps.data.id)" icon="pi pi-eye" class="p-button-rounded p-button-text text-blue-600 hover:bg-blue-300 hover:text-white" v-tooltip.bottom="'Show user'" /> -->
        <Button icon="pi pi-pencil" class="p-button-rounded p-button-text text-blue-600 hover:bg-blue-300 hover:text-white" v-tooltip.bottom="'Edit user'" />
        <px-delete :tooltip="'Delete User'" :id="slotProps.data.id" :name="slotProps.data.email" @delete="deleteUser" />
      </template>
    </Column>
  </DataTable>
  <Paginator
    :rows="paginator.limit"
    :total-records="totalUsers"
    @page="showPaginate($event)"
    :rows-per-page-options="itemsPerPage"
    :template="{
      '640px': 'PrevPageLink CurrentPageReport NextPageLink',
      '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
      '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
      default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
    }"
  >
    <template #start="slotProps"> Showing {{ slotProps.state.first + 1 }} to {{ limitPaginate }} of {{ totalUsers }} </template>
  </Paginator>
  <user-create v-model="dialog" @close="closeModal" />
  <user-detail v-model="showDetail" :user="idUser" @close="showDetail = !showDetail" />"
</template>

<script setup lang="ts">
import { onMounted, computed, watch, reactive, ref } from "vue"
import UserService from "@/services/users/users"
import UserCreate from "@/views/Users/pages/UserCreate.vue"
import UserDetail from "./UserDetail.vue"
import PxInputSearch from "@/components/PxInputSearch.vue"
import PxSearchStatus from "@/components/PxSearchStatus.vue"
import PxDelete from "@/components/CRUD/PxDelete.vue"
import type { IPaginator } from "@/interfaces/paginate"
import type { IUserSearch } from "@/views/Users/interfaces/userSeach"

const users = UserService.showUsers()
const dialog = ref<boolean>(false)
const showDetail = ref<boolean>(false)
const idUser = ref<number>(0)

const itemsPerPage = reactive<number[]>([5, 10, 15, 25, 50, 100])
const paginator = reactive<IPaginator>({
  pagination: true,
  limit: 10,
  offset: 1,
})

const search = reactive<IUserSearch>({
  email: "",
  active: null,
})

const showUser = async (event: { data: { id: number } }) => {
  idUser.value = event.data.id
  showDetail.value = !showDetail.value
}

const deleteUser = async (id: number): Promise<void> => {
  await UserService.deleteUser(id)
  await getUsers()
}

const filterStatus = async (status: { name?: string; value: boolean | null }) => {
  status ? (search.active = status.value) : (search.active = null)
  await getUsers()
}

const getUsers = async (): Promise<void> => {
  const { pagination, limit, offset } = paginator
  const { email, active } = search
  await UserService.getUsers({
    pagination,
    limit,
    offset,
    email,
    active,
  })
}

const closeModal = async (): Promise<void> => {
  dialog.value = !dialog.value
  await getUsers()
}

// const showUser = (id: number): void => {
//   idUser.value = id
//   showDetail.value = !showDetail.value
// }

const showPaginate = async (value: { page: number; rows: number }): Promise<void> => {
  const { page, rows } = value
  paginator.limit = rows
  paginator.offset = page + 1
  await getUsers()
}

const totalUsers = computed(() => {
  const { total } = UserService.getPagination().value
  return total
})

/** CALCULA LIMITE DE PAGINA ACTUAL */
const limitPaginate = computed(() => {
  return paginator.offset * paginator.limit < totalUsers.value ? paginator.offset * users.value.length : totalUsers.value
})

watch(
  () => search.email,
  async (newValue) => {
    search.email = newValue
    await getUsers()
  }
  // { deep: true } el nuevo valor y el antiguo serán el mismo
)

onMounted(async () => {
  await getUsers()
})
</script>

<style scoped></style>
