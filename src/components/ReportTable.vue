<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue'

type TableRecord = Record<string, unknown>

const props = withDefaults(
  defineProps<{
    rowKey?: string
    columns: TableColumnsType
    dataSource: TableRecord[]
    loading?: boolean
  }>(),
  {
    rowKey: 'id',
  },
)

const emit = defineEmits<{
  rowClick: [TableRecord]
}>()

const handleRowClick = (record: TableRecord) => {
  emit('rowClick', record)
}

const getRowHandlers = (record: TableRecord) => ({
  onClick: () => handleRowClick(record),
})
</script>

<template>
  <a-card>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :loading="loading"
      :row-key="rowKey"
      :pagination="{ pageSize: 6 }"
      :scroll="{ x: 'max-content' }"
      :custom-row="getRowHandlers"
    />
  </a-card>
</template>
