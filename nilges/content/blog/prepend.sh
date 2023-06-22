#!/bin/bash

# Specify the directory path where the Markdown files are located
#directory="/path/to/markdown/files"
directory="."

# Specify the text to be prepended
prepend_text="---
title: \"\"
date: 2023-06-20T04:12:30Z
categories: [ \"Blog\" ]
draft: false
---"

# Iterate over each Markdown file in the directory
for file in "$directory"/*.md; do
    # Prepend the text to the file
    echo -e "$prepend_text\n$(cat "$file")" > "$file"
done

