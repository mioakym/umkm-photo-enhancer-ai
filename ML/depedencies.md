Ini harus di-install tergantung pada OS yang digunakan:
✿ `onnxruntime`
✿ `onnx`
✿ `pillow`
✿ `python-multipart`
✿ `fastapi`
✿ `uvicorn`

misalnya kalau pake nyarch linux bisa pake command:
```
$ yay -S python-onnx
$ yay -S python-onnxruntime
$ yay -S python-pillow
$ yay -S python-python-multipart
$ yay -S python-fastapi
$ yay -S uvicorn
```

untuk selain OS distribusi arch cukup di-install melalui pip:
```
$ pip install onnx onnxruntime pillow python-multipart fastapi
$ sudo apt install uvicorn
```