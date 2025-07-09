export function generateDigitalSignature(data: string): string {
  // Simple hash function for demonstration
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return `SHA256:${Math.abs(hash).toString(16).toUpperCase()}`;
}

export function calculateThreatLevel(probability: number): 'low' | 'medium' | 'high' | 'critical' {
  if (probability < 0.25) return 'low';
  if (probability < 0.5) return 'medium';
  if (probability < 0.8) return 'high';
  return 'critical';
}

export function formatSecurityMetric(value: number, type: 'percentage' | 'count' | 'score'): string {
  switch (type) {
    case 'percentage':
      return `${(value * 100).toFixed(1)}%`;
    case 'count':
      return value.toLocaleString();
    case 'score':
      return `${value.toFixed(1)}/10`;
    default:
      return value.toString();
  }
}

export function getStatusColor(status: string): string {
  const colors = {
    active: 'text-green-400',
    inactive: 'text-gray-400',
    warning: 'text-orange-400',
    critical: 'text-red-400',
    testing: 'text-purple-400',
    deployed: 'text-cyan-400',
  };
  
  return colors[status as keyof typeof colors] || 'text-gray-400';
}

export function simulateQuantumEncryption(data: string): {
  encrypted: string;
  quantumResistance: number;
  algorithm: string;
} {
  // Simulated quantum encryption
  const algorithms = ['Kyber', 'Dilithium', 'SPHINCS+', 'NTRU'];
  const algorithm = algorithms[Math.floor(Math.random() * algorithms.length)];
  
  return {
    encrypted: btoa(data + Date.now()),
    quantumResistance: Math.random() * 100,
    algorithm,
  };
}

export function analyzeNetworkPattern(connections: Array<{ source: string; dest: string; timestamp: number }>): {
  anomalies: number;
  patterns: string[];
  riskScore: number;
} {
  // Simulated network pattern analysis
  const anomalies = Math.floor(Math.random() * 10);
  const patterns = [
    'Unusual port scanning detected',
    'Suspicious data exfiltration pattern',
    'Potential lateral movement',
    'Encrypted tunnel establishment',
  ];
  
  return {
    anomalies,
    patterns: patterns.slice(0, Math.floor(Math.random() * patterns.length) + 1),
    riskScore: Math.random() * 100,
  };
}
