import { defineStore } from 'pinia';

export const useApplicationsStore = defineStore('applications', {
  state: () => ({
    pending: [
      {
        id: 'APP001',
        lrn: '123456789001',
        fullName: 'Maria Santos Cruz',
        email: 'maria.santos@email.com',
        age: 15,
        gender: 'Female',
        ethnicity: 'Filipino',
        address: '123 Rizal Street, Quezon City, Metro Manila',
        schoolAttended: 'Quezon City Science High School',
        grades: 94.5,
        examScore: 92,
        motherName: 'Teresita Santos',
        fatherName: 'Roberto Cruz',
        economicStatus: 'Lower Middle',
        proximity: 3.2,
        monthlyIncome: 25000,
        supportingDocuments: ['Birth Certificate', 'Report Card', 'Certificate of Good Moral Character'],
        applicationId: 'APP001',
        submissionTimestamp: '2024-01-15T09:30:00Z',
        status: 'pending'
      },
      {
        id: 'APP002',
        lrn: '123456789002',
        fullName: 'Juan Carlos Dela Cruz',
        email: 'juan.delacruz@email.com',
        age: 16,
        gender: 'Male',
        ethnicity: 'Filipino',
        address: '456 Bonifacio Avenue, Makati City, Metro Manila',
        schoolAttended: 'Makati Science High School',
        grades: 91.8,
        examScore: 88,
        motherName: 'Carmen Dela Cruz',
        fatherName: 'Antonio Dela Cruz',
        economicStatus: 'Upper Middle',
        proximity: 1.8,
        monthlyIncome: 45000,
        supportingDocuments: ['Birth Certificate', 'Report Card', 'Medical Certificate'],
        applicationId: 'APP002',
        submissionTimestamp: '2024-01-18T14:15:00Z',
        status: 'pending'
      },
      {
        id: 'APP003',
        lrn: '123456789003',
        fullName: 'Ana Patricia Garcia',
        email: 'ana.garcia@email.com',
        age: 15,
        gender: 'Female',
        ethnicity: 'Filipino',
        address: '789 Mabini Street, Manila City, Metro Manila',
        schoolAttended: 'Manila Science High School',
        grades: 96.2,
        examScore: 95,
        motherName: 'Isabel Garcia',
        fatherName: 'Miguel Garcia',
        economicStatus: 'Lower',
        proximity: 5.5,
        monthlyIncome: 18000,
        supportingDocuments: ['Birth Certificate', 'Report Card', 'Certificate of Excellence'],
        applicationId: 'APP003',
        submissionTimestamp: '2024-01-20T11:45:00Z',
        status: 'pending'
      }
    ],
    waitlisted: [
      {
        id: 'APP006',
        lrn: '123456789006',
        fullName: 'Diego Alejandro Lopez',
        email: 'diego.lopez@email.com',
        age: 16,
        gender: 'Male',
        ethnicity: 'Filipino',
        address: '987 Katipunan Avenue, Quezon City, Metro Manila',
        schoolAttended: 'Ateneo de Manila University High School',
        grades: 87.3,
        examScore: 82,
        motherName: 'Carmen Lopez',
        fatherName: 'Fernando Lopez',
        economicStatus: 'Upper',
        proximity: 0.8,
        monthlyIncome: 65000,
        supportingDocuments: ['Birth Certificate', 'Report Card', 'Medical Certificate'],
        applicationId: 'APP006',
        submissionTimestamp: '2024-01-28T13:45:00Z',
        status: 'waitlisted'
      },
      {
        id: 'APP007',
        lrn: '123456789007',
        fullName: 'Isabella Grace Reyes',
        email: 'isabella.reyes@email.com',
        age: 15,
        gender: 'Female',
        ethnicity: 'Filipino',
        address: '147 Commonwealth Avenue, Quezon City, Metro Manila',
        schoolAttended: 'Miriam College High School',
        grades: 90.5,
        examScore: 87,
        motherName: 'Maria Reyes',
        fatherName: 'Pedro Reyes',
        economicStatus: 'Upper Middle',
        proximity: 2.3,
        monthlyIncome: 48000,
        supportingDocuments: ['Birth Certificate', 'Report Card', 'Certificate of Good Moral Character'],
        applicationId: 'APP007',
        submissionTimestamp: '2024-02-01T15:20:00Z',
        status: 'waitlisted'
      }
    ],
    approved: [
      {
        id: 'APP009',
        lrn: '123456789009',
        fullName: 'Valentina Sofia Hernandez',
        email: 'valentina.hernandez@email.com',
        age: 15,
        gender: 'Female',
        ethnicity: 'Filipino',
        address: '369 Ortigas Avenue, Pasig City, Metro Manila',
        schoolAttended: 'Pasig Catholic College',
        grades: 97.8,
        examScore: 96,
        motherName: 'Sofia Hernandez',
        fatherName: 'Roberto Hernandez',
        economicStatus: 'Lower',
        proximity: 6.2,
        monthlyIncome: 15000,
        supportingDocuments: ['Birth Certificate', 'Report Card', 'Certificate of Excellence', 'Certificate of Good Moral Character'],
        applicationId: 'APP009',
        submissionTimestamp: '2024-02-05T09:15:00Z',
        status: 'approved'
      },
      {
        id: 'APP010',
        lrn: '123456789010',
        fullName: 'Mateo Sebastian Gonzales',
        email: 'mateo.gonzales@email.com',
        age: 16,
        gender: 'Male',
        ethnicity: 'Filipino',
        address: '741 Taft Avenue, Manila City, Metro Manila',
        schoolAttended: 'De La Salle University Integrated School',
        grades: 95.2,
        examScore: 93,
        motherName: 'Carmen Gonzales',
        fatherName: 'Antonio Gonzales',
        economicStatus: 'Upper Middle',
        proximity: 1.5,
        monthlyIncome: 52000,
        supportingDocuments: ['Birth Certificate', 'Report Card', 'Medical Certificate'],
        applicationId: 'APP010',
        submissionTimestamp: '2024-02-07T14:30:00Z',
        status: 'approved'
      },
      {
        id: 'APP011',
        lrn: '123456789011',
        fullName: 'Sofia Isabella Martinez',
        email: 'sofia.martinez@email.com',
        age: 15,
        gender: 'Female',
        ethnicity: 'Filipino',
        address: '852 EDSA, Quezon City, Metro Manila',
        schoolAttended: 'St. Paul College Quezon City',
        grades: 93.7,
        examScore: 91,
        motherName: 'Isabella Martinez',
        fatherName: 'Carlos Martinez',
        economicStatus: 'Middle',
        proximity: 2.8,
        monthlyIncome: 35000,
        supportingDocuments: ['Birth Certificate', 'Report Card', 'Certificate of Good Moral Character'],
        applicationId: 'APP011',
        submissionTimestamp: '2024-02-10T10:45:00Z',
        status: 'approved'
      }
    ],
    rejected: [
      {
        id: 'APP014',
        lrn: '123456789014',
        fullName: 'Adrian Carlos Flores',
        email: 'adrian.flores@email.com',
        age: 16,
        gender: 'Male',
        ethnicity: 'Filipino',
        address: '357 Davao Street, Parañaque City, Metro Manila',
        schoolAttended: 'Parañaque City High School',
        grades: 78.3,
        examScore: 72,
        motherName: 'Carmen Flores',
        fatherName: 'Roberto Flores',
        economicStatus: 'Middle',
        proximity: 3.8,
        monthlyIncome: 38000,
        supportingDocuments: ['Birth Certificate', 'Report Card'],
        applicationId: 'APP014',
        submissionTimestamp: '2024-02-15T13:15:00Z',
        status: 'rejected'
      }
    ],
    rankings: [
      {
        id: 'APP009',
        lrn: '123456789009',
        fullName: 'Valentina Sofia Hernandez',
        grades: 97.8,
        examScore: 96,
        proximity: 6.2,
        monthlyIncome: 15000,
        status: 'approved',
        rank: 1,
        eligibility: 'High Priority'
      },
      {
        id: 'APP010',
        lrn: '123456789010',
        fullName: 'Mateo Sebastian Gonzales',
        grades: 95.2,
        examScore: 93,
        proximity: 1.5,
        monthlyIncome: 52000,
        status: 'approved',
        rank: 2,
        eligibility: 'High Priority'
      },
      {
        id: 'APP011',
        lrn: '123456789011',
        fullName: 'Sofia Isabella Martinez',
        grades: 93.7,
        examScore: 91,
        proximity: 2.8,
        monthlyIncome: 35000,
        status: 'approved',
        rank: 3,
        eligibility: 'High Priority'
      }
    ]
  }),
  
  getters: {
    pendingCount: (state) => state.pending.length,
    waitlistedCount: (state) => state.waitlisted.length,
    approvedCount: (state) => state.approved.length,
    rejectedCount: (state) => state.rejected.length,
    rankingsCount: (state) => state.rankings.length,
  },
  
  actions: {
    setPending(apps) { 
      if (Array.isArray(apps)) {
        this.pending = apps; 
      }
    },
    setWaitlisted(apps) { 
      if (Array.isArray(apps)) {
        this.waitlisted = apps; 
      }
    },
    setApproved(apps) { 
      if (Array.isArray(apps)) {
        this.approved = apps; 
      }
    },
    setRejected(apps) { 
      if (Array.isArray(apps)) {
        this.rejected = apps; 
      }
    },
    setRankings(apps) { 
      if (Array.isArray(apps)) {
        this.rankings = apps; 
      }
    },
    
    findApplicant(identifier) {
      if (!identifier) {
        return null;
      }
      
      const all = [...this.pending, ...this.waitlisted, ...this.approved, ...this.rejected];
      return all.find(app => String(app.id) === String(identifier) || String(app.lrn) === String(identifier));
    },
    
    updateApplicantStatus(applicantId, newStatus) {
      if (!applicantId) {
        return false;
      }
      
      if (!newStatus || !['pending', 'waitlisted', 'approved', 'rejected'].includes(newStatus)) {
        return false;
      }
      
      const all = [...this.pending, ...this.waitlisted, ...this.approved, ...this.rejected];
      const applicant = all.find(app => String(app.id) === String(applicantId) || String(app.lrn) === String(applicantId));
      
      if (applicant) {
        // Remove from all arrays
        this.pending = this.pending.filter(app => app.id !== applicant.id);
        this.waitlisted = this.waitlisted.filter(app => app.id !== applicant.id);
        this.approved = this.approved.filter(app => app.id !== applicant.id);
        this.rejected = this.rejected.filter(app => app.id !== applicant.id);
        
        // Update status and add to appropriate array
        applicant.status = newStatus;
        switch (newStatus) {
          case 'pending':
            this.pending.push(applicant);
            break;
          case 'waitlisted':
            this.waitlisted.push(applicant);
            break;
          case 'approved':
            this.approved.push(applicant);
            break;
          case 'rejected':
            this.rejected.push(applicant);
            break;
        }
        return true;
      } else {
        return false;
      }
    }
  },
}); 