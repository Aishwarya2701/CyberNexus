import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Fingerprint, Clock, FileText, Play, Download, Eye, Database } from "lucide-react";
import { CyberCard } from "@/components/ui/cyber-card";
import { useToast } from "@/hooks/use-toast";

export default function DigitalForensics() {
  const { data: forensicCases } = useQuery({
    queryKey: ['/api/forensic-cases'],
  });

  const [activities, setActivities] = useState([
    { icon: Search, label: "Evidence Collection", status: "92%", color: "text-cyan-400", progress: 92 },
    { icon: Fingerprint, label: "Hash Analysis", status: "Complete", color: "text-green-400", progress: 100 },
    { icon: Clock, label: "Timeline Reconstruction", status: "In Progress", color: "text-orange-400", progress: 67 },
    { icon: FileText, label: "Report Generation", status: "Pending", color: "text-gray-400", progress: 0 },
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const startAnalysis = () => {
    setIsAnalyzing(true);
    toast({
      title: "Forensic Analysis Started",
      description: "Deep dive investigation of digital evidence initiated",
    });

    // Simulate progress updates
    const interval = setInterval(() => {
      setActivities(prev => prev.map(activity => {
        if (activity.progress < 100 && activity.label !== "Report Generation") {
          const newProgress = Math.min(100, activity.progress + Math.random() * 10);
          return {
            ...activity,
            progress: newProgress,
            status: newProgress === 100 ? "Complete" : `${Math.round(newProgress)}%`,
            color: newProgress === 100 ? "text-green-400" : activity.color
          };
        }
        return activity;
      }));
    }, 2000);

    setTimeout(() => {
      clearInterval(interval);
      setIsAnalyzing(false);
      // Start report generation
      setActivities(prev => prev.map(activity => 
        activity.label === "Report Generation" 
          ? { ...activity, status: "In Progress", color: "text-orange-400", progress: 25 }
          : activity
      ));
      toast({
        title: "Analysis Complete",
        description: "Evidence collection and hash analysis finished. Report generation started.",
      });
    }, 8000);
  };

  const generateReport = () => {
    toast({
      title: "Generating Forensic Report",
      description: "Compiling investigation findings into comprehensive report",
    });
    
    setTimeout(() => {
      setActivities(prev => prev.map(activity => 
        activity.label === "Report Generation" 
          ? { ...activity, status: "Complete", color: "text-green-400", progress: 100 }
          : activity
      ));
      toast({
        title: "Report Ready",
        description: "Digital forensics investigation report generated successfully",
      });
    }, 3000);
  };

  const exportEvidence = () => {
    toast({
      title: "Evidence Package Exported",
      description: "Digital evidence exported in forensically sound format",
    });
  };

  return (
    <CyberCard>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold holographic-text">Digital Forensics Lab</h2>
        <div className="flex space-x-2">
          <button
            onClick={startAnalysis}
            disabled={isAnalyzing}
            className="w-8 h-8 bg-cyan-500/20 hover:bg-cyan-500/30 rounded flex items-center justify-center transition-colors disabled:opacity-50"
            title="Start Analysis"
          >
            <Play className={`text-cyan-400 ${isAnalyzing ? 'animate-pulse' : ''}`} size={16} />
          </button>
          
          <button
            onClick={generateReport}
            className="w-8 h-8 bg-purple-500/20 hover:bg-purple-500/30 rounded flex items-center justify-center transition-colors"
            title="Generate Report"
          >
            <FileText className="text-purple-400" size={16} />
          </button>
          
          <button
            onClick={exportEvidence}
            className="w-8 h-8 bg-green-500/20 hover:bg-green-500/30 rounded flex items-center justify-center transition-colors"
            title="Export Evidence"
          >
            <Download className="text-green-400" size={16} />
          </button>
        </div>
      </div>
      
      <div className="mb-6 scanner-line">
        <img 
          src="https://images.unsplash.com/photo-1573164713619-24c711fe7878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=400" 
          alt="Digital forensics investigation" 
          className="rounded-lg w-full h-64 object-cover opacity-60"
        />
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className={`flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700/50 ${
            isAnalyzing && activity.progress < 100 ? 'animate-pulse' : ''
          }`}>
            <div className="flex items-center space-x-3">
              <activity.icon className={activity.color} size={20} />
              <div className="flex-1">
                <span className="font-mono text-sm">{activity.label}</span>
                {activity.progress > 0 && activity.progress < 100 && (
                  <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                    <div 
                      className="bg-cyan-400 h-1 rounded-full transition-all duration-1000" 
                      style={{ width: `${activity.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
            <span className={`font-mono text-sm ${activity.color} neon-text`}>
              {activity.status}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-cyan-500/20">
        <div className="flex items-center space-x-2 mb-2">
          <FileText className="text-cyan-400" size={16} />
          <span className="font-mono text-sm text-cyan-400">Active Cases</span>
        </div>
        <p className={`text-sm font-mono text-gray-300 ${isAnalyzing ? 'animate-pulse' : ''}`}>
          {forensicCases?.length || 0} cases in progress. Latest: Data breach investigation 
          - {isAnalyzing ? 'Active analysis in progress' : 'Evidence collection 92% complete'}.
        </p>
      </div>
    </CyberCard>
  );
}
