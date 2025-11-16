import React, { useState } from 'react';
import Modal from '../Common/Modal';
import MapPage from './MapPage';
import DocumentViewer from '../Common/DocumentViewer';
import { Project } from '../../types';

interface ProjectDetailsModalProps {
  project: Project;
  open: boolean;
  onClose: () => void;
}

export default function ProjectDetailsModal({ project, open, onClose }: ProjectDetailsModalProps) {
  const [docViewer, setDocViewer] = useState<{ title: string; content: string } | null>(null);

  if (!open) return null;

  return (
    <>
      <Modal open={open} onClose={onClose} title={`Project Details - ${project.id}`} size="xl">
        <div className="flex flex-col gap-6 readable-surface">
          <div className="w-full h-auto min-h-[24rem] bg-white/85 dark:bg-gray-800/70 rounded-xl shadow-sm border border-gray-200/60 p-2">
            {/* Embed MapPage with project region centered */}
            <MapPage />
          </div>
          <div className="w-full overflow-visible max-h-full">
            <h3 className="text-lg font-semibold mb-2 break-words">Project Metadata</h3>
            <div className="text-sm text-gray-700 space-y-1 break-words">
              <div><strong>Project ID:</strong> {project.id}</div>
              <div><strong>Account ID:</strong> {project.accountId}</div>
              <div><strong>Country:</strong> {project.country}</div>
              <div><strong>Time of Registration:</strong> {project.startDate || 'N/A'}</div>
              <div><strong>Number of Cycles:</strong> {project.timeline.length || 'N/A'}</div>
              {/* Add more metadata fields as needed */}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 break-words">Description</h3>
          <p className="text-sm text-gray-700 break-words">{project.metadata.summary || project.metadata.ownership || project.metadata.methodology || 'No description available.'}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 break-words">Timeline</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 max-h-[20rem] overflow-auto break-words">
            {project.timeline && project.timeline.length > 0 ? (
              project.timeline.map((event, idx) => (
                <li key={idx} className="break-words">
                  <strong>{event.date}:</strong> {event.event}
                </li>
              ))
            ) : (
              <li>No timeline data available.</li>
            )}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 break-words">Documents</h3>
          <div className="space-y-2 max-h-[24rem] overflow-auto break-words">
            {project.metadata.documentation && project.metadata.documentation.length > 0 ? (
              project.metadata.documentation.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 break-words"
                  onClick={() => setDocViewer({ title: `${project.id} • ${doc}`, content: doc })}>
                  <span className="text-sm text-blue-600 underline break-words">{doc}</span>
                  <button onClick={(e) => { e.stopPropagation(); setDocViewer({ title: `${project.id} • ${doc}`, content: doc }); }} className="text-sm text-blue-700 hover:text-blue-900">View</button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 break-words">No documents available.</p>
            )}
          </div>
        </div>
      </Modal>

      {docViewer && (
        <DocumentViewer
          title={docViewer.title}
          content={docViewer.content}
          open={true}
          onClose={() => setDocViewer(null)}
        />
      )}
    </>
  );
}
