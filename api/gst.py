from http.server import BaseHTTPRequestHandler
import json


def calculate_gst(amount: float, rate: float) -> dict:
    """Calculate GST and total amount."""
    
    if not (0 <= rate <= 100):
        raise ValueError("GST rate must be between 0 and 100")
    
    gst_amount = amount * (rate / 100)
    total = amount + gst_amount
    
    return {
        "original": round(amount, 2),
        "gst_amount": round(gst_amount, 2),
        "gst_rate": rate,
        "total": round(total, 2)
    }


class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        try:
            length = int(self.headers.get('Content-Length', 0))
            if length == 0:
                raise ValueError("Empty request body")
            
            body = json.loads(self.rfile.read(length))
            amount = body.get("amount")
            rate = body.get("rate")

            if amount is None:
                raise ValueError("`amount` field is required")
            
            if rate is None:
                raise ValueError("`rate` field is required")
            
            if not isinstance(amount, (int, float)):
                raise ValueError("`amount` must be a number")
            
            if not isinstance(rate, (int, float)):
                raise ValueError("`rate` must be a number")
            
            if amount < 0:
                raise ValueError("Amount cannot be negative")

            result = calculate_gst(float(amount), float(rate))
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
    print("🚀 GST Calculator API running on http://localhost:8000")
    server.serve_forever()
