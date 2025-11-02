import { useState, useEffect } from 'react';
import { Upload, FileText, AlertTriangle, CheckCircle, Clock, Shield } from 'lucide-react';
import { analyzeLegalDocument, checkBackendHealth } from './services/mockApi';
import { AnalysisResult } from './types';
import AnalysisResults from './components/AnalysisResults';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    checkBackendHealth().then(isHealthy => {
      setIsDemoMode(!isHealthy);
    });
  }, []);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile && selectedFile.type === 'text/plain') {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setAnalyzing(true);
    try {
      const analysisResult = await analyzeLegalDocument(file);
      setResult(analysisResult);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-slate-700" />
            <h1 className="text-4xl font-bold text-slate-800">Indian Legal AI Analyzer</h1>
          </div>
          <p className="text-slate-600 text-lg">
            AI-powered contract analysis for Indian startups
          </p>
          {isDemoMode && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Demo Mode: Using mock AI analysis</span>
            </div>
          )}
        </header>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragActive
                ? 'border-slate-400 bg-slate-50'
                : 'border-slate-300 hover:border-slate-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-16 h-16 mx-auto mb-4 text-slate-400" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              Upload Legal Document
            </h3>
            <p className="text-slate-500 mb-4">
              Drop your contract here or click to browse
            </p>
            <input
              type="file"
              accept=".txt"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-6 py-3 bg-slate-700 text-white rounded-lg cursor-pointer hover:bg-slate-800 transition-colors"
            >
              Choose File
            </label>
            {file && (
              <div className="mt-4 flex items-center justify-center gap-2 text-slate-600">
                <FileText className="w-5 h-5" />
                <span>{file.name}</span>
              </div>
            )}
          </div>

          {file && !result && (
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full mt-6 px-6 py-4 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <>
                  <Clock className="w-5 h-5 animate-spin" />
                  Analyzing Contract...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Analyze Document
                </>
              )}
            </button>
          )}
        </div>

        {result && <AnalysisResults result={result} />}

        <footer className="text-center text-slate-500 text-sm mt-12">
          <p>
            This tool provides AI-assisted analysis for informational purposes only.
            Always consult qualified legal professionals.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
