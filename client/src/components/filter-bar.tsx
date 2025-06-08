import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterBarProps {
  stats: {
    highPriority: number;
    mediumPriority: number;
    lowPriority: number;
  };
  filters: {
    riskLevel: string;
    agentType: string;
    escalationReason: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

export function FilterBar({ stats, filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Filters */}
          <Select value={filters.riskLevel} onValueChange={(value) => onFilterChange('riskLevel', value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Risk Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filters.agentType} onValueChange={(value) => onFilterChange('agentType', value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Agent Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Agent Types</SelectItem>
              <SelectItem value="Payment Agent">Payment Agent</SelectItem>
              <SelectItem value="Fraud Detection">Fraud Detection</SelectItem>
              <SelectItem value="Compliance Agent">Compliance Agent</SelectItem>
              <SelectItem value="Trade Agent">Trade Agent</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filters.escalationReason} onValueChange={(value) => onFilterChange('escalationReason', value)}>
            <SelectTrigger className="w-50">
              <SelectValue placeholder="All Escalation Reasons" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Escalation Reasons</SelectItem>
              <SelectItem value="Low Confidence">Low Confidence</SelectItem>
              <SelectItem value="Policy Violation">Policy Violation</SelectItem>
              <SelectItem value="Unknown Entity">Unknown Entity</SelectItem>
              <SelectItem value="Amount Threshold">Amount Threshold</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Queue Stats */}
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-danger rounded-full"></div>
            <span>High Priority: <span className="font-bold">{stats.highPriority}</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span>Medium: <span className="font-bold">{stats.mediumPriority}</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-info rounded-full"></div>
            <span>Low: <span className="font-bold">{stats.lowPriority}</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
