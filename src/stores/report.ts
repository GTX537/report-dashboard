import { defineStore } from 'pinia'
import {
  defaultFilters,
  fetchReportDetail,
  fetchReportSummaries,
  type ReportDetail,
  type ReportFilters,
  type ReportSummary,
} from '@/api/report'

interface ReportState {
  filters: ReportFilters
  summaries: ReportSummary[]
  currentReport: ReportDetail | null
  loadingList: boolean
  loadingDetail: boolean
}

export const useReportStore = defineStore('report', {
  state: (): ReportState => ({
    filters: { ...defaultFilters },
    summaries: [],
    currentReport: null,
    loadingList: false,
    loadingDetail: false,
  }),
  getters: {
    totalRevenue: (state) => state.summaries.reduce((sum, item) => sum + item.metrics.revenue, 0),
    totalProfit: (state) => state.summaries.reduce((sum, item) => sum + item.metrics.profit, 0),
  },
  actions: {
    updateFilters(partial: Partial<ReportFilters>) {
      this.filters = { ...this.filters, ...partial }
    },
    async loadSummaries() {
      this.loadingList = true
      try {
        this.summaries = await fetchReportSummaries(this.filters)
      } finally {
        this.loadingList = false
      }
    },
    async loadReportDetail(id: string) {
      this.loadingDetail = true
      try {
        this.currentReport = await fetchReportDetail(id)
      } finally {
        this.loadingDetail = false
      }
    },
  },
})
