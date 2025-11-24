import axios from 'axios'
import dayjs from 'dayjs'

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

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

const useMockData = import.meta.env.DEV

export async function fetchReportSummaries(filters: ReportFilters): Promise<ReportSummary[]> {
  if (!useMockData) {
    const { data } = await apiClient.get<ReportSummary[]>('/reports', { params: filters })
    return data
  }

  return mockRequest(() => buildMockSummaries(filters))
}

export async function fetchReportDetail(id: string): Promise<ReportDetail> {
  if (!useMockData) {
    const { data } = await apiClient.get<ReportDetail>(`/reports/${id}`)
    return data
  }

  return mockRequest(() => buildMockDetail(id))
}

async function mockRequest<T>(factory: () => T, delay = 400): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, delay))
  return factory()
}

function ensureRange(filters: ReportFilters): [string, string] {
  if (filters.dateRange.length === 2) {
    return filters.dateRange
  }

  const end = dayjs()
  const start = end.subtract(6, 'month')
  return [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')]
}

function buildMockSummaries(filters: ReportFilters): ReportSummary[] {
  const [start, end] = ensureRange(filters)
  const regions = filters.region === 'all' ? ['north', 'south', 'east', 'west'] : [filters.region]
  const owners = filters.owner === 'all' ? ['Alice', 'Bob', 'Carol'] : [capitalize(filters.owner)]

  return regions.flatMap((region, regionIndex) =>
    owners.map((owner, ownerIndex) => {
      const revenue = 200 + (regionIndex + 1) * 120 + ownerIndex * 60
      const cost = revenue * 0.55
      return {
        id: `${region}-${ownerIndex}`,
        name: `${region.toUpperCase()} ${owner} 报表`,
        owner,
        region,
        updatedAt: end,
        metrics: {
          revenue,
          cost,
          profit: Number((revenue - cost).toFixed(2)),
          growth: Number((5 + regionIndex * 2 - ownerIndex).toFixed(2)),
        },
      }
    }),
  )
}

function buildMockDetail(id: string): ReportDetail {
  const base = buildMockSummaries({
    dateRange: [],
    owner: 'all',
    region: 'all',
  }).find((item) => item.id === id)

  const summary: ReportSummary =
    base ??
    {
      id,
      name: '自定义报表',
      owner: 'Alice',
      region: 'north',
      updatedAt: dayjs().format('YYYY-MM-DD'),
      metrics: {
        revenue: 400,
        cost: 210,
        profit: 190,
        growth: 8.5,
      },
    }

  const breakdown = ['线上', '线下', '直营', '渠道'].map((category, index) => ({
    category,
    value: Number((summary.metrics.revenue * (0.2 + index * 0.15)).toFixed(2)),
  }))

  const trend = Array.from({ length: 6 }).map((_, index) => ({
    label: dayjs().subtract(5 - index, 'month').format('MM月'),
    revenue: Number((summary.metrics.revenue * (0.7 + index * 0.05)).toFixed(2)),
    cost: Number((summary.metrics.cost * (0.75 + index * 0.05)).toFixed(2)),
  }))

  const rows: ReportRow[] = ['A', 'B', 'C', 'D', 'E'].map((suffix, index) => ({
    id: `${id}-row-${index}`,
    product: `产品-${suffix}`,
    channel: breakdown[index % breakdown.length]?.category ?? '线上',
    revenue: Number((summary.metrics.revenue * (0.15 + index * 0.06)).toFixed(2)),
    cost: Number((summary.metrics.cost * (0.12 + index * 0.05)).toFixed(2)),
    profit: Number((summary.metrics.profit * (0.18 + index * 0.04)).toFixed(2)),
    conversion: Number((40 + index * 5).toFixed(2)),
  }))

  return {
    ...summary,
    breakdown,
    trend,
    rows,
  }
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
