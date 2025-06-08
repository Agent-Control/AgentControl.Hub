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