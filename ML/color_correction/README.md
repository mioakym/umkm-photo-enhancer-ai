
# Color Correction Tool

## Features

### ✔ Gray World Color Correction
Balances color channels by equalizing their average intensity.

### ✔ CLAHE Enhancement
Improves local contrast, especially useful for underexposed images.

### ✔ Combined Mode
Applies Gray World adjustment followed by CLAHE for a balanced and detailed result.

### ✔ Retinex MSRCR
A powerful algorithm for:
- Enhancing low-light images  
- Recovering shadow detail  
- Reducing color cast  
- Producing more natural color correction  

---

## Usage

Run the script from the terminal:

```bash
python color_correct.py --input INPUT_IMAGE.jpg --output OUTPUT_IMAGE.jpg --mode MODE
```

### Example Commands

#### Gray World
```bash
python color_correct.py --input input.jpg --output output.jpg --mode gray
```

#### CLAHE
```bash
python color_correct.py --input input.jpg --output output.jpg --mode clahe
```

#### Combined (Gray World + CLAHE)
```bash
python color_correct.py --input input.jpg --output output.jpg --mode all
```

#### Retinex MSRCR
```bash
python color_correct.py --input input.jpg --output output.jpg --mode retinex
```

---

## Arguments

| Argument     | Description                                | Required | Default |
|--------------|----------------------------------------------|----------|---------|
| `--input`    | Path to input image                          | Yes      | None    |
| `--output`   | Output image path                            | Yes      | None    |
| `--mode`     | Correction mode: `gray`, `clahe`, `all`, `retinex` | No       | gray    |

---

## Notes

- The output quality depends on lighting, exposure, and camera color profile.
- Retinex may produce very strong results depending on the image; feel free to adjust the sigma values in the code if needed.
