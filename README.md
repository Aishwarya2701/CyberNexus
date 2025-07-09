# 🧠⚔️ CyberNexus — AI-Powered Cybersecurity Operations Center

**CyberNexus** is a next-generation, full-stack **Cybersecurity Operations Center (SOC) Dashboard** that integrates real-time threat monitoring, AI-driven security intelligence, forensic investigation, and network defense — all wrapped in a futuristic cyber-themed interface.

> 🚀 Built with React, Express, PostgreSQL, and Drizzle ORM, CyberNexus simulates a modern enterprise-grade SOC with advanced automation and real-time response capabilities.

---

## 🔐 Core Features

### 🚪 Authentication System
- Secure login with role-based access (Admin / Analyst)
- Session management with quick-access login

### 📡 Real-Time Threat Monitoring
- Dynamic dashboard with critical security KPIs:
  - ✅ System Health: 98.7%
  - 🚨 Active Threats: 47 detected
  - 🛠️ Vulnerabilities: 12 identified
  - ⚠️ Critical Alerts: 3 unresolved
- Interactive threat actions: **Scan**, **Analyze**, **Neutralize**, **Patch**

### 🤖 AI-Powered Security
- Integrated Threat Predictor using machine learning:
  - Phishing probability analysis
  - Malware detection scoring
  - DDoS vector prediction
  - Zero-day exploit risk evaluation
- Neural network analysis with confidence ratings
- Automated AI-based countermeasures

### 🌐 Network Security Management
- Live network topology:
  - 👥 Active Connections: 847
  - 🔥 Firewall Rules: 23
  - 🛡️ Intrusion Attempts: 12
  - 📶 Network Uptime: 99.2%
- Security lockdown toggle
- Firewall rule control and network scanner

### 🔍 Digital Forensics Lab
- Forensic investigation toolkit:
  - Evidence collection and hash verification
  - Timeline reconstruction of incidents
  - Automated report generation
  - Case management and evidence export

### 🌍 Global Threat Intelligence
- Centralized live threat feed:
  - New malware family detection
  - Attack/mitigation statistics
  - Threat filtering and refresh functionality

### 🔧 Advanced Security Modules
- Modular components for extended security:
  - Biometric identity verification
  - Quantum encryption protocol support
  - Honeypot deployment
  - Behavioral analysis engine
  - Security audit tools

---

## ⚙️ Technical Features

### 🧬 UI & UX
- Futuristic cyber-themed design with neon accents
- Responsive layout and real-time animations
- Command palette, toast notifications, and FABs
- Context-sensitive help system

### 🔁 Real-Time Engine
- WebSocket-powered live dashboard updates
- PostgreSQL with Drizzle ORM for typed schema control
- TanStack Query for efficient state and caching
- Role-based session authentication

### 🎙️ Interactive Controls
- Voice command support
- Visual feedback on command execution
- Floating Action Buttons for critical tasks

---

## 🧱 Tech Stack

| Layer          | Technology                              |
|----------------|------------------------------------------|
| Frontend       | React, TypeScript, Vite, Tailwind CSS    |
| Backend        | Express.js, TypeScript                   |
| Database       | PostgreSQL, Drizzle ORM                  |
| Real-Time      | WebSockets                               |
| State Mgmt     | TanStack Query                           |
| Auth           | Session-based role management            |

---

## 📦 Getting Started

> Make sure you have Node.js (v18+) and PostgreSQL installed locally.

### 🔧 Setup

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/CyberNexus.git
cd CyberNexus

# 2. Install dependencies
npm install

# 3. Configure environment variables
# Create a `.env` file at the root with the following:
#
# DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/cybernexus

# 4. Push database schema
npm run db:push

# 5. Run the app
npm run dev
