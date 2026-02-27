from http.server import BaseHTTPRequestHandler
import json


def calculate_emi(principal: float, annual_rate: float, tenure_months: int) -> dict:
    """Calculate EMI (Equated Monthly Installment)."""
    
    if principal <= 0:
        raise ValueError("Principal amount must be greater than 0")
    
    if annual_rate < 0:
        raise ValueError("Interest rate cannot be negative")
    
    if tenure_months <= 0:
        raise ValueError("Tenure must be greater than 0 months")
    
    # If interest rate is 0
    if annual_rate == 0:
        emi = principal / tenure_months
        total_amount = principal
        total_interest = 0
    else:
        # Convert annual rate to monthly decimal rate
        monthly_rate = annual_rate / 12 / 100
        
        # EMI formula: [P × r × (1 + r)^n] / [(1 + r)^n - 1]
        numerator = principal * monthly_rate * ((1 + monthly_rate) ** tenure_months)
        denominator = ((1 + monthly_rate) ** tenure_months) - 1
        emi = numerator / denominator
        
        total_amount = emi * tenure_months
        total_interest = total_amount - principal
    
    return {
        "principal": round(principal, 2),
        "annual_rate": round(annual_rate, 2),
        "tenure_months": tenure_months,
        "emi": round(emi, 2),
        "total_interest": round(total_interest, 2),
        "total_amount": round(total_amount, 2)
    }


class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        try:
            length = int(self.headers.get('Content-Length', 0))
            if length == 0:
                raise ValueError("Empty request body")
            
            body = json.loads(self.rfile.read(length))
            principal = body.get("principal")
            annual_rate = body.get("annual_rate")
            tenure_months = body.get("tenure_months")

            if principal is None:
                raise ValueError("`principal` field is required")
            
            if annual_rate is None:
                raise ValueError("`annual_rate` field is required")
            
            if tenure_months is None:
                raise ValueError("`tenure_months` field is required")
            
            if not isinstance(principal, (int, float)):
                raise ValueError("`principal` must be a number")
            
            if not isinstance(annual_rate, (int, float)):
                raise ValueError("`annual_rate` must be a number")
            
            if not isinstance(tenure_months, int):
                raise ValueError("`tenure_months` must be an integer")

            result = calculate_emi(float(principal), float(annual_rate), int(tenure_months))
            self._send(200, result)

        except Exception as e:
            self._send(400, {"error": str(e)})

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors()
        self.end_headers()

    def _send(self, status, data):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self._cors()
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def _cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def log_message(self, format, *args):
        pass


if __name__ == "__main__":
    from http.server import HTTPServer
    server = HTTPServer(("localhost", 8000), handler)
    print("🚀 EMI Calculator API running on http://localhost:8000")
    server.serve_forever()
