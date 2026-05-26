from http.server import BaseHTTPRequestHandler
import json
import requests

API_KEY = "AIzaSyDnf2nTh1UseBQ8Cj2dlbEYr5Tz6SD2wbA"

class handler(BaseHTTPRequestHandler):

    def do_POST(self):

        content_length = int(
            self.headers['Content-Length']
        )

        body = self.rfile.read(
            content_length
        )

        data = json.loads(body)

        message = data.get("message")
        model = data.get("model")

        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"

        payload = {

            "contents":[

                {

                    "parts":[

                        {

                            "text":message

                        }

                    ]

                }

            ]

        }

        response = requests.post(
            url,
            json=payload
        )

        result = response.json()

        reply = (

            result
            .get("candidates",[{}])[0]
            .get("content",{})
            .get("parts",[{}])[0]
            .get("text","No response")

        )

        self.send_response(200)

        self.send_header(
            'Content-type',
            'application/json'
        )

        self.end_headers()

        self.wfile.write(

            json.dumps({

                "reply":reply

            }).encode()

        )
