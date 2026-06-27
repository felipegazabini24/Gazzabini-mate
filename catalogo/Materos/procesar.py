import os
from PIL import Image

input_folder = r"C:\Users\Felipe Gazzabini\Downloads\Materos"
output_folder = r"C:\Users\Felipe Gazzabini\Downloads\fotos_whatsapp"
os.makedirs(output_folder, exist_ok=True)

extensions = (".jpg", ".jpeg", ".png", ".webp")
files = [f for f in os.listdir(input_folder) if f.lower().endswith(extensions)]

print(f"Procesando {len(files)} imágenes...\n")

for filename in sorted(files):
    input_path = os.path.join(input_folder, filename)
    output_name = os.path.splitext(filename)[0] + ".jpg"
    output_path = os.path.join(output_folder, output_name)

    img = Image.open(input_path).convert("RGB")

    # Recorte cuadrado centrado
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    img = img.crop((left, top, left + side, top + side))

    # Redimensionar a 800x800
    img = img.resize((800, 800), Image.LANCZOS)

    # Guardar optimizado (calidad 85, bajo 1MB)
    quality = 85
    img.save(output_path, "JPEG", quality=quality, optimize=True)

    size_kb = os.path.getsize(output_path) / 1024
    print(f"{output_name} - {size_kb:.1f} KB")

print(f"\nListo. {len(files)} imagenes guardadas en fotos_whatsapp")
