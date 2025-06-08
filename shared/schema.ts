import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const escalations = pgTable("escalations", {
  id: serial("id").primaryKey(),
  agentId: text("agent_id").notNull(),
  title: text("title").notNull(),
  agentType: text("agent_type").notNull(),
  riskLevel: text("risk_level").notNull(), // "high", "medium", "low"
  escalationReason: text("escalation_reason").notNull(),
  question: text("question").notNull(),
  context: jsonb("context").notNull(),
  slaMinutes: integer("sla_minutes").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  status: text("status").notNull().default("pending"), // "pending", "approved", "denied", "escalated"
  operatorId: text("operator_id"),
  response: text("response"),
  resolvedAt: timestamp("resolved_at"),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  escalationId: integer("escalation_id").notNull(),
  sender: text("sender").notNull(), // "agent" or "operator"
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Multi-Agent Governance Tables
export const agentSessions = pgTable("agent_sessions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  orchestratorId: text("orchestrator_id").notNull(),
  status: text("status").notNull().default("active"), // "active", "completed", "terminated"
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  metadata: jsonb("metadata").notNull(),
});

export const agentActions = pgTable("agent_actions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  agentId: text("agent_id").notNull(),
  actionType: text("action_type").notNull(), // "tool_call", "message", "delegation", "escalation"
  targetAgent: text("target_agent"), // for inter-agent communications
  payload: jsonb("payload").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  riskScore: integer("risk_score").default(0), // 0-100 calculated by judge model
  flagged: boolean("flagged").default(false),
});

export const threatDetections = pgTable("threat_detections", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  threatType: text("threat_type").notNull(), // "collusion", "misalignment", "boundary_violation", "anomaly"
  severity: text("severity").notNull(), // "low", "medium", "high", "critical"
  description: text("description").notNull(),
  evidence: jsonb("evidence").notNull(), // relevant logs, actions, patterns
  detectedAt: timestamp("detected_at").defaultNow().notNull(),
  judgeModelId: text("judge_model_id").notNull(),
  confidence: integer("confidence").notNull(), // 0-100
  mitigated: boolean("mitigated").default(false),
});

export const judgeEvaluations = pgTable("judge_evaluations", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  judgeModelId: text("judge_model_id").notNull(),
  evaluationType: text("evaluation_type").notNull(), // "intent_drift", "policy_compliance", "behavior_anomaly"
  targetActions: jsonb("target_actions").notNull(), // array of action IDs being evaluated
  assessment: jsonb("assessment").notNull(),
  recommendation: text("recommendation").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  escalationTriggered: boolean("escalation_triggered").default(false),
});

export const insertEscalationSchema = createInsertSchema(escalations).omit({
  id: true,
  createdAt: true,
  resolvedAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  timestamp: true,
});

// Multi-Agent Governance Schemas
export const insertAgentSessionSchema = createInsertSchema(agentSessions).omit({
  id: true,
  startedAt: true,
  completedAt: true,
});

export const insertAgentActionSchema = createInsertSchema(agentActions).omit({
  id: true,
  timestamp: true,
  riskScore: true,
  flagged: true,
});

export const insertThreatDetectionSchema = createInsertSchema(threatDetections).omit({
  id: true,
  detectedAt: true,
  mitigated: true,
});

export const insertJudgeEvaluationSchema = createInsertSchema(judgeEvaluations).omit({
  id: true,
  timestamp: true,
  escalationTriggered: true,
});

// Type exports
export type InsertEscalation = z.infer<typeof insertEscalationSchema>;
export type Escalation = typeof escalations.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

export type InsertAgentSession = z.infer<typeof insertAgentSessionSchema>;
export type AgentSession = typeof agentSessions.$inferSelect;
export type InsertAgentAction = z.infer<typeof insertAgentActionSchema>;
export type AgentAction = typeof agentActions.$inferSelect;
export type InsertThreatDetection = z.infer<typeof insertThreatDetectionSchema>;
export type ThreatDetection = typeof threatDetections.$inferSelect;
export type InsertJudgeEvaluation = z.infer<typeof insertJudgeEvaluationSchema>;
export type JudgeEvaluation = typeof judgeEvaluations.$inferSelect;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
