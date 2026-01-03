import zipfile
import os

# Files/Dirs to exclude
EXCLUDE_DIRS = {'.git', 'node_modules', '.next', '.vscode', 'Dgg-piece1'}
EXCLUDE_FILES = {'dgg-piece-sqlite-nas.zip', 'dgg-piece-sqlite-nas-fixed.zip', 'create_zip.py'}

def create_zip(zip_name):
    # Remove old zip if exists
    if os.path.exists(zip_name):
        os.remove(zip_name)
        
    print(f"Creating {zip_name}...")
    
    with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk('.'):
            # Modify dirs in-place to skip excluded directories
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
            
            for file in files:
                if file in EXCLUDE_FILES:
                    continue
                if file.endswith('.zip'):
                    continue
                
                file_path = os.path.join(root, file)
                # Create arcname with forward slashes for Linux compatibility
                arcname = os.path.relpath(file_path, '.').replace(os.sep, '/')
                
                # Verify we aren't adding absolute paths or weird stuff
                if arcname.startswith('..'):
                    continue
                    
                zf.write(file_path, arcname)
    
    print(f"Successfully created {zip_name}")

if __name__ == '__main__':
    create_zip('dgg-piece-sqlite-nas-fixed.zip')
