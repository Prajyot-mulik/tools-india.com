from datetime import date, datetime
import calendar
import json
from http.server import BaseHTTPRequestHandler, HTTPServer


def _compute_age(dob: date, today: date):
    # calculate years, months, days difference
    years = today.year - dob.year
    months = today.month - dob.month
    days = today.day - dob.day

    if days < 0:
        months -= 1
        # borrow days from previous month
        prev_month = today.month - 1 or 12
        prev_year = today.year if today.month != 1 else today.year - 1
        days_in_prev = calendar.monthrange(prev_year, prev_month)[1]
        days += days_in_prev

    if months < 0:
        years -= 1
        months += 12

    return years, months, days


# Vercel-compatible handler
class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        try:
            length = int(self.headers['Content-Length'])
            body = json.loads(self.rfile.read(length))
            dob_str = body.get("dob")

            if not dob_str:
                raise ValueError("`dob` field is required")

            dob = datetime.fromisoformat(dob_str).date()
            today = date.today()

            if dob > today:
                self._send(400, {"error": "Date of birth cannot be in the future"})
                return

            years, months, days = _compute_age(dob, today)
            total_days = (today - dob).days

            self._send(200, {
                "years": years,
                "months": months,
                "days": days,
                "total_days": total_days,
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
        # Suppress default logging
        pass


if __name__ == "__main__":
    server = HTTPServer(("localhost", 8000), handler)
    print("🚀 Age Calculator API running on http://localhost:8000")
    print("📝 POST /api/age with {'dob': 'YYYY-MM-DD'}")
    server.serve_forever()

