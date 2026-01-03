$source = "d:\DGG 2025\Strony internetowe\standalone\lgm4ceramics\.next\standalone\*"
$destination = "d:\DGG 2025\Strony internetowe\Dgg-piece\dgg-piece\lgm_final_v2.zip"

Write-Host "Compressing $source to $destination"
Compress-Archive -Path $source -DestinationPath $destination -Force
Write-Host "Done!"
