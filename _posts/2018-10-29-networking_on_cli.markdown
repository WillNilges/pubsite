---
layout: post
title:  "How to set up networking on an uncooperative CLI"
date:   2018-10-29 01:30:23 -0500
categories: poweruser guide
---
So, if you have something like a ThinkPad X380 Yoga (or like, any of the newer, thiner ThinkPads) that has something like a proprietary Ethernet port **or no network port at all** then here's how you set up networking and get your hardware pinging the internet on a bare Ubuntu (or not) install.

First, you need to add the device to `/etc/network`.

Add the device to your `interfaces` file which might look something like this:
```
  # This file describes the network interfaces available on your system
  # and how to activate them. For more information, see interfaces(5).
  
  source /etc/network/interfaces.d/*
  
  # The loopback network interface
  auto lo
  iface lo inet loopback
```
You will need to find the device name using
`ifconfig -a`
and then add the device to this file:
```
iface *DEVICE NAME* inet dhcp
ifdown *DEVICE NAME*
ifup *DEVICE NAME*
```

and then, assuming the divine forces will actually allow it, you should be able to network!