from typing import Union
from model import PneumoniaClassifier
from pydantic import BaseModel
import base64
import io
from PIL import Image
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:5173",
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ImageData(BaseModel):
    image_base64: str

@app.post("/")
async def upload_base64(data: ImageData):
    # Decode Base64 → bytes
    image_bytes = base64.b64decode(data.image_base64)

    # Convert bytes → PIL Image
    pil_image = Image.open(io.BytesIO(image_bytes))
    classifier = PneumoniaClassifier()
    prediction = classifier.predict(pil_image)
    print(prediction)

    confidence = prediction[1] if prediction[0] == "PNEUMONIA" else 1-prediction[1]
    return {"diagnosis": prediction[0], "confidence": confidence}