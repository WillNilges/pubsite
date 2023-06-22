#!/bin/bash

set -e

find_and_replace() {
    # Iterate over each file in the directory
    for file in "$directory"/*.md; do
        # Perform the replacement using sed
        sed -i "s/$search_string/$replace_string/g" "$file"
    done
}

# Specify the directory path where the files are located
directory="."

# Specify the search and replace strings
search_string='posts\/images'
replace_string='\/blog'

find_and_replace
