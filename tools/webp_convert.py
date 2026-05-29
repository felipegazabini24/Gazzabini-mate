"""
webp_convert.py — Convierte fotos de assets/photos/source/ a WebP en assets/img/
Uso: python tools/webp_convert.py [--quality 82] [--width 1200]
Requiere: Pillow  (pip install Pillow)
"""
import argparse
import sys
from pathlib import Path

def convert(source_dir: Path, output_dir: Path, quality: int, max_width: int) -> None:
    try:
        from PIL import Image
    except ImportError:
        sys.exit("Error: Pillow no está instalado. Corré: pip install Pillow")

    exts = {".jpg", ".jpeg", ".png", ".tiff", ".bmp", ".gif"}
    sources = [f for f in source_dir.iterdir() if f.suffix.lower() in exts]

    if not sources:
        print(f"No se encontraron imágenes en {source_dir}")
        return

    output_dir.mkdir(parents=True, exist_ok=True)

    for src in sorted(sources):
        dest = output_dir / (src.stem + ".webp")
        with Image.open(src) as img:
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGBA")
            else:
                img = img.convert("RGB")

            if img.width > max_width:
                ratio  = max_width / img.width
                new_h  = int(img.height * ratio)
                img    = img.resize((max_width, new_h), Image.LANCZOS)

            img.save(dest, "WEBP", quality=quality, method=6)
            print(f"  {src.name:40s} → {dest.name}  ({dest.stat().st_size // 1024} KB)")

    print(f"\nListo. {len(sources)} imagen(es) convertida(s) en {output_dir}")


if __name__ == "__main__":
    BASE = Path(__file__).resolve().parent.parent

    parser = argparse.ArgumentParser(description="Convierte fotos a WebP optimizado")
    parser.add_argument("--source",  default=str(BASE / "assets" / "photos" / "source"),
                        help="Carpeta de fotos originales")
    parser.add_argument("--output",  default=str(BASE / "assets" / "img"),
                        help="Carpeta de salida WebP")
    parser.add_argument("--quality", type=int, default=82,
                        help="Calidad WebP 1-100 (default 82)")
    parser.add_argument("--width",   type=int, default=1200,
                        help="Ancho máximo en px (default 1200)")
    args = parser.parse_args()

    convert(Path(args.source), Path(args.output), args.quality, args.width)
