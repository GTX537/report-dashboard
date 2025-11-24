<script setup lang="ts">
import { reactive } from 'vue'
import dayjs from 'dayjs'
import type { TableColumnsType } from 'ant-design-vue'
import { factorySummaryRows, type FactorySummaryRow } from '@/data/reportSamples'

const filters = reactive({
  finalDate: dayjs(),
  fromDate: dayjs().startOf('month'),
  resignDate: dayjs(),
  typeReport: 'Summary Report Factory',
  selectedFactories: ['DET01', 'DET02', 'DET05', 'DET07', 'DET09', 'CPTH1'],
})

const factoryOptions = ['DET01', 'DET15', 'DET02', 'DET03', 'DET31', 'DET05', 'DET08', 'DET09', 'CPTH1', 'DET06', 'DET07']

const columns: TableColumnsType<FactorySummaryRow> = [
  { title: 'Factory', dataIndex: 'factory', width: 140, fixed: 'left' },
  {
    title: 'Requested (Persons)',
    children: [
      { title: 'Slipper', dataIndex: 'slipperRequest', width: 100, align: 'center' },
      { title: 'Shoes', dataIndex: 'shoeRequest', width: 100, align: 'center' },
      { title: 'Uniform', dataIndex: 'uniformRequest', width: 100, align: 'center' },
      { title: 'Total', dataIndex: 'totalRequest', width: 100, align: 'center' },
    ],
  },
  {
    title: 'Expense (Baht)',
    children: [
      { title: 'Slipper', dataIndex: 'slipperExpense', width: 120, align: 'right' },
      { title: 'Shoes', dataIndex: 'shoeExpense', width: 120, align: 'right' },
      { title: 'Uniform', dataIndex: 'uniformExpense', width: 140, align: 'right' },
      { title: 'Total', dataIndex: 'totalExpense', width: 140, align: 'right' },
    ],
  },
]

const handleSearch = () => {
  console.log('Summary factory search', JSON.stringify(filters))
}
</script>

<template>
  <div class="report-page">
    <a-card title="Report Form – Summary Report Factory" class="form-card report-card">
      <a-row :gutter="16">
        <a-col :xs="24" :md="12" :lg="8">
          <a-form-item label="Final Date">
            <a-date-picker v-model:value="filters.finalDate" format="DD/MM/YYYY" class="full-width" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="12" :lg="8">
          <a-form-item label="Date From">
            <a-date-picker v-model:value="filters.fromDate" format="DD/MM/YYYY" class="full-width" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="12" :lg="8">
          <a-form-item label="Resign Date >">
            <a-date-picker v-model:value="filters.resignDate" format="DD/MM/YYYY" class="full-width" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="Type Report">
        <a-select v-model:value="filters.typeReport" disabled class="full-width">
          <a-select-option value="Summary Report Factory">Summary Report Factory</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Factory">
        <a-select
          v-model:value="filters.selectedFactories"
          mode="multiple"
          class="full-width"
          placeholder="Select factories"
        >
          <a-select-option v-for="factory in factoryOptions" :key="factory" :value="factory">
            {{ factory }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <div class="actions">
        <a-button type="primary" @click="handleSearch">Search</a-button>
      </div>
    </a-card>

    <a-card title="Factory Summary" class="report-card">
      <a-table
        class="blue-table"
        :columns="columns"
        :data-source="factorySummaryRows"
        :pagination="false"
        :scroll="{ x: 900 }"
        bordered
        row-key="key"
      />
      <a-typography-paragraph class="remark">
        Requested 区域展示每个工厂提交的拖鞋/鞋/制服申请人数，Expense 区域基于 Costcenter Allocate 的单价计算费用，可在后台接入主数据后替换示例。
      </a-typography-paragraph>
    </a-card>
  </div>
</template>

<style scoped>
.report-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.full-width { width: 100%; }
.actions { text-align: right; margin-top: 16px; }
.remark { margin-top: 16px; color: #666; }

/* ============ 重点：蓝色表格样式 ============ */
.blue-table :deep(th) {
  background-color: #1890ff !important;   /* AntD 标准蓝 */
  color: white !important;
  font-weight: 600 !important;
  text-align: center !important;
}

.blue-table :deep(.ant-table-thead > tr > th) {
  background-color: #1890ff !important;
  color: white !important;
  border-color: #40a9ff !important;
}

/* 可选：表头子列也保持一致 */
.blue-table :deep(.ant-table-thead > tr.ant-table-row-level-0 > th) {
  background-color: #40a9ff !important;
}

/* 边框也变成蓝色 */
.blue-table :deep(.ant-table),
.blue-table :deep(.ant-table table),
.blue-table :deep(.ant-table-thead > tr > th),
.blue-table :deep(.ant-table-tbody > tr > td) {
  border-color: #fbfbfc !important;
}

/* 表格外边框加粗蓝色 */
.blue-table :deep(.ant-table-container) {
  border: 2px solid #f5f5f5 !important;
  border-radius: 6px;
}

/* 可选：鼠标悬停行高亮（浅蓝） */
.blue-table :deep(.ant-table-tbody > tr:hover > td) {
  background-color: rgba(24, 144, 255, 0.1) !important;
}
</style>
