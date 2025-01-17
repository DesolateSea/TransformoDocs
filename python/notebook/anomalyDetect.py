from sklearn.ensemble import IsolationForest

def detect_anomalies(access_logs):
    model = IsolationForest(contamination=0.1)  # Anomaly threshold
    model.fit(access_logs)
    anomalies = model.predict(access_logs)
    return anomalies  # Flag suspicious activity
