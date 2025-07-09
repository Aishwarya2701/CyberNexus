import { useState } from "react";
import { HelpCircle, Keyboard, Mic, Terminal, Shield, Brain, Search, Zap, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CyberCard } from "@/components/ui/cyber-card";

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpDialog({ isOpen, onClose }: HelpDialogProps) {
  const keyboardShortcuts = [
    { key: "Ctrl + K", action: "Open Command Palette" },
    { key: "Escape", action: "Close any dialog or stop current action" },
    { key: "↑↓", action: "Navigate command palette options" },
    { key: "Enter", action: "Execute selected command" },
  ];

  const voiceCommands = [
    { command: "threat", action: "Analyze current threats" },
    { command: "scan", action: "Initiate security scan" },
    { command: "status", action: "Check system status" },
    { command: "help", action: "Show help information" },
  ];

  const features = [
    {
      icon: Brain,
      title: "AI Threat Predictor",
      description: "Advanced neural network analyzes patterns to predict potential security threats with 94.2% accuracy."
    },
    {
      icon: Shield,
      title: "Security Modules",
      description: "Six specialized modules including Digital DNA Fingerprinting, Quantum Crypto Simulator, and Virtual Honeypot Ecosystem."
    },
    {
      icon: Search,
      title: "Digital Forensics Lab",
      description: "Complete forensic investigation tools for evidence collection, hash analysis, and timeline reconstruction."
    },
    {
      icon: Zap,
      title: "Real-time Monitoring",
      description: "Live WebSocket connection provides instant updates on threats, vulnerabilities, and system health."
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="command-palette max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <HelpCircle className="text-cyan-400" />
            <span className="font-mono text-cyan-400">CyberNexus Help Center</span>
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            Comprehensive guide to using the CyberNexus platform features, controls, and best practices.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="overview" className="font-mono text-sm">Overview</TabsTrigger>
            <TabsTrigger value="features" className="font-mono text-sm">Features</TabsTrigger>
            <TabsTrigger value="controls" className="font-mono text-sm">Controls</TabsTrigger>
            <TabsTrigger value="tips" className="font-mono text-sm">Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <CyberCard>
              <h3 className="text-lg font-semibold holographic-text mb-3">Welcome to CyberNexus</h3>
              <p className="text-gray-300 mb-4">
                CyberNexus is an advanced cybersecurity operations center that provides real-time threat monitoring, 
                AI-powered threat prediction, and comprehensive security analysis tools.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-sm">Monitor threats and vulnerabilities in real-time</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Use AI-powered prediction to prevent attacks</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-sm">Analyze network patterns and device security</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm">Conduct digital forensic investigations</span>
                </div>
              </div>
            </CyberCard>

            <CyberCard>
              <h3 className="text-lg font-semibold holographic-text mb-3">Getting Started</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <p><strong className="text-cyan-400">1. Dashboard Overview:</strong> The main dashboard shows system health, active threats, vulnerabilities, and critical alerts.</p>
                <p><strong className="text-green-400">2. Command Palette:</strong> Press Ctrl+K to open the command palette for quick actions.</p>
                <p><strong className="text-purple-400">3. Voice Commands:</strong> Click the microphone button to enable voice control.</p>
                <p><strong className="text-orange-400">4. Real-time Updates:</strong> Watch for the green connection indicator showing live data.</p>
              </div>
            </CyberCard>
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <CyberCard key={index}>
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <feature.icon className="text-cyan-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{feature.title}</h4>
                      <p className="text-sm text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                </CyberCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="controls" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CyberCard>
                <div className="flex items-center space-x-3 mb-4">
                  <Keyboard className="text-cyan-400" size={20} />
                  <h3 className="text-lg font-semibold">Keyboard Shortcuts</h3>
                </div>
                <div className="space-y-3">
                  {keyboardShortcuts.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-mono text-sm bg-gray-800/50 px-2 py-1 rounded">
                        {shortcut.key}
                      </span>
                      <span className="text-sm text-gray-300">{shortcut.action}</span>
                    </div>
                  ))}
                </div>
              </CyberCard>

              <CyberCard>
                <div className="flex items-center space-x-3 mb-4">
                  <Mic className="text-purple-400" size={20} />
                  <h3 className="text-lg font-semibold">Voice Commands</h3>
                </div>
                <div className="space-y-3">
                  {voiceCommands.map((command, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-mono text-sm bg-gray-800/50 px-2 py-1 rounded">
                        "{command.command}"
                      </span>
                      <span className="text-sm text-gray-300">{command.action}</span>
                    </div>
                  ))}
                </div>
              </CyberCard>
            </div>

            <CyberCard>
              <div className="flex items-center space-x-3 mb-4">
                <Terminal className="text-green-400" size={20} />
                <h3 className="text-lg font-semibold">Available Commands</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm bg-gray-800/50 px-2 py-1 rounded">search threats</span>
                    <span className="text-xs text-gray-400">Search threat intelligence</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm bg-gray-800/50 px-2 py-1 rounded">deploy honeypot</span>
                    <span className="text-xs text-gray-400">Deploy virtual honeypot</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm bg-gray-800/50 px-2 py-1 rounded">analyze behavior</span>
                    <span className="text-xs text-gray-400">Analyze behavioral patterns</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm bg-gray-800/50 px-2 py-1 rounded">run quantum</span>
                    <span className="text-xs text-gray-400">Execute quantum simulation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm bg-gray-800/50 px-2 py-1 rounded">diagnostics</span>
                    <span className="text-xs text-gray-400">Run system diagnostics</span>
                  </div>
                </div>
              </div>
            </CyberCard>
          </TabsContent>

          <TabsContent value="tips" className="space-y-4">
            <CyberCard>
              <h3 className="text-lg font-semibold holographic-text mb-3">Pro Tips</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-cyan-400 pl-4">
                  <h4 className="font-semibold text-cyan-400 mb-1">Real-time Monitoring</h4>
                  <p className="text-sm text-gray-300">
                    The dashboard automatically updates every 30 seconds. Watch the connection indicator 
                    in the top right to ensure you're receiving live data.
                  </p>
                </div>
                
                <div className="border-l-2 border-green-400 pl-4">
                  <h4 className="font-semibold text-green-400 mb-1">Threat Analysis</h4>
                  <p className="text-sm text-gray-300">
                    Click on any threat metric to get detailed analysis. The AI predictor shows 
                    probability percentages for different attack vectors.
                  </p>
                </div>
                
                <div className="border-l-2 border-purple-400 pl-4">
                  <h4 className="font-semibold text-purple-400 mb-1">Security Modules</h4>
                  <p className="text-sm text-gray-300">
                    Each security module has unique capabilities. The Digital DNA Fingerprinting 
                    module tracks device signatures, while the Quantum Crypto Simulator tests 
                    encryption strength against quantum attacks.
                  </p>
                </div>
                
                <div className="border-l-2 border-orange-400 pl-4">
                  <h4 className="font-semibold text-orange-400 mb-1">Voice Commands</h4>
                  <p className="text-sm text-gray-300">
                    For hands-free operation, use voice commands. Speak clearly and include 
                    keywords like "threat", "scan", or "status" for best results.
                  </p>
                </div>
              </div>
            </CyberCard>

            <CyberCard>
              <h3 className="text-lg font-semibold holographic-text mb-3">System Requirements</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Browser:</strong> Chrome, Firefox, Safari, Edge (latest versions)</p>
                <p><strong>WebSocket:</strong> Required for real-time updates</p>
                <p><strong>Microphone:</strong> Required for voice commands</p>
                <p><strong>Resolution:</strong> 1280x720 minimum, 1920x1080 recommended</p>
              </div>
            </CyberCard>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-4">
          <Button 
            onClick={onClose}
            variant="outline"
            className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30"
          >
            <X size={16} className="mr-2" />
            Close Help
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}