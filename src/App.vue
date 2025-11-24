<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import {
  ApartmentOutlined,
  BarChartOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  TableOutlined,
} from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'

const route = useRoute()
const router = useRouter()
const collapsed = ref(false)

const menuItems = [
  { key: 'dashboard', label: '仪表盘', path: '/reports', icon: BarChartOutlined },
  { key: 'summary', label: 'Summary Report', path: '/report-forms/summary', icon: FileTextOutlined },
  { key: 'detail', label: 'Detail Report', path: '/report-forms/detail', icon: FileSearchOutlined },
  { key: 'costcenter', label: 'Costcenter Allocate', path: '/report-forms/costcenter', icon: TableOutlined },
  {
    key: 'summaryFactory',
    label: 'Summary Report Factory',
    path: '/report-forms/summary-factory',
    icon: ApartmentOutlined,
  },
]

const settingsItem = { key: 'settings', label: '系统设置' }

const hideNavigation = computed(() => route.path.startsWith('/report-forms'))

const selectedKeys = computed(() => {
  if (route.path.startsWith('/settings')) {
    return ['settings']
  }
  const match = menuItems
    .slice()
    .sort((a, b) => b.path.length - a.path.length)
    .find((item) => route.path.startsWith(item.path))
  if (match) {
    return [match.key]
  }
  if (route.name === 'report-detail') {
    return ['dashboard']
  }
  return []
})

const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
  if (key === 'settings') {
    router.push('/settings')
    return
  }
  const target = menuItems.find((item) => item.key === key)
  if (target) {
    router.push(target.path)
  }
}
</script>

<template>
  <a-layout class="app-layout" :class="{ 'without-nav': hideNavigation }">
    <a-layout-sider v-if="!hideNavigation" v-model:collapsed="collapsed" collapsible theme="dark">
      <div class="logo">报表中心</div>
      <a-menu theme="dark" mode="inline" :selected-keys="selectedKeys" @click="handleMenuClick">
        <a-menu-item v-for="item in menuItems" :key="item.key">
          <template #icon>
            <component :is="item.icon" />
          </template>
          {{ item.label }}
        </a-menu-item>
        <a-menu-item :key="settingsItem.key">
          <template #icon>
            <SettingOutlined />
          </template>
          {{ settingsItem.label }}
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header v-if="!hideNavigation" class="app-header">
        <a-space align="center">
          <a-button type="text" @click="collapsed = !collapsed">
            <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
          </a-button>
          <span class="header-title">企业经营报表平台</span>
        </a-space>
      </a-layout-header>

      <a-layout-content class="app-content">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
}

.logo {
  height: 48px;
  margin: 16px;
  color: #fff;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.app-header {
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 24px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.header-title {
  font-size: 16px;
  font-weight: 600;
}

.app-content {
  margin: 24px;
  min-height: calc(100vh - 112px);
}
</style>
