---
title: "Troubleshooting Youtube Playback with Pipewire"
date: 2024-08-03T00:00:00Z
categories: [ "Blog" ]
draft: false
---

Hello again,

This is just another short blog post about a small issue I've had a few times in
the last year: On Arch Linux, Youtube won't play at all. I have to reboot to make
it work again.

I did like, the _minimum_ amount of googling about it and found some Reddit threads
about it:

- https://www.reddit.com/r/archlinux/comments/unfa71/youtube_videos_wont_load_when_using_any_browser/

Unfortunately, all the other information I found (including the above link) is 2+
years old, and a lot has changed about my setup since then. They suggest installing
`pipewire-pulse` and restarting, but I have `pipewire-pulse` and still have issues.

Next time this happens, I should probably check the logs for `pipewire-pulse.service`
and `pipewire.service` to get more information. I bet restarting those would be a good
workaround.
