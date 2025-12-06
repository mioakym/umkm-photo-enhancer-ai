# Background Removal CLI (OpenCV GrabCut)

## Features
- Removes background using classical computer vision (GrabCut)
- No machine learning model required
---

## Usage

Run the script from the terminal:

```bash
python remove_bg.py --input input.jpg --output output.png --iterations 5
```
---

## Arguments

| Argument     | Description                                | Required | Default |
|--------------|----------------------------------------------|----------|---------|
| `--input`    | Path to input image                          | Yes      | None    |
| `--output`   | Output image path                            | Yes      | None    |
| `--iterations`     | Number of iterations of the algorithm  | No       | 5    |
