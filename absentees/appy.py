from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

# Load your trained model (e.g., stack_model) and transformer
import joblib
model = joblib.load('stack_model.pkl')
X_columns = joblib.load('X_columns.pkl')  # List of feature columns used during training

@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.get_json()

    df = pd.DataFrame([input_data])
    df['ServicePerAge'] = df['LengthService'] / df['Age']
    df['ServiceSquared'] = df['LengthService'] ** 2
    df['AgeSquared'] = df['Age'] ** 2
    df['Age_x_Service'] = df['Age'] * df['LengthService']
    df['AgeDivService'] = df['Age'] / (df['LengthService'] + 1)
    df['IsShortService'] = (df['LengthService'] < 2).astype(int)

    df_encoded = pd.get_dummies(df)
    for col in X_columns:
        if col not in df_encoded:
            df_encoded[col] = 0
    df_encoded = df_encoded[X_columns]

    prediction = model.predict(df_encoded)[0]
    return jsonify({'predicted_hours': prediction})

if __name__ == '__main__':
    app.run(debug=True)
