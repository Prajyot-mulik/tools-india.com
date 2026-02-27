"""
Unified API Server - Handles all calculator endpoints
Run: python api/index.py
"""

from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from datetime import date, datetime
import calendar

# ============ Age Calculator ============
def calculate_age(dob_str):
    dob = datetime.fromisoformat(dob_str).date()
    today = date.today()
    
    if dob > today:
        raise ValueError("Date of birth cannot be in the future")
    
    years = today.year - dob.year
    months = today.month - dob.month
    days = today.day - dob.day
    
    if days < 0:
        months -= 1
        prev_month = today.month - 1 or 12
        prev_year = today.year if today.month != 1 else today.year - 1
        days_in_prev = calendar.monthrange(prev_year, prev_month)[1]
        days += days_in_prev
    
    if months < 0:
        years -= 1
        months += 12
    
    total_days = (today - dob).days
    
    return {
        "years": years,
        "months": months,
        "days": days,
        "total_days": total_days,
    }

# ============ CGPA Calculator ============
def calculate_cgpa(cgpa, university):
    if not isinstance(cgpa, (int, float)) or not (0 <= cgpa <= 10):
        raise ValueError("CGPA must be a number between 0 and 10")
    
    multipliers = {
        "default": 9.5, "VTU": 10.0, "Mumbai": 9.5, 
        "Anna": 10.0, "AKTU": 10.0, "PTU": 9.5
    }
    
    percentage = cgpa * multipliers.get(university, 9.5)
    return {
        "cgpa": round(cgpa, 2),
        "percentage": round(min(percentage, 100.0), 2),
        "university": university
    }

# ============ GST Calculator ============
def calculate_gst(amount, rate):
    if not isinstance(amount, (int, float)) or amount < 0:
        raise ValueError("Amount must be a non-negative number")
    if not isinstance(rate, (int, float)) or not (0 <= rate <= 100):
        raise ValueError("Rate must be between 0 and 100")
    
    gst_amount = amount * (rate / 100)
    return {
        "original": round(amount, 2),
        "gst_amount": round(gst_amount, 2),
        "gst_rate": rate,
        "total": round(amount + gst_amount, 2)
    }

# ============ EMI Calculator ============
def calculate_emi(principal, annual_rate, tenure_months):
    if not isinstance(principal, (int, float)) or principal <= 0:
        raise ValueError("Principal must be greater than 0")
    if not isinstance(annual_rate, (int, float)) or annual_rate < 0:
        raise ValueError("Interest rate cannot be negative")
    if not isinstance(tenure_months, int) or tenure_months <= 0:
        raise ValueError("Tenure must be greater than 0 months")
    
    if annual_rate == 0:
        emi = principal / tenure_months
        total_interest = 0
    else:
        monthly_rate = annual_rate / 12 / 100
        emi = principal * monthly_rate * ((1 + monthly_rate) ** tenure_months) / (((1 + monthly_rate) ** tenure_months) - 1)
        total_interest = (emi * tenure_months) - principal
    
    total_amount = emi * tenure_months
    
    return {
        "principal": round(principal, 2),
        "annual_rate": round(annual_rate, 2),
        "tenure_months": tenure_months,
        "emi": round(emi, 2),
        "total_interest": round(total_interest, 2),
        "total_amount": round(total_amount, 2)
    }

# ============ Main Handler ============
class APIHandler(BaseHTTPRequestHandler):
    
    def do_POST(self):
        path = self.path
        
        try:
            length = int(self.headers.get('Content-Length', 0))
            body = json.loads(self.rfile.read(length)) if length > 0 else {}
            
            print(f'📨 {path}: {body}')  # Debug log
            
            if path == '/api/age':
                dob = body.get('dob')
                if not dob:
                    raise ValueError("dob field required")
                response = calculate_age(dob)
            
            elif path == '/api/cgpa':
                cgpa = body.get('cgpa')
                university = body.get('university', 'default')
                if cgpa is None:
                    raise ValueError("cgpa field required")
                print(f'  cgpa={cgpa} (type={type(cgpa).__name__}), uni={university}')
                response = calculate_cgpa(cgpa, university)
            
            elif path == '/api/gst':
                amount = body.get('amount')
                rate = body.get('rate')
                if amount is None or rate is None:
                    raise ValueError("amount and rate fields required")
                print(f'  amount={amount} (type={type(amount).__name__}), rate={rate} (type={type(rate).__name__})')
                response = calculate_gst(amount, rate)
            
            elif path == '/api/emi':
                principal = body.get('principal')
                annual_rate = body.get('annual_rate')
                tenure_months = body.get('tenure_months')
                if any(x is None for x in [principal, annual_rate, tenure_months]):
                    raise ValueError("principal, annual_rate, tenure_months fields required")
                print(f'  principal={principal}, rate={annual_rate}, months={tenure_months}')
                response = calculate_emi(principal, annual_rate, tenure_months)
            
            else:
                response = {"error": "Endpoint not found"}
                self.send_error(404)
                return
            
            print(f'✅ {path}: Success')
            self._send_response(200, response)
        
        except Exception as e:
            print(f'❌ {path}: {str(e)}')
            self._send_response(400, {"error": str(e)})
    
    def do_OPTIONS(self):
        self.send_response(200)
        self._add_cors_headers()
        self.end_headers()
    
    def _send_response(self, status, data):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self._add_cors_headers()
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
    
    def _add_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
    
    def log_message(self, format, *args):
        # Suppress default logging to reduce console clutter
        pass


if __name__ == "__main__":
    server = HTTPServer(('127.0.0.1', 8000), APIHandler)
    print("✅ API Server started on http://127.0.0.1:8000")
    print("📝 Endpoints: /api/age, /api/cgpa, /api/gst, /api/emi")
    print("⏳ Listening for requests...\n")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n⛔ Server stopped")
        server.server_close()
