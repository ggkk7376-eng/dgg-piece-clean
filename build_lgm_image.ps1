# Build the Docker image for lgm4ceramics
# Context is "lgm4ceramics repair" folder
docker build -f "lgm4ceramics repair/Dockerfile" -t lgm-app:v1 "lgm4ceramics repair"

# Save the image to a tar file
docker save -o lgm-app-v1.tar lgm-app:v1

Write-Host "Gotowe! Plik lgm-app-v1.tar został utworzony."
Write-Host "1. Wgraj go na NAS."
Write-Host "2. Zaimportuj w Portainerze (Images -> Import)."
Write-Host "3. Zaktualizuj Stack używając konfiguracji 'image: lgm-app:v1'."
