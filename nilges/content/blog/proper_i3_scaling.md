---
title: "How to properly scale i3 on HiDPI displays"
date: 2019-08-13T00:00:00Z
categories: [ "Blog" ]
draft: false
---

So I nuked my laptop last week and re-installed Arch (no Windows in this
house anymore). I need to post a lot of cool new things I learned, but
here\'s another scaling tip for everyone.

The old way I was doing scaling was a little broken. I had a hodgepodge
of scaling soltuons for each different app. This turned out to be a
nightmare, surprising nobody.

My new way is a simple .Xdefaults file, containting one (1) line:

```
    Xft.dpi: 168
```

That\'s literally it. Now, all of my fonts are back to normal-ish values
(Terminal font is now 12 instead of 30), Thunar no longer is impossible
to see, Firefox scaling works as expected, and I expect that WINE
applications and other apps with suboptimal application scaling (looking
at you, FreeCAD) will be much easier to see.
