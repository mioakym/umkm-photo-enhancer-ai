# 05/12/25 ✿ Asmiatun Hasanah ✿

from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response

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

@app.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    # Baca file gambar sebagai bytes (BLOB)
    blob = await file.read()

    # Contoh: di sini kamu bisa memproses gambar jika ingin (opsional)
    # misalnya resize, convert format, tambah watermark, dll.

    # Return kembali gambar dalam bentuk BLOB
    # Set content-type sesuai file asli
    return Response(content=blob, media_type=file.content_type)
