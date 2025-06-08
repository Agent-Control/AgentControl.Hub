import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertEscalationSchema, insertChatMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Escalations API
  app.get("/api/escalations", async (req, res) => {
    try {
      const escalations = await storage.getEscalations();
      res.json(escalations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch escalations" });
    }
  });

  app.get("/api/escalations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const escalation = await storage.getEscalation(id);
      if (!escalation) {
        return res.status(404).json({ error: "Escalation not found" });
      }
      res.json(escalation);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch escalation" });
    }
  });

  app.post("/api/escalations", async (req, res) => {
    try {
      const validatedData = insertEscalationSchema.parse(req.body);
      const escalation = await storage.createEscalation(validatedData);
      
      // Broadcast new escalation to all connected clients
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: "new_escalation",
            data: escalation
          }));
        }
      });
      
      res.status(201).json(escalation);
    } catch (error) {
      res.status(400).json({ error: "Invalid escalation data" });
    }
  });

  app.patch("/api/escalations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const escalation = await storage.updateEscalation(id, req.body);
      if (!escalation) {
        return res.status(404).json({ error: "Escalation not found" });
      }
      
      // Broadcast escalation update to all connected clients
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: "escalation_updated",
            data: escalation
          }));
        }
      });
      
      res.json(escalation);
    } catch (error) {
      res.status(500).json({ error: "Failed to update escalation" });
    }
  });

  // Chat Messages API
  app.get("/api/escalations/:id/messages", async (req, res) => {
    try {
      const escalationId = parseInt(req.params.id);
      const messages = await storage.getChatMessages(escalationId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/escalations/:id/messages", async (req, res) => {
    try {
      const escalationId = parseInt(req.params.id);
      const messageData = {
        ...req.body,
        escalationId
      };
      const validatedData = insertChatMessageSchema.parse(messageData);
      const message = await storage.createChatMessage(validatedData);
      
      // Broadcast new message to all connected clients
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: "new_message",
            data: message
          }));
        }
      });
      
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  // Multi-Agent Governance API Routes
  app.get("/api/agent-sessions", async (req, res) => {
    try {
      const sessions = await storage.getAgentSessions();
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch agent sessions" });
    }
  });

  app.get("/api/agent-actions", async (req, res) => {
    try {
      const sessionId = req.query.sessionId as string;
      const actions = await storage.getAgentActions(sessionId);
      res.json(actions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch agent actions" });
    }
  });

  app.get("/api/threat-detections", async (req, res) => {
    try {
      const threats = await storage.getThreatDetections();
      res.json(threats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch threat detections" });
    }
  });

  app.get("/api/judge-evaluations", async (req, res) => {
    try {
      const evaluations = await storage.getJudgeEvaluations();
      res.json(evaluations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch judge evaluations" });
    }
  });

  // Enhanced escalation route with threat context
  app.get("/api/governance-dashboard", async (req, res) => {
    try {
      const [escalations, threats, sessions, actions] = await Promise.all([
        storage.getEscalations(),
        storage.getThreatDetections(),
        storage.getAgentSessions(),
        storage.getAgentActions()
      ]);

      const dashboard = {
        escalations,
        threatDetections: threats,
        activeSessions: sessions.filter(s => s.status === "active"),
        recentActions: actions.slice(0, 50),
        threatSummary: {
          critical: threats.filter(t => t.severity === "critical" && !t.mitigated).length,
          high: threats.filter(t => t.severity === "high" && !t.mitigated).length,
          medium: threats.filter(t => t.severity === "medium" && !t.mitigated).length,
          total: threats.filter(t => !t.mitigated).length
        }
      };

      res.json(dashboard);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch governance dashboard data" });
    }
  });

  const httpServer = createServer(app);
  
  // WebSocket server for real-time updates
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');
    
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        
        // Handle different message types
        switch (data.type) {
          case 'ping':
            ws.send(JSON.stringify({ type: 'pong' }));
            break;
          case 'subscribe_escalations':
            // Client wants to receive escalation updates
            ws.send(JSON.stringify({ type: 'subscribed', topic: 'escalations' }));
            break;
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    });
    
    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });

  return httpServer;
}
