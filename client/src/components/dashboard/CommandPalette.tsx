import { useState, useEffect } from "react";
import { Terminal, Search, Shield, Brain, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onExecute: (command: string) => void;
}

export default function CommandPalette({ isOpen, onClose, onExecute }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands = [
    { icon: Search, label: "Threat Intelligence Search", command: "search threats", description: "Deep scan for emerging threats" },
    { icon: Shield, label: "Deploy Virtual Honeypot", command: "deploy honeypot", description: "Create deception network trap" },
    { icon: Brain, label: "Analyze Behavioral Patterns", command: "analyze behavior", description: "AI-powered user behavior analysis" },
    { icon: Zap, label: "Execute Quantum Simulation", command: "run quantum", description: "Test quantum-resistant encryption" },
    { icon: Terminal, label: "System Diagnostics", command: "diagnostics", description: "Comprehensive system health check" },
    { icon: Shield, label: "Activate Cyber Shield", command: "activate shield", description: "Enable maximum protection mode" },
    { icon: Search, label: "Forensic Investigation", command: "forensics", description: "Launch digital evidence collection" },
    { icon: Brain, label: "Neural Network Training", command: "train network", description: "Improve AI threat detection" },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => (i + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => (i - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          onExecute(filteredCommands[selectedIndex].command);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onExecute, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="command-palette max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Terminal className="text-cyan-400" />
            <span className="font-mono text-cyan-400">Command Palette</span>
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            Execute commands quickly using keyboard shortcuts or search functionality.
          </DialogDescription>
        </DialogHeader>
        
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type command or search..."
          className="w-full bg-gray-800/50 border-cyan-500/30 font-mono focus:border-cyan-400"
          autoFocus
        />
        
        <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
          {filteredCommands.map((cmd, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                index === selectedIndex 
                  ? 'bg-cyan-500/20 border border-cyan-500/50' 
                  : 'hover:bg-gray-800/50 border border-transparent'
              }`}
              onClick={() => onExecute(cmd.command)}
            >
              <div className="flex items-center space-x-3">
                <cmd.icon className="text-cyan-400" size={18} />
                <div>
                  <div className="font-mono text-sm">{cmd.label}</div>
                  <div className="font-mono text-xs text-gray-400">{cmd.description}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 font-mono">
                {index === selectedIndex ? '↵' : ''}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <div className="flex items-center space-x-4 text-xs text-gray-400 font-mono">
            <span>↑↓ Navigate</span>
            <span>Enter Execute</span>
            <span>Esc Close</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
