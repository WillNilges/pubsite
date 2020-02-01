---
layout: post
title:  "A neat HiDPI scaling hack"
date:   2019-07-12 11:33:00 -0500
categories: poweruser guide
---
Here's a cool way to fix scaling and bad theme settings on GTK applications like libreoffice. I figured this out on my XPS 9560 and now I can use it again :P. Not sure if this can be done for every program, but for GTK stuff it can, I guess. (BTW I'm running i3)

Just shove this snippet into your .desktop file after the `Exec=` (probably located somewhere around /usr/share/applications/), depending on how you installed it. This'll change to a light theme (since they actually work) and increase your scaling. Scaling level 2 is a little big, but on a 4K display, I say too big is better than too small.

`env GTK_THEME=<any light theme in your .themes directory> GDK_SCALE=2`