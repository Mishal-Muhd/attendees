import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Target, 
  TrendingUp, 
  Activity,
  Calculator,
  Database
} from 'lucide-react';

// Components
import Dashboard from './components/Dashboard';
import PredictionForm from './components/PredictionForm';
import ClusterAnalysis from './components/ClusterAnalysis';
import FeatureAnalysis from './components/FeatureAnalysis';
import EmployeeTable from './components/EmployeeTable';

// Data and Types
import { mockEmployees, featureImportanceData, modelMetrics, clusterAnalysis } from './data/mockData';
import { PredictionForm as PredictionFormType } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'predict' | 'clusters' | 'features' | 'employees'>('dashboard');

  // Mock prediction function - replace with actual ML model API call
  const handlePrediction = (form: PredictionFormType): number => {
    const age = parseInt(form.age);
    const service = parseInt(form.serviceLength);
    
    // Mock calculation based on feature importance
    let prediction = 15; // base hours
    
    // Age factor (23% importance)
    prediction += (age - 30) * 0.4;
    
    // Service factor (19% importance)
    prediction += service * 0.8;
    
    // Service per age factor (15% importance)
    const servicePerAge = service / age;
    prediction += servicePerAge * 20;
    
    // Department factor (12% importance)
    if (form.department.toLowerCase().includes('engineering')) {
      prediction += 3;
    } else if (form.department.toLowerCase().includes('hr')) {
      prediction += 5;
    }
    
    // Business unit factor (10% importance)
    if (form.businessUnit.toLowerCase().includes('technology')) {
      prediction -= 2;
    }
    
    // City factor (6% importance)
    if (form.city.toLowerCase().includes('san francisco')) {
      prediction -= 1;
    } else if (form.city.toLowerCase().includes('new york')) {
      prediction += 1;
    }
    
    // Add some randomness to simulate model uncertainty
    prediction += (Math.random() - 0.5) * 4;
    
    // Ensure reasonable bounds
    return Math.max(5, Math.min(50, prediction));
  };

  const NavButton = ({ id, label, icon: Icon, active }: { 
    id: string; 
    label: string; 
    icon: React.ElementType; 
    active: boolean 
  }) => (
    <button
      onClick={() => setActiveTab(id as any)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        active 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
      }`}
    >
      <Icon size={20} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Activity className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">HR Analytics Pro</h1>
                <p className="text-sm text-gray-600">Advanced Employee Absenteeism Analytics</p>
              </div>
            </div>
            
            <nav className="flex gap-2">
              <NavButton id="dashboard" label="Dashboard" icon={BarChart3} active={activeTab === 'dashboard'} />
              <NavButton id="predict" label="Predict" icon={Calculator} active={activeTab === 'predict'} />
              <NavButton id="clusters" label="Clusters" icon={Users} active={activeTab === 'clusters'} />
              <NavButton id="features" label="Features" icon={TrendingUp} active={activeTab === 'features'} />
              <NavButton id="employees" label="Employees" icon={Database} active={activeTab === 'employees'} />
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard employees={mockEmployees} modelMetrics={modelMetrics} />
        )}

        {activeTab === 'predict' && (
          <PredictionForm onPredict={handlePrediction} />
        )}

        {activeTab === 'clusters' && (
          <ClusterAnalysis employees={mockEmployees} clusterData={clusterAnalysis} />
        )}

        {activeTab === 'features' && (
          <FeatureAnalysis features={featureImportanceData} modelMetrics={modelMetrics} />
        )}

        {activeTab === 'employees' && (
          <EmployeeTable employees={mockEmployees} />
        )}
      </main>
    </div>
  );
}

export default App;