---
title: "Subnetting and Forgetting"
date: 2020-05-17T00:00:00Z
categories: [ "Blog" ]
draft: false
---

Heyo! I've actually got a backlog of stuff to talk about after this week! Hopefully I'll be able to post it all in a reasonable amount of time. (Spoilers: haha no way).

So, some time ago (I guess in January) one of my friends came into a large amount of networking equipment. Among the items were a bunch of Cisco managed switches and three Cisco 2951 routers. She asked my roommate and I to go through them and wipe them for sale, and in return she'd let us grab a few things. Good deal! We got to work, and, niether of us really knowing jack squat about Cisco IOS, finished wiping everything after like, 10 hours.

Anyway, we both get busy and the semester elapses. The hardware sits in our room for like, 3 months. When I come back from Spring Break, coronavirus has kicked everyone out of dorms, and my friend no longer wants any of the hardware (because, god, it was a LOT) and practically gives it all away. This, of course, means that I was now the proud owner of a router and a switch. Groovy!

So then I move into my house for the summer early (because, why not?) and the rest of the semester passes by. I do nothing with this hardware for some time. It sits on a shelf in my room. But, last week and the week before, I had a bunch of freetime between school ending and my co-op beginning, so I take the opportunity to bust into this router and root around. With the help of one of CSH's alumni, I get it up and running. Here's how I did that:

Basically, my goal was this: We had public IPs in the dorms and so there was no need to subnet or anything, which was groovy! But, now that I lived in a residental house, we were confined to a single public IP and a subnet, which sucks. So I bust out this router, intending to set up a private subnet inside the subnet of our house (a sub-subnet if you will).

I know, I know! It's far from ideal, and I should absolutely just replace the crappy consumer Netgear with my **MEGA BONE-IN TURBO DELUXE ROUTER** and subnet on that. Better yet, use ipv6 and avoid this whole networking mess!

To tell you the truth, I'm lazy, and still scared of this thing, even after digging around inside of it for a week. So, instead, I set up a sub-subnet.

The first thing I messed with were the actual ports. Because, I had no idea what I was doing. I had barely even touched managed switches, and the most I've done with any kind of routing was portforwarding stuff back at my parents' house when I ran my network there. So my router has 3 GigabitEthernet ports. I configured the first one to just hit the Netgear router.

```
willardsworld>enable
willardsworld#config term
willardsworld(config)#interface GigabitEthernet 0/0
willardsworld(config-if)#ip address 192.168.1.200 255.255.255.0
```

When this didn't work, I did some googling and found out that I had to specify a default gateway. Duh.

`willardsworld(config)# ip route 0.0.0.0 0.0.0.0 192.168.1.1`

So I did that, and at that point I was able to hit the internet from the router with ping commands.

`willardsworld>ping 208.80.154.224` (that's Wikipedia's IP address)

```
Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 208.80.154.224, timeout is 2 seconds:
!!!!!
Success rate is 100 percent (5/5), round-trip min/avg/max = 44/47/52 ms
```

bada bing, bada ping.

Okay, so I got this big steel box online. But like, that doesn't get me anything.

Guess I'll configure another interface.

```
willardsworld>enable
willardsworld#config term
willardsworld(config)#interface GigabitEthernet 0/1
willardsworld(config-if)#ip address 10.10.33.1 255.255.255.0
```

Yo, sick. Welcome to Willard's World!

Well, not yet. This interface is kinda useless without NAT. Let's fix that.

```
willardsworld>enable
willardsworld#config term
willardsworld(config)#ip nat pool OVRLD 192.168.1.100 192.168.1.100 prefix-length 24
willardsworld(config)#ip nat inside source list 7 pool OVRLD overload
willardsworld(config)#access-list 7 permit 10.10.33.0 0.0.0.31
willardsworld(config)#interface GigabitEthernet 0/1
willardsworld(config-if)#ip nat enable
willardsworld(config-if)#ip nat inside
willardsworld(config-if)#exit
willardsworld(config)#interface GigabitEthernet 0/0
willardsworld(config-if)#ip nat enable
willardsworld(config-if)#ip nat outside
willardsworld(config-if)#exit
willardsworld(config)#exit
```

NAT is weird, to set this up, I drew a lot of inspiration from [this page](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipaddr_nat/configuration/15-mt/nat-15-mt-book/iadnat-addr-consv.html#GUID-C8837DEA-2736-40A5-9D29-8E1553FD1C03).

I also had to set up a DHCP pool with the 32 addresses I opened up for use:

```
willardsworld>enable
willardsworld#config term
willardsworld(config)#ip dhcp pool WILLARDWORLDNET
willardsworld(config)#network 10.10.33.0 255.255.255.0
willardsworld(config)#dns-server 192.168.1.1 1.0.0.1 8.8.4.4
willardsworld(config)#default-router 10.10.33.1
```

And... that was about it. I think. After doing that, I was able to hit the internet from machines on the subnet. Pretty painless process, looking back, but it took a few hours the first time to figure out. I guess that's why people get certs in this kind of thing.

Also, in between all these steps I did a TON of actual router configuration including initial setup, SSH keys, MOTDs, users, firmware updates, OS updates, and more. I might make another post about router maintanence later.

Anyway, after all that, I had a subnet where my machines could talk to each other and the outside world, but the outside world could not talk to them. Because these are mostly personal servers (file servers, nextcloud, proxmox, compute nodes, etc) this is fine... for now.

So to hit these machines from anywhere, I had to configure an OpenVPN server. To do this, I followed [DigitalOcean's guide](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-openvpn-server-on-ubuntu-18-04), which is WAYY better than any guide I could come up with.

And that's my network topology at this moment. I got a few machines hooked up to this VPN, which can use it to access a large quantity of compute power that's sitting in my basement. I use the build servers for projects such as my OLPC adventures and for compiling Rust, I use proxmox for... any old thing, I guess, and nextcloud is hopefully pretty self explainatory. Until next time, I guess.
