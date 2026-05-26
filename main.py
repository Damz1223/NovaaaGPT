from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import requests
import uvicorn
import os

API_KEY = "AIzaSyDnf2nTh1UseBQ8Cj2dlbEYr5Tz6SD2wbA"

MODELS = {

    "NovaGPT 1.5":{

        "model":
        "gemini-2.5-flash-lite",

        "system":"""

Kamu adalah NovaGPT 1.5.

Sifat:
- Cepat
- Santai
- Friendly
- Jawaban singkat
- Tidak terlalu formal
- Fokus membantu user dengan cepat
- Cocok untuk chat harian
- Gunakan bahasa modern dan simpel
- Ahli coding dasar
- Jangan terlalu panjang menjelaskan

        """

    },

    "NovaGPT 2.5":{

        "model":
        "gemini-2.5-flash",

        "system":"""

Kamu adalah NovaGPT 2.5.

Sifat:
- Pintar
- Profesional
- Detail
- Ahli coding modern
- Ahli UI UX
- Friendly developer
- Fokus problem solving

        """

    },

    "NovaGPT 3.5":{

        "model":
        "gemini-2.5-flash",

        "system":"""

Kamu adalah NovaGPT 3.5.

Sifat:
- Sangat cerdas
- Detail
- Ahli fullstack
- Ahli AI engineering
- Ahli cybersecurity
- Fokus kualitas tinggi

        """

    },

    "NovaGPT Codex":{

        "model":
        "gemini-2.5-flash",

        "system":"""

Kamu adalah NovaGPT Codex.

Sifat:
- AI coding ultra advanced
- Fokus programming
- Ahli debugging
- Ahli JavaScript
- Ahli Python
- Ahli backend
- Ahli API integration

        """

    }

}

app = FastAPI()

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)

class ChatRequest(BaseModel):

    message:str
    model:str

@app.get("/")

async def home():

    return {

        "status":"online",

        "name":"NovaGPT Backend",

        "version":"1.0"

    }

@app.post("/api/chat")

async def chat(req:ChatRequest):

    selected = MODELS.get(req.model)

    if not selected:

        return {

            "reply":
            "Model tidak ditemukan"

        }

    prompt = f"""

{selected["system"]}

User:
{req.message}

    """

    try:

        response = requests.post(

f"https://generativelanguage.googleapis.com/v1beta/models/{selected['model']}:generateContent?key={API_KEY}",

            headers={

                "Content-Type":
                "application/json"

            },

            json={

                "contents":[

                    {

                        "parts":[

                            {

                                "text":
                                prompt

                            }

                        ]

                    }

                ],

                "generationConfig":{

                    "temperature":0.9,

                    "topP":0.95,

                    "topK":40,

                    "maxOutputTokens":2048

                }

            }

        )

        data = response.json()

        if "error" in data:

            return {

                "reply":

                data["error"].get(
                    "message",
                    "API Error"
                )

            }

        reply = (

            data
            .get("candidates",[{}])[0]
            .get("content",{})
            .get("parts",[{}])[0]
            .get("text")

        )

        if not reply:

            reply = "AI tidak memberikan respon."

        return {

            "reply":reply

        }

    except Exception as e:

        return {

            "reply":

            f"Server Error: {str(e)}"

        }

if __name__ == "__main__":

    uvicorn.run(

        "main:app",

        host="0.0.0.0",

        port=8000,

        reload=True

    )
