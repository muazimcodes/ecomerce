# Create the images folder
$imagesFolder = "F:\new-website\images"
if (!(Test-Path $imagesFolder)) {
    New-Item -ItemType Directory -Path $imagesFolder
    Write-Host "Created folder: $imagesFolder"
}

# Define image URLs and local paths
$images = @(
    @{Url = "https://images.unsplash.com/photo-1521572163474-6c03d3937509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"; LocalPath = "$imagesFolder\hero.jpg"},
    @{Url = "https://images.unsplash.com/photo-1521572163474-6c03d3937509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"; LocalPath = "$imagesFolder\hoodie.jpg"},
    @{Url = "https://images.unsplash.com/photo-1543002588-bfa74002ed7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"; LocalPath = "$imagesFolder\jacket.jpg"},
    @{Url = "https://images.unsplash.com/photo-1591047139853-5870f3d5d1a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"; LocalPath = "$imagesFolder\sneakers.jpg"},
    @{Url = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"; LocalPath = "$imagesFolder\tshirt.jpg"},
    @{Url = "https://images.unsplash.com/photo-1525507119028-75740b2b0f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"; LocalPath = "$imagesFolder\jeans.jpg"},
    @{Url = "https://images.unsplash.com/photo-1525507119028-75740b2b0f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"; LocalPath = "$imagesFolder\cap.jpg"},
    @{Url = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"; LocalPath = "$imagesFolder\sweater.jpg"},
    @{Url = "https://images.unsplash.com/photo-1521572163474-6c03d3937509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"; LocalPath = "$imagesFolder\shorts.jpg"},
    @{Url = "https://images.unsplash.com/photo-1521572163474-6c03d3937509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"; LocalPath = "$imagesFolder\men.jpg"},
    @{Url = "https://images.unsplash.com/photo-1521572163474-6c03d3937509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"; LocalPath = "$imagesFolder\women.jpg"},
    @{Url = "https://images.unsplash.com/photo-1521572163474-6c03d3937509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"; LocalPath = "$imagesFolder\accessories.jpg"}
)

# Download images
foreach ($image in $images) {
    try {
        Write-Host "Downloading $($image.LocalPath)..."
        Invoke-WebRequest -Uri $image.Url -OutFile $image.LocalPath -UseBasicParsing
        $fileInfo = Get-Item $image.LocalPath
        if ($fileInfo.Length -gt 10240) {
            Write-Host "SUCCESS - $($image.LocalPath) - Size: $($fileInfo.Length) bytes"
        } else {
            Write-Host "FAILED - $($image.LocalPath) - Size: $($fileInfo.Length) bytes (less than 10KB)"
        }
    } catch {
        Write-Host "FAILED - $($image.LocalPath) - Error: $($_.Exception.Message)"
    }
}

# Update index.html to use local .jpg files
$indexPath = "F:\new-website\index.html"
$indexContent = Get-Content $indexPath -Raw

# Replace all SVG references with JPG references
$indexContent = $indexContent -replace 'images/hoodie\.svg', 'images/hoodie.jpg'
$indexContent = $indexContent -replace 'images/men\.svg', 'images/men.jpg'
$indexContent = $indexContent -replace 'images/women\.svg', 'images/women.jpg'
$indexContent = $indexContent -replace 'images/accessories\.svg', 'images/accessories.jpg'
$indexContent = $indexContent -replace 'images/hero\.svg', 'images/hero.jpg'
$indexContent = $indexContent -replace 'images/jacket\.svg', 'images/jacket.jpg'
$indexContent = $indexContent -replace 'images/sneakers\.svg', 'images/sneakers.jpg'
$indexContent = $indexContent -replace 'images/tshirt\.svg', 'images/tshirt.jpg'
$indexContent = $indexContent -replace 'images/jeans\.svg', 'images/jeans.jpg'
$indexContent = $indexContent -replace 'images/cap\.svg', 'images/cap.jpg'
$indexContent = $indexContent -replace 'images/sweater\.svg', 'images/sweater.jpg'
$indexContent = $indexContent -replace 'images/shorts\.svg', 'images/shorts.jpg'

# Remove all Unsplash URLs and external image references
$indexContent = $indexContent -replace 'https://images\.unsplash\.com/.*?\.jpg', 'images/hero.jpg'
$indexContent = $indexContent -replace 'https://images\.unsplash\.com/.*?\.jpeg', 'images/hero.jpg'
$indexContent = $indexContent -replace 'https://images\.unsplash\.com/.*?\.png', 'images/hero.jpg'

# Remove placeholder SVGs
$indexContent = $indexContent -replace 'data:image/svg+xml;utf8.*?svg', 'images/hero.jpg'

# Write updated content back to index.html
Set-Content $indexPath $indexContent

# Update style.css to use local .jpg files
$stylePath = "F:\new-website\style.css"
$styleContent = Get-Content $stylePath -Raw

# Replace all SVG references with JPG references in style.css
$styleContent = $styleContent -replace 'images/hoodie\.svg', 'images/hoodie.jpg'
$styleContent = $styleContent -replace 'images/men\.svg', 'images/men.jpg'
$styleContent = $styleContent -replace 'images/women\.svg', 'images/women.jpg'
$styleContent = $styleContent -replace 'images/accessories\.svg', 'images/accessories.jpg'
$styleContent = $styleContent -replace 'images/hero\.svg', 'images/hero.jpg'
$styleContent = $styleContent -replace 'images/jacket\.svg', 'images/jacket.jpg'
$styleContent = $styleContent -replace 'images/sneakers\.svg', 'images/sneakers.jpg'
$styleContent = $styleContent -replace 'images/tshirt\.svg', 'images/tshirt.jpg'
$styleContent = $styleContent -replace 'images/jeans\.svg', 'images/jeans.jpg'
$styleContent = $styleContent -replace 'images/cap\.svg', 'images/cap.jpg'
$styleContent = $styleContent -replace 'images/sweater\.svg', 'images/sweater.jpg'
$styleContent = $styleContent -replace 'images/shorts\.svg', 'images/shorts.jpg'

# Remove placeholder SVGs from style.css
$styleContent = $styleContent -replace 'data:image/svg+xml;utf8.*?svg', 'images/hero.jpg'

# Write updated content back to style.css
Set-Content $stylePath $styleContent

Write-Host "Image download and file update complete!"
