const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Your URLs
const urls = [
  'https://nexusv1-v.hf.space',      // your main website
  'https://xxpingah.onrender.com'   // your deployed server URL
];

// Special API to fetch
const specialApi = 'https://nexusv1-v.hf.space/who/Reiker';

// Fly.io style headers for keeping alive
const headers = {
  'User-Agent': 'Mozilla/5.0 (compatible; uptime-bot/1.0; +https://fly.io/)',
  'Connection': 'keep-alive',
  'Accept': '*/*'
};

// Alive endpoint
app.get('/', (req, res) => {
  res.send('Alive');
});

// Optional: expose the API fetched content manually too
app.get('/api/fetch', async (req, res) => {
  try {
    const response = await axios.get(specialApi, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Ping function
async function pingUrls() {
  for (const url of urls) {
    try {
      const response = await axios.get(url, { headers });
      console.log(`[${new Date().toISOString()}] Pinged ${url} | Status: ${response.status}`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Error pinging ${url}: ${error.message}`);
    }
  }

  // Fetch the special API separately
  try {
    const response = await axios.get(specialApi, { headers });
    console.log(`[${new Date().toISOString()}] Fetched Special API Data:`);
    console.log(response.data);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error fetching special API: ${error.message}`);
  }
}

// Ping every 5 minutes
setInterval(pingUrls, 300000);

// Immediately ping when server starts
pingUrls();
