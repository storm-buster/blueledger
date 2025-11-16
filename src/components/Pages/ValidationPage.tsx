import { useState } from 'react';
import { FileText, Calendar, CheckCircle, XCircle, Clock, Eye, ArrowLeft } from 'lucide-react';
import DocumentViewer from '../Common/DocumentViewer';
import { Validation } from '../../types';

interface ValidationPageProps {
  validations: Validation[];
}

export default function ValidationPage({ validations }: ValidationPageProps) {
  const [selectedValidation, setSelectedValidation] = useState<Validation | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'Pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  if (selectedValidation) {
    return (
      <ValidationDetailPage 
        validation={selectedValidation} 
        onBack={() => setSelectedValidation(null)}
      />
    );
  }

  return (
    <div className="p-6 readable-surface">
      <div className="mb-6">
        <h1 className="text-gradient-heading text-3xl font-extrabold hero-readable-text mb-2">Validation Management</h1>
        <p className="text-gray-700 dark:text-gray-300 font-medium">Review and approve project validation reports</p>
      </div>

      <div className="overflow-x-auto bg-white/85 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/60 dark:border-gray-700/60">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Project ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Account ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Start Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">ACVA Assigned</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Submission Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {validations.map((validation) => (
                <tr key={`${validation.projectId}-${validation.submissionDate}`} className="hover:bg-gray-50/70 dark:hover:bg-gray-700/60 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-gray-100">{validation.projectId}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{validation.accountId}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="meta-text">{new Date(validation.startDate).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-nee-100 dark:bg-nee-900/30 text-nee-800 dark:text-nee-300 shadow-sm">
                      {validation.acvaId}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getStatusIcon(validation.status)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium shadow-sm ${getStatusColor(validation.status)}`}>
                        {validation.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="meta-text">{new Date(validation.submissionDate).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedValidation(validation)}
                      className="inline-flex items-center px-3 py-1.5 bg-nee-600 dark:bg-nee-700 text-white text-sm font-medium rounded-lg hover:scale-[1.02] transition-transform shadow-sm"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ValidationDetailPage({ validation, onBack }: { validation: Validation; onBack: () => void }) {
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);
  const [viewerOpen, setViewerOpen] = useState<{ title: string; content: string } | null>(null);

  const handleApprove = () => {
    console.log('Approving validation for project:', validation.projectId);
    // Here you would call the blockchain smart contract
    setDecision('approve');
  };

  const handleReject = () => {
    console.log('Rejecting validation for project:', validation.projectId);
    // Here you would call the blockchain smart contract
    setDecision('reject');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center text-nee-600 dark:text-nee-400 hover:text-nee-700 dark:hover:text-nee-300 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Validations
        </button>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Validation Review: {validation.projectId}</h1>
        <p className="text-gray-600 dark:text-gray-300">Compare Project Design Document with Validation Report</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Project Design Document */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" />
            Project Design Document (PDD)
          </h3>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">Submitted by Account Holder</p>
              <p className="font-medium text-gray-800 dark:text-gray-100">{validation.pddDocument}</p>
                <button onClick={() => setViewerOpen({ title: `PDD - ${validation.projectId}`, content: validation.pddDocument })} className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                <FileText className="w-4 h-4 mr-2" />
                View PDD
              </button>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Document Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-600 dark:text-blue-400">Project ID:</span>
                  <span className="text-blue-800 dark:text-blue-200">{validation.projectId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600 dark:text-blue-400">Account ID:</span>
                  <span className="text-blue-800 dark:text-blue-200">{validation.accountId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600 dark:text-blue-400">Start Date:</span>
                  <span className="meta-text">{new Date(validation.startDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Validation Report */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-nee-500 dark:text-nee-400" />
            Validation Report
          </h3>
          <div className="space-y-4">
            {validation.validationReport ? (
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <CheckCircle className="w-12 h-12 text-nee-400 dark:text-nee-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">Submitted by ACVA</p>
                <p className="font-medium text-gray-800 dark:text-gray-100">{validation.validationReport}</p>
                <button onClick={() => setViewerOpen({ title: `Validation Report - ${validation.projectId}`, content: validation.validationReport || 'No report' })} className="mt-4 inline-flex items-center px-4 py-2 bg-nee-600 dark:bg-nee-700 text-white text-sm font-medium rounded-lg hover:bg-nee-700 dark:hover:bg-nee-600 transition-colors">
                  <FileText className="w-4 h-4 mr-2" />
                  View Report
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-yellow-300 dark:border-yellow-600 rounded-lg p-8 text-center">
                <Clock className="w-12 h-12 text-yellow-400 dark:text-yellow-500 mx-auto mb-4" />
                <p className="text-yellow-600 dark:text-yellow-400 mb-2">Awaiting ACVA Submission</p>
                <p className="text-gray-600 dark:text-gray-400">Validation report not yet submitted</p>
              </div>
            )}
            <div className="bg-nee-50 dark:bg-nee-900/20 rounded-lg p-4">
              <h4 className="font-medium text-nee-800 dark:text-nee-300 mb-2">ACVA Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-nee-600 dark:text-nee-400">ACVA ID:</span>
                  <span className="text-nee-800 dark:text-nee-200">{validation.acvaId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-nee-600 dark:text-nee-400">Submission Date:</span>
                  <span className="meta-text">{new Date(validation.submissionDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-nee-600 dark:text-nee-400">Status:</span>
                  <span className={`font-medium ${
                    validation.status === 'Approved' ? 'text-green-600 dark:text-green-400' :
                    validation.status === 'Rejected' ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {validation.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Panel */}
      {validation.status === 'Pending' && validation.validationReport && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Validation Decision</h3>
          <div className="flex items-center justify-between">
            <div className="text-gray-600 dark:text-gray-300">
              <p>Review both documents and make a decision:</p>
              <ul className="mt-2 text-sm list-disc list-inside space-y-1">
                <li>✅ Approve: Project is sanctioned and moves to verification cycle</li>
                <li>❌ Reject: Project rejected, account can re-upload corrected PDD</li>
              </ul>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleReject}
                className="inline-flex items-center px-6 py-2 bg-red-600 dark:bg-red-700 text-white font-medium rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </button>
              <button
                onClick={handleApprove}
                className="inline-flex items-center px-6 py-2 bg-green-600 dark:bg-green-700 text-white font-medium rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </button>
            </div>
          </div>
          
          {decision && (
            <div className={`mt-4 p-4 rounded-lg ${
              decision === 'approve' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`font-medium ${decision === 'approve' ? 'text-green-800' : 'text-red-800'}`}>
                {decision === 'approve' 
                  ? '✅ Validation approved! Project sanctioned and logged on blockchain.' 
                  : '❌ Validation rejected! Account holder can re-submit corrected PDD.'
                }
              </p>
            </div>
          )}
          {viewerOpen && (
            <DocumentViewer title={viewerOpen.title} content={viewerOpen.content} open={true} onClose={() => setViewerOpen(null)} />
          )}
        </div>
      )}
    </div>
  );
}