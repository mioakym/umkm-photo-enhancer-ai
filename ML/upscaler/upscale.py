# 04/12/25 ✿ Asmiatun Hasanah ✿
import onnxruntime as ort
import numpy as np
from PIL import Image

# Load model
sess = ort.InferenceSession("model/2xLiveActionV1_SPAN.onnx", providers=["CUDAExecutionProvider"])

# Load image
img = Image.open("raw/test_1.jpeg").convert("RGB")
arr = np.array(img).astype("float32") / 255.0
arr = arr.transpose(2, 0, 1)[None, :, :, :]  # NCHW

# Run
output = sess.run(None, {"input": arr})[0]

# Convert output
out = output[0].transpose(1, 2, 0)
out = (out.clip(0,1) * 255).astype("uint8")

Image.fromarray(out).save("results/output.png")
