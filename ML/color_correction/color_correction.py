# 06/12/25 ✿ Asmiatun Hasanah ✿

import cv2
import numpy as np
import argparse


def color_correction_gray_world(image):
    img_float = image.astype(np.float32)

    avg_b = np.mean(img_float[:, :, 0])
    avg_g = np.mean(img_float[:, :, 1])
    avg_r = np.mean(img_float[:, :, 2])

    avg_gray = (avg_b + avg_g + avg_r) / 3

    img_float[:, :, 0] *= avg_gray / avg_b
    img_float[:, :, 1] *= avg_gray / avg_g
    img_float[:, :, 2] *= avg_gray / avg_r

    return np.clip(img_float, 0, 255).astype(np.uint8)
def color_correction_clahe(image):
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)

    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
    l_clahe = clahe.apply(l)

    corrected_lab = cv2.merge((l_clahe, a, b))
    return cv2.cvtColor(corrected_lab, cv2.COLOR_LAB2BGR)
def retinex_msrcr(image, sigma_list=None):
    if sigma_list is None:
        sigma_list = [15, 80, 250]  # default multi-scale sigma

    img = image.astype(np.float32) + 1.0
    img_retinex = np.zeros_like(img)

    for sigma in sigma_list:
        blur = cv2.GaussianBlur(img, (0, 0), sigma)
        img_retinex += np.log10(img) - np.log10(blur)

    img_retinex = img_retinex / len(sigma_list)

    intensity = np.sum(img, axis=2, keepdims=True)
    color_restoration = np.log10(125 * img / intensity)
    msrcr = img_retinex * color_restoration

    msrcr = msrcr - np.min(msrcr)
    msrcr = 255 * (msrcr / np.max(msrcr))
    return np.clip(msrcr, 0, 255).astype(np.uint8)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="OpenCV Color Correction Tool")
    parser.add_argument("--input", required=True, help="Input image path")
    parser.add_argument("--output", required=True, help="Output image path")
    parser.add_argument("--mode",
                        default="gray",
                        choices=["gray", "clahe", "all", "retinex"],
                        help="Correction mode: gray, clahe, all, retinex")

    args = parser.parse_args()

    image = cv2.imread(args.input)
    if image is None:
        print("Failed to read input image:", args.input)
    else:
        if args.mode == "gray":
            corrected = color_correction_gray_world(image)
        elif args.mode == "clahe":
            corrected = color_correction_clahe(image)
        elif args.mode == "all":
            corrected = color_correction_gray_world(image)
            corrected = color_correction_clahe(corrected)
        elif args.mode == "retinex":
            corrected = retinex_msrcr(image)

        cv2.imwrite(args.output, corrected)
        print(f"Color Corrected! Mode: {args.mode}. Result saved in: {args.output}")