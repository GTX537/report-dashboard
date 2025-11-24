<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import type { ECharts, EChartsOption } from 'echarts'

const props = withDefaults(
  defineProps<{
    options: EChartsOption
    height?: string
  }>(),
  {
    height: '320px',
  },
)

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: ECharts | null = null
let resizeObserver: ResizeObserver | null = null

const renderChart = () => {
  if (!chartRef.value) {
    return
  }

  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value)
  }

  chartInstance.setOption(props.options, true)
}

const dispose = () => {
  resizeObserver?.disconnect()
  resizeObserver = null
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
}

onMounted(() => {
  renderChart()

  if (chartRef.value) {
    resizeObserver = new ResizeObserver(() => chartInstance?.resize())
    resizeObserver.observe(chartRef.value)
  }
})

onBeforeUnmount(() => {
  dispose()
})

watch(
  () => props.options,
  () => {
    renderChart()
  },
  { deep: true },
)
</script>

<template>
  <div ref="chartRef" :style="{ width: '100%', height }" />
</template>
