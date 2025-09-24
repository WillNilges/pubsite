---
title: "Suspend-then-hibernate on Arch Linux and KDE"
date: 2025-09-23T00:00:00Z
categories: [ "Blog" ]
draft: true
---

# Background

Sleepdrain sucks. It's been a constant pain since I started using Linux away from
an outlet. I'd have a busy day at college, or work, or go on a trip, and
my laptop would be left forgotten in my bag, killing itself in under a week.

The root cause of this is yet unknown, but I imagine it's somewhere deep in the
Linux kernel, which is famously not optimized for laptops.

Regardless, one workaround is hibernation, which saves your RAM state to disk,
allowing you to pick up right where you left off. Systemd takes this to its next
logical step by allowing you to hibernate your system after a condition is met
by way of `suspend-then-hibernate.service`.

It took me a while to figure out how to get this working, but I thought I would
share my setup in case it helps anyone.

# Guide

I use Arch Linux and KDE, and this is what worked for me on a Framework 13 7040
Series.

First, get hibernation working. This should actually be pretty straightforward
these days. You'll need to configure a swap file large enough to compress your
RAM into.

https://wiki.archlinux.org/title/Swap

Specifically, I use BTRFS, so these steps worked for me.

`cd /`

https://wiki.archlinux.org/title/Btrfs#Swap_file


