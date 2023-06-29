<template>
  <Paginator
    :rows="paginator.limit"
    :total-records="total"
    @page="$emit('showPaginate', $event)"
    :rows-per-page-options="itemsPerPage"
    :template="{
      '640px': 'PrevPageLink CurrentPageReport NextPageLink',
      '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
      '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
      default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
    }"
  >
    <template #start="slotProps"> Showing {{ slotProps.state.first + 1 }} to {{ rowsInPage }} of {{ total }} </template>
  </Paginator>
</template>

<script setup lang="ts">
import { reactive, toRefs, type PropType, computed } from "vue"

interface IPaginator {
  limit: number
  offset: number
}

const props = defineProps({
  paginator: {
    type: Object as PropType<IPaginator>,
    required: true,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: {},
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  limitPaginate: {
    type: Number,
    required: true,
    default: 0,
  },
})

const { total, paginator, limitPaginate } = toRefs(props)
const itemsPerPage = reactive<number[]>([5, 10, 15, 25, 50, 100])

/** CALCULA LIMITE DE PAGINA ACTUAL */
const rowsInPage = computed(() => {
  return paginator.value.offset * paginator.value.limit < total.value ? paginator.value.offset * limitPaginate.value : total.value
})
</script>

<style scoped></style>
