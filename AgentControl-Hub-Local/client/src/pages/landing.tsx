import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Shield, Clock, MessageCircle, BarChart3, CheckCircle, ArrowRight, Play, Users, Zap, Target, Globe } from "lucide-react";

export default function Landing() {
  const [activeDemo, setActiveDemo] = useState(0);

  const features = [
    {
      icon: Brain,
      title: "Real-time Agent Oversight",
      description: "Monitor AI agents in real-time with instant escalation alerts when human intervention is required.",
      color: "text-blue-600"
    },
    {
      icon: MessageCircle,
      title: "Interactive Agent Chat",
      description: "Direct communication channel with AI agents for clarification and guidance on complex decisions.",
      color: "text-green-600"
    },
    {
      icon: Shield,
      title: "Risk-Based Filtering",
      description: "Intelligent prioritization system that routes high-risk decisions to appropriate human experts.",
      color: "text-red-600"
    },
    {
      icon: Clock,
      title: "SLA Management",
      description: "Time-bound response tracking with visual countdown timers ensuring critical decisions aren't delayed.",
      color: "text-orange-600"
    },
    {
      icon: BarChart3,
      title: "Decision Analytics",
      description: "Comprehensive insights into agent performance, intervention patterns, and decision quality metrics.",
      color: "text-purple-600"
    },
    {
      icon: Users,
      title: "Multi-Agent Support",
      description: "Centralized oversight for diverse agent types across payments, fraud detection, compliance, and trading.",
      color: "text-indigo-600"
    }
  ];

  const useCases = [
    {
      title: "Payment Authorization",
      description: "AI agents pause for human review on suspicious transactions, preventing fraud while maintaining flow.",
      agent: "Payment Agent",
      scenario: "High-value transaction from new merchant",
      risk: "high"
    },
    {
      title: "Fraud Detection",
      description: "Intelligent pattern recognition escalates unusual behavior for expert verification before account actions.",
      agent: "Fraud Detection",
      scenario: "Impossible travel pattern detected",
      risk: "medium"
    },
    {
      title: "Compliance Review",
      description: "Policy edge cases automatically route to compliance experts for interpretation and guidance.",
      agent: "Compliance Agent",
      scenario: "International remote work request",
      risk: "low"
    },
    {
      title: "Trade Execution",
      description: "Large orders in volatile markets require human trader approval before execution.",
      agent: "Trade Agent",
      scenario: "$1.89M order with market volatility",
      risk: "high"
    }
  ];

  const stats = [
    { label: "Response Time", value: "< 2 min", description: "Average human response to escalations" },
    { label: "Risk Reduction", value: "94%", description: "Decrease in false positives" },
    { label: "Agent Accuracy", value: "99.7%", description: "Improved decision quality" },
    { label: "Operational Efficiency", value: "3.2x", description: "Faster resolution times" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Agent Control</h1>
                <p className="text-xs text-gray-500">HITL Platform</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#use-cases" className="text-gray-600 hover:text-gray-900 transition-colors">Use Cases</a>
              <a href="#demo" className="text-gray-600 hover:text-gray-900 transition-colors">Demo</a>
              <Link to="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Launch Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
              Human-in-the-Loop AI Oversight
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Safe AI Agent Deployment
              <br />
              <span className="text-blue-600">with Human Oversight</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Enable autonomous AI agents to pause and escalate to human experts when encountering 
              complex decisions, ensuring safety without sacrificing efficiency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                  <Play className="mr-2 h-5 w-5" />
                  View Live Demo
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <MessageCircle className="mr-2 h-5 w-5" />
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete AI Agent Oversight
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive monitoring and intervention capabilities designed for enterprise AI deployments
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real-World Applications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how Agent Control enables safe AI deployment across critical business functions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{useCase.title}</CardTitle>
                    <Badge className={`${
                      useCase.risk === 'high' ? 'bg-red-100 text-red-800' :
                      useCase.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {useCase.risk} priority
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{useCase.agent}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{useCase.description}</p>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-900">Example Scenario:</p>
                    <p className="text-sm text-gray-600">{useCase.scenario}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to See Agent Control in Action?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Experience live AI agent escalations and see how human oversight maintains safety 
            while preserving operational efficiency.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                <Target className="mr-2 h-5 w-5" />
                Launch Live Demo
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
              <Globe className="mr-2 h-5 w-5" />
              Enterprise Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="text-white h-5 w-5" />
                </div>
                <span className="text-xl font-bold">Agent Control</span>
              </div>
              <p className="text-gray-400">
                Human-in-the-Loop oversight platform for safe AI agent deployment.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#use-cases" className="hover:text-white transition-colors">Use Cases</a></li>
                <li><a href="#demo" className="hover:text-white transition-colors">Demo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Agent Control. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}