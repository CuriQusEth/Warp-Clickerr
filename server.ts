import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  
  // MCP API
  app.get('/api/mcp', (req, res) => {
    res.json({
      protocol: "MCP",
      version: "1.0.0",
      name: "Warp Clicker MCP Endpoint",
      status: "active",
      description: "Active MCP server for Warp Clicker Orchestrator Agent",
      capabilities: ["click-automation", "warp-mechanics", "idle-progression", "efficient-farming"],
      timestamp: new Date().toISOString()
    });
  });

  app.post('/api/mcp', (req, res) => {
    try {
      const body = req.body;
      res.json({
        status: "success",
        message: "MCP command received",
        agent: "Warp Clicker Orchestrator",
        receivedAt: new Date().toISOString(),
        payload: body
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid MCP request" });
    }
  });

  // Agent API
  app.get('/api/agent', (req, res) => {
    res.json({
      name: "Warp Clicker Orchestrator",
      status: "active",
      wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
      platform: "Warp Clicker",
      version: "1.0.0"
    });
  });

  // Vite Integration for frontend
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
