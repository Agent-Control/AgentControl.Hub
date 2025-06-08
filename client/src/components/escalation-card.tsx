import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Shield, FileText, TrendingUp, Check, X, Edit, MessageCircle, Clock } from "lucide-react";
import type { Escalation } from "@shared/schema";
import { useEffect, useState } from "react";

interface EscalationCardProps {
  escalation: Escalation;
  onApprove: (id: number) => void;
  onDeny: (id: number) => void;
  onEdit: (id: number) => void;
  onChat: (escalation: Escalation) => void;
}

const getAgentIcon = (agentType: string) => {
  switch (agentType) {
    case "Payment Agent":
      return CreditCard;
    case "Fraud Detection":
      return Shield;
    case "Compliance Agent":
      return FileText;
    case "Trade Agent":
      return TrendingUp;
    default:
      return CreditCard;
  }
};

const getRiskColor = (riskLevel: string) => {
  switch (riskLevel) {
    case "high":
      return "border-danger";
    case "medium":
      return "border-warning";
    case "low":
      return "border-info";
    default:
      return "border-gray-300";
  }
};

const getRiskBadgeColor = (riskLevel: string) => {
  switch (riskLevel) {
    case "high":
      return "bg-danger text-white";
    case "medium":
      return "bg-warning text-black";
    case "low":
      return "bg-info text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

function formatTimeRemaining(createdAt: Date, slaMinutes: number): string {
  const now = new Date();
  const elapsed = Math.floor((now.getTime() - createdAt.getTime()) / 1000);
  const remaining = slaMinutes * 60 - elapsed;
  
  if (remaining <= 0) {
    return "OVERDUE";
  }
  
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function EscalationCard({ escalation, onApprove, onDeny, onEdit, onChat }: EscalationCardProps) {
  const [timeRemaining, setTimeRemaining] = useState(() => 
    formatTimeRemaining(new Date(escalation.createdAt), escalation.slaMinutes)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(formatTimeRemaining(new Date(escalation.createdAt), escalation.slaMinutes));
    }, 1000);

    return () => clearInterval(interval);
  }, [escalation.createdAt, escalation.slaMinutes]);

  const AgentIcon = getAgentIcon(escalation.agentType);
  const riskColor = getRiskColor(escalation.riskLevel);
  const isOverdue = timeRemaining === "OVERDUE";
  const isUrgent = escalation.riskLevel === "high" || escalation.slaMinutes <= 5;

  return (
    <Card className={`shadow-lg border-l-4 ${riskColor} overflow-hidden`}>
      <CardContent className="p-6">
        {/* Card Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              escalation.riskLevel === "high" ? "bg-danger/10" : 
              escalation.riskLevel === "medium" ? "bg-warning/10" : "bg-info/10"
            }`}>
              <AgentIcon className={`text-lg ${
                escalation.riskLevel === "high" ? "text-danger" : 
                escalation.riskLevel === "medium" ? "text-warning" : "text-info"
              }`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral">{escalation.title}</h3>
              <p className="text-sm text-neutral-light">Agent ID: {escalation.agentId}</p>
            </div>
          </div>
          
          {/* SLA Timer */}
          <div className="text-right">
            <div className={`px-3 py-1 rounded-full text-sm font-bold ${
              isOverdue ? "bg-red-600 text-white animate-pulse" :
              isUrgent ? `${getRiskBadgeColor(escalation.riskLevel)} ${escalation.riskLevel === "high" ? "animate-pulse" : ""}` :
              getRiskBadgeColor(escalation.riskLevel)
            }`}>
              <Clock className="inline w-4 h-4 mr-1" />
              <span>{timeRemaining}</span>
            </div>
            <p className="text-xs text-neutral-light mt-1">SLA: {escalation.slaMinutes} min</p>
          </div>
        </div>

        {/* Agent Context */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-neutral mb-2">Agent Context & Decision Chain</h4>
          <div className="space-y-2 text-sm">
            {Object.entries(escalation.context as Record<string, any>).map(([key, value]) => {
              if (key === "riskFactors") return null;
              return (
                <div key={key} className="flex justify-between">
                  <span className="text-neutral-light capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span className={`font-medium ${key === "confidence" && parseFloat(value.replace('%', '')) < 50 ? "text-warning" : 
                    key === "amount" || key === "estValue" ? "text-danger" : ""}`}>
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Agent's Question */}
        <div className="bg-blue-50 border-l-4 border-primary p-4 mb-4">
          <h4 className="font-medium text-primary mb-2">Agent's Question:</h4>
          <p className="text-sm text-neutral">{escalation.question}</p>
        </div>

        {/* Risk Factors */}
        {(escalation.context as any)?.riskFactors && (
          <div className="mb-4">
            <h4 className="font-medium text-neutral mb-2">
              {escalation.agentType === "Fraud Detection" ? "Detection Signals" : 
               escalation.agentType === "Compliance Agent" ? "Policy Context" :
               escalation.agentType === "Trade Agent" ? "Market Conditions" : "Risk Assessment"}
            </h4>
            <div className="flex flex-wrap gap-2">
              {((escalation.context as any).riskFactors as string[]).map((factor) => (
                <Badge key={factor} variant="outline" className={`text-xs font-medium ${
                  factor.includes("High") || factor.includes("Impossible") || factor.includes("Failed") || factor.includes("Large") || factor.includes("New") ? "bg-danger/10 text-danger border-danger/20" :
                  factor.includes("Medium") || factor.includes("After") || factor.includes("Amount") || factor.includes("Rapid") || factor.includes("Volatility") || factor.includes("International") ? "bg-warning/10 text-warning border-warning/20" :
                  "bg-info/10 text-info border-info/20"
                }`}>
                  {factor}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Operator Controls */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => onApprove(escalation.id)}
            className="bg-success hover:bg-success/90 text-white"
            size="sm"
          >
            <Check className="w-4 h-4 mr-2" />
            {escalation.agentType === "Fraud Detection" ? "Mark Safe" :
             escalation.agentType === "Trade Agent" ? "Execute Trade" :
             escalation.agentType === "Compliance Agent" ? "Approve with Notes" : "Approve"}
          </Button>
          
          <Button
            onClick={() => onDeny(escalation.id)}
            className="bg-danger hover:bg-danger/90 text-white"
            size="sm"
          >
            <X className="w-4 h-4 mr-2" />
            {escalation.agentType === "Fraud Detection" ? "Lock Account" :
             escalation.agentType === "Trade Agent" ? "Hold & Monitor" : "Deny"}
          </Button>
          
          <Button
            onClick={() => onEdit(escalation.id)}
            className="bg-warning hover:bg-warning/90 text-black"
            size="sm"
          >
            <Edit className="w-4 h-4 mr-2" />
            {escalation.agentType === "Trade Agent" ? "Modify Order" :
             escalation.agentType === "Compliance Agent" ? "Update Policy" : "Edit & Approve"}
          </Button>
          
          <Button
            onClick={() => onChat(escalation)}
            className="bg-neutral-light hover:bg-neutral text-white"
            size="sm"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat with Agent
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
