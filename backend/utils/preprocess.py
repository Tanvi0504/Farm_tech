import numpy as np
from PIL import Image

def preprocess_image(image: Image.Image):
    """Resize and normalize image for model input."""
    img = image.resize((128, 128))      # resize to model input size
    img_array = np.array(img) / 255.0   # normalize pixel values
    img_array = np.expand_dims(img_array, axis=0)  # add batch dimension
    return img_array
