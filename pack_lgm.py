import zipfile
import os
import sys

def pack_lgm():
    source_dir = "lgm4ceramics repair"
    zip_name = "lgm_restore_repair.zip"
    
    if not os.path.exists(source_dir):
        print(f"Error: Directory '{source_dir}' not found!")
        return

    if os.path.exists(zip_name):
        os.remove(zip_name)
        
    print(f"Packing '{source_dir}' into '{zip_name}'...")
    
    with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                file_path = os.path.join(root, file)
                # Create arcname relative to the parent of source_dir basicallly
                # We want the ZIP to contain "lgm4ceramics repair/file" or just "file"?
                # Previous instruction assumed unzip creates a folder or we have to rename it.
                # Let's pack it so the root of zip IS the content of valid lgm4ceramics.
                
                # If we pack "lgm4ceramics repair/foo.txt", unzip creates "lgm4ceramics repair" folder.
                # Let's do that to match previous `mv` instruction.
                arcname = os.path.relpath(file_path, '.')
                
                zf.write(file_path, arcname)
    
    print(f"Created {zip_name} ({os.path.getsize(zip_name)} bytes)")

if __name__ == '__main__':
    pack_lgm()
