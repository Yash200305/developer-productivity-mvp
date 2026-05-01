import { useState, useEffect } from 'react';
import { Activity, Clock, Bug, GitCommit, GitMerge } from 'lucide-react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be a fetch call to your backend API.
    // For this MVP, we are simulating loading our local mock data.
    import('../../mock-data/metrics.json')
      .then((module) => {
        setData(module.default);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load mock data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-600">Loading metrics...</div>;
  }

  if (!data) {
    return <div className="flex h-screen items-center justify-center bg-gray-50 text-red-600">Failed to load data. Did you run the Python script?</div>;
  }

  const { profile, metrics } = data;

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-500">{profile.role} • {profile.team}</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Active Contributor
            </span>
            <p className="text-sm text-gray-400 mt-1">Viewing Last 30 Days</p>
          </div>
        </header>

        {/* Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard 
            title="Lead Time for Changes" 
            value={`${metrics.leadTimeDays} days`} 
            icon={<Clock className="w-5 h-5 text-blue-500" />} 
          />
          <MetricCard 
            title="Cycle Time" 
            value={`${metrics.cycleTimeDays} days`} 
            icon={<Activity className="w-5 h-5 text-purple-500" />} 
          />
          <MetricCard 
            title="Deployment Frequency" 
            value={metrics.deploymentFrequency} 
            icon={<GitCommit className="w-5 h-5 text-green-500" />} 
          />
          <MetricCard 
            title="PR Throughput" 
            value={metrics.prThroughput} 
            icon={<GitMerge className="w-5 h-5 text-indigo-500" />} 
          />
          <MetricCard 
            title="Bug Rate" 
            value={`${metrics.bugRatePercentage}%`} 
            icon={<Bug className="w-5 h-5 text-red-500" />} 
          />
        </section>

        {/* Interpretation & Action Steps */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <div>
            <h2 className="text-lg font-semibold border-b pb-2 mb-4">What's the Story?</h2>
            <p className="text-gray-700 leading-relaxed">
              Ava, your Cycle Time ({metrics.cycleTimeDays} days) and Lead Time ({metrics.leadTimeDays} days) indicate a healthy, steady flow from "In Progress" to production. You have successfully deployed {metrics.deploymentFrequency} times this month with {metrics.prThroughput} merged PRs. However, your Bug Rate is currently at {metrics.bugRatePercentage}%.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-blue-800 font-medium mb-2">Suggested Next Steps</h3>
            <ul className="list-disc list-inside text-blue-900 space-y-1">
              <li>Review the specific bugs that escaped to production to identify any common testing gaps.</li>
              <li>Consider adding an automated test coverage check to your PR pipeline to catch regressions earlier.</li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
}

// A simple reusable component for the metric boxes
function MetricCard({ title, value, icon }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
      <div className="p-2 bg-gray-50 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
}

export default App;