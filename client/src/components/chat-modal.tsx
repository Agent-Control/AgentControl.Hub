import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Send } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Escalation, ChatMessage } from "@shared/schema";

interface ChatModalProps {
  escalation: Escalation | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ChatModal({ escalation, isOpen, onClose }: ChatModalProps) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: ["/api/escalations", escalation?.id, "messages"],
    enabled: !!escalation?.id,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (messageText: string) => {
      if (!escalation) throw new Error("No escalation selected");
      return apiRequest("POST", `/api/escalations/${escalation.id}/messages`, {
        sender: "operator",
        message: messageText,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/escalations", escalation?.id, "messages"]
      });
      setMessage("");
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() && !sendMessageMutation.isPending) {
      sendMessageMutation.mutate(message.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!escalation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Bot className="text-primary" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-neutral">
                Chat with Agent {escalation.agentId}
              </DialogTitle>
              <p className="text-sm text-neutral-light">{escalation.agentType}</p>
            </div>
          </div>
        </DialogHeader>
        
        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 min-h-0">
          {/* Initial agent message */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="text-white text-sm" />
            </div>
            <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
              <p className="text-sm text-neutral">{escalation.question}</p>
              <span className="text-xs text-neutral-light">
                {new Date(escalation.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>

          {messages.map((msg: ChatMessage) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === "operator" ? "justify-end" : ""
              }`}
            >
              {msg.sender === "agent" && (
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="text-white text-sm" />
                </div>
              )}
              
              <div
                className={`rounded-lg p-3 max-w-[70%] ${
                  msg.sender === "operator"
                    ? "bg-primary text-white"
                    : "bg-gray-100"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <span
                  className={`text-xs ${
                    msg.sender === "operator"
                      ? "text-primary-dark/70"
                      : "text-neutral-light"
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
              
              {msg.sender === "operator" && (
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat Input */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message to the agent..."
              className="flex-1"
              disabled={sendMessageMutation.isPending}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || sendMessageMutation.isPending}
              className="bg-primary hover:bg-primary-dark"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
