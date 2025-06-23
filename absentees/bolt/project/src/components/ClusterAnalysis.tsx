import React, { useState } from 'react';
import { Users, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Employee, ClusterAnalysis as ClusterAnalysisType } from '../types';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ClusterAnalysisProps {
  employees: Employee[];
  clusterData: ClusterAnalysisType[];
}

const ClusterAnalysis: React.FC<ClusterAnalysisProps> = ({ employees, clusterData }) => {
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);
  
  const clusterColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
  const riskColors = {
    Low: 'text-green-600 bg-green-50 border-green-200',
    Medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    High: 'text-orange-600 bg-orange-50 border-orange-200',
    Critical: 'text-red-600 bg-red-50 border-red-200'
  };

  const scatterData = employees.map(emp => ({
    age: emp.age,
    absent: emp.predictedAbsent,
    cluster: emp.cluster,
    name: emp.name,
    service: emp.serviceLength
  }));

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'Low': return <CheckCircle size={16} />;
      case 'Medium': return <Info size={16} />;
      case 'High': return <TrendingUp size={16} />;
      case 'Critical': return <AlertTriangle size={16} />;
      default: return <Info size={16} />;
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm text-gray-600">Age: {data.age} years</p>
          <p className="text-sm text-gray-600">Service: {data.service} years</p>
          <p className="text-sm text-gray-600">Predicted Absent: {data.absent.toFixed(1)}h</p>
          <p className="text-sm text-gray-600">Cluster: {data.cluster + 1}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Cluster Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {clusterData.map((cluster) => (
          <div
            key={cluster.clusterId}
            className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl cursor-pointer transition-all duration-300 hover:shadow-2xl ${
              selectedCluster === cluster.clusterId ? 'ring-2 ring-blue-500 shadow-blue-500/20' : 'hover:shadow-gray-500/20'
            }`}
            onClick={() => setSelectedCluster(selectedCluster === cluster.clusterId ? null : cluster.clusterId)}
          >
            <div className="flex items-center justify-between mb-4">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: clusterColors[cluster.clusterId] }}
              ></div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${riskColors[cluster.riskLevel]}`}>
                {getRiskIcon(cluster.riskLevel)}
                <span className="ml-1">{cluster.riskLevel}</span>
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">{cluster.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{cluster.description}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Employees:</span>
                <span className="font-semibold">{cluster.employeeCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg Age:</span>
                <span className="font-semibold">{cluster.avgAge.toFixed(1)} years</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg Service:</span>
                <span className="font-semibold">{cluster.avgService.toFixed(1)} years</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg Absent:</span>
                <span className="font-semibold">{cluster.avgAbsent.toFixed(1)}h</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scatter Plot Visualization */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl shadow-gray-500/10 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Cluster Visualization</h2>
            <p className="text-gray-600">Age vs Predicted Absent Hours by Cluster</p>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={scatterData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="age" 
                type="number" 
                domain={['dataMin - 2', 'dataMax + 2']}
                name="Age"
                stroke="#6b7280"
              />
              <YAxis 
                dataKey="absent" 
                type="number" 
                domain={['dataMin - 2', 'dataMax + 2']}
                name="Absent Hours"
                stroke="#6b7280"
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter dataKey="absent">
                {scatterData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={clusterColors[entry.cluster]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Cluster Legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          {clusterData.map((cluster) => (
            <div key={cluster.clusterId} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: clusterColors[cluster.clusterId] }}
              ></div>
              <span className="text-sm font-medium text-gray-700">{cluster.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Cluster Analysis */}
      {selectedCluster !== null && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl shadow-gray-500/10 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: clusterColors[selectedCluster] }}
            >
              <Users className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {clusterData[selectedCluster].name} - Detailed Analysis
              </h2>
              <p className="text-gray-600">{clusterData[selectedCluster].description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Characteristics */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Characteristics</h3>
              <div className="space-y-3">
                {clusterData[selectedCluster].characteristics.map((char, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="text-green-600 mt-0.5" size={16} />
                    <span className="text-sm text-gray-700">{char}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Employees in Cluster */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Employees in this Cluster</h3>
              <div className="space-y-3">
                {employees
                  .filter(emp => emp.cluster === selectedCluster)
                  .map((emp) => (
                    <div key={emp.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{emp.name}</h4>
                          <p className="text-sm text-gray-600">{emp.jobTitle}</p>
                        </div>
                        <span className="text-sm font-medium text-blue-600">
                          {emp.predictedAbsent.toFixed(1)}h
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                        <span>Age: {emp.age}</span>
                        <span>Service: {emp.serviceLength}y</span>
                        <span>{emp.department}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Management Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Engagement Strategies:</h4>
                <ul className="space-y-1 text-blue-700">
                  {selectedCluster === 0 && (
                    <>
                      <li>• Provide growth opportunities</li>
                      <li>• Mentorship programs</li>
                      <li>• Skill development initiatives</li>
                    </>
                  )}
                  {selectedCluster === 1 && (
                    <>
                      <li>• Leadership development</li>
                      <li>• Work-life balance support</li>
                      <li>• Cross-functional projects</li>
                    </>
                  )}
                  {selectedCluster === 2 && (
                    <>
                      <li>• Flexible work arrangements</li>
                      <li>• Family support programs</li>
                      <li>• Health and wellness initiatives</li>
                    </>
                  )}
                  {selectedCluster === 3 && (
                    <>
                      <li>• Succession planning</li>
                      <li>• Knowledge transfer programs</li>
                      <li>• Retirement planning support</li>
                    </>
                  )}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Retention Focus:</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• Regular performance reviews</li>
                  <li>• Recognition programs</li>
                  <li>• Career path discussions</li>
                  <li>• Competitive compensation review</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClusterAnalysis;