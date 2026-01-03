import os
import zipfile

def zipdir(path, ziph):
    # length of path to replace for relative paths
    parent_len = len(os.path.dirname(os.path.abspath(path)))
    
    for root, dirs, files in os.walk(path):
        # Filter directories to exclude
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.next', '.git', '.vscode', 'dist', 'build']]
        
        for file in files:
             # Exclude specific files if needed
            if file == 'package-lock.json' or file.endswith('.lock') or file.endswith('.log'):
                 continue
            
            src_path = os.path.join(root, file)
            # relative path for zip
            rel_path = src_path[parent_len:].lstrip(os.sep)
            ziph.write(src_path, rel_path)

source_dir = r"lgm4ceramics repair"
output_file = "lgm_source.zip"

print(f"Zipping {source_dir} to {output_file} without node_modules...")

try:
    with zipfile.ZipFile(output_file, 'w', zipfile.ZIP_DEFLATED) as zipf:
        zipdir(source_dir, zipf)
    print("Done! Zip created successfully.")
except Exception as e:
    print(f"Error: {e}")
