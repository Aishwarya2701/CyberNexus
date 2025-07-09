import { useState } from "react";
import { Shield, AlertTriangle, Bug, Skull, Zap, Eye, Target, Activity } from "lucide-react";
import { CyberCard } from "@/components/ui/cyber-card";
import { ThreatIndicator } from "@/components/ui/threat-indicator";
import { useToast } from "@/hooks/use-toast";

interface ThreatOverviewProps {
  stats?: {
    systemHealth: number;
    activeThreats: number;
    vulnerabilities: number;
    criticalAlerts: number;
  };
}

export default function ThreatOverview({ stats }: ThreatOverviewProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const { toast } = useToast();
  
  const defaultStats = {
    systemHealth: 98.7,
    activeThreats: 47,
    vulnerabilities: 12,
    criticalAlerts: 3,
  };

  const data = stats || defaultStats;

  const handleCardAction = (cardType: string, action: string) => {
    let message = '';
    let description = '';

    switch (cardType) {
      case 'health':
        if (action === 'scan') {
          message = 'System Health Scan Initiated';
          description = 'Running comprehensive diagnostics across all security modules';
        } else if (action === 'optimize') {
          message = 'System Optimization Started';
          description = 'Applying performance enhancements and security patches';
        }
        break;
      case 'threats':
        if (action === 'analyze') {
          message = 'Threat Analysis Started';
          description = 'Deep scanning active threats for attack vectors and origins';
        } else if (action === 'neutralize') {
          message = 'Threat Neutralization Initiated';
          description = 'Deploying countermeasures against identified threats';
        }
        break;
      case 'vulnerabilities':
        if (action === 'patch') {
          message = 'Auto-Patching Initiated';
          description = 'Applying security patches to identified vulnerabilities';
        } else if (action === 'scan') {
          message = 'Vulnerability Scan Started';
          description = 'Scanning for new CVEs and security weaknesses';
        }
        break;
      case 'alerts':
        if (action === 'investigate') {
          message = 'Critical Alert Investigation';
          description = 'Launching forensic analysis of critical security alerts';
        } else if (action === 'escalate') {
          message = 'Alert Escalated';
          description = 'Notifying security team and raising threat level';
        }
        break;
    }

    toast({
      title: message,
      description: description,
    });

    setActiveCard(cardType);
    setTimeout(() => setActiveCard(null), 3000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* System Health Card */}
      <CyberCard className={`threat-level-low hover:bg-green-500/5 group cursor-pointer ${
        activeCard === 'health' ? 'ring-2 ring-green-400 animate-pulse' : ''
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
            <Shield className="text-green-400 text-xl" />
          </div>
          <ThreatIndicator level="low" />
        </div>
        <h3 className="font-semibold text-lg mb-2">System Health</h3>
        <p className="text-3xl font-bold font-mono text-green-400 neon-text">
          {data.systemHealth}%
        </p>
        <p className="text-sm text-gray-400 mt-1">All systems operational</p>
        
        {/* Interactive Actions */}
        <div className="flex space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => handleCardAction('health', 'scan')}
            className="flex-1 bg-green-500/20 hover:bg-green-500/30 rounded p-2 flex items-center justify-center transition-colors"
            title="Run Health Scan"
          >
            <Activity className="text-green-400" size={16} />
          </button>
          <button
            onClick={() => handleCardAction('health', 'optimize')}
            className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 rounded p-2 flex items-center justify-center transition-colors"
            title="Optimize System"
          >
            <Zap className="text-blue-400" size={16} />
          </button>
        </div>
      </CyberCard>

      {/* Active Threats Card */}
      <CyberCard className={`threat-level-medium hover:bg-orange-500/5 group cursor-pointer ${
        activeCard === 'threats' ? 'ring-2 ring-orange-400 animate-pulse' : ''
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
            <AlertTriangle className="text-orange-400 text-xl" />
          </div>
          <ThreatIndicator level="medium" />
        </div>
        <h3 className="font-semibold text-lg mb-2">Active Threats</h3>
        <p className="text-3xl font-bold font-mono text-orange-400 neon-text">
          {data.activeThreats}
        </p>
        <p className="text-sm text-gray-400 mt-1">Monitoring in progress</p>
        
        <div className="flex space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => handleCardAction('threats', 'analyze')}
            className="flex-1 bg-orange-500/20 hover:bg-orange-500/30 rounded p-2 flex items-center justify-center transition-colors"
            title="Analyze Threats"
          >
            <Eye className="text-orange-400" size={16} />
          </button>
          <button
            onClick={() => handleCardAction('threats', 'neutralize')}
            className="flex-1 bg-red-500/20 hover:bg-red-500/30 rounded p-2 flex items-center justify-center transition-colors"
            title="Neutralize Threats"
          >
            <Target className="text-red-400" size={16} />
          </button>
        </div>
      </CyberCard>

      {/* Vulnerabilities Card */}
      <CyberCard className={`threat-level-high hover:bg-pink-500/5 group cursor-pointer ${
        activeCard === 'vulnerabilities' ? 'ring-2 ring-pink-400 animate-pulse' : ''
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
            <Bug className="text-pink-400 text-xl" />
          </div>
          <ThreatIndicator level="high" />
        </div>
        <h3 className="font-semibold text-lg mb-2">Vulnerabilities</h3>
        <p className="text-3xl font-bold font-mono text-pink-400 neon-text">
          {data.vulnerabilities}
        </p>
        <p className="text-sm text-gray-400 mt-1">Require immediate attention</p>
        
        <div className="flex space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => handleCardAction('vulnerabilities', 'patch')}
            className="flex-1 bg-pink-500/20 hover:bg-pink-500/30 rounded p-2 flex items-center justify-center transition-colors"
            title="Auto-Patch"
          >
            <Shield className="text-pink-400" size={16} />
          </button>
          <button
            onClick={() => handleCardAction('vulnerabilities', 'scan')}
            className="flex-1 bg-purple-500/20 hover:bg-purple-500/30 rounded p-2 flex items-center justify-center transition-colors"
            title="Deep Scan"
          >
            <Activity className="text-purple-400" size={16} />
          </button>
        </div>
      </CyberCard>

      {/* Critical Alerts Card */}
      <CyberCard className={`threat-level-critical hover:bg-red-500/5 group cursor-pointer ${
        activeCard === 'alerts' ? 'ring-2 ring-red-400 animate-pulse' : ''
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
            <Skull className="text-red-400 text-xl" />
          </div>
          <ThreatIndicator level="critical" />
        </div>
        <h3 className="font-semibold text-lg mb-2">Critical Alerts</h3>
        <p className="text-3xl font-bold font-mono text-red-400 neon-text">
          {data.criticalAlerts}
        </p>
        <p className="text-sm text-gray-400 mt-1">Immediate action required</p>
        
        <div className="flex space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => handleCardAction('alerts', 'investigate')}
            className="flex-1 bg-red-500/20 hover:bg-red-500/30 rounded p-2 flex items-center justify-center transition-colors"
            title="Investigate Alerts"
          >
            <Eye className="text-red-400" size={16} />
          </button>
          <button
            onClick={() => handleCardAction('alerts', 'escalate')}
            className="flex-1 bg-yellow-500/20 hover:bg-yellow-500/30 rounded p-2 flex items-center justify-center transition-colors"
            title="Escalate Alert"
          >
            <AlertTriangle className="text-yellow-400" size={16} />
          </button>
        </div>
      </CyberCard>
    </div>
  );
}
