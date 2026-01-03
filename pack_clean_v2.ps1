$content = @"
version: '3.8'

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
    network_mode: host
    command: tunnel run --protocol http2
    environment:
      - TUNNEL_TOKEN=eyJhIjoiMDVmY2E1OWRiYmExOGRmNWJiY2UxNmU0MTI2ZDMzYjAiLCJ0IjoiNzYyYTUzZDItNjFiZi00ODBjLThkODktYzlkM2ZlOTA0OWY1IiwicyI6IlptUmhaalprWldNdE1tUmlaaTAwTnpjM0xXRTVNMkl0WTJGaFkyVXpORFUzWlRjeCJ9
"@

$path = "lgm4ceramics repair\docker-compose.yml"
$zip = "lgm_deploy_v2.zip"

# Write with UTF8 Encoding (No BOM is default for New-Item/Set-Content in Core, but explicit is safer)
# Using [System.Text.Encoding]::UTF8 might add BOM in older PS. 
# ASCII is safest for YAML if no special chars.
[System.IO.File]::WriteAllText($path, $content)

Write-Host "YAML rewritten."

# Repack using tar
# We must be inside the dir to zip content at root
Push-Location "lgm4ceramics repair"
tar -a -c -f "..\$zip" --exclude "node_modules" --exclude ".next" --exclude ".git" *
Pop-Location

Write-Host "ZIP v2 READY"
