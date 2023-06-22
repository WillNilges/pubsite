---
title: "Configuring the Serial Port for Normal Users"
date: 2023-01-16T00:00:00Z
categories: [ "Blog" ]
draft: false
---

![Quake running natively on the Pinephone on Postmarket OS](/blog/minicom_works.jpg)

### Introduction

Howdy, happy new year, and stuff.

I've been toying with my home network again, doing things like setting up IPv6, VLANS, and improving Wi-Fi performance (post about that coming soon™), and while doing this, I needed to access the serial console on a few different Cisco appliances. I run Arch Linux on my laptop, and use a program called [Minicom](https://man.archlinux.org/man/community/minicom/minicom.1.en) for all my serial terminal needs.

However, as some people may know, Linux doesn't like to let normal unprivileged users access `/dev/tty*` devices out of the box, especially not less user-friendly distros like Arch Linux. 

```
minicom -D /dev/ttyUSB0
minicom: cannot open /dev/ttyUSB0: Permission denied
```

I'm _very_ ignorant as to why this is, but usually, the way I'd go about allowing this sort of functionality on something like Ubuntu (and the internet would agree with me on this) would be a `usermod` command like this one.

```
sudo usermod -aG dialout wilnil
```

But uh, that didn't work. In fact, the group didn't even exist, so I added it and tried again. But upon logging back in for the second time, no dice.

So I googled around, and found that there's also a `tty` group, so I added myself to that one as well.

```
sudo usermod -aG tty wilnil
```

Nada.

### Solution

I'll cut to the chase: For some reason, these two groups (which seem to be the most common groups missing and a lot of people like to point to as the solution) don't work on Arch Linux. According to [this forum post](https://bbs.archlinux.org/viewtopic.php?pid=1576738#p1576738), **The group I had to add that actually ended up working was this one:** `uucp`.

```
sudo usermod -aG uucp wilnil
```

After logging out/in:

```
minicom -D /dev/ttyUSB0
```

We're in business. Network can be configured... just as soon as I remember to turn off the DNS lookup "feature" that IOS has.

### UUCP

Apparently, the `uucp` group is an old Unix-ism from Bell Labs. It stands for [Unix-to-Unix Copy](https://en.wikipedia.org/wiki/UUCP), which was a suite of programs for transferring files between computers way back when. To be clear, I have no idea why this worked for me, and your mileage may vary. Had I the wherewithal, I would test this more thoroughly to figure it out, but I am lazy. If I had to guess, minicom probably uses some kind of protocol that still obeys the group. I'm not sure why the other groups didn't work here, though.

It's probably fine. ¯\\\_(ツ)_/¯
