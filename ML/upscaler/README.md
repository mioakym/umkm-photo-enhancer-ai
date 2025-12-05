# Image Upscaling Script (2xLiveActionV1_SPAN)

This script allows you to upscale images using the **2xLiveActionV1_SPAN
ONNX model** with configurable execution providers (CPU or CUDA).

------------------------------------------------------------------------

## \## Requirements

Make sure you have the following dependencies installed:

    pip install onnxruntime pillow numpy

------------------------------------------------------------------------

## \## Usage

Run the script from terminal:
```
python upscale.py --image my_picture.jpg --scale 8
```

### Arguments:
-  `--provider` Choose execution provider: `cpu` or `cuda`
-  `--input`    Path to the input image
-  `--scale`    Set size of the output image: `2, 4, 6, 8`

------------------------------------------------------------------------

## \## Example (CPU)
```
python upscale.py --provider CPUExecutionProvider --image my_picture.jpg --scale 4
```
------------------------------------------------------------------------

## \## Notes

-   CUDA provider requires a compatible NVIDIA GPU and CUDA runtime
    installed.
-   The 2xLiveActionV1_SPAN.onnx model must be placed in the same
    directory as the script unless you modify the path.

------------------------------------------------------------------------

## \## Troubleshooting

### 📌 ONNXRuntime CUDA Error

If you see:

    Failed to load CUDAExecutionProvider

You likely need to install the GPU version:

    pip install onnxruntime-gpu

### 📌 Provider fallback

If CUDA fails, the script automatically falls back to CPU mode.

