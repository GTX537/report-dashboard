<script setup lang="ts">
import { reactive } from 'vue'
import dayjs from 'dayjs'
import type { TableColumnsType } from 'ant-design-vue'
import {
  costcenterSummaryRows,
  costcenterDetailRows,
  costcenterPriceRows,
  type CostcenterSummaryRow,
  type CostcenterDetailRow,
  type CostcenterPriceRow,
} from '@/data/reportSamples'

const filters = reactive({
  finalDate: dayjs(),
  fromDate: dayjs().startOf('month'),
  resignDate: dayjs(),
  typeReport: 'Costcenter Allocate',
  plant: 'All',
  costCenter: 'All',
  status: 'Final',
  selectedFactories: ['DET01', 'DET02', 'DET05', 'DET07', 'DET09', 'CPTH1'],
})

const factoryOptions = ['DET01', 'DET02', 'DET03', 'DET05', 'DET08', 'DET09', 'CPTH1', 'DET06', 'DET07']
const plantOptions = ['All', 'DET01', 'DET06', 'EMS-01', 'AMBU', 'AMBU2']
const costCenterOptions = ['All', 'ACMC MFG', 'CP QA', 'CP Purchasing', 'EMI QA', 'DET OSH']

const summaryColumns: TableColumnsType<CostcenterSummaryRow> = [
  { title: 'Item', dataIndex: 'item', width: 160, fixed: 'left' },
  { title: 'Plant', dataIndex: 'plant', width: 120 },
  { title: 'Factory', dataIndex: 'factory', width: 120 },
  { title: 'Dept.', dataIndex: 'department', width: 120 },
  { title: 'Cost Code', dataIndex: 'costCode', width: 120 },
  { title: 'Cost Center', dataIndex: 'costCenter', width: 140 },
  { title: 'Requester', dataIndex: 'requester', width: 120 },
  { title: 'Uniform (Person)', dataIndex: 'uniformPerson', width: 140, align: 'center' },
  { title: 'Uniform Price (Baht)', dataIndex: 'uniformPrice', width: 160, align: 'right' },
  { title: 'Slipper (Person)', dataIndex: 'slipperPerson', width: 140, align: 'center' },
  { title: 'Slipper Price (Baht)', dataIndex: 'slipperPrice', width: 160, align: 'right' },
  { title: 'Shoe (Person)', dataIndex: 'shoePerson', width: 140, align: 'center' },
  { title: 'Shoe Price (Baht)', dataIndex: 'shoePrice', width: 160, align: 'right' },
  { title: 'Sum Price (Baht)', dataIndex: 'total', width: 160, align: 'right', fixed: 'right' },
]

const detailColumns: TableColumnsType<CostcenterDetailRow> = [
  { title: 'Category', dataIndex: 'category', width: 160 },
  { title: 'Amount (Baht)', dataIndex: 'amount', width: 140, align: 'right' },
  { title: 'Remark', dataIndex: 'remark' },
]

const priceColumns: TableColumnsType<CostcenterPriceRow> = [
  { title: 'Type', dataIndex: 'type', width: 120 },
  { title: 'Price', dataIndex: 'price', width: 120, align: 'right' },
  { title: 'Reason', dataIndex: 'reason' },
]

const handleSearch = () => {
  console.log('Costcenter search', JSON.stringify(filters))
}

const summaryRowClassName = (record: CostcenterSummaryRow) => {
  if (!record.item) {
    return ''
  }
  const label = record.item.toLowerCase()
  if (label.includes('total summary')) {
    return 'highlight-row summary-total-row'
  }
  if (label.includes('total')) {
    return 'highlight-row'
  }
  return ''
}
</script>

<template>
  <div class="report-page">
    <a-card title="Report Form – Costcenter Allocate" class="form-card report-card">
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

      <a-row :gutter="16">
        <a-col :xs="24" :md="12">
          <a-form-item label="Type Report">
            <a-select v-model:value="filters.typeReport" disabled class="full-width">
              <a-select-option value="Costcenter Allocate">Costcenter Allocate</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="12">
          <a-form-item label="Plant">
            <a-select v-model:value="filters.plant" class="full-width">
              <a-select-option v-for="item in plantOptions" :key="item" :value="item">
                {{ item }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :xs="24" :md="12">
          <a-form-item label="Cost Center">
            <a-select v-model:value="filters.costCenter" class="full-width">
              <a-select-option v-for="item in costCenterOptions" :key="item" :value="item">
                {{ item }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="12">
          <a-form-item label="Status">
            <a-select v-model:value="filters.status" class="full-width">
              <a-select-option value="Draft">Draft</a-select-option>
              <a-select-option value="Final">Final</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

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

    <a-card title="Allocation Summary" class="report-card">
      <a-table
        class="blue-table"
        :columns="summaryColumns"
        :data-source="costcenterSummaryRows"
        :pagination="false"
        :scroll="{ x: 1400 }"
        bordered
        row-key="key"
        :row-class-name="summaryRowClassName"
      />
    </a-card>

    <a-row :gutter="16">
      <a-col :xs="24" :md="12">
        <a-card title="Total Expense by Item" class="report-card">
          <a-table
            class="blue-table"
            :columns="detailColumns"
            :data-source="costcenterDetailRows"
            :pagination="false"
            size="small"
            bordered
            row-key="key"
          />
        </a-card>
      </a-col>
      <a-col :xs="24" :md="12">
        <a-card title="Start–End Date / Price Logic" class="report-card">
          <a-table
            class="blue-table"
            :columns="priceColumns"
            :data-source="costcenterPriceRows"
            :pagination="false"
            size="small"
            bordered
            row-key="key"
          />
          <a-typography-paragraph class="remark">
            价格来自制服/鞋/拖鞋的 Master Data，系统会依据查询周期选择对应单价并计算每种类别的总金额。
          </a-typography-paragraph>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.report-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.full-width {
  width: 100%;
}

.actions {
  text-align: right;
  margin-top: 16px;
}

.remark {
  margin-top: 12px;
  color: #666;
}
</style>
