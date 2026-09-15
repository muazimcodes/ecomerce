# Create the images folder
$imagesFolder = "F:\new-website\images"
if (!(Test-Path $imagesFolder)) {
    New-Item -ItemType Directory -Path $imagesFolder
    Write-Host "Created folder: $imagesFolder"
}

# Define image URLs and local paths
$images = @(
    @{Url = "https://loremflickr.com/1600/900/fashion,model?lock=101"; LocalPath = "$imagesFolder\hero.jpg"},
    @{Url = "https://loremflickr.com/900/1200/hoodie,fashion?lock=102"; LocalPath = "$imagesFolder\hoodie.jpg"},
    @{Url = "https://loremflickr.com/900/1200/jacket,fashion?lock=103"; LocalPath = "$imagesFolder\jacket.jpg"},
    @{Url = "https://loremflickr.com/900/1200/sneakers,fashion?lock=104"; LocalPath = "$imagesFolder\sneakers.jpg"},
    @{Url = "https://loremflickr.com/900/1200/tshirt,fashion?lock=105"; LocalPath = "$imagesFolder\tshirt.jpg"},
    @{Url = "https://loremflickr.com/900/1200/jeans,fashion?lock=106"; LocalPath = "$imagesFolder\jeans.jpg"},
    @{Url = "https://loremflickr.com/900/1200/cap,fashion?lock=107"; LocalPath = "$imagesFolder\cap.jpg"},
    @{Url = "https://loremflickr.com/900/1200/sweater,fashion?lock=108"; LocalPath = "$imagesFolder\sweater.jpg"},
    @{Url = "https://loremflickr.com/900/1200/shorts,fashion?lock=109"; LocalPath = "$imagesFolder\shorts.jpg"},
    @{Url = "https://loremflickr.com/900/1200/mens,fashion?lock=110"; LocalPath = "$imagesFolder\men.jpg"},
    @{Url = "https://loremflickr.com/900/1200/womens,fashion?lock=111"; LocalPath = "$imagesFolder\women.jpg"},
    @{Url = "https://loremflickr.com/900/1200/fashion,accessories?lock=112"; LocalPath = "$imagesFolder\accessories.jpg"}
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
