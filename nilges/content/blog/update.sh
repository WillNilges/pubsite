
for file in ./*.md; do
    echo $file
    title=$(sed '1q;d' "$file")
    date=$(sed '3q;d' "$file" | cut -d' ' -f2-)
    iso_date=$(date -d "${date/,/}" "+%Y-%m-%dT00:00:00Z")

    echo $title
    echo $iso_date
    echo
    
    printf -- '---\ntitle: "%s"\ndate: %s\ncategories: [ \"Blog\" ]\ndraft: false\n---' $title $iso_date
    echo
    echo "$prepend_string" | cat - "$file" > "$temp_file"
    exit 1

done
