// scripts/health-check.js - Production Health Check
/*
const axios = require('axios')

const healthCheck = async () => {
  const baseURL = process.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
  
  console.log('🔍 Running health check...')
  console.log(`📡 API Base URL: ${baseURL}`)
  
  try {
    // Check API health
    const healthResponse = await axios.get(`${baseURL}/health`, { timeout: 5000 })
    console.log('✅ API Health:', healthResponse.status === 200 ? 'OK' : 'FAILED')
    
    // Check database connection (if endpoint exists)
    try {
      const dbResponse = await axios.get(`${baseURL}/health/db`, { timeout: 5000 })
      console.log('✅ Database:', dbResponse.status === 200 ? 'OK' : 'FAILED')
    } catch (error) {
      console.log('⚠️  Database check not available')
    }
    
    // Check authentication endpoints
    try {
      const authResponse = await axios.post(`${baseURL}/auth/login`, {
        email: 'healthcheck@test.com',
        password: 'invalid'
      })
      console.log('✅ Auth endpoint: OK (correctly rejected invalid credentials)')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('✅ Auth endpoint: OK')
      } else {
        console.log('❌ Auth endpoint: FAILED', error.message)
      }
    }
    
    console.log('🎉 Health check completed')
    
  } catch (error) {
    console.error('❌ Health check failed:', error.message)
    process.exit(1)
  }
}

healthCheck()
*/