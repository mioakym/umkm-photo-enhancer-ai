# 05/12/25 ✿ Asmiatun Hasanah ✿

from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response
import subprocess
import uuid
import os

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello from FastAPI!"}

@app.get("/hello/{name}")
def hello(name: str):
    return {"message": f"Hello, {name}!"}

@app.post("/add")
def add_numbers(data: dict):
    return {"result": data["a"] + data["b"]}

@app.post("/upscale-image")
async def process_image(file: UploadFile = File(...)):
    # 1. Simpan file upload ke folder raw/ dengan nama unik
    image_id = uuid.uuid4()
    input_filename = f"upscaler/raw/{image_id}.png"
    with open(input_filename, "wb") as f:
        data = await file.read()
        f.write(data)
        f.flush()
        os.fsync(f.fileno())

    # 2. Tentukan file output
    output_filename = input_filename.replace(".", f"_upscaled_2x.")

    # 3. Jalankan script eksternal menggunakan subprocess
    try:
        subprocess.run(
            [
                "python",
                "./upscaler/upscale.py",
                "--model", "./upscaler/model/2xLiveActionV1_SPAN.onnx",
                "--provider", "CPUExecutionProvider",
                "--image", input_filename,
                "--scale", "2"
            ],
            check=True
        )
    except subprocess.CalledProcessError as e:
        return {"error": f"Gagal memproses gambar: {e}"}

    # 4. Baca hasil output gambar sebagai BLOB
    with open(output_filename, "rb") as f:
        blob = f.read()

    # 5. Hapus file sementara (opsional)
    os.remove(input_filename)
    os.remove(output_filename)

    # 6. Return gambar hasil proses sebagai response
    return Response(content=blob, media_type="image/png")
