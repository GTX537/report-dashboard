<script setup lang="ts">
import { reactive, ref } from 'vue'
import dayjs from 'dayjs'
import type { TableColumnsType } from 'ant-design-vue'
import { summaryReportRows, type SummaryReportRow } from '@/data/reportSamples'

const filters = reactive({
  finalDate: dayjs(),
  fromDate: dayjs().startOf('month'),
  resignDate: dayjs(),
  typeReport: 'Summary Report',
  type: 'Uniform',
})

const typeOptions = ['Uniform', 'White Shoes', 'Slipper Shoes']

const factoryGroups = {
  bangpoo: [
    'DET01',
    'DET15',
    'DET02',
    'DET03',
    'DET31',
    'DET05',
    'DET08',
    'DET09',
  ],
  wellgrow: ['CPTH1', 'DET02', 'DET05', 'DET06', 'DET07'],
}

const selectedFactories = reactive({
  bangpoo: [...factoryGroups.bangpoo],
  wellgrow: [...factoryGroups.wellgrow],
})

const summaryColumns: TableColumnsType<SummaryReportRow> = [
  {
    title: 'Size',
    dataIndex: 'size',
    fixed: 'left',
    width: 120,
  },
  {
    title: 'Uniform',
    children: [
      {
        title: 'Operator',
        children: ['D', 'N', 'S', 'N(P)', 'Total'].map((title, index) => ({
          title,
          dataIndex: ['operatorD', 'operatorN', 'operatorS', 'operatorNP', 'operatorTotal'][index],
          align: 'center',
 width: 80,
        })),
      },
      {
        title: 'Leader',
        children: ['D', 'N', 'S', 'N(P)', 'Total'].map((title, index) => ({
          title,
          dataIndex: ['leaderD', 'leaderN', 'leaderS', 'leaderNP', 'leaderTotal'][index],
          align: 'center',
 width: 80,
        })),
      },
      {
        title: 'QC',
        children: ['D', 'N', 'S', 'N(P)', 'Total'].map((title, index) => ({
          title,
          dataIndex: ['qcD', 'qcN', 'qcS', 'qcNP', 'qcTotal'][index],
          align: 'center',
 width: 80,
        })),
      },
      {
        title: 'Warehouse',
        children: ['D', 'N', 'S', 'N(P)', 'Total'].map((title, index) => ({
          title,
          dataIndex: ['warehouseD', 'warehouseN', 'warehouseS', 'warehouseNP', 'warehouseTotal'][index],
          align: 'center',
 width: 80,
        })),
      },
      {
        title: 'Staff',
        children: ['D', 'N', 'S', 'N(P)', 'Total'].map((title, index) => ({
          title,
          dataIndex: ['staffD', 'staffN', 'staffS', 'staffNP', 'staffTotal'][index],
          align: 'center',
 width: 80,
        })),
      },
    ],
  },
  {
    title: 'Sum Of Total*',
    dataIndex: 'sumTotal',
    width: 120,
    fixed: 'right',
    align: 'center',
  },
]

const dataSource = ref(summaryReportRows)

const handleSearch = () => {
  console.log('search with filters', JSON.stringify(filters), JSON.stringify(selectedFactories))
}
</script>

<template>
  <div class="report-page">
    <a-card title="Report Form – Summary Report" class="form-card report-card">
      <a-row :gutter="16">
        <a-col :xs="24" :md="12" :lg="8">
          <a-form-item label="Final Date">
            <a-date-picker v-model:value="filters.finalDate" format="DD/MM/YYYY" class="full-width" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="12" :lg="8">
          <a-form-item label="Content Date">
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
              <a-select-option value="Summary Report">Summary Report</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="12">
          <a-form-item label="Type">
            <a-select v-model:value="filters.type" class="full-width">
              <a-select-option v-for="option in typeOptions" :key="option" :value="option">
                {{ option }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="[16, 16]">
        <a-col :xs="24" :md="12">
          <div class="group-label">Factory Bangpoo</div>
          <a-checkbox-group v-model:value="selectedFactories.bangpoo">
            <a-row>
              <a-col v-for="factory in factoryGroups.bangpoo" :key="factory" :span="12">
                <a-checkbox :value="factory">{{ factory }}</a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-col>
        <a-col :xs="24" :md="12">
          <div class="group-label">Factory Wellgrow</div>
          <a-checkbox-group v-model:value="selectedFactories.wellgrow">
            <a-row>
              <a-col v-for="factory in factoryGroups.wellgrow" :key="factory" :span="12">
                <a-checkbox :value="factory">{{ factory }}</a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-col>
      </a-row>
      <div class="actions">
        <a-button type="primary" @click="handleSearch">Search</a-button>
      </div>
    </a-card>

    <a-card title="Summary Result" class="table-card report-card">
      <a-table
        class="blue-table"
        :columns="summaryColumns"
        :data-source="dataSource"
        :pagination="false"
        :scroll="{ x: 1400 }"
        bordered
      />
      <a-typography-paragraph class="remark">
        * Sum of total 行用于汇总每个尺码的申请套数，仅展示示例数据，可根据 Master Data 结果替换。
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

.form-card :deep(.ant-form-item) {
  margin-bottom: 8px;
}

.group-label {
  font-weight: 600;
  margin-bottom: 8px;
}

.full-width {
  width: 100%;
}

.actions {
  margin-top: 16px;
  text-align: right;
}

.remark {
  margin-top: 16px;
  color: #666;
}
</style>
