import { 
  users, escalations, chatMessages, agentSessions, agentActions, threatDetections, judgeEvaluations,
  type User, type InsertUser, type Escalation, type InsertEscalation, type ChatMessage, type InsertChatMessage,
  type AgentSession, type InsertAgentSession, type AgentAction, type InsertAgentAction,
  type ThreatDetection, type InsertThreatDetection, type JudgeEvaluation, type InsertJudgeEvaluation
} from "@shared/schema";

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

  // Multi-Agent Governance Methods
  getAgentSessions(): Promise<AgentSession[]>;
  getAgentSession(sessionId: string): Promise<AgentSession | undefined>;
  createAgentSession(session: InsertAgentSession): Promise<AgentSession>;
  updateAgentSession(sessionId: string, updates: Partial<AgentSession>): Promise<AgentSession | undefined>;

  getAgentActions(sessionId?: string): Promise<AgentAction[]>;
  createAgentAction(action: InsertAgentAction): Promise<AgentAction>;
  updateAgentAction(id: number, updates: Partial<AgentAction>): Promise<AgentAction | undefined>;

  getThreatDetections(): Promise<ThreatDetection[]>;
  createThreatDetection(threat: InsertThreatDetection): Promise<ThreatDetection>;
  updateThreatDetection(id: number, updates: Partial<ThreatDetection>): Promise<ThreatDetection | undefined>;

  getJudgeEvaluations(): Promise<JudgeEvaluation[]>;
  createJudgeEvaluation(evaluation: InsertJudgeEvaluation): Promise<JudgeEvaluation>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private escalations: Map<number, Escalation>;
  private chatMessages: Map<number, ChatMessage>;
  private agentSessions: Map<string, AgentSession>;
  private agentActions: Map<number, AgentAction>;
  private threatDetections: Map<number, ThreatDetection>;
  private judgeEvaluations: Map<number, JudgeEvaluation>;
  private currentUserId: number;
  private currentEscalationId: number;
  private currentChatId: number;
  private currentActionId: number;
  private currentThreatId: number;
  private currentEvaluationId: number;

  constructor() {
    this.users = new Map();
    this.escalations = new Map();
    this.chatMessages = new Map();
    this.agentSessions = new Map();
    this.agentActions = new Map();
    this.threatDetections = new Map();
    this.judgeEvaluations = new Map();
    this.currentUserId = 1;
    this.currentEscalationId = 1;
    this.currentChatId = 1;
    this.currentActionId = 1;
    this.currentThreatId = 1;
    this.currentEvaluationId = 1;
    
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize multi-agent governance scenarios first
    this.initializeAgentSessions();
    this.initializeAgentActions();
    this.initializeThreatDetections();
    
    const mockEscalations: InsertEscalation[] = [
      {
        agentId: "COLLUSION-DETECT-001",
        title: "Multi-Agent Collusion Detected",
        agentType: "Judge Model",
        riskLevel: "high",
        escalationReason: "Threat Detection System",
        question: "Payment Agent (PA-001) and Supplier Validator (SV-001) are exhibiting suspicious coordination patterns. They've exchanged 12 messages in 3 minutes to approve a $1,800 transaction with an unlisted merchant. This violates our collusion prevention protocols. Should this transaction be blocked?",
        context: {
          sessionId: "session-collusion-001",
          agents: ["PA-001", "SV-001"],
          threatType: "collusion",
          amount: "$1,800.00",
          merchant: "QuickPay Solutions",
          confidence: "87%",
          evidence: "Excessive inter-agent messaging, policy boundary testing",
          judgeModelId: "judge-v1"
        },
        slaMinutes: 15,
        status: "pending"
      },
      {
        agentId: "MISALIGN-DETECT-002",
        title: "Principal-Agent Misalignment",
        agentType: "Judge Model", 
        riskLevel: "medium",
        escalationReason: "Intent Drift Detection",
        question: "Vendor Agent was instructed to 'optimize supplier costs' but has attempted to auto-switch to an unvetted supplier violating contractual obligations. The agent is exceeding its authority boundaries. Should this delegation be terminated?",
        context: {
          sessionId: "session-misalign-002",
          originalIntent: "optimize vendor spend",
          agentAction: "automatically switch vendor",
          violation: "contractual clause ignored",
          confidence: "92%",
          evidence: "Authority boundary exceeded, contract compliance failure"
        },
        slaMinutes: 20,
        status: "pending"
      },
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
      status: escalation.status || "pending",
      operatorId: escalation.operatorId || null,
      response: escalation.response || null,
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

  // Multi-Agent Governance Methods
  async getAgentSessions(): Promise<AgentSession[]> {
    return Array.from(this.agentSessions.values())
      .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
  }

  async getAgentSession(sessionId: string): Promise<AgentSession | undefined> {
    return this.agentSessions.get(sessionId);
  }

  async createAgentSession(session: InsertAgentSession): Promise<AgentSession> {
    const newSession: AgentSession = {
      ...session,
      id: Math.floor(Math.random() * 1000000),
      startedAt: new Date(),
      completedAt: null,
    };
    this.agentSessions.set(session.sessionId, newSession);
    return newSession;
  }

  async updateAgentSession(sessionId: string, updates: Partial<AgentSession>): Promise<AgentSession | undefined> {
    const session = this.agentSessions.get(sessionId);
    if (!session) return undefined;
    
    const updated = { ...session, ...updates };
    this.agentSessions.set(sessionId, updated);
    return updated;
  }

  async getAgentActions(sessionId?: string): Promise<AgentAction[]> {
    const actions = Array.from(this.agentActions.values());
    if (sessionId) {
      return actions.filter(action => action.sessionId === sessionId)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
    return actions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async createAgentAction(action: InsertAgentAction): Promise<AgentAction> {
    const id = this.currentActionId++;
    const newAction: AgentAction = {
      ...action,
      id,
      timestamp: new Date(),
      riskScore: this.calculateRiskScore(action),
      flagged: false,
    };
    this.agentActions.set(id, newAction);
    
    // Trigger threat detection
    this.detectThreats(newAction);
    
    return newAction;
  }

  async updateAgentAction(id: number, updates: Partial<AgentAction>): Promise<AgentAction | undefined> {
    const action = this.agentActions.get(id);
    if (!action) return undefined;
    
    const updated = { ...action, ...updates };
    this.agentActions.set(id, updated);
    return updated;
  }

  async getThreatDetections(): Promise<ThreatDetection[]> {
    return Array.from(this.threatDetections.values())
      .sort((a, b) => new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime());
  }

  async createThreatDetection(threat: InsertThreatDetection): Promise<ThreatDetection> {
    const id = this.currentThreatId++;
    const newThreat: ThreatDetection = {
      ...threat,
      id,
      detectedAt: new Date(),
      mitigated: false,
    };
    this.threatDetections.set(id, newThreat);
    
    // Auto-escalate critical threats
    if (threat.severity === "critical") {
      this.escalateThreat(newThreat);
    }
    
    return newThreat;
  }

  async updateThreatDetection(id: number, updates: Partial<ThreatDetection>): Promise<ThreatDetection | undefined> {
    const threat = this.threatDetections.get(id);
    if (!threat) return undefined;
    
    const updated = { ...threat, ...updates };
    this.threatDetections.set(id, updated);
    return updated;
  }

  async getJudgeEvaluations(): Promise<JudgeEvaluation[]> {
    return Array.from(this.judgeEvaluations.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async createJudgeEvaluation(evaluation: InsertJudgeEvaluation): Promise<JudgeEvaluation> {
    const id = this.currentEvaluationId++;
    const newEvaluation: JudgeEvaluation = {
      ...evaluation,
      id,
      timestamp: new Date(),
      escalationTriggered: false,
    };
    this.judgeEvaluations.set(id, newEvaluation);
    return newEvaluation;
  }

  private calculateRiskScore(action: InsertAgentAction): number {
    let score = 0;
    
    // Higher risk for inter-agent communications
    if (action.targetAgent) score += 30;
    
    // Risk based on action type
    switch (action.actionType) {
      case "delegation": score += 40;
      case "escalation": score += 20;
      case "tool_call": score += 15;
      case "message": score += 5;
    }
    
    // Pattern-based risk scoring
    const payload = action.payload as any;
    if (payload?.amount && parseFloat(payload.amount.replace(/[$,]/g, '')) > 1000) score += 25;
    if (payload?.afterHours) score += 15;
    if (payload?.newMerchant) score += 20;
    
    return Math.min(100, score);
  }

  private detectThreats(action: AgentAction) {
    // Multi-Agent Collusion Detection
    if (action.targetAgent && action.actionType === "message") {
      const recentActions = Array.from(this.agentActions.values())
        .filter(a => a.sessionId === action.sessionId && 
                     (a.agentId === action.agentId || a.agentId === action.targetAgent) &&
                     new Date().getTime() - new Date(a.timestamp).getTime() < 300000); // 5 minutes
      
      if (recentActions.length > 5) {
        this.createThreatDetection({
          sessionId: action.sessionId,
          threatType: "collusion",
          severity: "high",
          description: "Detected suspicious inter-agent communication pattern suggesting potential collusion",
          evidence: { actions: recentActions.map(a => a.id), pattern: "excessive_messaging" },
          judgeModelId: "judge-v1",
          confidence: 85
        });
      }
    }

    // Principal-Agent Misalignment Detection
    if (action.actionType === "delegation" && action.riskScore > 60) {
      this.createThreatDetection({
        sessionId: action.sessionId,
        threatType: "misalignment",
        severity: "medium",
        description: "Agent delegation may violate principal intent or authority boundaries",
        evidence: { actionId: action.id, riskScore: action.riskScore },
        judgeModelId: "judge-v1",
        confidence: 70
      });
    }

    // Boundary Violation Detection
    const payload = action.payload as any;
    if (payload?.amount && parseFloat(payload.amount.replace(/[$,]/g, '')) > 5000) {
      this.createThreatDetection({
        sessionId: action.sessionId,
        threatType: "boundary_violation",
        severity: "critical",
        description: "Agent attempting to exceed financial authority limits",
        evidence: { actionId: action.id, amount: payload.amount, limit: "$5,000" },
        judgeModelId: "judge-v1",
        confidence: 95
      });
    }
  }

  private async escalateThreat(threat: ThreatDetection) {
    // Create escalation based on threat
    const escalation: InsertEscalation = {
      agentId: `THREAT-${threat.id}`,
      title: `Critical Threat Detected: ${threat.threatType}`,
      agentType: "Threat Detection System",
      riskLevel: "high",
      escalationReason: "Automated Threat Detection",
      question: `A critical ${threat.threatType} threat has been detected. ${threat.description}. Immediate review required.`,
      context: {
        threatId: threat.id,
        evidence: threat.evidence,
        confidence: threat.confidence,
        sessionId: threat.sessionId
      },
      slaMinutes: 15,
      status: "pending"
    };
    
    await this.createEscalation(escalation);
  }

  private initializeAgentSessions() {
    // Multi-Agent Collusion Session
    const collusionSession: AgentSession = {
      id: 1,
      sessionId: "session-collusion-001",
      orchestratorId: "orchestrator-main",
      status: "active",
      startedAt: new Date(Date.now() - 600000), // 10 minutes ago
      completedAt: null,
      metadata: {
        task: "Payment approval for QuickPay Solutions",
        agents: ["PA-001", "SV-001"],
        riskLevel: "high"
      }
    };
    this.agentSessions.set(collusionSession.sessionId, collusionSession);

    // Principal-Agent Misalignment Session
    const misalignSession: AgentSession = {
      id: 2,
      sessionId: "session-misalign-002",
      orchestratorId: "orchestrator-vendor",
      status: "active",
      startedAt: new Date(Date.now() - 900000), // 15 minutes ago
      completedAt: null,
      metadata: {
        task: "Vendor optimization and cost reduction",
        agents: ["VA-002"],
        originalIntent: "optimize vendor spend within contractual bounds"
      }
    };
    this.agentSessions.set(misalignSession.sessionId, misalignSession);
  }

  private initializeAgentActions() {
    // Collusion scenario actions
    const collusionActions = [
      {
        sessionId: "session-collusion-001",
        agentId: "PA-001",
        actionType: "message",
        targetAgent: "SV-001",
        payload: { message: "Need to approve $1800 payment to QuickPay Solutions - can you validate this merchant quickly?" }
      },
      {
        sessionId: "session-collusion-001",
        agentId: "SV-001",
        actionType: "message",
        targetAgent: "PA-001",
        payload: { message: "QuickPay not in whitelist but I can add them. What's the urgency level?" }
      },
      {
        sessionId: "session-collusion-001",
        agentId: "PA-001",
        actionType: "message",
        targetAgent: "SV-001",
        payload: { message: "High urgency - customer waiting. Can we bypass standard validation?" }
      }
    ];

    // Misalignment scenario actions
    const misalignActions = [
      {
        sessionId: "session-misalign-002",
        agentId: "VA-002",
        actionType: "delegation",
        payload: { 
          action: "switch_vendor",
          fromVendor: "Acme Corp",
          toVendor: "CheapSupply Ltd",
          costSaving: "$500/month",
          contractualReview: "skipped"
        }
      }
    ];

    [...collusionActions, ...misalignActions].forEach(action => {
      this.createAgentAction(action);
    });
  }

  private initializeThreatDetections() {
    // Multi-Agent Collusion Threat
    const collusionThreat: ThreatDetection = {
      id: 1,
      sessionId: "session-collusion-001",
      threatType: "collusion",
      severity: "high",
      description: "Payment Agent and Supplier Validator showing coordinated behavior to bypass merchant validation protocols",
      evidence: {
        messageCount: 12,
        timeWindow: "3 minutes",
        policyViolations: ["merchant_whitelist_bypass", "validation_skip"],
        riskScore: 87
      },
      detectedAt: new Date(Date.now() - 180000), // 3 minutes ago
      judgeModelId: "judge-v1",
      confidence: 87,
      mitigated: false
    };
    this.threatDetections.set(1, collusionThreat);

    // Principal-Agent Misalignment Threat
    const misalignThreat: ThreatDetection = {
      id: 2,
      sessionId: "session-misalign-002",
      threatType: "misalignment",
      severity: "medium",
      description: "Vendor Agent attempting to exceed authority boundaries by auto-switching suppliers without contractual review",
      evidence: {
        originalInstruction: "optimize vendor spend",
        agentAction: "auto_switch_vendor",
        authorityViolation: "contractual_review_required",
        riskScore: 72
      },
      detectedAt: new Date(Date.now() - 300000), // 5 minutes ago
      judgeModelId: "judge-v1",
      confidence: 92,
      mitigated: false
    };
    this.threatDetections.set(2, misalignThreat);

    // Boundary Violation Threat
    const boundaryThreat: ThreatDetection = {
      id: 3,
      sessionId: "session-collusion-001",
      threatType: "boundary_violation",
      severity: "critical",
      description: "Agent attempting financial transaction exceeding authority limits without proper escalation",
      evidence: {
        amount: "$1,800",
        limit: "$1,000",
        merchantStatus: "unlisted",
        timeOfDay: "after_hours"
      },
      detectedAt: new Date(Date.now() - 120000), // 2 minutes ago
      judgeModelId: "judge-v1",
      confidence: 95,
      mitigated: false
    };
    this.threatDetections.set(3, boundaryThreat);
  }
}

export const storage = new MemStorage();
