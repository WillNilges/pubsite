---
title: "Octo Dash Curses"
date: 2020-01-01T00:00:00Z
categories: [ "Project" ]
draft: false
---

I'm fairly new to the world of 3D Printing (Only had my printer since August), but I'm loving it so far. I've got an Ender 3 Pro hooked up to an OctoPrint server, and that's how I've been managing my printer this whole time.

One feature that I wish it had was a dashboard page you could go to in a browser and check the status of your print, like a Graphana or Datadog dashboard for servers. I also noticed that print progress doesn't display on your printer when you have an OctoPrint server connected.

![image](https://preview.redd.it/whjm31bugcc61.png?width=688&format=png&auto=webp&s=c350056359ef808fb897d1f7ed294c2096957496)

Octo Dash Curses is a lightweight, rugged, and dead-simple way to monitor your 3D Printer, right from your OctoPrint server! The idea is that, because it is implemented using ncurses, it does not require a display server. This makes ODC ideal for using a dashboard display connected directly to your OctoPrint server and reducing the number of things you need to install/run on it.

That _also_ means that it's perfect for monitoring your server over telnet (or, preferrably, SSH). You can use ODC as a quick and easy way to get the status of your print from your laptop using a script, or you can view the status directly from your print server's console.

The project uses the OctoPrint API, so all you need is the binary, a config file, and an API key. It's super simple to set up!

You can find the latest release on GitHub (https://github.com/WillNilges/octo-dash-curses/)

![image](https://user-images.githubusercontent.com/42927786/106819172-6b123a80-6647-11eb-8e4a-3ed618a47daa.png)
