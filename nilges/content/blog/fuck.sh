
for file in ./*.md; do
    title=$(sed '7q;d' "$file")
    date=$(sed '9q;d' "$file")
    formatted_date=$(echo "$date" | awk '{print $2}' | sed 's/,$//' | tr '[:upper:]' '[:lower:]')
    iso_date=$(date -d "$formatted_date" +"%Y-%m-%dT00:00:00Z")
    echo $title $iso_date
done
