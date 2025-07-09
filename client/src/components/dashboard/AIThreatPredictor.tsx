import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Brain, Activity, Zap, RefreshCw, Target, Eye } from "lucide-react";
import { CyberCard } from "@/components/ui/cyber-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { useToast } from "@/hooks/use-toast";

export default function AIThreatPredictor() {
  const { data: threats } = useQuery({
    queryKey: ['/api/threats'],
  });
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictions, setPredictions] = useState([
    { name: "Phishing Attack Probability", value: 78, color: "text-orange-400", trend: "↑" },
    { name: "Malware Detection Likelihood", value: 34, color: "text-pink-400", trend: "↓" },
    { name: "DDoS Attack Vector", value: 12, color: "text-green-400", trend: "→" },
    { name: "Zero-Day Exploit Risk", value: 89, color: "text-red-400", trend: "↑" },
  ]);
  const [currentAnalysis, setCurrentAnalysis] = useState("Advanced persistent threat detected. Behavioral pattern suggests state-sponsored actor. Confidence: 94.2%");
  const { toast } = useToast();

  const refreshPredictions = () => {
    setIsAnalyzing(true);
    toast({
      title: "AI Analysis Refreshed",
      description: "Recalculating threat probabilities with latest data patterns",
    });

    // Simulate analysis refresh
    setTimeout(() => {
      setPredictions(prev => prev.map(p => ({
        ...p,
        value: Math.max(5, Math.min(95, p.value + (Math.random() - 0.5) * 20)),
        trend: Math.random() > 0.5 ? "↑" : Math.random() > 0.5 ? "↓" : "→"
      })));
      
      const analyses = [
        "Advanced persistent threat detected. Behavioral pattern suggests state-sponsored actor. Confidence: 94.2%",
        "Multi-vector attack in progress. Coordinated phishing and malware deployment identified. Confidence: 87.1%",
        "Anomalous network traffic detected. Potential data exfiltration attempt. Confidence: 76.3%",
        "Zero-day exploit signature match found. Immediate patching recommended. Confidence: 91.8%",
        "Insider threat indicators detected. User behavioral analysis suggests compromised credentials. Confidence: 82.5%"
      ];
      
      setCurrentAnalysis(analyses[Math.floor(Math.random() * analyses.length)]);
      setIsAnalyzing(false);
    }, 3000);
  };

  const deployCountermeasures = () => {
    toast({
      title: "AI Countermeasures Deployed",
      description: "Automated response protocols activated based on threat predictions",
    });
  };

  const investigateThreat = () => {
    toast({
      title: "Deep Threat Investigation",
      description: "Launching comprehensive analysis of identified threat vectors",
    });
  };

  return (
    <CyberCard className="xl:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold holographic-text">AI Threat Predictor</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-yellow-400' : 'bg-green-400'} animate-pulse`} />
            <span className={`font-mono text-sm ${isAnalyzing ? 'text-yellow-400' : 'text-green-400'}`}>
              {isAnalyzing ? 'Recalculating' : 'Analyzing'}
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={refreshPredictions}
              disabled={isAnalyzing}
              className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 rounded flex items-center justify-center transition-colors disabled:opacity-50"
              title="Refresh Analysis"
            >
              <RefreshCw className={`text-blue-400 ${isAnalyzing ? 'animate-spin' : ''}`} size={16} />
            </button>
            
            <button
              onClick={deployCountermeasures}
              className="w-8 h-8 bg-purple-500/20 hover:bg-purple-500/30 rounded flex items-center justify-center transition-colors"
              title="Deploy Countermeasures"
            >
              <Zap className="text-purple-400" size={16} />
            </button>
            
            <button
              onClick={investigateThreat}
              className="w-8 h-8 bg-orange-500/20 hover:bg-orange-500/30 rounded flex items-center justify-center transition-colors"
              title="Investigate Threats"
            >
              <Eye className="text-orange-400" size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-6 scanner-line">
        <img 
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=300" 
          alt="AI threat analysis visualization" 
          className="rounded-lg w-full h-48 object-cover opacity-60"
        />
      </div>
      
      <div className="space-y-4">
        {predictions.map((prediction, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm">{prediction.name}</span>
              <div className="flex items-center space-x-2">
                <span className={`font-mono text-xs ${prediction.color} opacity-60`}>
                  {prediction.trend}
                </span>
                <span className={`font-mono ${prediction.color} neon-text`}>
                  {Math.round(prediction.value)}%
                </span>
              </div>
            </div>
            <ProgressBar value={prediction.value} className={isAnalyzing ? 'animate-pulse' : ''} />
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-cyan-500/20">
        <div className="flex items-center space-x-2 mb-2">
          <Brain className="text-cyan-400" size={16} />
          <span className="font-mono text-sm text-cyan-400">Neural Analysis</span>
        </div>
        <p className={`text-sm font-mono text-gray-300 ${isAnalyzing ? 'animate-pulse' : ''}`}>
          Current Analysis: {currentAnalysis}
        </p>
      </div>
    </CyberCard>
  );
}
