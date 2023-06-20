podman run --rm -it --name pubsite -p 8080:8080 -v ./:/workdir:Z nilges-hugo

#  hugo server --bind 0.0.0.0 --baseURL=http://localhost --port=8080
