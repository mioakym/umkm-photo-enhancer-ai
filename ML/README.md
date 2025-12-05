# umkm-photo-enhancer-ai

### Config:
- **process_mode**<br>
    Set process_mode in `config.json`<br>
    Use `"gpu"` for CUDA or `"cpu"` for CPU

### Usage:
```
uvicorn api:app --reload
```
**Path**: http://127.0.0.1:8000/<br>
**Docs:** http://127.0.0.1:8000/docs