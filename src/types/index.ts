export interface Clause {
  clause_type: string;
  content: string;
  confidence: number;
  risk_level: 'low' | 'medium' | 'high';
}

export interface RiskItem {
  issue: string;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
}

export interface ComplianceCheck {
  law: string;
  section: string;
  compliant: boolean;
  notes: string;
}

export interface Entity {
  type: string;
  value: string;
  context: string;
}

export interface AnalysisResult {
  summary: string;
  overall_risk: 'low' | 'medium' | 'high';
  clauses: Clause[];
  risk_items: RiskItem[];
  compliance: ComplianceCheck[];
  entities: Entity[];
  processing_time: number;
}
