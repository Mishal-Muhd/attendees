import React, { useState } from 'react';
import axios from 'axios';

export default function AbsentHourPredictor() {
  const [formData, setFormData] = useState({
    Gender: '', City: '', JobTitle: '', DepartmentName: '',
    StoreLocation: '', BusinessUnit: '', Division: '',
    Age: '', LengthService: ''
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/predict', formData);
      setResult(res.data.predicted_hours);
    } catch (err) {
      alert('Error predicting absent hours');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Absent Hour Predictor</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(formData).map(([key, val]) => (
            <div key={key}>
              <label className="block font-medium text-gray-700 mb-1">{key}</label>
              <input
                type={key === 'Age' || key === 'LengthService' ? 'number' : 'text'}
                name={key}
                value={val}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          ))}
          <div className="col-span-full">
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-200">
              Predict Absent Hours
            </button>
          </div>
        </form>
        {result !== null && (
          <div className="mt-6 text-xl font-semibold text-center text-green-700">
            🔮 Predicted Absent Hours: <span className="text-blue-700">{result.toFixed(2)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
