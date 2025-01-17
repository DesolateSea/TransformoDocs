from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# Sample feature extraction
df['days_since_last_access'] = (datetime.datetime.now() - df['last_accessed']).dt.days
df['days_since_creation'] = (datetime.datetime.now() - df['creation_date']).dt.days

# Dummy labels: 1 if document should be archived (for illustration purposes)
df['to_archive'] = [0, 1, 0]

# Prepare features and labels
X = df[['days_since_last_access', 'days_since_creation']]
y = df['to_archive']

# Split data for training
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a simple model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Predict which documents should be archived
df['predicted_to_archive'] = model.predict(X)
