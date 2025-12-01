import axios from 'axios'
import dayjs from 'dayjs'
import type { 
  SummaryReportRow, 
  DetailReportRow, 
  CostcenterSummaryRow, 
  FactorySummaryRow 
} from '@/data/reportSamples'

// --- 1. 定义通用的分页返回结构 (新增) ---
export interface PagedResult<T> {
  items: T[]
  totalCount: number
}

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

export interface ReportDetail extends ReportSummary {
  breakdown: Array<{ category: string; value: number }>
  trend: Array<{ label: string; revenue: number; cost: number }>
  rows: any[] // 简化定义
}

export const defaultFilters: ReportFilters = {
  dateRange: [],
  region: 'all',
  owner: 'all',
}

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 20000,
})

// ==========================================
// 业务报表接口
// ==========================================

// 2.1 Detail Report (修改返回类型为 PagedResult)
export async function fetchDetailReportForm(params: { 
  plant?: string; 
  costCenter?: string;
  pageIndex: number; // 分页参数
  pageSize: number;  // 分页参数
}): Promise<PagedResult<DetailReportRow>> {
  const { data } = await apiClient.get<PagedResult<DetailReportRow>>('/operational/detail', { params })
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

// ... 仪表盘接口保留原样 ...
export async function fetchReportSummaries(filters: ReportFilters): Promise<ReportSummary[]> {
  const { data } = await apiClient.get<ReportSummary[]>('/reports', { 
    params: { region: filters.region, owner: filters.owner } 
  })
  return data
}

export async function fetchReportDetail(id: string): Promise<ReportDetail> {
  const { data } = await apiClient.get<ReportDetail>(`/reports/${id}`)
  return data
}