import axios from 'axios';

const API_BASE_URL = '/api';

const applicationsAPI = {
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

  // Get approved applications
  async getApprovedApplications() {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications/status/admitted`);
      return response.data;
    } catch (error) {
      console.error('Error fetching approved applications:', error);
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

  // Get individual application by ID
  async getApplicationById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching application:', error);
      throw error;
    }
  },

  // Trigger slot allocation and get result
  async allocateSlots() {
    try {
      const response = await axios.post(`${API_BASE_URL}/applications/allocate`);
      return response.data;
    } catch (error) {
      console.error('Error allocating slots:', error);
      throw error;
    }
  },

  // Get admitted applications
  async getAdmittedApplications() {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications/admitted`);
      return response.data;
    } catch (error) {
      console.error('Error fetching admitted applications:', error);
      throw error;
    }
  },
};

export default applicationsAPI; 