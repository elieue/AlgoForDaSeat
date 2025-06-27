import { defineStore } from 'pinia'

export const useSlotVisualizationStore = defineStore('slotVisualization', {
  state: () => ({
    kpis: [
      { value: 100, label: 'Total Capacity', icon: 'BxBadge', color: 'yellow' },
      { value: 65, label: 'Students Approved', icon: 'BxCheckCircle', color: 'green' },
      { value: 35, label: 'Slots Remaining', icon: 'BxClipboard', color: 'blue' },
    ],
    slotAllocation: {
      filled: 65,
      available: 35,
      total: 100,
      filledSlots: 65,
      availableSlots: 35,
      totalSlots: 100,
    },
    socioeconomic: {
      lower: 40,
      middle: 45,
      upper: 15,
    },
    examResults: {
      passed: 70,
      failed: 30,
    },
    applicationDensity: [
      {
        cityName: 'Pasay',
        coordinates: [[[120.98,14.55],[120.99,14.56],[120.97,14.57],[120.98,14.55]]],
        proximityFromManila: 5,
        totalApplicants: 100,
        approvedApplicants: 60,
        pendingApplicants: 20,
        waitlistedApplicants: 10,
        rejectedApplicants: 10
      },
      {
        cityName: 'Manila',
        coordinates: [[[120.98,14.60],[121.00,14.61],[120.97,14.62],[120.98,14.60]]],
        proximityFromManila: 0,
        totalApplicants: 200,
        approvedApplicants: 120,
        pendingApplicants: 40,
        waitlistedApplicants: 20,
        rejectedApplicants: 20
      }
    ],
  })
}) 