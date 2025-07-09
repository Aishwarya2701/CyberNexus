import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Network, Shield, Activity, Wifi, Lock, Unlock, AlertCircle, CheckCircle } from "lucide-react";
import { CyberCard } from "@/components/ui/cyber-card";
import { useToast } from "@/hooks/use-toast";

export default function NetworkSecurity() {
  const { data: devices } = useQuery({
    queryKey: ['/api/devices'],
  });

  const [isSecured, setIsSecured] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [stats, setStats] = useState({
    activeConnections: 847,
    firewallRules: 23,
    intrusionAttempts: 12,
    uptime: 99.2,
  });
  const { toast } = useToast();

  const toggleSecurity = () => {
    setIsSecured(!isSecured);
    toast({
      title: isSecured ? "Security Lockdown Disabled" : "Security Lockdown Enabled",
      description: isSecured 
        ? "Network access restrictions lifted" 
        : "Maximum security protocols activated",
    });
  };

  const scanNetwork = () => {
    setIsScanning(true);
    toast({
      title: "Network Scan Initiated",
      description: "Performing comprehensive network topology analysis",
    });

    setTimeout(() => {
      setStats(prev => ({
        ...prev,
        activeConnections: prev.activeConnections + Math.floor(Math.random() * 50) - 25,
        intrusionAttempts: prev.intrusionAttempts + Math.floor(Math.random() * 5),
      }));
      setIsScanning(false);
      toast({
        title: "Network Scan Complete",
        description: "Updated threat landscape and connection status",
      });
    }, 5000);
  };

  const addFirewallRule = () => {
    setStats(prev => ({
      ...prev,
      firewallRules: prev.firewallRules + 1,
    }));
    toast({
      title: "Firewall Rule Added",
      description: "New security rule deployed to network perimeter",
    });
  };

  return (
    <CyberCard>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold holographic-text">Network Security Topology</h2>
        <div className="flex space-x-2">
          <button
            onClick={scanNetwork}
            disabled={isScanning}
            className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 rounded flex items-center justify-center transition-colors disabled:opacity-50"
            title="Scan Network"
          >
            <Wifi className={`text-blue-400 ${isScanning ? 'animate-pulse' : ''}`} size={16} />
          </button>
          
          <button
            onClick={addFirewallRule}
            className="w-8 h-8 bg-green-500/20 hover:bg-green-500/30 rounded flex items-center justify-center transition-colors"
            title="Add Firewall Rule"
          >
            <Shield className="text-green-400" size={16} />
          </button>
          
          <button
            onClick={toggleSecurity}
            className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
              isSecured 
                ? 'bg-red-500/20 hover:bg-red-500/30' 
                : 'bg-green-500/20 hover:bg-green-500/30'
            }`}
            title={isSecured ? "Disable Security" : "Enable Security"}
          >
            {isSecured ? 
              <Lock className="text-red-400" size={16} /> : 
              <Unlock className="text-green-400" size={16} />
            }
          </button>
        </div>
      </div>
      
      <div className="mb-6 scanner-line">
        <img 
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=400" 
          alt="Network security infrastructure" 
          className="rounded-lg w-full h-64 object-cover opacity-60"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className={`text-center p-3 bg-gray-800/30 rounded-lg border border-cyan-500/20 ${
          isScanning ? 'animate-pulse' : ''
        }`}>
          <div className="text-2xl font-bold font-mono text-cyan-400 neon-text">
            {stats.activeConnections}
          </div>
          <div className="text-sm text-gray-400">Active Connections</div>
          <div className="flex items-center justify-center mt-1">
            {isSecured ? 
              <CheckCircle className="text-green-400" size={12} /> : 
              <AlertCircle className="text-orange-400" size={12} />
            }
          </div>
        </div>
        
        <div className="text-center p-3 bg-gray-800/30 rounded-lg border border-green-500/20">
          <div className="text-2xl font-bold font-mono text-green-400 neon-text">
            {stats.firewallRules}
          </div>
          <div className="text-sm text-gray-400">Firewall Rules</div>
          <div className="flex items-center justify-center mt-1">
            <Shield className="text-green-400" size={12} />
          </div>
        </div>
        
        <div className="text-center p-3 bg-gray-800/30 rounded-lg border border-orange-500/20">
          <div className="text-2xl font-bold font-mono text-orange-400 neon-text">
            {stats.intrusionAttempts}
          </div>
          <div className="text-sm text-gray-400">Intrusion Attempts</div>
          <div className="flex items-center justify-center mt-1">
            <AlertCircle className="text-orange-400" size={12} />
          </div>
        </div>
        
        <div className="text-center p-3 bg-gray-800/30 rounded-lg border border-purple-500/20">
          <div className="text-2xl font-bold font-mono text-purple-400 neon-text">
            {stats.uptime}%
          </div>
          <div className="text-sm text-gray-400">Uptime</div>
          <div className="flex items-center justify-center mt-1">
            <Activity className="text-purple-400" size={12} />
          </div>
        </div>
      </div>
    </CyberCard>
  );
}
