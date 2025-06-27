const axios = require('axios');

const BASE_URL = 'http://localhost:5173/api';

async function testRoutes() {
  console.log('🧪 Testing Applicant Routes...\n');

  try {
    // Test getting all applications
    console.log('1. Testing GET /applications/all');
    const allResponse = await axios.get(`${BASE_URL}/applications/all`);
    console.log(`✅ All applications: ${allResponse.data.length} found`);
    
    // Test getting applications by status
    console.log('\n2. Testing GET /applications/status/pending');
    const pendingResponse = await axios.get(`${BASE_URL}/applications/status/pending`);
    console.log(`✅ Pending applications: ${pendingResponse.data.length} found`);
    
    console.log('\n3. Testing GET /applications/status/approved');
    const approvedResponse = await axios.get(`${BASE_URL}/applications/status/approved`);
    console.log(`✅ Approved applications: ${approvedResponse.data.length} found`);
    
    console.log('\n4. Testing GET /applications/status/rejected');
    const rejectedResponse = await axios.get(`${BASE_URL}/applications/status/rejected`);
    console.log(`✅ Rejected applications: ${rejectedResponse.data.length} found`);
    
    console.log('\n5. Testing GET /applications/status/waitlisted');
    const waitlistedResponse = await axios.get(`${BASE_URL}/applications/status/waitlisted`);
    console.log(`✅ Waitlisted applications: ${waitlistedResponse.data.length} found`);
    
    // Test getting statistics
    console.log('\n6. Testing GET /applications/stats');
    const statsResponse = await axios.get(`${BASE_URL}/applications/stats`);
    console.log('✅ Application statistics:', statsResponse.data);
    
    // Test getting individual application (if any exist)
    if (allResponse.data.length > 0) {
      const firstApp = allResponse.data[0];
      console.log(`\n7. Testing GET /applications/${firstApp.id}`);
      const individualResponse = await axios.get(`${BASE_URL}/applications/${firstApp.id}`);
      console.log(`✅ Individual application: ${individualResponse.data.fullName}`);
    }
    
    console.log('\n🎉 All tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run the tests
testRoutes(); 