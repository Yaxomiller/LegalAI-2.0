import { AnalysisResult } from '../types';
import { AlertTriangle, CheckCircle, Clock, FileText, Shield, XCircle } from 'lucide-react';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

function AnalysisResults({ result }: AnalysisResultsProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'medium':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low':
        return <CheckCircle className="w-5 h-5" />;
      case 'medium':
        return <AlertTriangle className="w-5 h-5" />;
      case 'high':
        return <XCircle className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6 text-slate-700" />
          <h2 className="text-2xl font-bold text-slate-800">Analysis Summary</h2>
        </div>
        <p className="text-slate-600 leading-relaxed mb-4">{result.summary}</p>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{result.processing_time.toFixed(2)}s</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${getRiskColor(result.overall_risk)}`}>
            {getRiskIcon(result.overall_risk)}
            <span className="font-medium uppercase text-sm">
              {result.overall_risk} Risk
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Extracted Clauses</h2>
        <div className="space-y-4">
          {result.clauses.map((clause, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-slate-700">{clause.clause_type}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">
                    {(clause.confidence * 100).toFixed(0)}% confidence
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${getRiskColor(clause.risk_level)}`}>
                    {clause.risk_level}
                  </span>
                </div>
              </div>
              <p className="text-slate-600 text-sm">{clause.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
          <h2 className="text-2xl font-bold text-slate-800">Risk Assessment</h2>
        </div>
        <div className="space-y-4">
          {result.risk_items.map((item, index) => (
            <div key={index} className={`border rounded-lg p-4 ${getRiskColor(item.severity)}`}>
              <div className="flex items-start gap-3">
                {getRiskIcon(item.severity)}
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{item.issue}</h3>
                  <p className="text-sm opacity-90">
                    <span className="font-medium">Recommendation:</span> {item.recommendation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-slate-700" />
          <h2 className="text-2xl font-bold text-slate-800">Compliance Check</h2>
        </div>
        <div className="space-y-4">
          {result.compliance.map((item, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 ${
                item.compliant
                  ? 'border-green-200 bg-green-50'
                  : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-start gap-3">
                {item.compliant ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <h3 className={`font-semibold mb-1 ${item.compliant ? 'text-green-800' : 'text-red-800'}`}>
                    {item.law} - {item.section}
                  </h3>
                  <p className={`text-sm ${item.compliant ? 'text-green-700' : 'text-red-700'}`}>
                    {item.notes}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Extracted Entities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.entities.map((entity, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-1">
                <span className="text-sm font-medium text-slate-500">{entity.type}</span>
                <span className="text-lg font-semibold text-slate-800">{entity.value}</span>
              </div>
              <p className="text-xs text-slate-600">{entity.context}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnalysisResults;
