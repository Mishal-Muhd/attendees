import React, { useState } from 'react';
import { Target, Calculator, User, Building, MapPin, Briefcase } from 'lucide-react';
import { PredictionForm as PredictionFormType } from '../types';

interface PredictionFormProps {
  onPredict: (form: PredictionFormType) => number;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onPredict }) => {
  const [form, setForm] = useState<PredictionFormType>({
    gender: '',
    city: '',
    jobTitle: '',
    department: '',
    store: '',
    businessUnit: '',
    division: '',
    age: '',
    serviceLength: ''
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const result = onPredict(form);
      setPrediction(result);
      setIsLoading(false);
    }, 1500);
  };

  const handleInputChange = (field: keyof PredictionFormType, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setPrediction(null); // Reset prediction when form changes
  };

  const isFormValid = Object.values(form).every(value => value.trim() !== '');

  const getRiskLevel = (hours: number) => {
    if (hours < 15) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    if (hours < 25) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    if (hours < 35) return { level: 'High', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
    return { level: 'Critical', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl shadow-gray-500/10 p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <Calculator className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Employee Absenteeism Predictor</h2>
            <p className="text-gray-600">Enter employee details to predict monthly absent hours</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center gap-2 mb-4">
              <User className="text-blue-600" size={20} />
              <h3 className="text-lg font-semibold text-blue-900">Personal Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={form.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter age (18-65)"
                  min="18"
                  max="65"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Length of Service (years)</label>
                <input
                  type="number"
                  value={form.serviceLength}
                  onChange={(e) => handleInputChange('serviceLength', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Years of service"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-100">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="text-emerald-600" size={20} />
              <h3 className="text-lg font-semibold text-emerald-900">Location Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter city"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Store Location</label>
                <input
                  type="text"
                  value={form.store}
                  onChange={(e) => handleInputChange('store', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter store location"
                  required
                />
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="text-purple-600" size={20} />
              <h3 className="text-lg font-semibold text-purple-900">Work Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                <input
                  type="text"
                  value={form.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter job title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <input
                  type="text"
                  value={form.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter department"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Unit</label>
                <input
                  type="text"
                  value={form.businessUnit}
                  onChange={(e) => handleInputChange('businessUnit', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter business unit"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Division</label>
                <input
                  type="text"
                  value={form.division}
                  onChange={(e) => handleInputChange('division', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter division"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Target size={20} />
                Predict Absent Hours
              </>
            )}
          </button>
        </form>

        {prediction !== null && (
          <div className="mt-8 space-y-4">
            <div className={`p-6 rounded-xl border-2 ${getRiskLevel(prediction).bg} ${getRiskLevel(prediction).border}`}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <Target className={getRiskLevel(prediction).color} size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">Prediction Result</h3>
                  <p className={`text-4xl font-bold ${getRiskLevel(prediction).color}`}>{prediction.toFixed(1)} hours</p>
                  <p className="text-sm text-gray-600 mt-1">Predicted monthly absent hours</p>
                </div>
                <div className={`px-4 py-2 rounded-full ${getRiskLevel(prediction).bg} border ${getRiskLevel(prediction).border}`}>
                  <span className={`font-semibold ${getRiskLevel(prediction).color}`}>
                    {getRiskLevel(prediction).level} Risk
                  </span>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Insights & Recommendations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">Key Factors:</h5>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Age: {form.age} years</li>
                    <li>• Service: {form.serviceLength} years</li>
                    <li>• Department: {form.department}</li>
                    <li>• Location: {form.city}</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">Recommendations:</h5>
                  <ul className="space-y-1 text-gray-600">
                    {prediction < 20 && <li>• Monitor for engagement opportunities</li>}
                    {prediction >= 20 && prediction < 30 && <li>• Consider flexible work arrangements</li>}
                    {prediction >= 30 && <li>• Implement wellness programs</li>}
                    <li>• Regular check-ins with manager</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionForm;