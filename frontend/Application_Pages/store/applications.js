import { defineStore } from 'pinia';
import applicationsAPI from '../api/applications.js';

export const useApplicationsStore = defineStore('applications', {
  state: () => ({
    pending: [],
    waitlisted: [],
    approved: [],
    rejected: [],
    rankings: [],
    loading: false,
    error: null,
    allocationLoading: false,
    allocationError: null
  }),
  
  getters: {
    pendingCount: (state) => state.pending.length,
    waitlistedCount: (state) => state.waitlisted.length,
    approvedCount: (state) => state.approved.length,
    rejectedCount: (state) => state.rejected.length,
    totalCount: (state) => state.pending.length + state.waitlisted.length + state.approved.length + state.rejected.length,
    
    allApplications: (state) => [
      ...state.pending,
      ...state.waitlisted,
      ...state.approved,
      ...state.rejected
    ]
  },
  
  actions: {
    async loadAllApplications() {
      this.loading = true;
      this.error = null;
      
      try {
        const [pending, waitlisted, approved, rejected] = await Promise.all([
          applicationsAPI.getPendingApplications(),
          applicationsAPI.getWaitlistedApplications(),
          applicationsAPI.getApprovedApplications(),
          applicationsAPI.getRejectedApplications()
        ]);

        this.pending = pending;
        this.waitlisted = waitlisted;
        this.approved = approved;
        this.rejected = rejected;
      } catch (error) {
        this.error = 'Failed to load applications';
        console.error('Error loading applications:', error);
      } finally {
        this.loading = false;
      }
    },

    async loadApplicationsByStatus(status) {
      this.loading = true;
      this.error = null;
      
      try {
        const applications = await applicationsAPI.getApplicationsByStatus(status);
        
        switch (status.toLowerCase()) {
          case 'pending':
            this.pending = applications;
            break;
          case 'waitlisted':
            this.waitlisted = applications;
            break;
          case 'approved':
            this.approved = applications;
            break;
          case 'rejected':
            this.rejected = applications;
            break;
        }
      } catch (error) {
        this.error = `Failed to load ${status} applications`;
        console.error(`Error loading ${status} applications:`, error);
      } finally {
        this.loading = false;
      }
    },

    async loadPendingApplications() {
      await this.loadApplicationsByStatus('pending');
    },

    async loadWaitlistedApplications() {
      await this.loadApplicationsByStatus('waitlisted');
    },

    async loadApprovedApplications() {
      await this.loadApplicationsByStatus('admitted');
    },

    async loadRejectedApplications() {
      await this.loadApplicationsByStatus('rejected');
    },

    async getApplicationById(id) {
      try {
        return await applicationsAPI.getApplicationById(id);
      } catch (error) {
        console.error('Error fetching application by ID:', error);
        throw error;
      }
    },

    async getApplicationStats() {
      try {
        return await applicationsAPI.getApplicationStats();
      } catch (error) {
        console.error('Error fetching application stats:', error);
        throw error;
      }
    },

    async allocateSlots() {
      this.allocationLoading = true;
      this.allocationError = null;
      
      try {
        const result = await applicationsAPI.allocateSlots();
        // Refresh all applications after allocation
        await this.loadAllApplications();
        return result;
      } catch (error) {
        this.allocationError = 'Failed to allocate slots';
        console.error('Error allocating slots:', error);
        throw error;
      } finally {
        this.allocationLoading = false;
      }
    },

    setPending(apps) { 
      this.pending = apps; 
    },
    
    setWaitlisted(apps) { 
      this.waitlisted = apps; 
    },
    
    setApproved(apps) { 
      this.approved = apps; 
    },
    
    setRejected(apps) { 
      this.rejected = apps; 
    },
    
    setRankings(apps) { 
      this.rankings = apps; 
    },

    findApplicant(identifier) {
      const allApps = this.allApplications;
      return allApps.find(app => 
        app.id === identifier || 
        app.lrn === identifier ||
        app.applicationId === identifier
      );
    },

    updateApplicantStatus(applicantId, newStatus) {
      const allApps = this.allApplications;
      const applicant = allApps.find(app => 
        app.id === applicantId || 
        app.lrn === applicantId ||
        app.applicationId === applicantId
      );
      
      if (applicant) {
        applicant.status = newStatus;
        this.moveApplicantToStatusArray(applicant, newStatus);
      }
    },

    moveApplicantToStatusArray(applicant, newStatus) {
      this.pending = this.pending.filter(app => app.id !== applicant.id);
      this.waitlisted = this.waitlisted.filter(app => app.id !== applicant.id);
      this.approved = this.approved.filter(app => app.id !== applicant.id);
      this.rejected = this.rejected.filter(app => app.id !== applicant.id);

      switch (newStatus.toLowerCase()) {
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
    }
  },
}); 