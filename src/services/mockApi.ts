import { AnalysisResult } from '../types';

export const mockAnalysisResult: AnalysisResult = {
  summary: "This Founder Agreement establishes equity split, vesting schedules, and IP assignment for a two-founder startup. Key terms include 50-50 equity split with 4-year vesting and 1-year cliff, comprehensive IP assignment to the company, and standard non-compete provisions.",
  overall_risk: "medium",
  clauses: [
    {
      clause_type: "Equity Distribution",
      content: "The Founders agree to an equal 50-50 equity split, with each Founder receiving 5,000,000 shares of common stock.",
      confidence: 0.95,
      risk_level: "low"
    },
    {
      clause_type: "Vesting Schedule",
      content: "All equity shall vest over a 4-year period with a 1-year cliff. If a Founder leaves before the cliff, all shares are forfeited.",
      confidence: 0.92,
      risk_level: "medium"
    },
    {
      clause_type: "IP Assignment",
      content: "All intellectual property created by the Founders in connection with the Company's business shall be automatically assigned to the Company.",
      confidence: 0.88,
      risk_level: "low"
    },
    {
      clause_type: "Non-Compete",
      content: "Founders agree not to engage in competing business activities for 2 years following termination.",
      confidence: 0.85,
      risk_level: "high"
    },
    {
      clause_type: "Termination",
      content: "Either Founder may terminate this agreement with 90 days written notice. Unvested shares shall be forfeited upon termination.",
      confidence: 0.79,
      risk_level: "medium"
    },
    {
      clause_type: "Confidentiality",
      content: "Founders shall maintain strict confidentiality of all Company proprietary information during and after their tenure.",
      confidence: 0.91,
      risk_level: "low"
    }
  ],
  risk_items: [
    {
      issue: "Non-compete clause may violate Section 27 of Indian Contract Act (restraint of trade)",
      severity: "high",
      recommendation: "Limit non-compete to reasonable scope and duration (typically 6-12 months) or remove entirely for Indian jurisdiction"
    },
    {
      issue: "No acceleration clause for vesting in case of company sale or acquisition",
      severity: "medium",
      recommendation: "Add single or double-trigger acceleration provisions to protect founders"
    },
    {
      issue: "90-day termination notice period is lengthy",
      severity: "medium",
      recommendation: "Consider reducing to 30-60 days which is more standard"
    }
  ],
  compliance: [
    {
      law: "Indian Contract Act 1872",
      section: "Section 27 - Restraint of Trade",
      compliant: false,
      notes: "Non-compete clause may be unenforceable in India. Section 27 voids agreements in restraint of trade."
    },
    {
      law: "Indian Contract Act 1872",
      section: "Section 10 - Free Consent",
      compliant: true,
      notes: "Agreement appears to be entered with free consent of both parties."
    },
    {
      law: "Companies Act 2013",
      section: "Share Capital Requirements",
      compliant: true,
      notes: "Equity split and vesting schedule comply with Companies Act provisions."
    },
    {
      law: "Indian Stamp Act",
      section: "Stamp Duty",
      compliant: true,
      notes: "Agreement should be stamped as per state-specific stamp duty requirements."
    }
  ],
  entities: [
    { type: "Equity Percentage", value: "50%", context: "Each founder receives 50% equity" },
    { type: "Share Count", value: "5,000,000", context: "shares per founder" },
    { type: "Vesting Period", value: "4 years", context: "Standard vesting schedule" },
    { type: "Cliff Period", value: "1 year", context: "Minimum commitment before vesting begins" },
    { type: "Non-Compete Duration", value: "2 years", context: "Post-termination restriction period" },
    { type: "Notice Period", value: "90 days", context: "Required notice for termination" },
    { type: "Jurisdiction", value: "India", context: "Governing law and jurisdiction" }
  ],
  processing_time: 1.24
};

export const analyzeLegalDocument = async (file: File): Promise<AnalysisResult> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return mockAnalysisResult;
};

export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:8000/health');
    return response.ok;
  } catch {
    return false;
  }
};
