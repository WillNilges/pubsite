
for file in ./*.md; do
    echo $file
    title=$(sed '1q;d' "$file")
    date=$(sed '3q;d' "$file" | cut -d' ' -f2-)
    iso_date=$(date -d "${date/,/}" "+%Y-%m-%dT00:00:00Z")

    echo $title
    echo $iso_date
    echo
    
    replace_pattern='---\ntitle: "$1"\ndate: $2\ncategories: [ "Blog" ]\ndraft: false\n---'

done
