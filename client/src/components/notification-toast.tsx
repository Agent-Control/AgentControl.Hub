import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, X } from "lucide-react";
import type { Escalation } from "@shared/schema";

interface NotificationToastProps {
  escalation: Escalation | null;
  onClose: () => void;
}

export function NotificationToast({ escalation, onClose }: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (escalation) {
      setIsVisible(true);
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [escalation, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!escalation) return null;

  return (
    <div
      className={`fixed top-4 right-4 bg-danger text-white px-6 py-4 rounded-lg shadow-lg z-50 transform transition-transform duration-300 ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center space-x-3">
        <AlertTriangle className="w-5 h-5" />
        <div>
          <p className="font-medium">New {escalation.riskLevel} Priority Escalation</p>
          <p className="text-sm opacity-90">
            {escalation.title} - SLA {escalation.slaMinutes} minutes
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="ml-4 text-white hover:bg-white/20"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
