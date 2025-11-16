import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TopNavbar from './components/Layout/TopNavbar';
import AppLayout from './components/Layout/AppLayout';
import { Skeleton } from './components/ui-bits';
import {
  mockStats,
  mockProjects,
  mockAccounts,
  mockACVAs,
  mockValidations,
  mockVerifications
} from './data/mockData';
import { Verification, Project } from './types';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./components/Pages/HomePage'));
const ProjectsPage = lazy(() => import('./components/Pages/ProjectsPage'));
const ProjectDetailsPage = lazy(() => import('./components/Pages/ProjectDetailsPage'));
const KYCPage = lazy(() => import('./components/Pages/KYCPage'));
const ACVAPage = lazy(() => import('./components/Pages/ACVAPage'));
const ValidationPage = lazy(() => import('./components/Pages/ValidationPage'));
const VerificationPage = lazy(() => import('./components/Pages/VerificationPage'));
const ApprovedVerificationsPage = lazy(() => import('./components/Pages/ApprovedVerificationsPage'));
const XAIPage = lazy(() => import('./components/Pages/XAIPage'));
const MapPage = lazy(() => import('./components/Pages/MapPage'));
const SettingsPage = lazy(() => import('./components/Pages/SettingsPage'));
const SatellitesPage = lazy(() => import('./components/Pages/SatellitesPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="p-6 space-y-4">
    <Skeleton className="h-8 w-64" />
    <Skeleton className="h-4 w-96" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
    </div>
  </div>
);

function AppWrapper() { 
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('projects');

  // Add state to hold selected project for details page
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync activeSection with current path
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/projects')) {
      setActiveSection('projects');
    } else if (path.startsWith('/satellites')) {
      setActiveSection('satellites');
    } else if (path.startsWith('/map')) {
      setActiveSection('map');
    } else if (path.startsWith('/kyc')) {
      setActiveSection('kyc');
    } else if (path.startsWith('/acva')) {
      setActiveSection('acva');
    } else if (path.startsWith('/validation')) {
      setActiveSection('validation');
    } else if (path.startsWith('/verification')) {
      setActiveSection('verification');
    } else if (path.startsWith('/xai')) {
      setActiveSection('xai');
    } else if (path.startsWith('/settings')) {
      setActiveSection('settings');
    } else if (path === '/' || path === '/home') {
      setActiveSection('home');
    }
  }, [location]);

  const [verifications, setVerifications] = useState<Verification[]>(mockVerifications);
  const [view, setView] = useState<'verification' | 'approved'>('verification');

  // Handler to select project and navigate to details page
  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setActiveSection('projectDetails');
  };

  // Handler to go back to projects list
  const handleBackToProjects = () => {
    setSelectedProject(null);
    setActiveSection('projects');
  };

  const handleUpdateVerification = (updatedVerifications: Verification[]) => {
    setVerifications(updatedVerifications);
  };

  const handleReview = () => {
    setView('verification');
  };

  return (
    <AppLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      <div className="w-full px-4 sm:px-6 lg:px-8 space-y-12">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage stats={mockStats} onNavigateToProjects={() => setActiveSection('projects')} />} />
                <Route path="/projects" element={<ProjectsPage projects={mockProjects} onSelectProject={handleSelectProject} />} />
                <Route path="/projects/:projectId" element={<ProjectDetailsPage project={selectedProject!} onBack={handleBackToProjects} />} />
                <Route path="/kyc" element={<KYCPage accounts={mockAccounts} />} />
                <Route path="/acva" element={<ACVAPage acvas={mockACVAs} />} />
                <Route path="/validation" element={<ValidationPage validations={mockValidations} />} />
                <Route path="/verification" element={
                  view === 'verification' ? (
                    <VerificationPage verifications={verifications} onUpdateVerification={handleUpdateVerification} />
                  ) : (
                    <ApprovedVerificationsPage verifications={verifications} onReview={handleReview} />
                  )
                } />
                <Route path="/xai" element={<XAIPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/satellites" element={<SatellitesPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </Suspense>
            {activeSection === 'verification' && (
              <div className="mt-4 flex space-x-4 readable-surface p-4">
                <button
                  onClick={() => setView('verification')}
                  className={`px-4 py-2 rounded ${view === 'verification' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  Verification Management
                </button>
                <button
                  onClick={() => setView('approved')}
                  className={`px-4 py-2 rounded ${view === 'approved' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  Approved Verifications
                </button>
              </div>
            )}
        </div>
    </AppLayout>
  );
}

export default AppWrapper;