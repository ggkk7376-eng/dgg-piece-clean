import shutil
import os

source_dir = r"d:\DGG 2025\Strony internetowe\Dgg-piece\dgg-piece\lgm4ceramics repair"
output_filename = r"d:\DGG 2025\Strony internetowe\Dgg-piece\dgg-piece\lgm4ceramics_fixed"

print(f"Zipping {source_dir} to {output_filename}.zip...")
try:
    shutil.make_archive(output_filename, 'zip', source_dir)
    print("Done!")
except Exception as e:
    print(f"Error: {e}")
