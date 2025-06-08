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

export const insertEscalationSchema = createInsertSchema(escalations).omit({
  id: true,
  createdAt: true,
  resolvedAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  timestamp: true,
});

export type InsertEscalation = z.infer<typeof insertEscalationSchema>;
export type Escalation = typeof escalations.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;