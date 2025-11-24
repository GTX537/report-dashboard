import axios from 'axios'
import dayjs from 'dayjs'
// 引入数据类型定义
import type { 
  SummaryReportRow, 
  DetailReportRow, 
  CostcenterSummaryRow, 
  FactorySummaryRow 
} from '@/data/reportSamples'

// --- 基础类型定义 ---
export type DateRangeValue = [string, string] | []

export interface ReportFilters {
  dateRange: DateRangeValue
  region: string
  owner: string
}

export interface ReportSummary {
  id: string
  name: string
  owner: string
  region: string
  updatedAt: string
  metrics: {
    revenue: number
    cost: number
    profit: number
    growth: number
  }
}

export interface ReportRow {
  id: string
  product: string
  channel: string
  revenue: number
  cost: number
  profit: number
  conversion: number
}

export interface ReportDetail extends ReportSummary {
  breakdown: Array<{ category: string; value: number }>
  trend: Array<{ label: string; revenue: number; cost: number }>
  rows: ReportRow[]
}

export const defaultFilters: ReportFilters = {
  dateRange: [],
  region: 'all',
  owner: 'all',
}

// --- Axios 实例 ---
const apiClient = axios.create({
  baseURL: '/api', // 会自动通过 vite 代理转发到 https://localhost:7236/api
  timeout: 20000,
})

// ==========================================
// 1. 仪表盘相关接口 (Dashboard)
// ==========================================

export async function fetchReportSummaries(filters: ReportFilters): Promise<ReportSummary[]> {
  // 请求 /api/reports
  const { data } = await apiClient.get<ReportSummary[]>('/reports', { 
    params: {
      region: filters.region,
      owner: filters.owner
    } 
  })
  return data
}

export async function fetchReportDetail(id: string): Promise<ReportDetail> {
  const { data } = await apiClient.get<ReportDetail>(`/reports/${id}`)
  return data
}

// ==========================================
// 2. 业务报表相关接口 (Operational Forms)
// ==========================================

// 2.1 Detail Report
export async function fetchDetailReportForm(params: { plant?: string, costCenter?: string }): Promise<DetailReportRow[]> {
  const { data } = await apiClient.get<DetailReportRow[]>('/operational/detail', { params })
  return data
}

// 2.2 Summary Report
export async function fetchSummaryReportForm(): Promise<SummaryReportRow[]> {
  const { data } = await apiClient.get<SummaryReportRow[]>('/operational/summary')
  return data
}

// 2.3 Cost Center Allocate
export async function fetchCostCenterForm(params: { plant?: string }): Promise<CostcenterSummaryRow[]> {
  const { data } = await apiClient.get<CostcenterSummaryRow[]>('/operational/costcenter', { params })
  return data
}

// 2.4 Factory Summary
export async function fetchFactorySummaryForm(): Promise<FactorySummaryRow[]> {
  const { data } = await apiClient.get<FactorySummaryRow[]>('/operational/factory')
  return data
}