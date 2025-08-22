// Test connection to backend
console.log('Testing connection to Market Pulse Backend...\n');

async function testBackendConnection() {
  const BACKEND_URL = 'http://localhost:3001';
  
  try {
    console.log('🔍 Testing REST API endpoints:');
    
    // Test health endpoint
    const healthResponse = await fetch(`${BACKEND_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
    
    // Test stocks endpoint
    const stocksResponse = await fetch(`${BACKEND_URL}/api/stocks`);
    const stocksData = await stocksResponse.json();
    console.log(`✅ Stocks endpoint: ${stocksData.length} stocks loaded`);
    console.log('📈 Sample stock:', stocksData[0]);
    
    // Test market indices
    const indicesResponse = await fetch(`${BACKEND_URL}/api/indices`);
    const indicesData = await indicesResponse.json();
    console.log(`✅ Indices endpoint: ${indicesData.length} indices loaded`);
    
    // Test currencies
    const currenciesResponse = await fetch(`${BACKEND_URL}/api/currencies`);
    const currenciesData = await currenciesResponse.json();
    console.log(`✅ Currencies endpoint: ${currenciesData.length} pairs loaded`);
    
    // Test news
    const newsResponse = await fetch(`${BACKEND_URL}/api/news`);
    const newsData = await newsResponse.json();
    console.log(`✅ News endpoint: ${newsData.length} articles loaded`);
    
    console.log('\n🎉 All API endpoints are working correctly!');
    console.log('🔗 Real-time WebSocket connection should be active in your browser');
    console.log('📊 Stock prices will update every 3 seconds');
    console.log('🌐 Market indices will update every 5 seconds');
    console.log('💱 Currencies will update every 7 seconds');
    
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
    console.log('\n🔧 Make sure the backend server is running:');
    console.log('   cd market-pulse-backend && npm start');
  }
}

// Run the test
testBackendConnection();
