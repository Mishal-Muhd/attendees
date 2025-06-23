import { Employee, FeatureImportance, ModelMetrics, ClusterAnalysis } from '../types';

export const mockEmployees: Employee[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    gender: "Female",
    city: "New York",
    jobTitle: "Data Analyst",
    department: "Analytics",
    store: "NYC Main",
    businessUnit: "Technology",
    division: "Data Science",
    age: 28,
    serviceLength: 3,
    predictedAbsent: 24.5,
    actualAbsent: 26,
    cluster: 0,
    servicePerAge: 0.107,
    ageSquared: 784,
    serviceSquared: 9
  },
  {
    id: 2,
    name: "Michael Chen",
    gender: "Male",
    city: "San Francisco",
    jobTitle: "Senior Developer",
    department: "Engineering",
    store: "SF Tech Hub",
    businessUnit: "Technology",
    division: "Software",
    age: 34,
    serviceLength: 7,
    predictedAbsent: 18.2,
    actualAbsent: 19,
    cluster: 1,
    servicePerAge: 0.206,
    ageSquared: 1156,
    serviceSquared: 49
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    gender: "Female",
    city: "Chicago",
    jobTitle: "HR Manager",
    department: "Human Resources",
    store: "Chicago Central",
    businessUnit: "Operations",
    division: "People",
    age: 42,
    serviceLength: 12,
    predictedAbsent: 32.1,
    actualAbsent: 30,
    cluster: 2,
    servicePerAge: 0.286,
    ageSquared: 1764,
    serviceSquared: 144
  },
  {
    id: 4,
    name: "David Kim",
    gender: "Male",
    city: "Seattle",
    jobTitle: "Product Manager",
    department: "Product",
    store: "Seattle North",
    businessUnit: "Product",
    division: "Innovation",
    age: 31,
    serviceLength: 5,
    predictedAbsent: 21.8,
    actualAbsent: 23,
    cluster: 1,
    servicePerAge: 0.161,
    ageSquared: 961,
    serviceSquared: 25
  },
  {
    id: 5,
    name: "Lisa Wang",
    gender: "Female",
    city: "Austin",
    jobTitle: "Marketing Director",
    department: "Marketing",
    store: "Austin Central",
    businessUnit: "Marketing",
    division: "Digital",
    age: 38,
    serviceLength: 9,
    predictedAbsent: 28.7,
    actualAbsent: 27,
    cluster: 2,
    servicePerAge: 0.237,
    ageSquared: 1444,
    serviceSquared: 81
  },
  {
    id: 6,
    name: "James Wilson",
    gender: "Male",
    city: "Boston",
    jobTitle: "Sales Representative",
    department: "Sales",
    store: "Boston Downtown",
    businessUnit: "Sales",
    division: "Enterprise",
    age: 26,
    serviceLength: 2,
    predictedAbsent: 16.3,
    actualAbsent: 18,
    cluster: 0,
    servicePerAge: 0.077,
    ageSquared: 676,
    serviceSquared: 4
  },
  {
    id: 7,
    name: "Maria Garcia",
    gender: "Female",
    city: "Miami",
    jobTitle: "Finance Manager",
    department: "Finance",
    store: "Miami South",
    businessUnit: "Finance",
    division: "Accounting",
    age: 45,
    serviceLength: 15,
    predictedAbsent: 35.9,
    actualAbsent: 34,
    cluster: 3,
    servicePerAge: 0.333,
    ageSquared: 2025,
    serviceSquared: 225
  },
  {
    id: 8,
    name: "Robert Taylor",
    gender: "Male",
    city: "Denver",
    jobTitle: "Operations Specialist",
    department: "Operations",
    store: "Denver West",
    businessUnit: "Operations",
    division: "Logistics",
    age: 29,
    serviceLength: 4,
    predictedAbsent: 20.1,
    actualAbsent: 22,
    cluster: 0,
    servicePerAge: 0.138,
    ageSquared: 841,
    serviceSquared: 16
  }
];

export const featureImportanceData: FeatureImportance[] = [
  { 
    feature: "Age", 
    importance: 0.23, 
    description: "Employee age is the strongest predictor of absenteeism patterns" 
  },
  { 
    feature: "Length of Service", 
    importance: 0.19, 
    description: "Years of service significantly impacts absence behavior" 
  },
  { 
    feature: "Service per Age", 
    importance: 0.15, 
    description: "Ratio of service years to age reveals career progression patterns" 
  },
  { 
    feature: "Department_Engineering", 
    importance: 0.12, 
    description: "Engineering department shows distinct absence patterns" 
  },
  { 
    feature: "Business Unit_Technology", 
    importance: 0.10, 
    description: "Technology business unit has unique work-life balance needs" 
  },
  { 
    feature: "Age Squared", 
    importance: 0.08, 
    description: "Non-linear age effects capture complex life stage impacts" 
  },
  { 
    feature: "Service Squared", 
    importance: 0.07, 
    description: "Non-linear service effects show tenure-based patterns" 
  },
  { 
    feature: "City_San Francisco", 
    importance: 0.06, 
    description: "Geographic location influences absence due to local factors" 
  }
];

export const modelMetrics: ModelMetrics = {
  r2Score: 0.847,
  rmse: 12.34,
  mae: 8.92,
  accuracy: 84.7
};

export const clusterAnalysis: ClusterAnalysis[] = [
  {
    clusterId: 0,
    name: "Young Professionals",
    description: "Early career employees with low absenteeism",
    avgAge: 27.7,
    avgService: 3.0,
    avgAbsent: 18.6,
    employeeCount: 3,
    characteristics: [
      "High engagement and motivation",
      "Fewer family responsibilities",
      "Strong attendance patterns",
      "Career-focused mindset"
    ],
    riskLevel: "Low"
  },
  {
    clusterId: 1,
    name: "Mid-Career Professionals",
    description: "Experienced employees with moderate absenteeism",
    avgAge: 32.5,
    avgService: 6.0,
    avgAbsent: 20.0,
    employeeCount: 2,
    characteristics: [
      "Balanced work-life approach",
      "Moderate family commitments",
      "Stable performance patterns",
      "Leadership potential"
    ],
    riskLevel: "Medium"
  },
  {
    clusterId: 2,
    name: "Senior Contributors",
    description: "Established employees with higher absenteeism",
    avgAge: 40.0,
    avgService: 10.5,
    avgAbsent: 30.4,
    employeeCount: 2,
    characteristics: [
      "Significant family responsibilities",
      "Health considerations increasing",
      "High expertise and value",
      "Work-life balance priorities"
    ],
    riskLevel: "High"
  },
  {
    clusterId: 3,
    name: "Veteran Employees",
    description: "Long-tenure employees with variable patterns",
    avgAge: 45.0,
    avgService: 15.0,
    avgAbsent: 35.9,
    employeeCount: 1,
    characteristics: [
      "Extensive organizational knowledge",
      "Pre-retirement considerations",
      "Health-related absences",
      "Mentorship responsibilities"
    ],
    riskLevel: "Critical"
  }
];