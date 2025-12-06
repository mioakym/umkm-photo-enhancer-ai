# 05/12/25 ✿ Asmiatun Hasanah ✿

from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response
import subprocess
import uuid
import json
import os

app = FastAPI()

@app.get("/")
def home():
    return {"message": "hi kak! >-<"}

@app.post("/upscale-2")
async def upscale_image_2x(file: UploadFile = File(...)):
    return await upscale(file, 2)
@app.post("/upscale-4")
async def upscale_image_4x(file: UploadFile = File(...)):
    return await upscale(file, 4)
@app.post("/upscale-6")
async def upscale_image_6x(file: UploadFile = File(...)):
    return await upscale(file, 6)
@app.post("/upscale-8")
async def upscale_image_8x(file: UploadFile = File(...)):
    return await upscale(file, 8)

@app.post("/remove_bg-1")
async def remove_bg_1i(file: UploadFile = File(...)):
    return await remove_bg(file, 1)
@app.post("/remove_bg-2")
async def remove_bg_2i(file: UploadFile = File(...)):
    return await remove_bg(file, 2)
@app.post("/remove_bg-3")
async def remove_bg_3i(file: UploadFile = File(...)):
    return await remove_bg(file, 3)
@app.post("/remove_bg-4")
async def remove_bg_4i(file: UploadFile = File(...)):
    return await remove_bg(file, 4)
@app.post("/remove_bg-5")
async def remove_bg_5i(file: UploadFile = File(...)):
    return await remove_bg(file, 5)
@app.post("/remove_bg-6")
async def remove_bg_6i(file: UploadFile = File(...)):
    return await remove_bg(file, 6)
@app.post("/remove_bg-7")
async def remove_bg_7i(file: UploadFile = File(...)):
    return await remove_bg(file, 7)
@app.post("/remove_bg-8")
async def remove_bg_8i(file: UploadFile = File(...)):
    return await remove_bg(file, 8)
@app.post("/remove_bg-9")
async def remove_bg_9i(file: UploadFile = File(...)):
    return await remove_bg(file, 9)
@app.post("/remove_bg-10")
async def remove_bg_10i(file: UploadFile = File(...)):
    return await remove_bg(file, 10)

@app.post("/color_correction-gray")
async def color_correction_gray_mode(file: UploadFile = File(...)):
    return await color_correction(file, "gray")
@app.post("/color_correction-clahe")
async def color_correction_clahe_mode(file: UploadFile = File(...)):
    return await color_correction(file, "clahe")
@app.post("/color_correction-all")
async def color_correction_all_mode(file: UploadFile = File(...)):
    return await color_correction(file, "all")
@app.post("/color_correction-retinex")
async def color_correction_retinex_mode(file: UploadFile = File(...)):
    return await color_correction(file, "retinex")

def load_process_mode():
    default = "gpu"

    if not os.path.exists("config.json"):
        return default

    try:
        with open("config.json", "r") as f:
            cfg = json.load(f)
        mode = cfg.get("process_mode", default).lower()
    except Exception:
        return default

    if mode not in ["gpu", "cpu"]:
        return default

    return mode
def get_execution_provider():
    mode = load_process_mode()

    if mode == "gpu":
        return "CUDAExecutionProvider"
    else:
        return "CPUExecutionProvider"

async def process_image(file: UploadFile, command = [], result_filename = "edited"):
    image_id = uuid.uuid4()
    input_filename = f"img_cache/{image_id}.png"
    source_image_data
    with open(input_filename, "wb") as f:
        data = await file.read()
        source_image_data = data
        f.write(data)
        f.flush()
        os.fsync(f.fileno())

    output_filename = input_filename.replace(".", f"_{result_filename}.")

    for i, arg in enumerate(command):
        if arg == "@input_filename":
            command[i] = input_filename
        elif arg == "@output_filename":
            command[i] = output_filename

    try:
        subprocess.run(command, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Failed to process image: {e}")
        return Response(content=source_image_data, media_type="image/png")

    with open(output_filename, "rb") as f:
        blob = f.read()

    os.remove(input_filename)
    os.remove(output_filename)

    return Response(content=blob, media_type="image/png")

async def upscale(file: UploadFile, multiplier = 2):
    return await process_image(
        file,
        [
            "python",
            "./upscaler/upscale.py",
            "--model", "./upscaler/model/2xLiveActionV1_SPAN.onnx",
            "--provider", get_execution_provider(),
            "--image", "@input_filename",
            "--scale", str(multiplier)
        ],
        f"upscaled_{multiplier}x"
    )
async def remove_bg(file: UploadFile, iterations = 5):
    return await process_image(
        file,
        [
            "python",
            "./bg_remover/bg_remover.py",
            "--input", "@input_filename",
            "--output", "@output_filename",
            "--iterations", str(iterations)
        ],
        f"remove_bg_{iterations}x"
    )
async def color_correction(file: UploadFile, mode = "gray"):
    return await process_image(
        file,
        [
            "python",
            "./color_correction/color_correction.py",
            "--input", "@input_filename",
            "--output", "@output_filename",
            "--mode", mode
        ],
        f"color_correction_{mode}"
    )