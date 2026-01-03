# Build the Docker image using the Production Dockerfile
docker build -f Dockerfile.prod -t dgg-piece:v48 .

# Save the image to a tar file
docker save -o dgg-piece-v48.tar dgg-piece:v48

Write-Host "Gotowe! Plik dgg-piece.tar został utworzony."
Write-Host "Teraz wgraj go na NAS w Portainerze: Images -> Import."
