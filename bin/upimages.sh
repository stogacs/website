#!/bin/bash
file="src/data/images.ts"
echo "const images = [];" > "$file"
find "src/data/load/pictures" -type f \
  | sort \
  | sed 's/src\/data\/load\/pictures\/\(..\).jpg/import image\1 from "@data\/load\/pictures\/\1.jpg";\nimages.push(image\1);/' \
  >> "$file"
echo "const list = images;" >> "$file"
echo "export default list;" >> "$file"
