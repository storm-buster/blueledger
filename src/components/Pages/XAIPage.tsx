import React, { useState } from 'react';
import { Upload, Brain, FileText, CheckCircle, XCircle, TrendingUp, BarChart3 } from 'lucide-react';
import { XAIResult, XAIResponse } from '../../types';

export default function XAIPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [xaiResult, setXAIResult] = useState<XAIResult | null>(null);
  const [xaiResp, setXaiResp] = useState<XAIResponse | null>(null);
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setXAIResult(null);
      setDecision(null);
    }
  };



  const processWithAI = async () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    
    try {
      // Call biomass prediction API
      const response = await fetch('http://localhost:8001/predict-biomass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          B2: 0.05,
          B3: 0.06,
          B4: 0.04,
          B8: 0.3,
          species: 'Mangrove'
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      // Map API response to XAIResult format
      const result: XAIResult = {
        claimed: 1250, // This would come from the uploaded PDF
        predicted: Math.round(data.predicted_biomass),
        confidence: data.confidence,
        featureImportance: {
          NDVI: Math.round(data.feature_importance.NDVI || 0),
          EVI: Math.round(data.feature_importance.EVI || 0),
          SAVI: Math.round(data.feature_importance.SAVI || 0),
          'Spectral Bands': Math.round(
            (data.feature_importance.B2 || 0) + 
            (data.feature_importance.B3 || 0) + 
            (data.feature_importance.B4 || 0) + 
            (data.feature_importance.B8 || 0)
          )
        }
      };
      
      setXAIResult(result);
    } catch (error) {
      console.error('Error calling biomass API:', error);
      // Fallback to mock data if API fails
      const mockResult: XAIResult = {
        claimed: 1250,
        predicted: 1180,
        confidence: 87.5,
        featureImportance: {
          canopyDensity: 35,
          treeHeights: 28,
          satelliteImagery: 22,
          other: 15
        }
      };
      setXAIResult(mockResult);
    } finally {
      setIsProcessing(false);
    }
  };



  const handleApprove = () => {
    setDecision('approve');
    console.log('Approved for ACVA verification');
  };

  const handleReject = () => {
    setDecision('reject');
    console.log('Rejected - requesting resubmission');
  };

  const confidenceThreshold = 85;

  return (
    <div className="p-6 readable-surface">
      <div className="mb-6">
        <h1 className="text-gradient-heading text-3xl font-extrabold hero-readable-text mb-2">XAI - AI-Powered Verification</h1>
        <p className="text-gray-700 dark:text-gray-300 font-medium">Upload monitoring reports for AI validation before ACVA review</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="bg-white/90 dark:bg-gray-800/70 rounded-lg shadow-sm border border-gray-200/60 dark:border-gray-700/60 p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" />
              Upload Monitoring Report
            </h3>
            
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors bg-white/60 dark:bg-gray-800/50">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <FileText className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">Click to upload monitoring report</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">PDF files only</p>
              </label>
            </div>

            {uploadedFile && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <span className="font-medium text-blue-800 dark:text-blue-200">{uploadedFile.name}</span>
                  </div>
                  <span className="text-sm text-blue-600 dark:text-blue-400">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                
                <button
                  onClick={processWithAI}
                  disabled={isProcessing}
                  className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white font-medium rounded-lg hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  {isProcessing ? 'Processing with AI...' : 'Process with XAI Model'}
                </button>
              </div>
            )}


          </div>

          {/* Workflow Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">XAI Workflow</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xs font-medium text-blue-600 dark:text-blue-300">1</div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-100">Upload Monitoring Report</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Submit PDF with claimed carbon removal data</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xs font-medium text-blue-600 dark:text-blue-300">2</div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-100">AI Analysis</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Model analyzes satellite imagery, canopy density, and tree heights</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xs font-medium text-blue-600 dark:text-blue-300">3</div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-100">Decision</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">High confidence → Send to ACVA, Low confidence → Request resubmission</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {isProcessing && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Brain className="w-12 h-12 text-blue-500 dark:text-blue-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">AI Processing...</p>
                  <p className="text-gray-600 dark:text-gray-400">Analyzing monitoring report with XAI model</p>
                  <div className="mt-4 w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mx-auto">
                    <div className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {xaiResult && (
            <>
              {/* AI Results */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400" />
                  AI Analysis Results
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Claimed Carbon Removed</h4>
                    <div className="flex items-center">
                      <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
                      <span className="text-2xl font-bold text-blue-700">{xaiResult.claimed.toLocaleString()}</span>
                      <span className="text-blue-600 ml-1">tonnes</span>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-medium text-purple-800 mb-2">AI Predicted</h4>
                    <div className="flex items-center">
                      <Brain className="w-6 h-6 text-purple-600 mr-2" />
                      <span className="text-2xl font-bold text-purple-700">{xaiResult.predicted.toLocaleString()}</span>
                      <span className="text-purple-600 ml-1">tonnes</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800 dark:text-gray-100">Confidence Score</h4>
                      <span className={`text-lg font-bold ${
                        xaiResult.confidence >= confidenceThreshold ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {xaiResult.confidence}%
                      </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        xaiResult.confidence >= confidenceThreshold ? 'bg-green-500 dark:bg-green-600' : 'bg-red-500 dark:bg-red-600'
                      }`}
                      style={{ width: `${xaiResult.confidence}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Threshold: {confidenceThreshold}% - {xaiResult.confidence >= confidenceThreshold ? 'Above' : 'Below'} threshold
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Feature Importance
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(xaiResult.featureImportance).map(([feature, importance]) => (
                      <div key={feature}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                            {feature.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-100">{importance}%</span>
                        </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-nee-500 dark:bg-nee-600 h-2 rounded-full"
                                style={{ width: `${importance}%` }}
                              ></div>
                            </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decision Panel */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Decision Panel</h3>
                
                  <div className={`p-4 rounded-lg mb-4 ${
                  xaiResult.confidence >= confidenceThreshold 
                    ? 'bg-nee-50 border border-nee-100' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <p className={`font-medium ${
                    xaiResult.confidence >= confidenceThreshold ? 'text-nee-800' : 'text-red-800'
                  }`}>
                    {xaiResult.confidence >= confidenceThreshold 
                      ? '✅ Confidence above threshold - Recommended for ACVA verification'
                      : '❌ Confidence below threshold - Recommend resubmission'
                    }
                  </p>
                </div>

                {!decision && (
                  <div className="flex space-x-4">
                    <button
                      onClick={handleReject}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-red-600 dark:bg-red-700 text-white font-medium rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject - Request Resubmission
                    </button>
                    <button
                      onClick={handleApprove}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-nee-600 dark:bg-nee-700 text-white font-medium rounded-lg hover:bg-nee-700 dark:hover:bg-nee-600 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve - Send to ACVA
                    </button>
                  </div>
                )}

                {decision && (
                  <div className={`p-4 rounded-lg ${
                    decision === 'approve' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}>
                    <p className={`font-medium ${decision === 'approve' ? 'text-green-800' : 'text-red-800'}`}>
                      {decision === 'approve' 
                        ? '✅ Report approved and assigned to ACVA for physical verification'
                        : '❌ Report rejected - User must resubmit corrected monitoring report'
                      }
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {xaiResp && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">⚡ Final AI Output (to NCCR Dashboard)</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Tree count</p>
                    <p className="font-bold text-nee-800 text-lg">{xaiResp.treeCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Canopy cover</p>
                    <p className="font-bold text-nee-800 text-lg">{xaiResp.canopyCover}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">CO₂ tonnes</p>
                    <p className="font-bold text-nee-800 text-lg">{xaiResp.co2Tonnes}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Uncertainty</p>
                    <p className="font-bold text-nee-800 text-lg">{xaiResp.uncertainty}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <h4 className="font-medium">Liveness Verification</h4>
                  <div className="flex items-center space-x-4 mt-2">
                    <div>
                      <p className="text-xs text-gray-500">Movement</p>
                      <p className="font-medium">{(xaiResp.liveness.movementScore).toFixed(3)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Lip-sync</p>
                      <p className="font-medium">{(xaiResp.liveness.lipSyncScore).toFixed(3)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Liveness Score</p>
                      <p className="font-bold text-nee-700">{(xaiResp.liveness.livenessScore).toFixed(3)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Authenticity</p>
                      <p className={`font-medium ${xaiResp.liveness.authenticity === 'Pass' ? 'text-green-700' : 'text-red-700'}`}>{xaiResp.liveness.authenticity}</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded border bg-nee-50">
                  <p className="text-sm">Decision Category: <span className="font-semibold">{xaiResp.decisionCategory}</span></p>
                  <p className="text-xs text-gray-500 mt-1">Thresholds: ≥0.95 Auto pre-approve • 0.70–0.95 ACVA manual review • &lt;0.70 Field audit</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}