import React from 'react';
import { 
  BarChart3, 
  Users, 
  Target, 
  TrendingUp, 
  Activity,
  Zap,
  UserCheck,
  Clock,
  Calendar
} from 'lucide-react';
import { Employee, ModelMetrics } from '../types';

interface DashboardProps {
  employees: Employee[];
  modelMetrics: ModelMetrics;
}

const Dashboard: React.FC<DashboardProps> = ({ employees, modelMetrics }) => {
  const avgPrediction = employees.reduce((sum, emp) => sum + emp.predictedAbsent, 0) / employees.length;
  const totalEmployees = employees.length;
  
  const departmentStats = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topDepartment = Object.entries(departmentStats)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Model Accuracy</p>
              <p className="text-3xl font-bold text-blue-600">{modelMetrics.accuracy.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Zap className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp size={16} className="mr-1" />
            R² Score: {modelMetrics.r2Score.toFixed(3)}
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-3xl font-bold text-emerald-600">{totalEmployees.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Users className="text-emerald-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-emerald-600">
            <UserCheck size={16} className="mr-1" />
            Active workforce
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Prediction</p>
              <p className="text-3xl font-bold text-amber-600">{avgPrediction.toFixed(1)}h</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Clock className="text-amber-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-amber-600">
            <Calendar size={16} className="mr-1" />
            Per month
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">RMSE</p>
              <p className="text-3xl font-bold text-purple-600">{modelMetrics.rmse.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Target className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-purple-600">
            <Activity size={16} className="mr-1" />
            Error margin
          </div>
        </div>
      </div>

      {/* Department Distribution */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl shadow-gray-500/10 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Department Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(departmentStats).map(([dept, count]) => (
            <div key={dept} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
              <div className="text-sm font-medium text-gray-600">{dept}</div>
              <div className="text-2xl font-bold text-blue-600">{count}</div>
              <div className="text-xs text-gray-500">employees</div>
            </div>
          ))}
        </div>
      </div>

      {/* Model Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">R² Score</h4>
          <p className="text-3xl font-bold text-blue-600">{modelMetrics.r2Score.toFixed(3)}</p>
          <p className="text-sm text-blue-700 mt-1">Variance explained by model</p>
          <div className="mt-3 bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${modelMetrics.r2Score * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200">
          <h4 className="font-semibold text-emerald-900 mb-2">RMSE</h4>
          <p className="text-3xl font-bold text-emerald-600">{modelMetrics.rmse.toFixed(2)}</p>
          <p className="text-sm text-emerald-700 mt-1">Root mean square error</p>
          <div className="mt-3 bg-emerald-200 rounded-full h-2">
            <div 
              className="bg-emerald-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${Math.max(0, 100 - modelMetrics.rmse)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
          <h4 className="font-semibold text-amber-900 mb-2">MAE</h4>
          <p className="text-3xl font-bold text-amber-600">{modelMetrics.mae.toFixed(2)}</p>
          <p className="text-sm text-amber-700 mt-1">Mean absolute error</p>
          <div className="mt-3 bg-amber-200 rounded-full h-2">
            <div 
              className="bg-amber-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${Math.max(0, 100 - modelMetrics.mae)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;