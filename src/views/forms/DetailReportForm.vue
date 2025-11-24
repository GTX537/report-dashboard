<script setup lang="ts">
import { reactive, ref } from 'vue'
import dayjs from 'dayjs'
import type { TableColumnsType } from 'ant-design-vue'
import { detailReportRows, type DetailReportRow } from '@/data/reportSamples'

const filters = reactive({
  finalDate: dayjs(),
  fromDate: dayjs().startOf('month'),
  resignDate: dayjs(),
  typeReport: 'Detail Report',
  plant: 'All',
  costCenter: 'All',
  factorySelection: ['DET01', 'DET02', 'DET05', 'DET07', 'DET09'],
  formSize: 'All',
  status: 'Final',
})

const plantOptions = ['All', 'AMBU', 'AMBU2', 'APABU-D2', 'DET01', 'DET06', 'DET07']
const costCenterOptions = ['All', 'ACMC MFG', 'ACMC PE', 'Big Choke QA', 'CHP MFG', 'CPBG Central Purchasing']
const factoryOptions = ['DET01', 'DET15', 'DET02', 'DET03', 'DET31', 'DET05', 'DET08', 'DET09', 'CPTH1', 'DET06', 'DET07']
const sizeOptions = ['All', 'S', 'M', 'L', 'XL', 'XXL', 'EXTRA 36', 'EXTRA 40']

const columns: TableColumnsType<DetailReportRow> = [
  { title: 'No.', dataIndex: 'key', width: 60, fixed: 'left' },
  { title: 'Document', dataIndex: 'document', width: 140 },
  { title: 'HR Date', dataIndex: 'hrDate', width: 120 },
  { title: 'Emp ID', dataIndex: 'empId', width: 120 },
  { title: 'Emp Type', dataIndex: 'empType', width: 100 },
  { title: 'Factory', dataIndex: 'factory', width: 180 },
  { title: 'Plant', dataIndex: 'plant', width: 120 },
  { title: 'Cost Code', dataIndex: 'costCode', width: 140 },
  { title: 'Cost Center', dataIndex: 'costCenter', width: 160 },
  { title: 'Department', dataIndex: 'department', width: 160 },
  { title: 'Location', dataIndex: 'location', width: 120 },
  { title: 'Name', dataIndex: 'name', width: 200 },
  { title: 'Requester', dataIndex: 'requester', width: 140 },
  { title: 'Req. Ext.', dataIndex: 'reqExt', width: 120 },
  { title: 'Request Date', dataIndex: 'requestDate', width: 180 },
  { title: 'Status', dataIndex: 'status', width: 100 },
  { title: 'Last Update', dataIndex: 'lastUpdate', width: 180 },
  { title: 'Uniform Type', dataIndex: 'uniformType', width: 120 },
  { title: 'Uniform Size', dataIndex: 'uniformSize', width: 120 },
  { title: 'Shoe', dataIndex: 'shoe', width: 80 },
  { title: 'Slipper', dataIndex: 'slipper', width: 100 },
  { title: 'Qty', dataIndex: 'qty', width: 80 },
]

const dataSource = ref(detailReportRows)

const handleSearch = () => {
  console.log('Detail search', JSON.stringify(filters))
}
</script>

<template>
  <div class="report-page">
    <a-card title="Report Form – Detail Report" class="form-card report-card">
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
        <a-col :xs="24" :md="12" :lg="8">
          <a-form-item label="Type Report">
            <a-select v-model:value="filters.typeReport" disabled class="full-width">
              <a-select-option value="Detail Report">Detail Report</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="12" :lg="8">
          <a-form-item label="Plant">
            <a-select v-model:value="filters.plant" class="full-width">
              <a-select-option v-for="item in plantOptions" :key="item" :value="item">
                {{ item }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="12" :lg="8">
          <a-form-item label="Cost Center">
            <a-select v-model:value="filters.costCenter" class="full-width">
              <a-select-option v-for="item in costCenterOptions" :key="item" :value="item">
                {{ item }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :xs="24">
          <a-form-item label="Factory">
            <a-select
              v-model:value="filters.factorySelection"
              mode="multiple"
              class="full-width"
              placeholder="Select factories"
            >
              <a-select-option v-for="factory in factoryOptions" :key="factory" :value="factory">
                {{ factory }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :xs="24" :md="12">
          <a-form-item label="Form Size">
            <a-select v-model:value="filters.formSize" class="full-width">
              <a-select-option v-for="size in sizeOptions" :key="size" :value="size">
                {{ size }}
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
      <div class="actions">
        <a-button type="primary" @click="handleSearch">Search</a-button>
      </div>
    </a-card>

    <a-card title="Detail Result" class="report-card">
      <a-table
        class="blue-table"
        :columns="columns"
        :data-source="dataSource"
        :pagination="{ pageSize: 5 }"
        :scroll="{ x: 2200 }"
        bordered
      />
      <a-typography-paragraph class="remark">
        表头字段覆盖 Master Data HR 与交易数据（Document、HR Date、Plant、Cost Center、Uniform Type 等），点击搜索后即可根据条件调阅。
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

.full-width {
  width: 100%;
}

.actions {
  text-align: right;
  margin-top: 16px;
}

.remark {
  margin-top: 16px;
  color: #666;
}
</style>
