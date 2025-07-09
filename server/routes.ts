import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertThreatSchema, insertDeviceSchema, insertVulnerabilitySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // WebSocket server for real-time updates
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');
    
    // Send initial data
    ws.send(JSON.stringify({ type: 'connected', message: 'WebSocket connected' }));
    
    // Send real-time updates every 5 seconds
    const interval = setInterval(async () => {
      if (ws.readyState === WebSocket.OPEN) {
        const stats = await storage.getDashboardStats();
        ws.send(JSON.stringify({ type: 'stats', data: stats }));
      }
    }, 5000);
    
    ws.on('close', () => {
      console.log('Client disconnected');
      clearInterval(interval);
    });
    
    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString());
        console.log('Received WebSocket message:', message);
        
        // Handle different message types
        switch (message.type) {
          case 'command':
            handleCommand(ws, message.data);
            break;
          case 'voice':
            handleVoiceCommand(ws, message.data);
            break;
          default:
            console.log('Unknown message type:', message.type);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });
  });

  // Dashboard API routes
  app.get('/api/dashboard/stats', async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get dashboard stats' });
    }
  });

  // Threats API
  app.get('/api/threats', async (req, res) => {
    try {
      const threats = await storage.getThreats();
      res.json(threats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get threats' });
    }
  });

  app.post('/api/threats', async (req, res) => {
    try {
      const threat = insertThreatSchema.parse(req.body);
      const newThreat = await storage.createThreat(threat);
      res.json(newThreat);
    } catch (error) {
      res.status(400).json({ error: 'Invalid threat data' });
    }
  });

  app.put('/api/threats/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const threat = insertThreatSchema.partial().parse(req.body);
      const updatedThreat = await storage.updateThreat(id, threat);
      if (!updatedThreat) {
        return res.status(404).json({ error: 'Threat not found' });
      }
      res.json(updatedThreat);
    } catch (error) {
      res.status(400).json({ error: 'Invalid threat data' });
    }
  });

  // Devices API
  app.get('/api/devices', async (req, res) => {
    try {
      const devices = await storage.getDevices();
      res.json(devices);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get devices' });
    }
  });

  app.post('/api/devices', async (req, res) => {
    try {
      const device = insertDeviceSchema.parse(req.body);
      const newDevice = await storage.createDevice(device);
      res.json(newDevice);
    } catch (error) {
      res.status(400).json({ error: 'Invalid device data' });
    }
  });

  // Vulnerabilities API
  app.get('/api/vulnerabilities', async (req, res) => {
    try {
      const vulnerabilities = await storage.getVulnerabilities();
      res.json(vulnerabilities);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get vulnerabilities' });
    }
  });

  app.post('/api/vulnerabilities', async (req, res) => {
    try {
      const vulnerability = insertVulnerabilitySchema.parse(req.body);
      const newVulnerability = await storage.createVulnerability(vulnerability);
      res.json(newVulnerability);
    } catch (error) {
      res.status(400).json({ error: 'Invalid vulnerability data' });
    }
  });

  // Security Modules API
  app.get('/api/security-modules', async (req, res) => {
    try {
      const modules = await storage.getSecurityModules();
      res.json(modules);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get security modules' });
    }
  });

  // Honeypots API
  app.get('/api/honeypots', async (req, res) => {
    try {
      const honeypots = await storage.getHoneypots();
      res.json(honeypots);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get honeypots' });
    }
  });

  // Forensic Cases API
  app.get('/api/forensic-cases', async (req, res) => {
    try {
      const cases = await storage.getForensicCases();
      res.json(cases);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get forensic cases' });
    }
  });

  // Neural Networks API
  app.get('/api/neural-networks', async (req, res) => {
    try {
      const networks = await storage.getNeuralNetworks();
      res.json(networks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get neural networks' });
    }
  });

  // Quantum Simulations API
  app.get('/api/quantum-simulations', async (req, res) => {
    try {
      const simulations = await storage.getQuantumSimulations();
      res.json(simulations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get quantum simulations' });
    }
  });

  return httpServer;
}

function handleCommand(ws: WebSocket, command: string) {
  // Handle command palette commands
  console.log('Handling command:', command);
  
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ 
      type: 'command-result', 
      data: { command, result: 'Command executed successfully' } 
    }));
  }
}

function handleVoiceCommand(ws: WebSocket, voiceData: any) {
  // Handle voice commands
  console.log('Handling voice command:', voiceData);
  
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ 
      type: 'voice-result', 
      data: { result: 'Voice command processed' } 
    }));
  }
}
