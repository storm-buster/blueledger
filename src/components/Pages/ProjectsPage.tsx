import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Project } from '../../types';

interface ProjectsPageProps {
  projects: Project[];
  onSelectProject?: (project: Project) => void;
}

export default function ProjectsPage({ projects, onSelectProject }: ProjectsPageProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects || [];
    return projects.filter((p) =>
      p.accountId.toLowerCase().includes(q) ||
      (p.country && p.country.toLowerCase().includes(q)) ||
      (p.metadata?.ownership && p.metadata.ownership.toLowerCase().includes(q))
    );
  }, [projects, query]);

  const handleViewDetails = (project: Project) => {
    if (onSelectProject) onSelectProject(project);
    navigate(`/projects/${project.id}`);
  };

  return (
    <div className="min-h-screen readable-surface">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-gradient-heading text-3xl font-extrabold mb-6 hero-readable-text">Projects</h1>

        <div className="mb-4 flex items-center space-x-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-nee-500 dark:text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by id, account, owner or country"
              className="pl-10 pr-4 py-2 rounded-lg border border-nee-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/60 text-gray-900 dark:text-gray-100 text-sm shadow-sm w-full focus:ring-2 focus:ring-nee-500 dark:focus:ring-nee-400"
            />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Showing <span className="font-medium text-nee-700 dark:text-nee-400">{filtered.length}</span> of {projects.length}
          </div>
        </div>

        <div className="overflow-x-auto bg-white/85 dark:bg-gray-800/70 rounded-xl shadow-lg border border-gray-200/60 dark:border-gray-700/60">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-nee-200 dark:border-gray-700 text-left text-sm font-semibold text-nee-900 dark:text-gray-100">Ownership</th>
                <th className="px-6 py-3 border-b border-nee-200 dark:border-gray-700 text-left text-xs tracking-wide uppercase font-semibold text-nee-900 dark:text-gray-100">Account ID</th>
                <th className="px-6 py-3 border-b border-nee-200 dark:border-gray-700 text-left text-xs tracking-wide uppercase font-semibold text-nee-900 dark:text-gray-100">Country</th>
                <th className="px-6 py-3 border-b border-nee-200 dark:border-gray-700 text-left text-xs tracking-wide uppercase font-semibold text-nee-900 dark:text-gray-100">Registration Time</th>
                <th className="px-6 py-3 border-b border-nee-200 dark:border-gray-700 text-left text-xs tracking-wide uppercase font-semibold text-nee-900 dark:text-gray-100">Cycles</th>
                <th className="px-6 py-3 border-b border-nee-200 dark:border-gray-700 text-center text-xs tracking-wide uppercase font-semibold text-nee-900 dark:text-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-nee-50/60 dark:hover:bg-gray-700/60 cursor-pointer transition-colors">
                  <td className="px-6 py-4 border-b border-nee-200 dark:border-gray-700 text-sm text-nee-900 dark:text-gray-100">{p.metadata?.ownership}</td>
                  <td className="px-6 py-4 border-b border-nee-200 dark:border-gray-700 text-sm font-medium text-nee-900 dark:text-gray-100">{p.accountId}</td>
                  <td className="px-6 py-4 border-b border-nee-200 dark:border-gray-700 text-sm text-nee-900 dark:text-gray-100">{p.country}</td>
                  <td className="px-6 py-4 border-b border-nee-200 dark:border-gray-700 text-sm text-nee-900 dark:text-gray-100">{p.startDate}</td>
                  <td className="px-6 py-4 border-b border-nee-200 dark:border-gray-700 text-sm font-semibold text-nee-900 dark:text-gray-100">{p.timeline?.length || 0}</td>
                  <td className="px-6 py-4 border-b border-nee-200 dark:border-gray-700 text-center text-sm">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleViewDetails(p); }}
                      className="text-nee-600 dark:text-nee-400 hover:text-nee-700 dark:hover:text-nee-300 font-semibold underline decoration-2 decoration-transparent hover:decoration-nee-500 dark:hover:decoration-nee-400 transition-colors"
                    >
                      Details
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
