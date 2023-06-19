FROM archlinux

RUN pacman -Sy; pacman -S --noconfirm hugo

# $ podman run --rm -it --name pubsite -p 8080:8080 -v ./:/workdir:Z archlinux
