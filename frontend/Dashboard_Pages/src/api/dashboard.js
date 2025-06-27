import axios from 'axios';

const API_BASE_URL = '/api';

const dashboardAPI = {
  // Get application statistics
  async getApplicationStats() {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching application statistics:', error);
      throw error;
    }
  },

  // Get all applications
  async getAllApplications() {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications/all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all applications:', error);
      throw error;
    }
  },

  // Get applications by status
  async getApplicationsByStatus(status) {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications/status/${status}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${status} applications:`, error);
      throw error;
    }
  },

  // Get pending applications
  async getPendingApplications() {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications/pending`);
      return response.data;
    } catch (error) {
      console.error('Error fetching pending applications:', error);
      throw error;
    }
  },

  // Get admitted applications
  async getAdmittedApplications() {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications/status/admitted`);
      return response.data;
    } catch (error) {
      console.error('Error fetching admitted applications:', error);
      throw error;
    }
  },

  // Get rejected applications
  async getRejectedApplications() {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications/status/rejected`);
      return response.data;
    } catch (error) {
      console.error('Error fetching rejected applications:', error);
      throw error;
    }
  },

  // Get waitlisted applications
  async getWaitlistedApplications() {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications/status/waitlisted`);
      return response.data;
    } catch (error) {
      console.error('Error fetching waitlisted applications:', error);
      throw error;
    }
  },

  // Trigger slot allocation
  async allocateSlots() {
    try {
      const response = await axios.post(`${API_BASE_URL}/applications/allocate`);
      return response.data;
    } catch (error) {
      console.error('Error allocating slots:', error);
      throw error;
    }
  },

  // Get debug information
  async getDebugInfo() {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications/debug/statuses`);
      return response.data;
    } catch (error) {
      console.error('Error fetching debug information:', error);
      throw error;
    }
  }
};

export default dashboardAPI; 