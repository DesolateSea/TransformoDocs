import requests

url = "http://127.0.0.1:5000/ner"
text = "Barack Obama was born in Hawaii and studied at Harvard University."

response = requests.get(url, params={"text": text})
print(response.json())