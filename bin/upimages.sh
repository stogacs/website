#!/bin/bash
file="src/data/images.ts"
echo "const images = [];" > "$file"
find "src/data/images" -type f \
  | sort \
  | sed 's/src\/data\/images\/\(..\).jpg/import image\1 from "@data\/images\/\1.jpg";\nimages.push(image\1);/' \
  >> "$file"
echo "const list = images;" >> "$file"
echo "export default list;" >> "$file"
