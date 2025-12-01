<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import dayjs from 'dayjs'
import type { TableColumnCtx } from 'element-plus'

// --- 1. 数据接口定义 ---
interface SummaryReportRow {
  key: string
  size: string
  operatorD: number
  operatorN: number
  operatorS: number
  operatorNP: number
  operatorTotal: number
  leaderD: number
  leaderN: number
  leaderS: number
  leaderNP: number
  leaderTotal: number
  qcD: number
  qcN: number
  qcS: number
  qcNP: number
  qcTotal: number
  warehouseD: number
  warehouseN: number
  warehouseS: number
  warehouseNP: number
  warehouseTotal: number
  staffD: number
  staffN: number
  staffS: number
  staffNP: number
  staffTotal: number
  sumTotal: number
}

// --- 2. 模拟数据 ---
const dataSource = ref<SummaryReportRow[]>([
  {
    key: '1', size: 'Small',
    operatorD: 3, operatorN: 15, operatorS: 0, operatorNP: 18, operatorTotal: 36,
    leaderD: 0, leaderN: 0, leaderS: 0, leaderNP: 0, leaderTotal: 0,
    qcD: 0, qcN: 0, qcS: 0, qcNP: 0, qcTotal: 0,
    warehouseD: 1, warehouseN: 1, warehouseS: 2, warehouseNP: 0, warehouseTotal: 4,
    staffD: 2, staffN: 1, staffS: 0, staffNP: 0, staffTotal: 3,
    sumTotal: 43
  },
  {
    key: '2', size: 'Medium',
    operatorD: 6, operatorN: 17, operatorS: 0, operatorNP: 23, operatorTotal: 46,
    leaderD: 1, leaderN: 0, leaderS: 1, leaderNP: 2, leaderTotal: 4,
    qcD: 1, qcN: 2, qcS: 0, qcNP: 0, qcTotal: 3,
    warehouseD: 0, warehouseN: 0, warehouseS: 0, warehouseNP: 0, warehouseTotal: 0,
    staffD: 5, staffN: 0, staffS: 0, staffNP: 0, staffTotal: 5,
    sumTotal: 58
  },
  {
    key: '3', size: 'Large',
    operatorD: 5, operatorN: 10, operatorS: 0, operatorNP: 15, operatorTotal: 30,
    leaderD: 1, leaderN: 0, leaderS: 1, leaderNP: 2, leaderTotal: 4,
    qcD: 1, qcN: 2, qcS: 0, qcNP: 2, qcTotal: 5,
    warehouseD: 2, warehouseN: 4, warehouseS: 0, warehouseNP: 0, warehouseTotal: 6,
    staffD: 3, staffN: 1, staffS: 0, staffNP: 0, staffTotal: 4,
    sumTotal: 49
  },
  {
    key: '4', size: 'XL',
    operatorD: 9, operatorN: 20, operatorS: 0, operatorNP: 29, operatorTotal: 58,
    leaderD: 0, leaderN: 0, leaderS: 0, leaderNP: 0, leaderTotal: 0,
    qcD: 0, qcN: 0, qcS: 4, qcNP: 0, qcTotal: 4,
    warehouseD: 4, warehouseN: 8, warehouseS: 6, warehouseNP: 1, warehouseTotal: 19,
    staffD: 6, staffN: 1, staffS: 0, staffNP: 0, staffTotal: 7,
    sumTotal: 88
  },
  {
    key: '5', size: 'XXL',
    operatorD: 3, operatorN: 7, operatorS: 0, operatorNP: 10, operatorTotal: 20,
    leaderD: 1, leaderN: 0, leaderS: 1, leaderNP: 2, leaderTotal: 4,
    qcD: 2, qcN: 4, qcS: 0, qcNP: 0, qcTotal: 6,
    warehouseD: 1, warehouseN: 2, warehouseS: 4, warehouseNP: 0, warehouseTotal: 7,
    staffD: 4, staffN: 0, staffS: 0, staffNP: 0, staffTotal: 4,
    sumTotal: 41
  },
  { key: '6', size: 'EXTRA', operatorD: 0, operatorN: 0, operatorS: 0, operatorNP: 0, operatorTotal: 0, leaderD: 0, leaderN: 0, leaderS: 0, leaderNP: 0, leaderTotal: 0, qcD: 0, qcN: 0, qcS: 0, qcNP: 0, qcTotal: 0, warehouseD: 0, warehouseN: 0, warehouseS: 0, warehouseNP: 0, warehouseTotal: 0, staffD: 0, staffN: 0, staffS: 0, staffNP: 0, staffTotal: 0, sumTotal: 0 },
  { key: '7', size: 'EXTRA 36', operatorD: 1, operatorN: 3, operatorS: 0, operatorNP: 4, operatorTotal: 8, leaderD: 1, leaderN: 0, leaderS: 1, leaderNP: 2, leaderTotal: 4, qcD: 0, qcN: 0, qcS: 0, qcNP: 0, qcTotal: 0, warehouseD: 0, warehouseN: 0, warehouseS: 0, warehouseNP: 0, warehouseTotal: 0, staffD: 0, staffN: 0, staffS: 0, staffNP: 0, staffTotal: 0, sumTotal: 12 },
  { key: '8', size: 'EXTRA 38', operatorD: 2, operatorN: 2, operatorS: 0, operatorNP: 4, operatorTotal: 8, leaderD: 0, leaderN: 0, leaderS: 0, leaderNP: 0, leaderTotal: 0, qcD: 0, qcN: 0, qcS: 0, qcNP: 0, qcTotal: 0, warehouseD: 0, warehouseN: 0, warehouseS: 0, warehouseNP: 0, warehouseTotal: 0, staffD: 1, staffN: 2, staffS: 0, staffNP: 0, staffTotal: 3, sumTotal: 11 },
  { key: '9', size: 'EXTRA 40', operatorD: 0, operatorN: 4, operatorS: 0, operatorNP: 4, operatorTotal: 8, leaderD: 0, leaderN: 0, leaderS: 0, leaderNP: 0, leaderTotal: 0, qcD: 0, qcN: 0, qcS: 0, qcNP: 0, qcTotal: 0, warehouseD: 0, warehouseN: 0, warehouseS: 0, warehouseNP: 0, warehouseTotal: 0, staffD: 0, staffN: 1, staffS: 0, staffNP: 0, staffTotal: 1, sumTotal: 9 },
  { key: '10', size: 'EXTRA 42', operatorD: 0, operatorN: 1, operatorS: 1, operatorNP: 2, operatorTotal: 4, leaderD: 0, leaderN: 0, leaderS: 0, leaderNP: 0, leaderTotal: 0, qcD: 0, qcN: 0, qcS: 0, qcNP: 0, qcTotal: 0, warehouseD: 0, warehouseN: 0, warehouseS: 0, warehouseNP: 0, warehouseTotal: 0, staffD: 1, staffN: 0, staffS: 0, staffNP: 0, staffTotal: 1, sumTotal: 5 },
  { key: '11', size: 'EXTRA 44', operatorD: 0, operatorN: 0, operatorS: 0, operatorNP: 0, operatorTotal: 0, leaderD: 0, leaderN: 0, leaderS: 0, leaderNP: 0, leaderTotal: 0, qcD: 0, qcN: 0, qcS: 0, qcNP: 0, qcTotal: 0, warehouseD: 0, warehouseN: 0, warehouseS: 1, warehouseNP: 0, warehouseTotal: 1, staffD: 1, staffN: 0, staffS: 0, staffNP: 0, staffTotal: 1, sumTotal: 2 },
  { key: '12', size: 'EXTRA Special', operatorD: 0, operatorN: 0, operatorS: 0, operatorNP: 0, operatorTotal: 0, leaderD: 0, leaderN: 0, leaderS: 0, leaderNP: 0, leaderTotal: 0, qcD: 1, qcN: 2, qcS: 0, qcNP: 0, qcTotal: 3, warehouseD: 0, warehouseN: 0, warehouseS: 0, warehouseNP: 0, warehouseTotal: 0, staffD: 3, staffN: 6, staffS: 0, staffNP: 0, staffTotal: 9, sumTotal: 12 },
  { key: '13', size: 'Refund', operatorD: 0, operatorN: 0, operatorS: 0, operatorNP: 0, operatorTotal: 0, leaderD: 0, leaderN: 0, leaderS: 0, leaderNP: 0, leaderTotal: 0, qcD: 0, qcN: 0, qcS: 0, qcNP: 0, qcTotal: 0, warehouseD: 0, warehouseN: 0, warehouseS: 0, warehouseNP: 0, warehouseTotal: 0, staffD: 0, staffN: 0, staffS: 0, staffNP: 0, staffTotal: 0, sumTotal: 0 }
])

