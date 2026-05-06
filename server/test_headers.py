import requests

url_pdf = "http://localhost:3001/api/export/a14a55e8-5fc7-43cf-84b3-4f32809402da/pdf"
url_json = "http://localhost:3001/api/export/a14a55e8-5fc7-43cf-84b3-4f32809402da/json"
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OWY5YjA1M2Y5OGJkMDBhZGU4OGIyMDUiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzgwNDgxNjB9.mN41J-R7hQubktIOI1DVsgWBmJ8J6a4rjljkwOW_5y4"
headers = {"Authorization": f"Bearer {token}"}

print("Testing PDF Export Headers:")
r_pdf = requests.get(url_pdf, headers=headers)
print(f"Status: {r_pdf.status_code}")
print(f"Content-Type: {r_pdf.headers.get('Content-Type')}")
print(f"Content-Disposition: {r_pdf.headers.get('Content-Disposition')}")
print(f"Access-Control-Expose-Headers: {r_pdf.headers.get('Access-Control-Expose-Headers')}")

print("\nTesting JSON Export Headers:")
r_json = requests.get(url_json, headers=headers)
print(f"Status: {r_json.status_code}")
print(f"Content-Type: {r_json.headers.get('Content-Type')}")
print(f"Content-Disposition: {r_json.headers.get('Content-Disposition')}")
print(f"Access-Control-Expose-Headers: {r_json.headers.get('Access-Control-Expose-Headers')}")
