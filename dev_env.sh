#!/bin/bash

if [[ ! -z $1 ]]; then
	entrypoint="--entrypoint=$1"
fi

podman run --rm -it --name pubsite -p 8080:8080 -v ./:/workdir:Z $entrypoint nilges-hugo

#  hugo server --bind 0.0.0.0 --baseURL=http://localhost --port=8080