// --- 3. 筛选条件 ---
const filters = reactive({
  finalDate: dayjs().toDate(),
  fromDate: dayjs().startOf('month').toDate(),
  resignDate: dayjs().toDate(),
  typeReport: 'Summary Report',
  type: 'Uniform',
})

const typeOptions = ['Uniform', 'White Shoes', 'Slipper Shoes']

const factoryGroups = {
  bangpoo: ['DET01', 'DET15', 'DET02', 'DET03', 'DET31', 'DET05', 'DET08', 'DET09'],
  wellgrow: ['CPTH1', 'DET02', 'DET05', 'DET06', 'DET07'],
}

const selectedFactories = reactive({
  bangpoo: [...factoryGroups.bangpoo],
  wellgrow: [...factoryGroups.wellgrow],
})

// --- 4. 表格配置 ---
const departments = [
  { label: 'Operator', propPrefix: 'operator' },
  { label: 'Leader', propPrefix: 'leader' },
  { label: 'QC', propPrefix: 'qc' },
  { label: 'Warehouse', propPrefix: 'warehouse' },
  { label: 'Staff', propPrefix: 'staff' },
]

const subColumns = [
  { label: 'D', suffix: 'D', width: 50 },
  { label: 'N', suffix: 'N', width: 50 },
  { label: 'S', suffix: 'S', width: 50 },
  { label: 'N(P)', suffix: 'NP', width: 60 },
  { label: 'Total*', suffix: 'Total', width: 60, isTotal: true },
]

