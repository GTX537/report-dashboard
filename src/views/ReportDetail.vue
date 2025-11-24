<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { TableColumnsType } from 'ant-design-vue'
import type { EChartsOption } from 'echarts'
import BaseChart from '@/components/BaseChart.vue'
import ReportTable from '@/components/ReportTable.vue'
import { useReportStore } from '@/stores/report'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const reportStore = useReportStore()

const report = computed(() => reportStore.currentReport)

watch(
  () => props.id,
  (value) => {
    if (value) {
      reportStore.loadReportDetail(value)
    }
  },
  { immediate: true },
)

const breakdownOptions = computed<EChartsOption>(() => ({
  tooltip: { trigger: 'item' as const },
  legend: { orient: 'vertical', left: 'left' },
  series: [
    {
      name: '渠道构成',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
      data: report.value?.breakdown.map((item) => ({
        name: item.category,
        value: item.value,
      })),
    },
  ],
}))

const trendOptions = computed<EChartsOption>(() => ({
  tooltip: { trigger: 'axis' as const },
  legend: { data: ['营收', '成本'] },
  grid: { left: 24, right: 24, top: 40, bottom: 24 },
  xAxis: { type: 'category' as const, data: report.value?.trend.map((item) => item.label) },
  yAxis: { type: 'value' as const },
  series: [
    {
      name: '营收',
      type: 'line',
      smooth: true,
      data: report.value?.trend.map((item) => item.revenue),
    },
    {
      name: '成本',
      type: 'line',
      smooth: true,
      data: report.value?.trend.map((item) => item.cost),
    },
  ],
}))

const tableColumns: TableColumnsType = [
  { title: '产品', dataIndex: 'product', key: 'product' },
  { title: '渠道', dataIndex: 'channel', key: 'channel' },
  { title: '营收 (万)', dataIndex: 'revenue', key: 'revenue' },
  { title: '成本 (万)', dataIndex: 'cost', key: 'cost' },
  { title: '利润 (万)', dataIndex: 'profit', key: 'profit' },
  { title: '转化率 (%)', dataIndex: 'conversion', key: 'conversion' },
]

const detailRows = computed(() => report.value?.rows ?? [])

const goBack = () => {
  router.push('/reports')
}
</script>

<template>
  <div class="detail">
    <a-page-header
      :title="report?.name ?? '报表详情'"
      :sub-title="`负责人：${report?.owner ?? '-'}`"
      @back="goBack"
    >
      <template #extra>
        <a-space>
          <a-button @click="goBack">返回列表</a-button>
          <a-button type="primary">导出报表</a-button>
        </a-space>
      </template>
    </a-page-header>

    <a-spin :spinning="reportStore.loadingDetail">
      <template v-if="report">
        <a-descriptions bordered :column="2" class="detail-summary">
          <a-descriptions-item label="区域">{{ report.region?.toUpperCase() }}</a-descriptions-item>
          <a-descriptions-item label="更新时间">{{ report.updatedAt }}</a-descriptions-item>
          <a-descriptions-item label="总营收 (万)">{{ report.metrics.revenue }}</a-descriptions-item>
          <a-descriptions-item label="总利润 (万)">{{ report.metrics.profit }}</a-descriptions-item>
        </a-descriptions>

        <a-row :gutter="16" class="chart-group">
          <a-col :xs="24" :md="12">
            <a-card title="渠道构成">
              <BaseChart :options="breakdownOptions" height="320px" />
            </a-card>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-card title="趋势对比">
              <BaseChart :options="trendOptions" height="320px" />
            </a-card>
          </a-col>
        </a-row>

        <ReportTable
          class="detail-table"
          :columns="tableColumns"
          :data-source="detailRows"
          :loading="reportStore.loadingDetail"
          row-key="product"
        />
      </template>
      <a-empty v-else description="暂无数据" />
    </a-spin>
  </div>
</template>

<style scoped>
.detail {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-summary {
  border-radius: 10px;
  background: #fff;
}

.chart-group .ant-card {
  border-radius: 10px;
}

.detail-table {
  border-radius: 10px;
}
</style>
