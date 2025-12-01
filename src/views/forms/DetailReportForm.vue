<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
// 引入 API 和 类型
import { fetchDetailReportForm } from '@/api/report'
import type { DetailReportRow } from '@/data/reportSamples'

// --- 1. 状态定义 ---
const filters = reactive({
  finalDate: dayjs().toDate(),
  fromDate: dayjs().startOf('month').toDate(),
  resignDate: dayjs().toDate(),
  typeReport: 'Detail Report',
  plant: 'All',
  costCenter: 'All',
  factorySelection: ['DET01', 'DET02', 'DET05', 'DET07', 'DET09'],
  formSize: 'All',
  status: 'Final',
})

const loading = ref(false)
const dataSource = ref<DetailReportRow[]>([])

// 分页状态
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 下拉选项常量
const plantOptions = ['All', 'AMBU', 'AMBU2', 'APABU-D2', 'DET01', 'DET06', 'DET07']
const costCenterOptions = ['All', 'ACMC MFG', 'ACMC PE', 'Big Choke QA', 'CHP MFG', 'CPBG Central Purchasing']
const factoryOptions = ['DET01', 'DET15', 'DET02', 'DET03', 'DET31', 'DET05', 'DET08', 'DET09', 'CPTH1', 'DET06', 'DET07']
const sizeOptions = ['All', 'S', 'M', 'L', 'XL', 'XXL', 'EXTRA 36', 'EXTRA 40']

// --- 2. 核心逻辑方法 ---

// 加载数据 (调用后端 API)
const loadData = async () => {
  loading.value = true
  try {
    // 调用 API，传入筛选条件 + 分页参数
    // 将参数先放到一个 any 类型的变量中，以避免对象字面量严格类型检查错误
    const params = {
      plant: filters.plant,
      costCenter: filters.costCenter,
      pageIndex: pagination.currentPage,
      pageSize: pagination.pageSize
    } as any

    const res = await fetchDetailReportForm(params)
    
    // Handle both paged result { items, totalCount } and plain array responses
    if (Array.isArray(res)) {
      dataSource.value = res
      pagination.total = res.length
    } else {
      const paged = res as any
      dataSource.value = paged.items || []
      pagination.total = paged.totalCount || 0
    }
    
  } catch (error) {
    console.error('Failed to fetch data:', error)
    ElMessage.error('数据加载失败，请检查网络或后端服务')
  } finally {
    loading.value = false
  }
}

// 点击搜索按钮
const handleSearch = () => {
  pagination.currentPage = 1 // 重置回第一页
  loadData()
}

// 处理页码改变 (翻页)
const handleCurrentChange = (val: number) => {
  pagination.currentPage = val
  loadData()
}

// 处理每页条数改变
const handleSizeChange = (val: number) => {
  pagination.pageSize = val
  pagination.currentPage = 1
  loadData()
}

// 处理 Document 超链接点击
const handleDocumentClick = (docId: string) => {
  console.log('Open document:', docId)
  ElMessage.success(`正在打开单据：${docId}`)
}

