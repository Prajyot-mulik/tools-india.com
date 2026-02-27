from http.server import BaseHTTPRequestHandler
import json


def convert_cgpa_to_percentage(cgpa: float, university: str) -> float:
    """Convert CGPA to percentage based on university formula."""
    
    cgpa_formulas = {
        "default": 9.5,      # General formula
        "VTU": 10.0,          # VTU uses ×10
        "Mumbai": 9.5,        # Mumbai University
        "Anna": 10.0,         # Anna University
        "AKTU": 10.0,         # AKTU
        "PTU": 9.5,           # PTU (Punjabi Technical University)
    }
    
    multiplier = cgpa_formulas.get(university, 9.5)
    percentage = cgpa * multiplier
    
    # Cap at 100%
    return min(percentage, 100.0)


class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        try:
            length = int(self.headers.get('Content-Length', 0))
            if length == 0:
                raise ValueError("Empty request body")
            
            body = json.loads(self.rfile.read(length))
            cgpa = body.get("cgpa")
            university = body.get("university", "default")

            if cgpa is None:
                raise ValueError("`cgpa` field is required")
            
            if not isinstance(cgpa, (int, float)):
                raise ValueError("`cgpa` must be a number")
            
            if not (0 <= cgpa <= 10):
                raise ValueError("CGPA must be between 0 and 10")
            
            university = str(university).strip()

            percentage = convert_cgpa_to_percentage(float(cgpa), university)

            self._send(200, {
                "cgpa": round(cgpa, 2),
                "percentage": round(percentage, 2),
                "university": university
            })

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
    print("🚀 CGPA Calculator API running on http://localhost:8000")
    server.serve_forever()
