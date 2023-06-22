FROM archlinux

RUN pacman -Sy; pacman -S --noconfirm hugo tmux

WORKDIR /workdir/nilges
ENTRYPOINT hugo server --bind 0.0.0.0 --baseURL=http://localhost --port=8080
