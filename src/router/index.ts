import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/reports',
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('@/views/ReportDashboard.vue'),
    },
    {
      path: '/reports/:id',
      name: 'report-detail',
      component: () => import('@/views/ReportDetail.vue'),
      props: true,
    },
    {
      path: '/report-forms/summary',
      name: 'report-form-summary',
      component: () => import('@/views/forms/SummaryReportForm.vue'),
    },
    {
      path: '/report-forms/detail',
      name: 'report-form-detail',
      component: () => import('@/views/forms/DetailReportForm.vue'),
    },
    {
      path: '/report-forms/costcenter',
      name: 'report-form-costcenter',
      component: () => import('@/views/forms/CostcenterAllocateForm.vue'),
    },
    {
      path: '/report-forms/summary-factory',
      name: 'report-form-summary-factory',
      component: () => import('@/views/forms/SummaryReportFactoryForm.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
    },
  ],
})

export default router
