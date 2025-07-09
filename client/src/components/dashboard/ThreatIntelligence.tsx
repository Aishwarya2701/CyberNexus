import { useQuery } from "@tanstack/react-query";
import { RefreshCw, Filter, TrendingUp, AlertTriangle } from "lucide-react";
import { CyberCard } from "@/components/ui/cyber-card";
import { Button } from "@/components/ui/button";

export default function ThreatIntelligence() {
  const { data: threats, refetch } = useQuery({
    queryKey: ['/api/threats'],
  });

  const stats = {
    activeThreats: threats?.filter(t => t.status === 'active').length || 1247,
    newMalwareFamilies: 89,
    mitigatedAttacks: 432,
  };

  return (
    <CyberCard className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold holographic-text">Global Threat Intelligence</h2>
        <div className="flex items-center space-x-4">
          <Button 
            onClick={() => refetch()}
            variant="outline"
            size="sm"
            className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30"
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30"
          >
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
        </div>
      </div>
      
      <div className="mb-6 scanner-line">
        <img 
          src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=300" 
          alt="Global threat intelligence dashboard" 
          className="rounded-lg w-full h-64 object-cover opacity-60"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-gray-800/30 rounded-lg border border-cyan-500/20">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <AlertTriangle className="text-cyan-400" size={20} />
            <span className="text-3xl font-bold font-mono text-cyan-400 neon-text">
              {stats.activeThreats.toLocaleString()}
            </span>
          </div>
          <div className="text-sm text-gray-400">Active Threats</div>
          <div className="text-xs text-cyan-400 font-mono mt-1">
            <TrendingUp size={12} className="inline mr-1" />
            +23% from last week
          </div>
        </div>
        
        <div className="text-center p-4 bg-gray-800/30 rounded-lg border border-orange-500/20">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <AlertTriangle className="text-orange-400" size={20} />
            <span className="text-3xl font-bold font-mono text-orange-400 neon-text">
              {stats.newMalwareFamilies}
            </span>
          </div>
          <div className="text-sm text-gray-400">New Malware Families</div>
          <div className="text-xs text-orange-400 font-mono mt-1">
            <TrendingUp size={12} className="inline mr-1" />
            +12% from last week
          </div>
        </div>
        
        <div className="text-center p-4 bg-gray-800/30 rounded-lg border border-green-500/20">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <AlertTriangle className="text-green-400" size={20} />
            <span className="text-3xl font-bold font-mono text-green-400 neon-text">
              {stats.mitigatedAttacks}
            </span>
          </div>
          <div className="text-sm text-gray-400">Mitigated Attacks</div>
          <div className="text-xs text-green-400 font-mono mt-1">
            <TrendingUp size={12} className="inline mr-1" />
            +45% from last week
          </div>
        </div>
      </div>
    </CyberCard>
  );
}
