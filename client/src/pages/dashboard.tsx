import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useWebSocket } from "@/hooks/use-websocket";
import { Sidebar } from "@/components/sidebar";
import { FilterBar } from "@/components/filter-bar";
import { EscalationCard } from "@/components/escalation-card";
import { ChatModal } from "@/components/chat-modal";
import { NotificationToast } from "@/components/notification-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Clock } from "lucide-react";
import type { Escalation } from "@shared/schema";

export default function Dashboard() {
  const [filters, setFilters] = useState({
    riskLevel: "all",
    agentType: "all",
    escalationReason: "all",
  });
  const [selectedEscalation, setSelectedEscalation] = useState<Escalation | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [notificationEscalation, setNotificationEscalation] = useState<Escalation | null>(null);

  const queryClient = useQueryClient();

  const { data: escalations = [], isLoading } = useQuery({
    queryKey: ["/api/escalations"],
  });

  const { data: governanceData } = useQuery({
    queryKey: ["/api/governance-dashboard"],
  });

  // WebSocket for real-time updates
  useWebSocket((message) => {
    switch (message.type) {
      case "new_escalation":
        queryClient.invalidateQueries({ queryKey: ["/api/escalations"] });
        setNotificationEscalation(message.data);
        break;
      case "escalation_updated":
        queryClient.invalidateQueries({ queryKey: ["/api/escalations"] });
        break;
    }
  });

  const updateEscalationMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<Escalation> }) => {
      return apiRequest("PATCH", `/api/escalations/${id}`, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/escalations"] });
    },
  });

  const filteredEscalations = useMemo(() => {
    return escalations.filter((escalation: Escalation) => {
      if (escalation.status !== "pending") return false;
      if (filters.riskLevel !== "all" && escalation.riskLevel !== filters.riskLevel) return false;
      if (filters.agentType !== "all" && escalation.agentType !== filters.agentType) return false;
      if (filters.escalationReason !== "all" && escalation.escalationReason !== filters.escalationReason) return false;
      return true;
    });
  }, [escalations, filters]);

  const stats = useMemo(() => {
    const basicStats = {
      highPriority: filteredEscalations.filter((e: Escalation) => e.riskLevel === "high").length,
      mediumPriority: filteredEscalations.filter((e: Escalation) => e.riskLevel === "medium").length,
      lowPriority: filteredEscalations.filter((e: Escalation) => e.riskLevel === "low").length,
    };

    // Add governance threat statistics
    if (governanceData?.threatSummary) {
      return {
        ...basicStats,
        criticalThreats: governanceData.threatSummary.critical,
        activeSessions: governanceData.activeSessions?.length || 0,
        totalThreats: governanceData.threatSummary.total,
      };
    }

    return basicStats;
  }, [filteredEscalations, governanceData]);

  const avgResponseTime = "1.2min"; // This would be calculated from actual data

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApprove = (id: number) => {
    updateEscalationMutation.mutate({
      id,
      updates: { status: "approved", operatorId: "sarah.chen", response: "Approved by operator" }
    });
  };

  const handleDeny = (id: number) => {
    updateEscalationMutation.mutate({
      id,
      updates: { status: "denied", operatorId: "sarah.chen", response: "Denied by operator" }
    });
  };

  const handleEdit = (id: number) => {
    // In a real implementation, this would open an edit modal
    updateEscalationMutation.mutate({
      id,
      updates: { status: "approved", operatorId: "sarah.chen", response: "Approved with modifications" }
    });
  };

  const handleChat = (escalation: Escalation) => {
    setSelectedEscalation(escalation);
    setIsChatOpen(true);
  };

  const handleCloseNotification = () => {
    setNotificationEscalation(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-neutral-light">Loading escalations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-bg-light">
      <Sidebar activeEscalationsCount={filteredEscalations.length} />
      
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral">Live Escalation Queue</h2>
              <p className="text-neutral-light">Monitor and review agent decisions requiring human oversight</p>
            </div>
            
            {/* Real-time Status & Notifications */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-neutral-light">Live</span>
              </div>
              
              <Button variant="ghost" size="sm" className="relative text-neutral-light hover:text-neutral">
                <Bell className="h-5 w-5" />
                {filteredEscalations.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-danger text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {filteredEscalations.length}
                  </Badge>
                )}
              </Button>
              
              {/* SLA Status */}
              <div className="bg-warning/10 text-warning px-3 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">Avg Response: {avgResponseTime}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <FilterBar
          stats={stats}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Escalation Queue */}
        <main className="flex-1 p-6 overflow-y-auto">
          {filteredEscalations.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-lg font-semibold text-neutral mb-2">No Active Escalations</h3>
              <p className="text-neutral-light">All agents are operating within normal parameters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredEscalations.map((escalation: Escalation) => (
                <EscalationCard
                  key={escalation.id}
                  escalation={escalation}
                  onApprove={handleApprove}
                  onDeny={handleDeny}
                  onEdit={handleEdit}
                  onChat={handleChat}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <ChatModal
        escalation={selectedEscalation}
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setSelectedEscalation(null);
        }}
      />

      <NotificationToast
        escalation={notificationEscalation}
        onClose={handleCloseNotification}
      />
    </div>
  );
}
