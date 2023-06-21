#!/bin/bash
set -e

for file in ./*.md; do
    echo $file
    title=$(sed '1q;d' "$file")
    date=$(sed '3q;d' "$file" | cut -d' ' -f2-)
    iso_date=$(date -d "${date/,/}" "+%Y-%m-%dT00:00:00Z")

    echo $title
    echo $iso_date
    echo
    
    tail -n +6 $file > "temp.md"
    printf -- '---\ntitle: "%s"\ndate: %s\ncategories: [ \"Blog\" ]\ndraft: false\n---\n' "$title" "$iso_date" | cat - "temp.md" > $file 
    rm "temp.md"
done
