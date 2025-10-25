from utils.preprocess import preprocess_image
import random

def predict_disease(image):
    """Dummy AI prediction logic. Replace with real model later."""

    # Step 1: preprocess image (resize, normalize, etc.)
    img_array = preprocess_image(image)

    # Step 2: dummy prediction
    diseases = [
        {"name": "Leaf Blight", "remedy": "Use Mancozeb or Copper-based fungicide."},
        {"name": "Leaf Spot", "remedy": "Apply neem oil and avoid overwatering."},
        {"name": "Rust", "remedy": "Use Sulphur-based spray and improve air circulation."},
        {"name": "Healthy Leaf", "remedy": "No disease detected. Keep monitoring your crop."}
    ]

    pred = random.choice(diseases)
    confidence = round(random.uniform(85, 98), 2)

    return {
        "disease": pred["name"],
        "confidence": f"{confidence}%",
        "remedy": pred["remedy"]
    }
