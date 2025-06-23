import React, { useState } from 'react';
import { TrendingUp, BarChart3, Info, Zap } from 'lucide-react';
import { FeatureImportance, ModelMetrics } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface FeatureAnalysisProps {
  features: FeatureImportance[];
  modelMetrics: ModelMetrics;
}

const FeatureAnalysis: React.FC<FeatureAnalysisProps> = ({ features, modelMetrics }) => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureImportance | null>(null);

  const chartData = features.map(feature => ({
    name: feature.feature.replace(/_/g, ' '),
    importance: feature.importance * 100,
    fullName: feature.feature,
    description: feature.description
  }));

  const pieData = features.slice(0, 5).map((feature, index) => ({
    name: feature.feature.replace(/_/g, ' '),
    value: feature.importance * 100,
    color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index]
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg max-w-xs">
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-blue-600 font-medium">{data.importance.toFixed(1)}% importance</p>
          <p className="text-sm text-gray-600 mt-2">{data.description}</p>
        </div>
      );
    }
    return null;
  };

  const getFeatureCategory = (feature: string) => {
    if (feature.includes('Age')) return 'Demographic';
    if (feature.includes('Service') || feature.includes('Length')) return 'Experience';
    if (feature.includes('Department') || feature.includes('Business') || feature.includes('Division')) return 'Organizational';
    if (feature.includes('City') || feature.includes('Store')) return 'Geographic';
    return 'Derived';
  };

  const categoryColors = {
    'Demographic': 'bg-blue-100 text-blue-800 border-blue-200',
    'Experience': 'bg-green-100 text-green-800 border-green-200',
    'Organizational': 'bg-purple-100 text-purple-800 border-purple-200',
    'Geographic': 'bg-orange-100 text-orange-800 border-orange-200',
    'Derived': 'bg-gray-100 text-gray-800 border-gray-200'
  };

  return (
    <div className="space-y-8">
      {/* Model Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="text-blue-600" size={20} />
            <h3 className="font-semibold text-blue-900">Model Accuracy</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">{modelMetrics.accuracy.toFixed(1)}%</p>
          <p className="text-sm text-blue-700">Overall performance</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-emerald-600" size={20} />
            <h3 className="font-semibold text-emerald-900">R² Score</h3>
          </div>
          <p className="text-3xl font-bold text-emerald-600">{modelMetrics.r2Score.toFixed(3)}</p>
          <p className="text-sm text-emerald-700">Variance explained</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="text-amber-600" size={20} />
            <h3 className="font-semibold text-amber-900">RMSE</h3>
          </div>
          <p className="text-3xl font-bold text-amber-600">{modelMetrics.rmse.toFixed(2)}</p>
          <p className="text-sm text-amber-700">Root mean square error</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center gap-3 mb-2">
            <Info className="text-purple-600" size={20} />
            <h3 className="font-semibold text-purple-900">Features</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600">{features.length}</p>
          <p className="text-sm text-purple-700">Total predictors</p>
        </div>
      </div>

      {/* Feature Importance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl shadow-gray-500/10 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Feature Importance Ranking</h3>
          <div className="bg-gray-50 rounded-xl p-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" domain={[0, 'dataMax + 5']} stroke="#6b7280" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={120}
                  stroke="#6b7280"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="importance" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl shadow-gray-500/10 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Top 5 Features Distribution</h3>
          <div className="bg-gray-50 rounded-xl p-4">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Feature Details List */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl shadow-gray-500/10 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Feature Analysis Details</h2>
        
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                selectedFeature?.feature === feature.feature
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedFeature(selectedFeature?.feature === feature.feature ? null : feature)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-gray-900">
                    #{index + 1} {feature.feature.replace(/_/g, ' ')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${categoryColors[getFeatureCategory(feature.feature)]}`}>
                    {getFeatureCategory(feature.feature)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-blue-600">
                    {(feature.importance * 100).toFixed(1)}%
                  </span>
                  <p className="text-sm text-gray-600">importance</p>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${feature.importance * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <p className="text-gray-700">{feature.description}</p>
              
              {selectedFeature?.feature === feature.feature && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Detailed Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-1">Impact Level:</h5>
                      <p className="text-gray-600">
                        {feature.importance > 0.15 ? 'High Impact' : 
                         feature.importance > 0.08 ? 'Medium Impact' : 'Low Impact'}
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800 mb-1">Category:</h5>
                      <p className="text-gray-600">{getFeatureCategory(feature.feature)}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800 mb-1">Relative Rank:</h5>
                      <p className="text-gray-600">#{index + 1} of {features.length} features</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800 mb-1">Contribution:</h5>
                      <p className="text-gray-600">
                        {((feature.importance / features.reduce((sum, f) => sum + f.importance, 0)) * 100).toFixed(1)}% of total
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Feature Categories Summary */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl shadow-gray-500/10 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Feature Categories Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(categoryColors).map(([category, colorClass]) => {
            const categoryFeatures = features.filter(f => getFeatureCategory(f.feature) === category);
            const totalImportance = categoryFeatures.reduce((sum, f) => sum + f.importance, 0);
            
            return (
              <div key={category} className={`p-4 rounded-xl border ${colorClass}`}>
                <h3 className="font-semibold mb-2">{category}</h3>
                <p className="text-2xl font-bold">{(totalImportance * 100).toFixed(1)}%</p>
                <p className="text-sm opacity-75">{categoryFeatures.length} features</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeatureAnalysis;