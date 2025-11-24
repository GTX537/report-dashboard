<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { defaultFilters, type ReportFilters } from '@/api/report'

type RangeValue = [Dayjs, Dayjs] | null

const props = defineProps<{
  modelValue: ReportFilters
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [ReportFilters]
  apply: []
}>()

const rangeValue = computed<RangeValue>({
  get: (): RangeValue => {
    if (props.modelValue.dateRange.length === 2) {
      const [start, end] = props.modelValue.dateRange
      return [dayjs(start), dayjs(end)] as [Dayjs, Dayjs]
    }
    return null
  },
  set: (value: RangeValue) => {
    if (value && value.length === 2) {
      emit('update:modelValue', {
        ...props.modelValue,
        dateRange: [value[0].format('YYYY-MM-DD'), value[1].format('YYYY-MM-DD')],
      })
    } else {
      emit('update:modelValue', {
        ...props.modelValue,
        dateRange: [],
      })
    }
  },
})

const updateFilters = (payload: Partial<ReportFilters>) => {
  emit('update:modelValue', {
    ...props.modelValue,
    ...payload,
  })
}

const handleSubmit = () => {
  emit('apply')
}

const handleReset = () => {
  emit('update:modelValue', { ...defaultFilters })
}
</script>

<template>
  <a-card title="筛选条件">
    <a-form layout="inline" @finish="handleSubmit">
      <a-form-item label="日期范围">
        <a-range-picker
          v-model:value="rangeValue"
          format="YYYY-MM-DD"
          :allow-clear="true"
          style="width: 260px"
        />
      </a-form-item>

      <a-form-item label="区域">
        <a-select
          :value="modelValue.region"
          style="width: 160px"
          @change="(value: string) => updateFilters({ region: value })"
        >
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="north">华北</a-select-option>
          <a-select-option value="south">华南</a-select-option>
          <a-select-option value="east">华东</a-select-option>
          <a-select-option value="west">西南</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="负责人">
        <a-select
          :value="modelValue.owner"
          style="width: 160px"
          @change="(value: string) => updateFilters({ owner: value })"
        >
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="alice">Alice</a-select-option>
          <a-select-option value="bob">Bob</a-select-option>
          <a-select-option value="carol">Carol</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item>
        <a-space>
          <a-button type="primary" html-type="submit" :loading="loading">应用</a-button>
          <a-button @click="handleReset">重置</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </a-card>
</template>