// --- 5. 合计行逻辑 ---
const getSummaries = (param: { columns: TableColumnCtx<SummaryReportRow>[]; data: SummaryReportRow[] }) => {
  const { columns, data } = param
  const sums: string[] = []

  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = 'Sum Request'
      return
    }
    const prop = column.property
    if (!prop) {
      sums[index] = ''
      return
    }
    const values = data.map((item) => Number(item[prop as keyof SummaryReportRow]))
    if (!values.every((value) => Number.isNaN(value))) {
      const total = values.reduce((prev, curr) => (!Number.isNaN(Number(curr)) ? prev + Number(curr) : prev), 0)
      sums[index] = total.toString()
    } else {
      sums[index] = ''
    }
  })
  return sums
}

const grandTotal = computed(() => {
  return dataSource.value.reduce((sum, item) => sum + (item.sumTotal || 0), 0)
})

const handleSearch = () => {
  console.log('Search triggered', filters)
}
</script>

<template>
  <div class="report-page">
    <el-card class="form-card" shadow="never">
      <template #header>
        <span class="card-title">Report Form – Summary Report</span>
      </template>
      
      <el-form :model="filters" label-width="100px" size="default">
        <el-row :gutter="20">
          <el-col :xs="24" :md="12" :lg="8">
            <el-form-item label="Final Date">
              <el-date-picker v-model="filters.finalDate" type="date" format="YYYY-MM-DD" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="8">
            <el-form-item label="Content Date">
              <el-date-picker v-model="filters.fromDate" type="date" format="YYYY-MM-DD" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="8">
            <el-form-item label="Resign Date >">
              <el-date-picker v-model="filters.resignDate" type="date" format="YYYY-MM-DD" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Type Report">
              <el-input v-model="filters.typeReport" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Type">
              <el-select v-model="filters.type" style="width: 100%">
                <el-option v-for="op in typeOptions" :key="op" :label="op" :value="op" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <div class="group-label">Factory Bangpoo</div>
            <el-checkbox-group v-model="selectedFactories.bangpoo">
              <el-checkbox v-for="f in factoryGroups.bangpoo" :key="f" :label="f" :value="f" />
            </el-checkbox-group>
          </el-col>
          <el-col :span="12">
            <div class="group-label">Factory Wellgrow</div>
            <el-checkbox-group v-model="selectedFactories.wellgrow">
              <el-checkbox v-for="f in factoryGroups.wellgrow" :key="f" :label="f" :value="f" />
            </el-checkbox-group>
          </el-col>
        </el-row>

        <div class="actions">
          <el-button type="primary" @click="handleSearch">Search</el-button>
        </div>
      </el-form>
    </el-card>

    <el-card class="table-card" shadow="never">
      <template #header>
        <span class="table-title">Summary Result</span>
      </template>

      <el-table
  :data="dataSource"
  border
  style="width: 100%"
  max-height="600"
  show-summary
  :summary-method="getSummaries"
  class="custom-blue-table"
  size="small"
