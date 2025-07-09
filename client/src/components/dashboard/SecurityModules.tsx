import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Dna, Atom, Worm, UserX, Link, Wifi, 
  Shield, Activity, Search, Clock, Play, Pause, Settings
} from "lucide-react";
import { CyberCard } from "@/components/ui/cyber-card";
import { useToast } from "@/hooks/use-toast";

export default function SecurityModules() {
  const { data: modules } = useQuery({
    queryKey: ['/api/security-modules'],
  });
  const [moduleStates, setModuleStates] = useState<Record<number, string>>({});
  const { toast } = useToast();

  const moduleIcons = {
    identification: Dna,
    encryption: Atom,
    deception: Worm,
    analysis: UserX,
    audit: Link,
    discovery: Wifi,
  };

  const moduleColors = {
    active: "text-cyan-400",
    testing: "text-purple-400",
    deployed: "text-orange-400",
    analyzing: "text-pink-400",
    auditing: "text-green-400",
    scanning: "text-blue-400",
  };

  const handleModuleAction = (moduleId: number, action: string, moduleName: string) => {
    const currentState = moduleStates[moduleId] || 'stopped';
    let newState = currentState;
    let message = '';

    switch (action) {
      case 'start':
        newState = 'running';
        message = `${moduleName} activated and running`;
        break;
      case 'pause':
        newState = 'paused';
        message = `${moduleName} paused`;
        break;
      case 'stop':
        newState = 'stopped';
        message = `${moduleName} stopped`;
        break;
      case 'configure':
        message = `Opening ${moduleName} configuration panel`;
        break;
    }

    if (action !== 'configure') {
      setModuleStates(prev => ({ ...prev, [moduleId]: newState }));
    }

    toast({
      title: "Module Action",
      description: message,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {modules?.map((module) => {
        const IconComponent = moduleIcons[module.type as keyof typeof moduleIcons] || Shield;
        const currentState = moduleStates[module.id] || module.status;
        const statusColor = moduleColors[currentState as keyof typeof moduleColors] || "text-gray-400";
        
        return (
          <CyberCard key={module.id} className="hover:bg-cyan-500/5 group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center ${
                currentState === 'running' ? 'animate-pulse' : ''
              }`}>
                <IconComponent className="text-cyan-400 text-xl" />
              </div>
              <span className={`font-mono text-xs ${statusColor} neon-text`}>
                {currentState.toUpperCase()}
              </span>
            </div>
            
            <h3 className="font-semibold text-lg mb-2">{module.name}</h3>
            <p className="text-sm text-gray-400 mb-4">
              {getModuleDescription(module.type)}
            </p>
            
            <div className="space-y-2 mb-4">
              {module.metrics && Object.entries(module.metrics).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="font-mono text-xs capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className={`font-mono text-xs ${statusColor}`}>
                    {typeof value === 'number' ? 
                      (value > 100 ? value.toLocaleString() : `${value}%`) : 
                      value
                    }
                  </span>
                </div>
              ))}
            </div>

            {/* Interactive Controls */}
            <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex space-x-2">
                {currentState !== 'running' && (
                  <button
                    onClick={() => handleModuleAction(module.id, 'start', module.name)}
                    className="w-8 h-8 bg-green-500/20 hover:bg-green-500/30 rounded flex items-center justify-center transition-colors"
                    title="Start Module"
                  >
                    <Play className="text-green-400" size={14} />
                  </button>
                )}
                
                {currentState === 'running' && (
                  <button
                    onClick={() => handleModuleAction(module.id, 'pause', module.name)}
                    className="w-8 h-8 bg-yellow-500/20 hover:bg-yellow-500/30 rounded flex items-center justify-center transition-colors"
                    title="Pause Module"
                  >
                    <Pause className="text-yellow-400" size={14} />
                  </button>
                )}
                
                <button
                  onClick={() => handleModuleAction(module.id, 'configure', module.name)}
                  className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 rounded flex items-center justify-center transition-colors"
                  title="Configure Module"
                >
                  <Settings className="text-blue-400" size={14} />
                </button>
              </div>
              
              <div className={`w-2 h-2 rounded-full ${
                currentState === 'running' ? 'bg-green-400 animate-pulse' :
                currentState === 'paused' ? 'bg-yellow-400' : 'bg-gray-400'
              }`} />
            </div>
          </CyberCard>
        );
      })}
    </div>
  );
}

function getModuleDescription(type: string): string {
  const descriptions = {
    identification: "Unique digital signatures for devices and users",
    encryption: "Testing encryption against quantum attacks",
    deception: "Simulating fake networks to trap attackers",
    analysis: "Analyzing attacker behavior patterns",
    audit: "Smart contract vulnerability analysis",
    discovery: "Mapping and securing unknown IoT devices",
  };
  
  return descriptions[type as keyof typeof descriptions] || "Advanced security module";
}
