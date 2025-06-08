import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, BarChart3, Settings, AlertTriangle, Bot, ChevronDown } from "lucide-react";

interface SidebarProps {
  activeEscalationsCount: number;
}

export function Sidebar({ activeEscalationsCount }: SidebarProps) {
  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      {/* Logo & Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Brain className="text-white text-lg" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-neutral">The Agent Pilot</h1>
            <p className="text-sm text-neutral-light">Governance Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start px-4 py-3 bg-primary/10 text-primary font-medium hover:bg-primary/20"
        >
          <BarChart3 className="w-5 h-5 mr-3" />
          Dashboard
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start px-4 py-3 text-neutral-light hover:bg-gray-50"
        >
          <AlertTriangle className="w-5 h-5 mr-3" />
          <span className="flex-1 text-left">Active Escalations</span>
          {activeEscalationsCount > 0 && (
            <Badge className="bg-danger text-white">{activeEscalationsCount}</Badge>
          )}
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start px-4 py-3 text-neutral-light hover:bg-gray-50"
        >
          <Bot className="w-5 h-5 mr-3" />
          Agent Management
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start px-4 py-3 text-neutral-light hover:bg-gray-50"
        >
          <BarChart3 className="w-5 h-5 mr-3" />
          Analytics
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start px-4 py-3 text-neutral-light hover:bg-gray-50"
        >
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </Button>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium text-neutral">Sarah Chen</p>
            <p className="text-xs text-neutral-light">Senior Operator</p>
          </div>
          <Button variant="ghost" size="sm">
            <ChevronDown className="text-neutral-light h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
