import React, { useState } from 'react';
import { Search, Filter, Download, Eye, TrendingUp, TrendingDown } from 'lucide-react';
import { Employee } from '../types';

interface EmployeeTableProps {
  employees: Employee[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedCluster, setSelectedCluster] = useState('all');
  const [sortField, setSortField] = useState<keyof Employee>('predictedAbsent');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const departments = ['all', ...Array.from(new Set(employees.map(emp => emp.department)))];
  const clusters = ['all', '0', '1', '2', '3'];
  const clusterColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
  const clusterNames = ['Young Professionals', 'Mid-Career', 'Senior Contributors', 'Veterans'];

  const filteredEmployees = employees
    .filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emp.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emp.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = selectedDepartment === 'all' || emp.department === selectedDepartment;
      const matchesCluster = selectedCluster === 'all' || emp.cluster.toString() === selectedCluster;
      return matchesSearch && matchesDept && matchesCluster;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

  const handleSort = (field: keyof Employee) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Name', 'Job Title', 'Department', 'Age', 'Service Length', 'Predicted Absent', 'Actual Absent', 'Cluster'].join(','),
      ...filteredEmployees.map(emp => [
        emp.name,
        emp.jobTitle,
        emp.department,
        emp.age,
        emp.serviceLength,
        emp.predictedAbsent.toFixed(1),
        emp.actualAbsent?.toFixed(1) || 'N/A',
        clusterNames[emp.cluster]
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employee_predictions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const SortIcon = ({ field }: { field: keyof Employee }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <TrendingUp size={16} className="text-blue-600" /> : 
      <TrendingDown size={16} className="text-blue-600" />;
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl shadow-gray-500/10">
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Employee Predictions</h2>
            <p className="text-gray-600">Showing {filteredEmployees.length} of {employees.length} employees</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              />
            </div>
            
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
            
            <select
              value={selectedCluster}
              onChange={(e) => setSelectedCluster(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {clusters.map(cluster => (
                <option key={cluster} value={cluster}>
                  {cluster === 'all' ? 'All Clusters' : `Cluster ${parseInt(cluster) + 1}`}
                </option>
              ))}
            </select>
            
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50">
            <tr>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Employee
                  <SortIcon field="name" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50"
                onClick={() => handleSort('department')}
              >
                <div className="flex items-center gap-1">
                  Department
                  <SortIcon field="department" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50"
                onClick={() => handleSort('age')}
              >
                <div className="flex items-center gap-1">
                  Age/Service
                  <SortIcon field="age" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50"
                onClick={() => handleSort('predictedAbsent')}
              >
                <div className="flex items-center gap-1">
                  Predicted
                  <SortIcon field="predictedAbsent" />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actual
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50"
                onClick={() => handleSort('cluster')}
              >
                <div className="flex items-center gap-1">
                  Cluster
                  <SortIcon field="cluster" />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50">
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    <div className="text-sm text-gray-500">{employee.jobTitle}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.department}</div>
                  <div className="text-sm text-gray-500">{employee.city}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.age} years</div>
                  <div className="text-sm text-gray-500">{employee.serviceLength} years service</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {employee.predictedAbsent.toFixed(1)}h
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.actualAbsent ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {employee.actualAbsent.toFixed(1)}h
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: clusterColors[employee.cluster] }}
                  >
                    {clusterNames[employee.cluster]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800 transition-colors">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredEmployees.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-gray-500">No employees found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;