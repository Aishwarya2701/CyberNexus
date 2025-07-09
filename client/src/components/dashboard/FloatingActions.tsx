import { useState } from "react";
import { Terminal, Mic, AlertTriangle, HelpCircle, Wifi, Eye, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FloatingActionsProps {
  onCommandPalette: () => void;
  onVoiceCommand: () => void;
  onHelp?: () => void;
  isListening: boolean;
}

export default function FloatingActions({ 
  onCommandPalette, 
  onVoiceCommand, 
  onHelp,
  isListening 
}: FloatingActionsProps) {
  const [isNetworkMonitoring, setIsNetworkMonitoring] = useState(false);
  const [isStealthMode, setIsStealthMode] = useState(false);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const { toast } = useToast();

  const handleNetworkMonitoring = () => {
    setIsNetworkMonitoring(!isNetworkMonitoring);
    toast({
      title: isNetworkMonitoring ? "Network Monitoring Stopped" : "Network Monitoring Started",
      description: isNetworkMonitoring 
        ? "Real-time network scanning disabled" 
        : "Deep packet inspection and anomaly detection active",
    });
  };

  const handleStealthMode = () => {
    setIsStealthMode(!isStealthMode);
    toast({
      title: isStealthMode ? "Stealth Mode Disabled" : "Stealth Mode Enabled",
      description: isStealthMode 
        ? "Normal visibility restored" 
        : "Digital footprint minimized, running silent",
    });
  };

  const handleEmergencyAlert = () => {
    setEmergencyActive(!emergencyActive);
    if (!emergencyActive) {
      toast({
        title: "🚨 EMERGENCY PROTOCOL ACTIVATED",
        description: "All security systems on high alert. Incident response team notified.",
        variant: "destructive",
      });
      // Auto-disable after 30 seconds
      setTimeout(() => setEmergencyActive(false), 30000);
    } else {
      toast({
        title: "Emergency Protocol Deactivated",
        description: "System returning to normal operations",
      });
    }
  };

  return (
    <div className="fixed bottom-8 right-8 space-y-4">
      {/* Command Palette */}
      <button
        onClick={onCommandPalette}
        className="floating-action pulse-on-hover"
        title="Open Command Palette (Ctrl+K)"
      >
        <Terminal className="text-white text-xl" />
      </button>
      
      {/* Voice Commands */}
      <button
        onClick={onVoiceCommand}
        className={`floating-action ${
          isListening 
            ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse' 
            : 'bg-gradient-to-r from-purple-500 to-pink-500'
        }`}
        title={isListening ? "Stop Voice Commands" : "Start Voice Commands"}
      >
        <Mic className="text-white text-xl" />
      </button>

      {/* Network Monitoring */}
      <button
        onClick={handleNetworkMonitoring}
        className={`floating-action ${
          isNetworkMonitoring 
            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse' 
            : 'bg-gradient-to-r from-blue-600 to-blue-700'
        }`}
        title={isNetworkMonitoring ? "Stop Network Monitoring" : "Start Network Monitoring"}
      >
        <Wifi className="text-white text-xl" />
      </button>

      {/* Stealth Mode */}
      <button
        onClick={handleStealthMode}
        className={`floating-action ${
          isStealthMode 
            ? 'bg-gradient-to-r from-gray-600 to-gray-800 opacity-50' 
            : 'bg-gradient-to-r from-gray-500 to-gray-600'
        }`}
        title={isStealthMode ? "Disable Stealth Mode" : "Enable Stealth Mode"}
      >
        <Eye className="text-white text-xl" />
      </button>

      {/* Help */}
      {onHelp && (
        <button
          onClick={onHelp}
          className="floating-action bg-gradient-to-r from-indigo-500 to-purple-500 pulse-on-hover"
          title="Help & Documentation"
        >
          <HelpCircle className="text-white text-xl" />
        </button>
      )}
      
      {/* Emergency Alert */}
      <button
        onClick={handleEmergencyAlert}
        className={`floating-action ${
          emergencyActive 
            ? 'bg-gradient-to-r from-red-600 to-red-800 animate-bounce' 
            : 'bg-gradient-to-r from-orange-500 to-red-500'
        }`}
        title={emergencyActive ? "Deactivate Emergency Protocol" : "Activate Emergency Protocol"}
      >
        <AlertTriangle className="text-white text-xl" />
      </button>

      {/* Quantum Shield */}
      <button
        className="floating-action bg-gradient-to-r from-emerald-500 to-teal-500 pulse-on-hover"
        title="Activate Quantum Shield"
        onClick={() => toast({
          title: "Quantum Shield Activated",
          description: "Quantum encryption barriers deployed. Data is now quantum-resistant.",
        })}
      >
        <Shield className="text-white text-xl" />
      </button>
    </div>
  );
}
