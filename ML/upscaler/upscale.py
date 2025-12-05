# 04/12/25 ✿ Asmiatun Hasanah ✿

import argparse
import onnxruntime as ort
import numpy as np
from PIL import Image
import os

def run_model(session, img):
    arr = np.array(img).astype("float32") / 255.0
    arr = arr.transpose(2, 0, 1)[None, :, :, :]  # NCHW

    output = session.run(None, {"input": arr})[0]

    out = output[0].transpose(1, 2, 0)
    out = (out.clip(0, 1) * 255).astype("uint8")
    return Image.fromarray(out)


def upscale_image(model_path, image_path, provider, scale):
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found: {model_path}")
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image file not found: {image_path}")

    session = ort.InferenceSession(model_path, providers=[provider])

    # Load input image
    img = Image.open(image_path).convert("RGB")

    # Determine number of model passes
    if scale == 2:
        passes = 1
    elif scale == 4:
        passes = 2
    elif scale == 8:
        passes = 3
    elif scale == 6:
        passes = 3  # will downscale later
    else:
        raise ValueError("Scale must be 2, 4, 6, or 8")

    # Perform multiple upscaling passes
    for i in range(passes):
        print(f"Pass {i+1}/{passes} ...")
        img = run_model(session, img)

    # Optional resize for scale=6
    if scale == 6:
        w, h = Image.open(image_path).size
        target_w = int(w * 6)
        target_h = int(h * 6)
        img = img.resize((target_w, target_h), Image.LANCZOS)

    # Save result
    output_path = image_path.replace(".", f"_upscaled_{scale}x.")
    img.save(output_path)
    print(f"Upscale Done → {output_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Image Upscaling using SPAN ONNX model")

    parser.add_argument(
        "--provider",
        type=str,
        default="CUDAExecutionProvider",
        choices=["CPUExecutionProvider", "CUDAExecutionProvider"],
        help="Select Execution Provider"
    )

    parser.add_argument(
        "--image",
        type=str,
        required=True,
        help="Select input Image"
    )

    parser.add_argument(
        "--model",
        type=str,
        default="model/2xLiveActionV1_SPAN.onnx",
        help="Select ONNX model file"
    )

    parser.add_argument(
        "--scale",
        type=int,
        default=2,
        choices=[2, 4, 6, 8],
        help="Upscale value (2, 4, 6, 8)"
    )

    args = parser.parse_args()

    upscale_image(args.model, args.image, args.provider, args.scale)
