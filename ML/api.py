# 05/12/25 ✿ Asmiatun Hasanah ✿

from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response
import subprocess
import uuid
import os

app = FastAPI()

@app.get("/")
def home():
    return {"message": "hi kak! >-<"}

# @app.get("/hello/{name}")
# def hello(name: str):
#     return {"message": f"Hello, {name}!"}
#
# @app.post("/add")
# def add_numbers(data: dict):
#     return {"result": data["a"] + data["b"]}

@app.post("/upscale-2")
async def process_image(file: UploadFile = File(...)):
    return await upscale(file, 2)

@app.post("/upscale-4")
async def process_image(file: UploadFile = File(...)):
    return await upscale(file, 4)

@app.post("/upscale-6")
async def process_image(file: UploadFile = File(...)):
    return await upscale(file, 6)

@app.post("/upscale-8")
async def process_image(file: UploadFile = File(...)):
    return await upscale(file, 8)

async def upscale(file: UploadFile, multiplier = 2):
    image_id = uuid.uuid4()
    input_filename = f"img_cache/{image_id}.png"
    with open(input_filename, "wb") as f:
        data = await file.read()
        f.write(data)
        f.flush()
        os.fsync(f.fileno())

    output_filename = input_filename.replace(".", f"_upscaled_{multiplier}x.")
    try:
        subprocess.run(
            [
                "python",
                "./upscaler/upscale.py",
                "--model", "./upscaler/model/2xLiveActionV1_SPAN.onnx",
                "--provider", "CPUExecutionProvider",
                "--image", input_filename,
                "--scale", str(multiplier)
            ],
            check=True
        )
    except subprocess.CalledProcessError as e:
        return {"error": f"Gagal memproses gambar: {e}"}

    with open(output_filename, "rb") as f:
        blob = f.read()

    os.remove(input_filename)
    os.remove(output_filename)

    return Response(content=blob, media_type="image/png")
