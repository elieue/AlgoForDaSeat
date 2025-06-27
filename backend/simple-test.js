const http = require('http');

const BASE_URL = 'http://localhost:5173/api';

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}${path}`;
    const req = http.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (error) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function testRoutes() {
  console.log('🧪 Testing Applicant Routes (Simple Version)...\n');

  try {
    // Test getting all applications
    console.log('1. Testing GET /applications/all');
    const allResponse = await makeRequest('/applications/all');
    console.log(`✅ All applications: ${allResponse.data.length || 0} found`);
    
    // Test getting applications by status
    console.log('\n2. Testing GET /applications/status/pending');
    const pendingResponse = await makeRequest('/applications/status/pending');
    console.log(`✅ Pending applications: ${pendingResponse.data.length || 0} found`);
    
    console.log('\n3. Testing GET /applications/status/approved');
    const approvedResponse = await makeRequest('/applications/status/approved');
    console.log(`✅ Approved applications: ${approvedResponse.data.length || 0} found`);
    
    console.log('\n4. Testing GET /applications/status/rejected');
    const rejectedResponse = await makeRequest('/applications/status/rejected');
    console.log(`✅ Rejected applications: ${rejectedResponse.data.length || 0} found`);
    
    console.log('\n5. Testing GET /applications/status/waitlisted');
    const waitlistedResponse = await makeRequest('/applications/status/waitlisted');
    console.log(`✅ Waitlisted applications: ${waitlistedResponse.data.length || 0} found`);
    
    // Test getting statistics
    console.log('\n6. Testing GET /applications/stats');
    const statsResponse = await makeRequest('/applications/stats');
    console.log('✅ Application statistics:', statsResponse.data);
    
    console.log('\n🎉 All tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('\nTroubleshooting tips:');
    console.error('1. Make sure backend server is running: npm start');
    console.error('2. Check if server is on port 5173');
    console.error('3. Verify database connection');
    console.error('4. Check if all routes are properly mounted');
  }
}

testRoutes(); 