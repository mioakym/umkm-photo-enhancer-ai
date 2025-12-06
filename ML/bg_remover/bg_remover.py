# 05/12/25 ✿ Asmiatun Hasanah ✿

import cv2
import numpy as np
import argparse

def remove_background(input_path, output_path, iterations):
    img = cv2.imread(input_path)
    if img is None:
        raise ValueError(f"Image '{input_path}' not found or invalid.")

    height, width = img.shape[:2]
    rect = (10, 10, width - 20, height - 20)

    mask = np.zeros((height, width), np.uint8)
    bg_model = np.zeros((1, 65), np.float64)
    fg_model = np.zeros((1, 65), np.float64)

    cv2.grabCut(img, mask, rect, bg_model, fg_model, iterations, cv2.GC_INIT_WITH_RECT)

    mask2 = np.where(
        (mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD),
        1,
        0
    ).astype('uint8')

    result = img * mask2[:, :, np.newaxis]

    b, g, r = cv2.split(result)
    alpha = mask2 * 255
    rgba = cv2.merge([b, g, r, alpha])

    cv2.imwrite(output_path, rgba)
    print(f"Background successfully removed → {output_path}")

def main():
    parser = argparse.ArgumentParser(description="Remove image background using OpenCV GrabCut.")
    parser.add_argument("--input", required=True, help="Input image file path")
    parser.add_argument("--output", required=True, help="Output file path (it's best to use PNG)")
    parser.add_argument("--iterations", type=int, default=5, help="Number of iterations of the algorithm (default: 5)")

    args = parser.parse_args()
    remove_background(args.input, args.output, args.iterations)

if __name__ == "__main__":
    main()
