import { db } from "./db";
import { users, threats, devices, vulnerabilities, securityModules, honeypots, forensicCases, neuralNetworks, quantumSimulations } from "@shared/schema";

async function initializeDatabase() {
  try {
    console.log("Initializing database with sample data...");

    // Create sample users
    const sampleUsers = [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "analyst", password: "analyst123", role: "analyst" },
    ];

    for (const user of sampleUsers) {
      await db.insert(users).values(user).onConflictDoNothing();
    }

    // Create sample threats
    const sampleThreats = [
      {
        name: "Phishing Campaign Alpha",
        type: "email",
        severity: "high",
        probability: 0.85,
        status: "active",
        description: "Sophisticated phishing campaign targeting C-level executives",
        metadata: { campaign: "alpha", targets: ["CEO", "CTO", "CFO"] }
      },
      {
        name: "Ransomware Detected",
        type: "malware",
        severity: "critical",
        probability: 0.92,
        status: "active",
        description: "Ransomware encryption activity detected on network shares",
        metadata: { variant: "lockbit", affected_systems: 15 }
      },
      {
        name: "SQL Injection Attempt",
        type: "web",
        severity: "medium",
        probability: 0.67,
        status: "mitigated",
        description: "Multiple SQL injection attempts against web application",
        metadata: { endpoint: "/api/users", attempts: 23 }
      }
    ];

    for (const threat of sampleThreats) {
      await db.insert(threats).values(threat).onConflictDoNothing();
    }

    // Create sample devices
    const sampleDevices = [
      {
        name: "Server-01",
        type: "server",
        ipAddress: "192.168.1.100",
        macAddress: "00:1B:44:11:3A:B7",
        digitalSignature: "SHA256:8b:43:eb:c2:68:95:17:32:42:1a:cf:d8:9e:7f:21:56",
        securityScore: 95,
        isSecure: true,
        metadata: { os: "Ubuntu 22.04", role: "web-server" }
      },
      {
        name: "Workstation-Alpha",
        type: "workstation",
        ipAddress: "192.168.1.150",
        macAddress: "00:1B:44:11:3A:C8",
        digitalSignature: "SHA256:9c:54:fc:d3:79:a6:28:43:53:2b:d0:e9:af:80:32:67",
        securityScore: 78,
        isSecure: true,
        metadata: { os: "Windows 11", user: "analyst" }
      },
      {
        name: "IoT-Camera-001",
        type: "camera",
        ipAddress: "192.168.1.200",
        macAddress: "00:1B:44:11:3A:D9",
        digitalSignature: "SHA256:ad:65:0d:e4:8a:b7:39:54:64:3c:e1:fa:b0:91:43:78",
        securityScore: 45,
        isSecure: false,
        metadata: { firmware: "v1.2.3", location: "lobby" }
      }
    ];

    for (const device of sampleDevices) {
      await db.insert(devices).values(device).onConflictDoNothing();
    }

    // Create sample vulnerabilities
    const sampleVulnerabilities = [
      {
        title: "Outdated SSL Certificate",
        severity: "medium",
        status: "open",
        description: "SSL certificate on web server expires in 7 days",
        cveId: null,
        affectedDevices: ["Server-01"],
        metadata: { expiration_date: "2024-12-15", cert_type: "wildcard" }
      },
      {
        title: "Unpatched Apache Struts",
        severity: "critical",
        status: "open",
        description: "Critical vulnerability in Apache Struts framework",
        cveId: "CVE-2023-50164",
        affectedDevices: ["Server-01"],
        metadata: { version: "2.5.30", patch_available: true }
      }
    ];

    for (const vulnerability of sampleVulnerabilities) {
      await db.insert(vulnerabilities).values(vulnerability).onConflictDoNothing();
    }

    // Create sample security modules
    const sampleSecurityModules = [
      {
        name: "Digital DNA Fingerprinting",
        type: "behavioral",
        status: "active",
        version: "2.1.0",
        description: "Advanced behavioral analysis for threat detection",
        config: { sensitivity: 0.85, learning_rate: 0.01 }
      },
      {
        name: "Quantum Cryptography Engine",
        type: "encryption",
        status: "active",
        version: "1.5.2",
        description: "Quantum-resistant encryption protocols",
        config: { key_size: 4096, algorithm: "CRYSTALS-Kyber" }
      },
      {
        name: "Neural Threat Predictor",
        type: "ai",
        status: "active",
        version: "3.0.1",
        description: "AI-powered threat prediction system",
        config: { model_type: "transformer", accuracy: 0.94 }
      }
    ];

    for (const module of sampleSecurityModules) {
      await db.insert(securityModules).values(module).onConflictDoNothing();
    }

    // Create sample honeypots
    const sampleHoneypots = [
      {
        name: "Web Server Honeypot",
        type: "web",
        status: "active",
        attackersTrapped: 12,
        interactionsCount: 145,
        config: { service: "apache", port: 8080, fake_data: true }
      },
      {
        name: "SSH Honeypot",
        type: "ssh",
        status: "active",
        attackersTrapped: 8,
        interactionsCount: 67,
        config: { service: "openssh", port: 2222, banner: "OpenSSH_7.4" }
      }
    ];

    for (const honeypot of sampleHoneypots) {
      await db.insert(honeypots).values(honeypot).onConflictDoNothing();
    }

    // Create sample forensic cases
    const sampleForensicCases = [
      {
        caseNumber: "FOR-2024-001",
        title: "Data Exfiltration Investigation",
        priority: "high",
        status: "open",
        assignedTo: "analyst",
        evidence: { files: ["network.pcap", "system.log"], hash: "sha256:abc123" },
        timeline: { started: "2024-07-01", updated: "2024-07-04" }
      },
      {
        caseNumber: "FOR-2024-002",
        title: "Insider Threat Analysis",
        priority: "medium",
        status: "open",
        assignedTo: "analyst",
        evidence: { files: ["user_activity.log", "file_access.log"], hash: "sha256:def456" },
        timeline: { started: "2024-07-03", updated: "2024-07-04" }
      }
    ];

    for (const forensicCase of sampleForensicCases) {
      await db.insert(forensicCases).values(forensicCase).onConflictDoNothing();
    }

    // Create sample neural networks
    const sampleNeuralNetworks = [
      {
        name: "Threat Prediction Engine",
        type: "classification",
        status: "active",
        accuracy: 0.94,
        config: { layers: 5, neurons: 512, activation: "relu" }
      },
      {
        name: "Anomaly Detection Model",
        type: "anomaly",
        status: "training",
        accuracy: 0.87,
        config: { algorithm: "autoencoder", threshold: 0.05 }
      }
    ];

    for (const network of sampleNeuralNetworks) {
      await db.insert(neuralNetworks).values(network).onConflictDoNothing();
    }

    // Create sample quantum simulations
    const sampleQuantumSimulations = [
      {
        name: "Quantum Key Distribution Test",
        type: "cryptography",
        status: "completed",
        qubits: 256,
        fidelity: 0.98,
        config: { protocol: "BB84", distance: "100km" }
      },
      {
        name: "Quantum Threat Simulation",
        type: "security",
        status: "running",
        qubits: 512,
        fidelity: 0.95,
        config: { attack_type: "quantum_supremacy", target: "RSA-2048" }
      }
    ];

    for (const simulation of sampleQuantumSimulations) {
      await db.insert(quantumSimulations).values(simulation).onConflictDoNothing();
    }

    console.log("Database initialized successfully with sample data!");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

// Run if this file is executed directly
initializeDatabase()
  .then(() => {
    console.log("Database initialization completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Database initialization failed:", error);
    process.exit(1);
  });

export { initializeDatabase };