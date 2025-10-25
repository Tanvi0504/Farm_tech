from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.predict_route import router as predict_router

app = FastAPI(title="FarmTech Backend", version="1.0")

# Allow frontend requests (important for CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow all origins for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include your routes
app.include_router(predict_router)

@app.get("/")
def home():
    return {"message": "🌾 FarmTech API is live!"}

# Run using: uvicorn main:app --reload
