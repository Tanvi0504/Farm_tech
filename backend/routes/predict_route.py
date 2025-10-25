from fastapi import APIRouter, UploadFile, File
from model.crop_model import predict_disease
import json
from PIL import Image
import io

router = APIRouter()

@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    """Accepts image file and returns disease prediction."""
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes))

    result = predict_disease(image)

    return result


@router.get("/centers")
def get_centers():
    """Returns nearby agri-service centers."""
    with open("data/centers.json", "r") as f:
        centers = json.load(f)
    return {"centers": centers}
