import { defineStore } from 'pinia'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    statCards: [
      { value: 50, label: 'Total Available Slots', sublabel: '2 slots filled', color: 'blue', icon: { template: `<svg class='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'/></svg>` } },
      { value: 2, label: 'Approved Students', sublabel: '4% of total slots', color: 'green', icon: { template: `<svg class='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7'/></svg>` } },
      { value: 4, label: 'Pending Applications', sublabel: 'Awaiting review and ranking', color: 'yellow', icon: { template: `<svg class='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'/></svg>` } },
      { value: 2, label: 'Waitlisted Applications', sublabel: 'Awaiting slot availability', color: 'blue', icon: { template: `<svg class='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6'/></svg>` } },
      { value: 2, label: 'Rejected Applications', sublabel: 'Did not meet criteria', color: 'red', icon: { template: `<svg class='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12'/></svg>` } },
    ],
    totalApplications: 10
  })
}) 