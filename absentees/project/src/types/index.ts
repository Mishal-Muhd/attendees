export interface Employee {
  id: number;
  name: string;
  gender: string;
  city: string;
  jobTitle: string;
  department: string;
  store: string;
  businessUnit: string;
  division: string;
  age: number;
  serviceLength: number;
  predictedAbsent: number;
  actualAbsent?: number;
  cluster: number;
  servicePerAge: number;
  ageSquared: number;
  serviceSquared: number;
}

export interface PredictionForm {
  gender: string;
  city: string;
  jobTitle: string;
  department: string;
  store: string;
  businessUnit: string;
  division: string;
  age: string;
  serviceLength: string;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
  description: string;
}

export interface ModelMetrics {
  r2Score: number;
  rmse: number;
  mae: number;
  accuracy: number;
}

export interface ClusterAnalysis {
  clusterId: number;
  name: string;
  description: string;
  avgAge: number;
  avgService: number;
  avgAbsent: number;
  employeeCount: number;
  characteristics: string[];
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface ChartData {
  name: string;
  value: number;
  cluster?: number;
  age?: number;
  service?: number;
  absent?: number;
}