// 页面加载时自动查询
onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="report-page">
    <el-card class="form-card report-card" shadow="never">
      <template #header>
        <span class="card-header-title">Report Form – Detail Report</span>
      </template>
      
      <el-form :model="filters" label-width="100px" size="default" label-position="top">
        <el-row :gutter="20">
          <el-col :xs="24" :md="12" :lg="8">
            <el-form-item label="Final Date">
              <el-date-picker v-model="filters.finalDate" type="date" format="YYYY-MM-DD" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="8">
            <el-form-item label="Date From">
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
          <el-col :span="8">
            <el-form-item label="Type Report">
              <el-select v-model="filters.typeReport" disabled style="width: 100%">
                <el-option value="Detail Report" label="Detail Report" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Plant">
              <el-select v-model="filters.plant" style="width: 100%">
                <el-option v-for="item in plantOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Cost Center">
              <el-select v-model="filters.costCenter" style="width: 100%">
                <el-option v-for="item in costCenterOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="Factory">
              <el-checkbox-group v-model="filters.factorySelection">
                <el-checkbox v-for="f in factoryOptions" :key="f" :label="f" :value="f" />
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
           <el-col :span="12">
            <el-form-item label="Form Size">
               <el-select v-model="filters.formSize" style="width: 100%">
                <el-option v-for="s in sizeOptions" :key="s" :label="s" :value="s" />
              </el-select>
            </el-form-item>
           </el-col>
           <el-col :span="12">
             <el-form-item label="Status">
               <el-select v-model="filters.status" style="width: 100%">
                 <el-option label="Draft" value="Draft" />
                 <el-option label="Final" value="Final" />
               </el-select>
             </el-form-item>
           </el-col>
        </el-row>

        <div class="actions">
          <el-button type="primary" :loading="loading" @click="handleSearch">Search</el-button>
        </div>
      </el-form>
    </el-card>

    <el-card class="table-card report-card" shadow="never" body-style="padding: 0;">
      <el-table
        :data="dataSource"
        border
        style="width: 100%"
        max-height="600"
        v-loading="loading"
        class="custom-blue-table"
        size="small"
      >
        <el-table-column label="No." type="index" width="50" align="center" fixed />
        
        <el-table-column label="Document" width="120" align="center" fixed>
          <template #default="scope">
            <el-link type="primary" :underline="false" @click="handleDocumentClick(scope.row.document)">
              {{ scope.row.document }}
            </el-link>
          </template>
        </el-table-column>

        <el-table-column prop="hrDate" label="HR.Date" width="100" align="center" />
        <el-table-column prop="empId" label="EmpID" width="90" align="center" />
        <el-table-column prop="empType" label="Emp Type" width="70" align="center" />
        <el-table-column prop="factory" label="Factory" width="120" />
        <el-table-column prop="plant" label="Plant" width="80" align="center" />
        <el-table-column prop="costCode" label="Cost Code" width="100" />
        <el-table-column prop="costCenter" label="Cost Center" width="120" />
        <el-table-column prop="department" label="Department" width="120" />
        <el-table-column prop="location" label="Location" width="90" />
        <el-table-column prop="name" label="Name" width="180" />
        
        <el-table-column label="Give 3 Set" width="70" align="center">
           <template #default>
             </template>
        </el-table-column>

        <el-table-column label="Uniform" align="center">
          <el-table-column prop="uniformType" label="Type" width="60" align="center" />
          <el-table-column prop="uniformSize" label="Size" width="60" align="center" />
          <el-table-column prop="qty" label="Qty." width="50" align="center" />
        </el-table-column>

        <el-table-column prop="shoe" label="Shoe" width="60" align="center" />
        <el-table-column prop="slipper" label="Slipper" width="70" align="center" />
        <el-table-column prop="requester" label="Requester" width="120" />
        <el-table-column prop="department" label="Req. Dept." width="120" />
        <el-table-column prop="reqExt" label="Req. Ext.No." width="100" align="center" />
        <el-table-column prop="requestDate" label="Request Date" width="150" align="center" />
        <el-table-column prop="status" label="Status" width="80" align="center" />
        <el-table-column prop="lastUpdate" label="Last Update" width="150" align="center" />
      </el-table>

      <div class="pagination-container" v-if="pagination.total > 10">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
/* 页面布局 */
.report-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #f5f7fa;
  padding: 16px;
}

/* 标题样式 */
.card-header-title {
  color: #4472C4;
  font-weight: 700;
  font-size: 18px;
}

.actions {
  text-align: right;
  margin-top: 16px;
}

/* 分页栏样式 */
.pagination-container {
  padding: 12px 16px;
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
  border-top: 1px solid #ebeef5;
}

/* === Element Plus 表格深度定制 === */

/* 1. 表头蓝色背景 + 白色文字 */
:deep(.custom-blue-table thead th.el-table__cell) {
  background-color: #4472C4 !important; /* 截图中的深蓝色 */
  color: white !important;
  font-weight: 600;
  border-right: 1px solid rgba(255, 255, 255, 0.3) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important;
  padding: 8px 0; /* 紧凑表头 */
}

/* 2. 表格内容紧凑 */
:deep(.custom-blue-table .el-table__cell) {
  padding: 4px 0;
  color: #333;
}

/* 3. 边框颜色微调 */
:deep(.custom-blue-table.el-table--border .el-table__cell) {
  border-right: 1px solid #dcdfe6;
}

/* 4. 滚动条美化 */
:deep(.el-table__body-wrapper::-webkit-scrollbar) {
  width: 10px;
  height: 12px;
}

:deep(.el-table__body-wrapper::-webkit-scrollbar-thumb) {
  background-color: #c1c1c1;
  border-radius: 6px;
}

:deep(.el-table__body-wrapper::-webkit-scrollbar-track) {
  background-color: #f1f1f1;
}
</style>