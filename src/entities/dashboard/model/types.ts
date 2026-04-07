export interface DashboardStatCard {
  key: string
  label: string
  value: number
  delta: number
  hint: string
  tone: 'teal' | 'amber' | 'rose' | 'slate'
}

export interface DashboardTrendSeries {
  label: string
  values: number[]
  tone: string
}

export interface DashboardActivityItem {
  id: string
  title: string
  description: string
  timeLabel: string
  tone: 'success' | 'warning' | 'info'
}

export interface DashboardSnapshot {
  summary: DashboardStatCard[]
  trend: DashboardTrendSeries[]
  activities: DashboardActivityItem[]
}
