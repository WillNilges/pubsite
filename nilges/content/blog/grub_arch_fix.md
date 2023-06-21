---
title: "Installing GRUB on Arch"
date: 2019-03-13T00:00:00Z
categories: [ "Blog" ]
draft: false
---

Ok so I\'m making this post out of annoyance. I might even edit the wiki
to include this because this was really weird with an NVMe drive. Or
maybe I\'m just a simpleton.\
When you install Arch Linux, you should mount your EFI partition (in my
case /dev/sda2) to /mnt/boot/efi.\
The steps go (and for reference my root partition is /dev/sda6)\

::: codeBlock
    mount /dev/sda7 /mnt
    mount /dev/sda2 /mnt/boot/
    arch-chroot /mnt
    grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=Arch
    grub-mkconfig -o /boot/grub/grub.cfg
:::

and then it should work.
