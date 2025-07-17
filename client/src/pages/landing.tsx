import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Shield, Clock, MessageCircle, BarChart3, CheckCircle, ArrowRight, Play, Users, Zap, Target, Globe, Star, TrendingUp } from "lucide-react";

export default function Landing() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Brain,
      title: "Real-time Agent Oversight",
      description: "Monitor AI agents in real-time with instant escalation alerts when human intervention is required.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: MessageCircle,
      title: "Interactive Agent Chat",
      description: "Direct communication channel with AI agents for clarification and guidance on complex decisions.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Shield,
      title: "Risk-Based Filtering",
      description: "Intelligent prioritization system that routes high-risk decisions to appropriate human experts.",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "SLA Management",
      description: "Time-bound response tracking with visual countdown timers ensuring critical decisions aren't delayed.",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: BarChart3,
      title: "Decision Analytics",
      description: "Comprehensive insights into agent performance, intervention patterns, and decision quality metrics.",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: Users,
      title: "Multi-Agent Support",
      description: "Centralized oversight for diverse agent types across payments, fraud detection, compliance, and trading.",
      gradient: "from-indigo-500 to-blue-500"
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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="text-white h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">The Agent Pilot</h1>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#platform" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Platform</a>
              <a href="#solutions" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Solutions</a>
              <a href="#enterprise" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Enterprise</a>
              <a href="#resources" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Resources</a>
              <Link to="/dashboard">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium">
                  Launch Platform
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 mb-8">
              <Star className="h-4 w-4 mr-2 text-yellow-500" />
              Human-in-the-Loop AI Oversight Platform
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
              AI Agent
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Governance
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Comprehensive oversight platform for multi-agent systems with real-time threat detection, 
              collusion prevention, and human-in-the-loop governance for safe AI deployment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link to="/dashboard">
                <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full text-base font-medium">
                  View Live Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-full text-base font-medium">
                Schedule Demo
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Stats Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{"< 2min"}</div>
                <div className="text-sm text-gray-600">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">94%</div>
                <div className="text-sm text-gray-600">Risk Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">99.7%</div>
                <div className="text-sm text-gray-600">Agent Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">3.2x</div>
                <div className="text-sm text-gray-600">Faster Resolution</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agent Status Dashboard */}
      <section className="py-16 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">AI Agent Status</h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 font-medium">Active</span>
              </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Autonomous Tasks */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-blue-700 font-medium">Autonomous Tasks</span>
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-blue-900 mb-2">1,247</div>
                <div className="text-blue-600 text-sm font-medium">Today</div>
              </div>

              {/* Human Reviews */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-purple-700 font-medium">Human Reviews</span>
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-purple-900 mb-2">23</div>
                <div className="text-purple-600 text-sm font-medium">Escalated</div>
              </div>
            </div>

            {/* Safety Score */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 font-medium">Safety Score</span>
                <span className="text-2xl font-bold text-gray-900">98.7%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full transition-all duration-1000" 
                  style={{ width: '98.7%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section id="platform" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Multi-Agent Governance Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Advanced threat detection, collusion prevention, and human oversight for complex agent systems
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                
                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Real-World Applications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              See how Agent Control enables safe AI deployment across critical business functions
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{useCase.agent}</p>
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    useCase.risk === 'high' ? 'bg-red-50 text-red-700 border border-red-200' :
                    useCase.risk === 'medium' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                    'bg-green-50 text-green-700 border border-green-200'
                  }`}>
                    {useCase.risk} priority
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{useCase.description}</p>
                
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Example Scenario</p>
                  <p className="text-sm text-gray-600">{useCase.scenario}</p>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise CTA Section */}
      <section id="enterprise" className="py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to Govern Your Agent Fleet?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience real-time threat detection and see how multi-agent governance prevents 
            collusion while maintaining operational efficiency.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full text-base font-medium">
                Launch Live Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 rounded-full text-base font-medium">
              Enterprise Demo
              <Globe className="ml-2 h-5 w-5" />
            </Button>
          </div>


        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="text-white h-5 w-5" />
                </div>
                <span className="text-xl font-semibold text-gray-900">The Agent Pilot</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 max-w-md">
                Multi-agent governance platform with real-time threat detection and collusion prevention. 
                Secure your autonomous agent fleet with human oversight.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <TrendingUp className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <span className="sr-only">GitHub</span>
                  <Globe className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <Users className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#platform" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a></li>
                <li><a href="#solutions" className="text-gray-600 hover:text-gray-900 transition-colors">Solutions</a></li>
                <li><a href="#enterprise" className="text-gray-600 hover:text-gray-900 transition-colors">Enterprise</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">API Reference</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Support</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">&copy; 2025 The Agent Pilot. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}