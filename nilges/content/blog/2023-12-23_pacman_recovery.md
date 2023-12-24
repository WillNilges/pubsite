---
title: "How to Re-Install Arch (kinda)"
date: 2023-12-23T00:00:00Z
categories: [ "Blog" ]
draft: false
---

Happy Holidays and all that. I haven't posted in a while because I've been busy moving to a new city and having a job and all that.

This is a quick PSA (mostly for myself) that if your system ever crashes in the middle of a Pacman update and refuses to update again (like mine sometimes likes to do), you can use this command to force it to re-install _everything_ and avoid bricking your laptop when you reboot.

```
sudo pacman -Qqn | sudo pacman -S -
```

Cheers
