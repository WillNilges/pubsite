How to install Bumblebee on Arch

### 29 October, 2018

------------------------------------------------------------------------

Do this after installing Xorg but before installing a DE. The next time
I install Arch I\'ll actually blog about it properly but this is
something that might be useful real quick. Also, if you\'re trying to
install Bumblebee on any other flavor,\
\
*don\'t.*

::: codeBlock
        sudo pacman -S bumblebee mesa xf86-video-intel lib32-virtualgl lib32-nvidia-utils
        sudo gpasswd -a $USER bumblebee
        sudo systemctl enable bumblebee
:::
