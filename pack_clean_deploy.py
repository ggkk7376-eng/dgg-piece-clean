import os
import zipfile

# Content of docker-compose.yml with 2-space indentation
compose_content = """version: '3.8'

services:
  lgm-app:
    container_name: lgm-app-clean
    build: .
    restart: always
    network_mode: host
    environment:
      - NODE_ENV=production
      - PORT=3000
      - HOSTNAME=0.0.0.0
      - MAIL_HOST=smtp.lgm4ceramics.pl
      - MAIL_PORT=465
      - MAIL_USER=lgm4kontakt
      - MAIL_PASS=Gk2209dd-1967
      - MAIL_FROM=kontakt@lgm4ceramics.pl
      - MAIL_TO=kontakt@lgm4ceramics.pl
    volumes:
      - /volume1/Docker/lgm4ceramics/public/assets:/app/.next/standalone/public/assets

  lgm-tunnel:
    container_name: lgm-tunnel-clean
    image: cloudflare/cloudflared:latest
    restart: always
    network_mode: "host"
    command: tunnel run --protocol http2
    environment:
      - TUNNEL_TOKEN=eyJhIjoiMDVmY2E1OWRiYmExOGRmNWJiY2UxNmU0MTI2ZDMzYjAiLCJ0IjoiNzYyYTUzZDItNjFiZi00ODBjLThkODktYzlkM2ZlOTA0OWY1IiwicyI6IlptUmhaalprWldNdE1tUmlaaTAwTnpjM0xXRTVNMkl0WTJGaFkyVXpORFUzWlRjeCJ9
"""

base_dir = "lgm4ceramics repair"
compose_path = os.path.join(base_dir, "docker-compose.yml")

# Write docker-compose.yml with UTF-8 encoding (no BOM)
with open(compose_path, "w", encoding="utf-8", newline="\n") as f:
    f.write(compose_content)

print(f"Written clean {compose_path}")

# Create zip
zip_name = "lgm_deploy_clean.zip"
print(f"Creating {zip_name}...")

with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(base_dir):
        # Exclude heavy/unwanted folders
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.next', '.git', '.vscode']]
        
        for file in files:
            file_path = os.path.join(root, file)
            # Calculate arcname (relative path inside zip)
            # We want files to be at the root of the zip if possible, or preserve structure
            # If we zip "lgm4ceramics repair/docker-compose.yml", we usually want it at root of zip for Portainer
            # So let's write it relative to base_dir
            arcname = os.path.relpath(file_path, base_dir)
            zipf.write(file_path, arcname)

print("ZIP created successfully.")
