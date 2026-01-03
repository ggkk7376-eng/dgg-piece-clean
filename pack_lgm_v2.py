import tarfile
import os

source_dir = r"d:\DGG 2025\Strony internetowe\standalone\lgm4ceramics\.next\standalone"
output_filename = r"d:\DGG 2025\Strony internetowe\Dgg-piece\dgg-piece\lgm_final_v2.tar.gz"

print(f"Packing from: {source_dir}")
print(f"Output to: {output_filename}")

with tarfile.open(output_filename, "w:gz") as tar:
    # Add public
    public_path = os.path.join(source_dir, "public")
    if os.path.exists(public_path):
        print("Adding public...")
        tar.add(public_path, arcname="public")
    
    # Add .next
    next_path = os.path.join(source_dir, ".next")
    if os.path.exists(next_path):
        print("Adding .next...")
        tar.add(next_path, arcname=".next")

print("Done!")
