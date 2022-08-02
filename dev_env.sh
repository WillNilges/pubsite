#!/bin/bash
podman run -dit --name pubsite -p 8080:80 -v "$PWD":/usr/local/apache2/htdocs/ httpd
