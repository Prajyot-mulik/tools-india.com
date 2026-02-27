#!/usr/bin/env python3
"""
Quick test to verify API server is working
Run: python test_api.py
"""

import urllib.request
import json

def test_endpoint(endpoint, data):
    """Test a single endpoint"""
    url = f'http://127.0.0.1:8000{endpoint}'
    
    try:
        req = urllib.request.Request(
            url,
            data=json.dumps(data).encode(),
            headers={'Content-Type': 'application/json'},
            method='POST'
        )
        
        with urllib.request.urlopen(req, timeout=2) as response:
            result = json.loads(response.read())
            print(f"✅ {endpoint:15} → {result}")
            return True
    except Exception as e:
        print(f"❌ {endpoint:15} → {str(e)}")
        return False

print("🧪 Testing API Endpoints...\n")

tests = [
    ('/api/age', {'dob': '2000-01-15'}),
    ('/api/cgpa', {'cgpa': 8.5, 'university': 'default'}),
    ('/api/gst', {'amount': 1000, 'rate': 18}),
    ('/api/emi', {'principal': 1000000, 'annual_rate': 7, 'tenure_months': 240}),
]

results = []
for endpoint, data in tests:
    results.append(test_endpoint(endpoint, data))

print(f"\n📊 Results: {sum(results)}/{len(results)} passed")

if all(results):
    print("🎉 All tests passed! API is working correctly.")
else:
    print("⚠️  Some tests failed. Make sure API server is running on port 8000")
    print("    Run: python api/index.py")
