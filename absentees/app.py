from flask import Flask, request, jsonify, render_template
import joblib
import pandas as pd
import os
import matplotlib.pyplot as plt
import seaborn as sns

# Sklearn (if needed for inline operations or loading models)
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

# To save figures (optional but common in cluster insights)
from io import BytesIO
import base64

df = pd.read_csv("MFGEmployees.csv")  # Replace with actual filename/path


app = Flask(__name__)

# Load models and metadata
stack_model = joblib.load('model/stack_model.pkl')
kmeans = joblib.load('model/kmeans_model.pkl')
scaler = joblib.load('model/scaler.pkl')
cluster_features = joblib.load('model/cluster_features.pkl')
X_columns = joblib.load('model/X_columns.pkl')

# Cluster label mapping
cluster_map = {
    0: 'Low Risk Employees',
    1: 'Moderate Risk Employees',
    2: 'High Risk Employees',
    3: 'Very High Risk Employees'
}

#  Serve the HTML form
@app.route('/')
def home():
    return render_template('clusters.html')  # make sure your HTML file is templates/index.html

@app.route('/eda')
def show_eda():
    return render_template('eda.html')

@app.route("/clusters")
def cluster_insights():
    # Assume you have calculated these values
    cluster_name = "High Risk Employees"
    cluster_count = 13
    return render_template("cluster_insight.html", cluster_name=cluster_name, cluster_count=cluster_count)



#  Handle prediction request
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    df = pd.DataFrame([data])

    # Feature engineering
    df['ServicePerAge'] = df['LengthService'] / df['Age']
    df['ServiceSquared'] = df['LengthService'] ** 2
    df['AgeSquared'] = df['Age'] ** 2
    df['Age_x_Service'] = df['Age'] * df['LengthService']
    df['AgeDivService'] = df['Age'] / (df['LengthService'] + 1)
    df['IsShortService'] = (df['LengthService'] < 2).astype(int)

    # One-hot encode and align with training columns
    df_encoded = pd.get_dummies(df)
    for col in X_columns:
        if col not in df_encoded:
            df_encoded[col] = 0
    df_encoded = df_encoded[X_columns]

    # Predict absenteeism hours
    predicted_hours = stack_model.predict(df_encoded)[0]

    # Clustering
    df['AbsentHours'] = predicted_hours
    cluster_input = df[cluster_features]
    cluster_scaled = scaler.transform(cluster_input)
    cluster_id = int(kmeans.predict(cluster_scaled)[0])
    cluster_name = cluster_map.get(cluster_id, 'Unknown')

    return jsonify({
        'predicted_hours': float(predicted_hours),
        'cluster_id': cluster_id,
        'cluster_name': cluster_name
    })

if __name__ == '__main__':
    app.run(debug=True)


# Ensure images directory exists
os.makedirs("static/images", exist_ok=True)

# 1. Histogram of Age
plt.figure(figsize=(6, 4))
sns.histplot(df['Age'], bins=15, kde=True, color='skyblue')
plt.title('Age Distribution')
plt.tight_layout()
plt.savefig('static/images/age_distribution.png')
plt.close()

# 2. Boxplot of AbsentHours by Department
plt.figure(figsize=(8, 5))
sns.boxplot(x='DepartmentName', y='AbsentHours', data=df)
plt.xticks(rotation=45)
plt.title('AbsentHours by Department')
plt.tight_layout()
plt.savefig('static/images/absenthours_by_dept.png')
plt.close()

# 3. Correlation Heatmap
plt.figure(figsize=(6, 5))
sns.heatmap(df.select_dtypes(include='number').corr(), annot=True, cmap='coolwarm')
plt.title('Correlation Heatmap')
plt.tight_layout()
plt.savefig('static/images/correlation_heatmap.png')
plt.close()
