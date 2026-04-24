#!/usr/bin/env fish

# Downloads 3 material swatch images from Unsplash and uploads to S3 via s3upload.
# Output keys match the CloudFront paths used in MaterialSwatches component.
#
# Usage: fish scripts/upload_material_swatches.fish

set -l bucket olympus-bali-bucket
set -l tmpdir (mktemp -d)

set -l materials \
    "travertine https://images.unsplash.com/photo-1708251089806-6907bdcc7bee?auto=format&q=90&w=400&fit=crop" \
    "teak       https://images.unsplash.com/photo-1751288301679-b6121e123dd1?auto=format&q=90&w=400&fit=crop" \
    "concrete   https://images.unsplash.com/photo-1515895309288-a3815ab7cf81?auto=format&q=90&w=400&fit=crop"

for entry in $materials
    set -l name (string split -n " " $entry)[1]
    set -l url  (string split -n " " $entry)[2]
    set -l dest "$tmpdir/material_$name.jpg"

    echo "Downloading $name..."
    curl -sL $url -o $dest

    echo "Uploading material_$name.webp to s3://$bucket ..."
    s3upload $dest -b $bucket -f webp -q 100
end

rm -rf $tmpdir
echo "Done. All 3 swatches uploaded."
