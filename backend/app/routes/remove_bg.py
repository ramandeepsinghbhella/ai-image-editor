from fastapi import APIRouter, UploadFile, File
from fastapi.responses import Response
from rembg import remove, new_session
from pathlib import Path
import os

router = APIRouter()

# ✅ Read model path from ENV
MODEL_PATH = Path("~/.u2net/u2net.onnx").expanduser()

print("Using model at:", MODEL_PATH)
print("Exists:", MODEL_PATH.exists())

# ✅ Create session once
session = new_session(
    "u2net",
    model_path=str(MODEL_PATH)
)

@router.post("/remove-bg")
async def remove_background(file: UploadFile = File(...)):
    input_bytes = await file.read()

    output_bytes = remove(
        input_bytes,
        session=session
    )

    return Response(
        content=output_bytes,
        media_type="image/png"
    )
