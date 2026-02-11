import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

// All backend servers (source of truth)
const allServers = [
  'http://localhost:8081',
  'http://localhost:8082'
];

// Active (healthy) servers
let activeServers = [...allServers];

// Round robin index
let currentIndex = 0;

console.log("Active servers:", activeServers);
console.log("Chosen server:", server);
 //  Round Robin Logic
function getNextServer() {
  if (activeServers.length === 0) {
    return null;
  }

  const server = activeServers[currentIndex];
  currentIndex = (currentIndex + 1) % activeServers.length;
  console.log(currentIndex)
  return server;
}


// Health Check Logic

async function checkHealth() {
  for (const server of allServers) {
    try {
      const response = await axios.get(server + '/health', { timeout: 2000 });

      if (response.status === 200) {
        // Add back if not already active
        if (!activeServers.includes(server)) {
          console.log(`✅ ${server} is back online`);
          activeServers.push(server);
        }
      }
    } catch (error) {
      // Remove if currently active
      if (activeServers.includes(server)) {
        console.log(`❌ ${server} is down`);
        activeServers = activeServers.filter(s => s !== server);
      }
    }
  }
}

// Run health check every 5 seconds
setInterval(checkHealth, 5000);

// Initial check
checkHealth();

// logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// catch-all proxy server logic
app.use(async (req, res) => {
  const server = getNextServer();

  if (!server) {
    return res.status(503).send('No healthy backend servers available');
  }

  try {
    const response = await axios({
      method: req.method,
      url: server + req.url,
      data: req.body,
      headers: {
        ...req.headers,
        host: undefined // prevent host header conflict
      },
      timeout: 5000
    });

    res.status(response.status).send(response.data);

  } catch (error) {
    console.error(`Error forwarding to ${server}:`, error.message);
    res.status(502).send('Bad Gateway');
  }
});

// start server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Load balancer running on port ${PORT}`);
});
