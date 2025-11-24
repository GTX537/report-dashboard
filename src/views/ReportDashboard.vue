<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { TableColumnsType } from 'ant-design-vue'
import type { EChartsOption } from 'echarts'
import BaseChart from '@/components/BaseChart.vue'
import ReportFilter from '@/components/ReportFilter.vue'
import ReportTable from '@/components/ReportTable.vue'
import { useReportStore } from '@/stores/report'

const router = useRouter()
const reportStore = useReportStore()

onMounted(() => {
  if (!reportStore.summaries.length) {
    reportStore.loadSummaries()
  }
})

const filters = computed({
  get: () => reportStore.filters,
  set: (value) => reportStore.updateFilters(value),
})

const regionLabels: Record<string, string> = {
  north: '华北',
  south: '华南',
  east: '华东',
  west: '西南',
}

interface SummaryRow {
  id: string
  name: string
  region: string
  owner: string
  revenue: number
  profit: number
  growth: number
  updatedAt: string
  [key: string]: string | number
}

const summaryCards = computed(() => [
  {
    title: '累计营收 (万)',
    value: reportStore.totalRevenue.toFixed(2),
  },
  {
    title: '累计利润 (万)',
    value: reportStore.totalProfit.toFixed(2),
  },
  {
    title: '平均毛利率',
    value:
      reportStore.totalRevenue === 0
        ? '0%'
        : `${((reportStore.totalProfit / reportStore.totalRevenue) * 100).toFixed(1)}%`,
  },
  {
    title: '报表数量',
    value: reportStore.summaries.length,
  },
])

const chartOptions = computed<EChartsOption>(() => {
  const categories = reportStore.summaries.map((item) => item.name)
  const revenue = reportStore.summaries.map((item) => item.metrics.revenue)
  const profit = reportStore.summaries.map((item) => item.metrics.profit)

  return {
    tooltip: { trigger: 'axis' as const },
    legend: { data: ['营收', '利润'] },
    grid: { left: 24, right: 24, top: 40, bottom: 24 },
    xAxis: { type: 'category' as const, data: categories },
    yAxis: { type: 'value' as const },
    series: [
      { name: '营收', type: 'bar', data: revenue, barWidth: 24 },
      { name: '利润', type: 'line', data: profit, smooth: true },
    ],
  }
})

const tableColumns: TableColumnsType = [
  { title: '报表名称', dataIndex: 'name', key: 'name' },
  { title: '区域', dataIndex: 'region', key: 'region' },
  { title: '负责人', dataIndex: 'owner', key: 'owner' },
  {
    title: '收入 (万)',
    dataIndex: 'revenue',
    key: 'revenue',
    sorter: (a: SummaryRow, b: SummaryRow) => a.revenue - b.revenue,
  },
  {
    title: '利润 (万)',
    dataIndex: 'profit',
    key: 'profit',
    sorter: (a: SummaryRow, b: SummaryRow) => a.profit - b.profit,
  },
  {
    title: '增长率',
    dataIndex: 'growth',
    key: 'growth',
    sorter: (a: SummaryRow, b: SummaryRow) => a.growth - b.growth,
    customRender: ({ text }) => `${text}%`,
  },
  { title: '更新日期', dataIndex: 'updatedAt', key: 'updatedAt' },
]

const tableData = computed<SummaryRow[]>(() =>
  reportStore.summaries.map((item) => ({
    id: item.id,
    name: item.name,
    region: regionLabels[item.region] ?? item.region,
    owner: item.owner,
    revenue: item.metrics.revenue,
    profit: item.metrics.profit,
    growth: item.metrics.growth,
    updatedAt: item.updatedAt,
  })),
)

const handleApply = () => {
  reportStore.loadSummaries()
}

const handleRowClick = (record: Record<string, unknown>) => {
  if (record.id) {
    router.push(`/reports/${record.id}`)
  }
}
</script>

<template>
  <div class="dashboard">
    <ReportFilter v-model="filters" :loading="reportStore.loadingList" @apply="handleApply" />

    <a-row :gutter="[16, 16]" class="stats-row">
      <a-col v-for="card in summaryCards" :key="card.title" :xs="12" :md="6">
        <a-card>
          <div class="stat-title">{{ card.title }}</div>
          <div class="stat-value">{{ card.value }}</div>
        </a-card>
      </a-col>
    </a-row>

    <a-card title="营收趋势" class="chart-card">
      <BaseChart :options="chartOptions" height="360px" />
    </a-card>

    <ReportTable
      class="report-table"
      :columns="tableColumns"
      :data-source="tableData"
      :loading="reportStore.loadingList"
      @row-click="handleRowClick"
    />
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stats-row .ant-card {
  border-radius: 10px;
}

.stat-title {
  color: #8c8c8c;
  font-size: 13px;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
}

.chart-card,
.report-table {
  border-radius: 10px;
}
</style>
