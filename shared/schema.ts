import { pgTable, text, serial, integer, boolean, timestamp, jsonb, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("analyst"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const threats = pgTable("threats", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  severity: text("severity").notNull(),
  status: text("status").notNull().default("active"),
  probability: real("probability").notNull(),
  description: text("description"),
  detectedAt: timestamp("detected_at").defaultNow(),
  metadata: jsonb("metadata"),
});

export const devices = pgTable("devices", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  ipAddress: text("ip_address"),
  macAddress: text("mac_address"),
  digitalSignature: text("digital_signature"),
  securityScore: real("security_score").notNull().default(0),
  lastSeen: timestamp("last_seen").defaultNow(),
  isSecure: boolean("is_secure").notNull().default(false),
  metadata: jsonb("metadata"),
});

export const vulnerabilities = pgTable("vulnerabilities", {
  id: serial("id").primaryKey(),
  cveId: text("cve_id"),
  title: text("title").notNull(),
  severity: text("severity").notNull(),
  description: text("description"),
  affectedDevices: text("affected_devices").array(),
  status: text("status").notNull().default("open"),
  discoveredAt: timestamp("discovered_at").defaultNow(),
  metadata: jsonb("metadata"),
});

export const securityModules = pgTable("security_modules", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull().default("active"),
  performance: real("performance").notNull().default(0),
  lastUpdate: timestamp("last_update").defaultNow(),
  config: jsonb("config"),
  metrics: jsonb("metrics"),
});

export const honeypots = pgTable("honeypots", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull().default("deployed"),
  attackersTrapped: integer("attackers_trapped").notNull().default(0),
  interactionsCount: integer("interactions_count").notNull().default(0),
  lastInteraction: timestamp("last_interaction"),
  config: jsonb("config"),
});

export const forensicCases = pgTable("forensic_cases", {
  id: serial("id").primaryKey(),
  caseNumber: text("case_number").notNull().unique(),
  title: text("title").notNull(),
  status: text("status").notNull().default("open"),
  priority: text("priority").notNull(),
  assignedTo: text("assigned_to"),
  evidence: jsonb("evidence"),
  timeline: jsonb("timeline"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const neuralNetworks = pgTable("neural_networks", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull().default("training"),
  accuracy: real("accuracy").notNull().default(0),
  processingNodes: integer("processing_nodes").notNull().default(0),
  learningRate: real("learning_rate").notNull().default(0),
  patternRecognition: real("pattern_recognition").notNull().default(0),
  lastTrained: timestamp("last_trained").defaultNow(),
  config: jsonb("config"),
});

export const quantumSimulations = pgTable("quantum_simulations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull().default("running"),
  algorithmsTestedCount: integer("algorithms_tested_count").notNull().default(0),
  quantumResistance: real("quantum_resistance").notNull().default(0),
  simulationResults: jsonb("simulation_results"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertThreatSchema = createInsertSchema(threats).omit({ id: true, detectedAt: true });
export const insertDeviceSchema = createInsertSchema(devices).omit({ id: true, lastSeen: true });
export const insertVulnerabilitySchema = createInsertSchema(vulnerabilities).omit({ id: true, discoveredAt: true });
export const insertSecurityModuleSchema = createInsertSchema(securityModules).omit({ id: true, lastUpdate: true });
export const insertHoneypotSchema = createInsertSchema(honeypots).omit({ id: true, lastInteraction: true });
export const insertForensicCaseSchema = createInsertSchema(forensicCases).omit({ id: true, createdAt: true, updatedAt: true });
export const insertNeuralNetworkSchema = createInsertSchema(neuralNetworks).omit({ id: true, lastTrained: true });
export const insertQuantumSimulationSchema = createInsertSchema(quantumSimulations).omit({ id: true, createdAt: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Threat = typeof threats.$inferSelect;
export type InsertThreat = z.infer<typeof insertThreatSchema>;
export type Device = typeof devices.$inferSelect;
export type InsertDevice = z.infer<typeof insertDeviceSchema>;
export type Vulnerability = typeof vulnerabilities.$inferSelect;
export type InsertVulnerability = z.infer<typeof insertVulnerabilitySchema>;
export type SecurityModule = typeof securityModules.$inferSelect;
export type InsertSecurityModule = z.infer<typeof insertSecurityModuleSchema>;
export type Honeypot = typeof honeypots.$inferSelect;
export type InsertHoneypot = z.infer<typeof insertHoneypotSchema>;
export type ForensicCase = typeof forensicCases.$inferSelect;
export type InsertForensicCase = z.infer<typeof insertForensicCaseSchema>;
export type NeuralNetwork = typeof neuralNetworks.$inferSelect;
export type InsertNeuralNetwork = z.infer<typeof insertNeuralNetworkSchema>;
export type QuantumSimulation = typeof quantumSimulations.$inferSelect;
export type InsertQuantumSimulation = z.infer<typeof insertQuantumSimulationSchema>;
