#!/usr/bin/env node

const https = require('https');

// Configuration
const SUPABASE_ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const PROJECT_REF = 'rpooyvdesvbgivxzbwad';
const SITE_URL = 'https://base-plus-2x4glwnlu-marshall-smiths-projects.vercel.app';

if (!SUPABASE_ACCESS_TOKEN) {
  console.error('❌ Error: SUPABASE_ACCESS_TOKEN environment variable is required');
  console.log('📝 To get your access token:');
  console.log('1. Go to https://supabase.com/dashboard/account/tokens');
  console.log('2. Create a new access token');
  console.log('3. Run: export SUPABASE_ACCESS_TOKEN=your_token_here');
  process.exit(1);
}

async function updateSupabaseConfig() {
  const data = JSON.stringify({
    site_url: SITE_URL,
    redirect_urls: [
      `${SITE_URL}/auth/callback`,
      `${SITE_URL}/auth/update-password`,
      `${SITE_URL}/dashboard`
    ]
  });

  const options = {
    hostname: 'api.supabase.com',
    port: 443,
    path: `/v1/projects/${PROJECT_REF}/auth/config`,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${SUPABASE_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('✅ Successfully updated Supabase configuration!');
          console.log('📧 Site URL:', SITE_URL);
          console.log('🔄 Redirect URLs:');
          console.log(`   - ${SITE_URL}/auth/callback`);
          console.log(`   - ${SITE_URL}/auth/update-password`);
          console.log(`   - ${SITE_URL}/dashboard`);
          resolve(responseData);
        } else {
          console.error('❌ Error updating configuration:', res.statusCode);
          console.error('Response:', responseData);
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request error:', error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// Run the update
updateSupabaseConfig()
  .then(() => {
    console.log('\n🎉 Configuration updated successfully!');
    console.log('📝 Next steps:');
    console.log('1. Test signup with a new user');
    console.log('2. Check that email links use the production URL');
    console.log('3. Verify redirects work correctly');
  })
  .catch((error) => {
    console.error('❌ Failed to update configuration:', error.message);
    process.exit(1);
  });
