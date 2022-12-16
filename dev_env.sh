#!/bin/bash

serve_port=$1

if [[ -z "$serve_port" ]]; then
    serve_port=8080;
fi

podman run --rm -dit --name pubsite -p "$serve_port":80 -v "$PWD":/usr/local/apache2/htdocs/:Z httpd
