import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Brain, Cpu, Zap, Play, Pause, RotateCcw, TrendingUp } from "lucide-react";
import { CyberCard } from "@/components/ui/cyber-card";
import { useToast } from "@/hooks/use-toast";

export default function NeuralNetworkActivity() {
  const { data: networks } = useQuery({
    queryKey: ['/api/neural-networks'],
  });

  const [isTraining, setIsTraining] = useState(false);
  const [networkStats, setNetworkStats] = useState({
    processingNodes: 2847,
    learningRate: 94.2,
    patternRecognition: 89.7,
    accuracy: 94.2,
  });
  const [analysisType, setAnalysisType] = useState("Behavioral pattern anomaly");
  const { toast } = useToast();

  const network = networks?.[0] || networkStats;

  const startTraining = () => {
    setIsTraining(true);
    toast({
      title: "Neural Network Training Started",
      description: "Initiating deep learning algorithms with latest threat data",
    });

    // Simulate training with gradual improvement
    const trainingInterval = setInterval(() => {
      setNetworkStats(prev => ({
        processingNodes: prev.processingNodes + Math.floor(Math.random() * 50),
        learningRate: Math.min(99.9, prev.learningRate + Math.random() * 2),
        patternRecognition: Math.min(99.9, prev.patternRecognition + Math.random() * 3),
        accuracy: Math.min(99.9, prev.accuracy + Math.random() * 1.5),
      }));
    }, 1000);

    setTimeout(() => {
      clearInterval(trainingInterval);
      setIsTraining(false);
      toast({
        title: "Training Complete",
        description: "Neural network has improved threat detection capabilities",
      });
    }, 10000);
  };

  const resetNetwork = () => {
    setNetworkStats({
      processingNodes: 2847,
      learningRate: 94.2,
      patternRecognition: 89.7,
      accuracy: 94.2,
    });
    toast({
      title: "Network Reset",
      description: "Neural network restored to baseline configuration",
    });
  };

  const analyzePattern = () => {
    const patterns = [
      "Behavioral pattern anomaly detected in user session #4721",
      "Advanced persistent threat signature identified",
      "Insider threat probability calculation complete",
      "Zero-day exploit pattern recognition active",
      "Multi-vector attack coordination detected"
    ];
    setAnalysisType(patterns[Math.floor(Math.random() * patterns.length)]);
    toast({
      title: "Pattern Analysis Updated",
      description: "Neural network has identified new threat patterns",
    });
  };

  return (
    <CyberCard>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold holographic-text">Neural Network Activity</h2>
        <div className="flex space-x-2">
          <button
            onClick={startTraining}
            disabled={isTraining}
            className="w-8 h-8 bg-green-500/20 hover:bg-green-500/30 rounded flex items-center justify-center transition-colors disabled:opacity-50"
            title="Start Training"
          >
            <Play className={`text-green-400 ${isTraining ? 'animate-pulse' : ''}`} size={16} />
          </button>
          
          <button
            onClick={analyzePattern}
            className="w-8 h-8 bg-purple-500/20 hover:bg-purple-500/30 rounded flex items-center justify-center transition-colors"
            title="Analyze Patterns"
          >
            <TrendingUp className="text-purple-400" size={16} />
          </button>
          
          <button
            onClick={resetNetwork}
            className="w-8 h-8 bg-orange-500/20 hover:bg-orange-500/30 rounded flex items-center justify-center transition-colors"
            title="Reset Network"
          >
            <RotateCcw className="text-orange-400" size={16} />
          </button>
        </div>
      </div>
      
      <div className="mb-6 scanner-line">
        <img 
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300" 
          alt="Neural network visualization" 
          className="rounded-lg w-full h-48 object-cover opacity-60"
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm">Processing Nodes</span>
          <span className={`text-cyan-400 font-mono neon-text ${isTraining ? 'animate-pulse' : ''}`}>
            {Math.round(networkStats.processingNodes).toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm">Learning Rate</span>
          <span className={`text-green-400 font-mono neon-text ${isTraining ? 'animate-pulse' : ''}`}>
            {networkStats.learningRate.toFixed(1)}%
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm">Pattern Recognition</span>
          <span className={`text-purple-400 font-mono neon-text ${isTraining ? 'animate-pulse' : ''}`}>
            {networkStats.patternRecognition.toFixed(1)}%
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm">Model Accuracy</span>
          <span className={`text-blue-400 font-mono neon-text ${isTraining ? 'animate-pulse' : ''}`}>
            {networkStats.accuracy.toFixed(1)}%
          </span>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-cyan-500/20">
        <div className="flex items-center space-x-2 mb-2">
          <Brain className="text-cyan-400" size={16} />
          <span className="font-mono text-sm text-cyan-400">Current Analysis</span>
        </div>
        <p className={`text-sm font-mono text-gray-300 ${isTraining ? 'animate-pulse' : ''}`}>
          {analysisType} detected in user session #4721. 
          {isTraining ? 'Training in progress...' : 'Potential insider threat identified.'}
        </p>
      </div>
    </CyberCard>
  );
}
