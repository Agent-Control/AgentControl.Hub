import { users, escalations, chatMessages, type User, type InsertUser, type Escalation, type InsertEscalation, type ChatMessage, type InsertChatMessage } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getEscalations(): Promise<Escalation[]>;
  getEscalation(id: number): Promise<Escalation | undefined>;
  createEscalation(escalation: InsertEscalation): Promise<Escalation>;
  updateEscalation(id: number, updates: Partial<Escalation>): Promise<Escalation | undefined>;
  
  getChatMessages(escalationId: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private escalations: Map<number, Escalation>;
  private chatMessages: Map<number, ChatMessage>;
  private currentUserId: number;
  private currentEscalationId: number;
  private currentChatId: number;

  constructor() {
    this.users = new Map();
    this.escalations = new Map();
    this.chatMessages = new Map();
    this.currentUserId = 1;
    this.currentEscalationId = 1;
    this.currentChatId = 1;
    
    // Initialize with mock escalations
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockEscalations: InsertEscalation[] = [
      {
        agentId: "PA-2024-001",
        title: "Payment Authorization Required",
        agentType: "Payment Agent",
        riskLevel: "high",
        escalationReason: "Low Confidence",
        question: "This merchant is new (first transaction) and the amount exceeds after-hours policy limits. Risk indicators: unusual time, new recipient, amount threshold breach. Should I approve this payment?",
        context: {
          amount: "$2,900.00",
          merchant: "XYZ Imports Ltd.",
          time: "2:14 AM EST",
          confidence: "32%",
          riskFactors: ["New Merchant", "After Hours", "Amount Threshold"]
        },
        slaMinutes: 5,
        status: "pending"
      },
      {
        agentId: "FD-2024-007",
        title: "Suspicious Activity Detection",
        agentType: "Fraud Detection",
        riskLevel: "medium",
        escalationReason: "Unknown Entity",
        question: "User shows impossible travel pattern with multiple failed 2FA attempts. Should I temporarily lock the account or request additional verification?",
        context: {
          userAccount: "john.doe@company.com",
          pattern: "Rapid consecutive logins",
          anomalyScore: "74%",
          locationChange: "NYC → London (2 hours)",
          riskFactors: ["Impossible Travel", "Failed 2FA", "Rapid Logins"]
        },
        slaMinutes: 15,
        status: "pending"
      },
      {
        agentId: "CP-2024-012",
        title: "Policy Clarification Needed",
        agentType: "Compliance Agent",
        riskLevel: "low",
        escalationReason: "Policy Violation",
        question: "Contract includes remote work provision, but employee is requesting work from different country. Current policy doesn't explicitly cover international remote work. How should I proceed?",
        context: {
          documentType: "Employment Contract",
          jurisdiction: "California, US",
          edgeCase: "Remote worker clause",
          confidence: "89%",
          riskFactors: ["Policy Gap", "International Work", "High Confidence"]
        },
        slaMinutes: 30,
        status: "pending"
      },
      {
        agentId: "TE-2024-003",
        title: "Trade Execution Approval",
        agentType: "Trade Agent",
        riskLevel: "high",
        escalationReason: "Amount Threshold",
        question: "Large order size detected ($1.89M) with unusual market volatility. Order exceeds automated approval limits. Execute trade or wait for market stabilization?",
        context: {
          symbol: "AAPL",
          orderType: "Market Buy",
          quantity: "10,000 shares",
          estValue: "$1,890,000",
          riskFactors: ["Large Order", "High Volatility", "Approval Limit", "Time Sensitive"]
        },
        slaMinutes: 2,
        status: "pending"
      }
    ];

    mockEscalations.forEach(escalation => {
      this.createEscalation(escalation);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getEscalations(): Promise<Escalation[]> {
    return Array.from(this.escalations.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getEscalation(id: number): Promise<Escalation | undefined> {
    return this.escalations.get(id);
  }

  async createEscalation(escalation: InsertEscalation): Promise<Escalation> {
    const id = this.currentEscalationId++;
    const newEscalation: Escalation = {
      ...escalation,
      id,
      createdAt: new Date(),
      resolvedAt: null,
    };
    this.escalations.set(id, newEscalation);
    return newEscalation;
  }

  async updateEscalation(id: number, updates: Partial<Escalation>): Promise<Escalation | undefined> {
    const escalation = this.escalations.get(id);
    if (!escalation) return undefined;
    
    const updated = { ...escalation, ...updates };
    if (updates.status && updates.status !== "pending") {
      updated.resolvedAt = new Date();
    }
    
    this.escalations.set(id, updated);
    return updated;
  }

  async getChatMessages(escalationId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(msg => msg.escalationId === escalationId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatId++;
    const newMessage: ChatMessage = {
      ...message,
      id,
      timestamp: new Date(),
    };
    this.chatMessages.set(id, newMessage);
    return newMessage;
  }
}

export const storage = new MemStorage();