>
  <el-table-column prop="size" label="Size" fixed="left" width="100" align="center" />

  <el-table-column label="Uniform" align="center">
    <el-table-column 
      v-for="dept in departments" 
      :key="dept.label" 
      :label="dept.label" 
      align="center"
    >
      <el-table-column
        v-for="col in subColumns"
        :key="col.label"
        :prop="`${dept.propPrefix}${col.suffix}`"
        :label="col.label"
        :min-width="col.width"
        align="center"
        :class-name="col.isTotal ? 'col-highlight' : ''"
      />
    </el-table-column>
  </el-table-column>

  <el-table-column 
    prop="sumTotal" 
    label="Sum Of Total*" 
    fixed="right" 
    width="120" 
    align="center"
    class-name="col-highlight-total"
  />
</el-table>

      <div class="footer-section">
        <div class="result-box">
           <span>Sum Of Result: <strong>{{ grandTotal }}</strong></span>
        </div>
        <div class="remark-box">
          <p class="remark-text">* Remark: D=Day, N=Night, S=Sub Contract, N(P)=Probation...</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.report-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #f5f7fa;
  padding: 16px;
}

.card-title, .table-title {
  font-weight: 700;
  font-size: 18px;
  color: #4472C4;
}

.group-label {
  font-weight: bold;
  margin-bottom: 8px;
  color: #606266;
}

.actions {
  text-align: right;
  margin-top: 16px;
}

.footer-section {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-box {
  display: inline-block;
  background-color: #FFFF00;
  border: 1px solid #ccc;
  padding: 4px 12px;
  font-weight: bold;
  color: #333;
  width: fit-content;
}

.remark-text {
  font-size: 12px;
  color: #f56c6c;
  margin: 0;
}

/* === Element Plus 表格定制 === */

/* 表头蓝色 */
:deep(.custom-blue-table thead th.el-table__cell) {
  background-color: #3880f4 !important;
  color: white !important;
  font-weight: 600;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

:deep(.custom-blue-table .el-table__header .cell) {
  padding: 4px 2px;
}

/* 底部合计行 */
:deep(.custom-blue-table .el-table__footer-wrapper tbody td.el-table__cell) {
  background-color: #f2f2f2;
  font-weight: bold;
  color: #333;
}

:deep(.custom-blue-table .el-table__footer-wrapper tbody td.el-table__cell:first-child) {
  background-color: #e6e6e6;
  text-align: center;
}

/* 最后一列 Sum Of Total 底部黄色 */
:deep(.custom-blue-table .el-table__footer-wrapper tbody td.el-table__cell:last-child) {
  background-color: #FFFF00 !important;
  color: #000;
}

/* 内容列高亮 */
:deep(.col-highlight) {
  background-color: #f9f9f9;
  color: #4472C4;
  font-weight: bold;
}

:deep(.col-highlight-total) {
  background-color: #fffde7;
  font-weight: bold;
}

/* === 关键优化：美化滚动条，方便笔记本用户拖动 === */
:deep(.el-table__body-wrapper::-webkit-scrollbar) {
  width: 10px;  /* 纵向滚动条宽度 */
  height: 12px; /* 横向滚动条高度 (稍微加高，方便鼠标对准) */
}

:deep(.el-table__body-wrapper::-webkit-scrollbar-thumb) {
  background-color: #c1c1c1; /* 滚动条颜色 */
  border-radius: 6px;
}

:deep(.el-table__body-wrapper::-webkit-scrollbar-track) {
  background-color: #f1f1f1;
}
</style>