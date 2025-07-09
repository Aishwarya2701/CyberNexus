import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Shield, Mic, Terminal, AlertTriangle, HelpCircle, LogOut, User } from "lucide-react";
import ThreatOverview from "@/components/dashboard/ThreatOverview";
import AIThreatPredictor from "@/components/dashboard/AIThreatPredictor";
import NeuralNetworkActivity from "@/components/dashboard/NeuralNetworkActivity";
import SecurityModules from "@/components/dashboard/SecurityModules";
import ThreatIntelligence from "@/components/dashboard/ThreatIntelligence";
import NetworkSecurity from "@/components/dashboard/NetworkSecurity";
import DigitalForensics from "@/components/dashboard/DigitalForensics";
import CommandPalette from "@/components/dashboard/CommandPalette";
import FloatingActions from "@/components/dashboard/FloatingActions";
import HelpDialog from "@/components/dashboard/HelpDialog";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useVoiceCommands } from "@/hooks/useVoiceCommands";

interface DashboardStats {
  systemHealth: number;
  activeThreats: number;
  vulnerabilities: number;
  criticalAlerts: number;
}

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  const [systemStatus, setSystemStatus] = useState("All Systems Operational");
  const [currentUser, setCurrentUser] = useState({ username: "Unknown", role: "user" });
  
  const { data: dashboardStats } = useQuery<DashboardStats>({
    queryKey: ['/api/dashboard/stats'],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const { isConnected, sendMessage } = useWebSocket();
  const { isListening, startListening, stopListening } = useVoiceCommands();

  useEffect(() => {
    // Load user info from localStorage
    const userInfo = localStorage.getItem("cyberNexusUser");
    if (userInfo) {
      try {
        setCurrentUser(JSON.parse(userInfo));
      } catch (e) {
        console.error("Failed to parse user info:", e);
      }
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isCommandPaletteOpen]);

  const handleLogout = () => {
    localStorage.removeItem("cyberNexusAuth");
    localStorage.removeItem("cyberNexusUser");
    window.dispatchEvent(new Event("authStateChanged"));
    setLocation("/login");
  };

  const handleCommandExecute = (command: string) => {
    sendMessage({ type: 'command', data: command });
    setIsCommandPaletteOpen(false);
  };

  const toggleVoiceCommands = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="min-h-screen neural-bg">
      {/* Header */}
      <header className="glass-morphism border-b border-cyan-500/30 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center pulse-glow">
                <Shield className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold holographic-text">CyberNexus</h1>
                <p className="text-cyan-400 text-sm font-mono">Advanced Security Operations Center</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setIsCommandPaletteOpen(!isCommandPaletteOpen)}
                className="glass-morphism px-4 py-2 rounded-lg hover:bg-cyan-500/20 transition-all duration-300"
              >
                <Terminal className="text-cyan-400 mr-2 inline" size={16} />
                <span className="font-mono text-sm">Command Palette</span>
              </button>
              
              <button 
                onClick={toggleVoiceCommands}
                className={`glass-morphism px-4 py-2 rounded-lg transition-all duration-300 ${
                  isListening ? 'bg-red-500/20 text-red-400' : 'hover:bg-cyan-500/20'
                }`}
              >
                <Mic className={`mr-2 inline ${isListening ? 'text-red-400' : 'text-cyan-400'}`} size={16} />
                <span className="font-mono text-sm">
                  {isListening ? 'Stop Listening' : 'Voice Commands'}
                </span>
              </button>

              <button 
                onClick={() => setIsHelpDialogOpen(!isHelpDialogOpen)}
                className="glass-morphism px-4 py-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300"
                title="Help & Documentation"
              >
                <HelpCircle className="text-purple-400 mr-2 inline" size={16} />
                <span className="font-mono text-sm">Help</span>
              </button>

              {/* User Info & Logout */}
              <div className="flex items-center space-x-3 glass-morphism px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <User className="text-cyan-400" size={16} />
                  <div className="text-sm">
                    <span className="font-mono text-cyan-400">{currentUser.username}</span>
                    <span className="text-gray-400 ml-1">({currentUser.role})</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 p-1 rounded transition-colors"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full animate-pulse ${
                  isConnected ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className={`font-mono text-sm ${
                  isConnected ? 'text-green-400' : 'text-red-400'
                }`}>
                  {isConnected ? systemStatus : 'Connection Lost'}
                </span>
              </div>
              
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Threat Overview */}
        <ThreatOverview stats={dashboardStats} />

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          <AIThreatPredictor />
          <NeuralNetworkActivity />
        </div>

        {/* Security Modules */}
        <SecurityModules />

        {/* Advanced Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <NetworkSecurity />
          <DigitalForensics />
        </div>

        {/* Threat Intelligence */}
        <ThreatIntelligence />
      </main>

      {/* Command Palette */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onExecute={handleCommandExecute}
      />

      {/* Help Dialog */}
      <HelpDialog 
        isOpen={isHelpDialogOpen}
        onClose={() => setIsHelpDialogOpen(false)}
      />

      {/* Floating Actions */}
      <FloatingActions 
        onCommandPalette={() => setIsCommandPaletteOpen(!isCommandPaletteOpen)}
        onVoiceCommand={toggleVoiceCommands}
        onHelp={() => setIsHelpDialogOpen(!isHelpDialogOpen)}
        isListening={isListening}
      />
    </div>
  );
}
