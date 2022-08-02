# How (not) to use the Proxmox 7 VNC API
## 1 August, 2022

~~If you've been following my LinkedIn, you might know that I've been driving myself crazy trying to figure out how VNC over Websockets work, specifically, how to get a VNC shell on a remote VM in Proxmox.~~

Computer Science House uses Proxmox extensively for our infrastructure. To give you an idea of how pervasive it is, most of our stuff is hosted on it, from LDAP and SSO-related services like Keycloak and LDAP, to web infrastructure like our public site, and URL mappings for home directories. For the longest time, we also had OKD, our container orchestration platform, hosted on there as well.

Proxmox has an... __okay__ user interface available for managing your virtual machines, and that's what we, the RTPs, use to manage our core services.

**insert photo of proxmox here**

However, the interface has a few critical flaws that make it less-than-plesant to use for the average CSHer:
1. The interface is pretty complicated. There are a lot of bells and whistles that the average user isn't going to want or need to touch.
2. Proxmox doesn't integrate well with our SSO system. We __could__ script account creation, but it'd be extra work.
3. This is probably the most important thing: We cannot impose resource limits using Proxmox. RAM doesn't grow on trees, so we have to havr some way to prevent people from allocating 69GB of RAM to their Minecraft server.

Enter [Proxstar](https://github.com/computersciencehouse/proxstar). Proxstar is a Virtual Machine configuration and management interface written in Flask. It takes advantage of the [Proxmox API]() and [Proxmoxer](https://github.com/proxmoxer) to provide a clean and simple way for users to access our VM infrastructure, and for RTPs to impose limits to things like CPU, RAM, and storage. You can create VMs, install (RTP approved) ISOs, install an SSH key, and open a noVNC console.

<!--TODO: Open issue to allow people to upload ISOs for approval in Proxstar-->

**insert photo of proxstar here**

That last point is the subject of today's blog post. Let's dive in.

In 2017, Jordan Rodgers created Proxstar to do all of the above things. He used Proxmoxer to interface with the API, [pyOIDC]() to authenticate people, and a CSH library called [CSH-LDAP]() to pull in account details. This all worked great, but there was one really crucial thing missing: console functionality. This was crucial because, sure, you could tell the API to create a VM, set it to have these resources, and even interface with our DNS servers to get a hostname and IP address and all that jazz, but if you couldn't get a console or shell in or anything, what good was that?

So, he did something that I think was hacky as all get-out, but was actually super clever. Proxmox sits atop QEMU, and exposes a lot of QEMU's bells and whistles, such as its VNC server functionality. By configuring this VNC server, you can connect to a port on the Proxmox host itself and gain graphical console access to a VM. In Proxmox 5 and 6, there was an API route you could hit to change the settings of this VNC server exposed by any given VM, on the fly. Jordan took advantage of that by using the API to configure a VNC connection on-demand, then using [Websockify]() to connect to that port and that node, start up a noVNC instance on the client's computer, connect to that Websockify instance, which would then send VNC traffic between the server and the client.

**Insert diagram of Jordan's setup**

This route still exists in Proxmox 7, but due to a [regression]() in QEMU, you can no longer change these settings via this route.


...

I've got demo code [available on GitHub]()
