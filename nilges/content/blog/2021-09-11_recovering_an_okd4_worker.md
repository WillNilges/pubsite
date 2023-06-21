---
title: "Recovering an OKD 4 Worker"
date: 2021-09-11T00:00:00Z
categories: [ "Blog" ]
draft: false
---

### Introduction

This Tuesday, something _really_ bad happened on floor at Computer Science House. For a brief moment, our entire network infrastructure... flickered. We aren't quite sure why it happened, or even what _exactly_ happened, but the effect was that, for just long enough, seven of our Proxmox 6.3 nodes (that's about half of our virtualized infrastructure) lost their network connection, causing them to fence, and start dumping virtual machines.

Lots of stuff crashed. We lost a chunk of our IPA install, we lost our main webserver, we lost an untold number of user VMs that may or may not have been restarted yet, and with all of that compute infrastructure, most of our house services went down: Gitlab, conditional, STARRS (our DNS frontend), and I don't even remember how many others. The cherry on top was when Datadog started logging downtime. Damb.

![red bar moment](posts/images/datadog_downtime.png)

So that day, I worked for 10 hours, then checked my phone when I got home, got _back in_ the car, and drove to floor to start putting out fires. We were there for 7 hours.

 All told, it wasn't actually _that_ bad. Our systems were pretty resilient and HA was configed (more on that later). After that night, we had managed to bring IPA back up (sans Radius, need to fix that still), and just yesterday, we fixed Gitlab. So, stuff is now on the upswing ~(except for our UPS, that's catching on fire right now but it's fine I'll blog about it later)~

One thing, one _little_ thing that I forgot to mention, the reason I am writing this article: One of our OKD 4 workers went down. In hindsight, it's a miracle we didn't lose more. I'm writing this article to _finally_ document some of the common pitfalls that people (people being myself) experience when trying to bring this back up.

### The issue

So, okd4-worker03-nrh.csh.rit.edu went down. It stayed down. In the past when this has happened, I've had limited success bringing workers back up. Sometimes, you'll boot them up, and they'll just immediately start trying to boot to the CoreOS installer, or they won't boot at all, or they'll boot loop, and here's why:

# We're running our cluster on Proxmox.
## (ughhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh)

So two things are usually wrong when a node won't come back up:
**1:** The "Boot Order" option in the "Options" tab is misconfigured. It may, for some reason, have decided to set the install disk as the primary boot option, or it may have disabled the hard drive option. Either way, you need to make sure that the hard drive is the primary boot option.

![This field is the bane of my existance](posts/images/boot_order.png)

**2:** HA has gotten _very_ confused. I find that the best way to ensure success when bringing an OKD 4 worker back up is to set HA to 'ignored.' In this particular case, it was set to 'stopped' for some odd reason. That caused this weird issue where, no matter what setting I changed, and no matter how I went about turning the node off and on again, the damn thing just _wouldn't_ boot correctly. Either it would boot to the installer, or it would boot loop, or it would just _ignore_ me. At one point, I pressed 'Stop' three times (and all three times Proxmox logged the Status as OK on those commands) in order to get it to actually stop. Once, I removed literally every storage medium and it still insisted on booting to the installer somehow. **So, TL;DR: SET HA TO 'IGNORED' BEFORE MESSING WITH IT**

![So is this one](posts/images/haaaaa.png)

### So the VM is behaving properly, now what?

Well, in a panic that night, and either forgetting about or not yet discovering any of the above information, I made the mistake of deciding to just delete the node from the cluster and re-ignite it. **It is important to note that this is almost never necessary. Workers don't give a crap. They just work.**

So I did a dumb thing: `oc delete node okd4-worker03-nrh`. I then proceeded to attempt to re-ignite the node. This proved problematic, though, because, for context, we've been having issues with the `oc` console on our services VM. So, that very same Tuesday night, the console had broken again, giving us various "unauthorized" and "cert signed by unknown authority" errors. Very annoying. I'll be blogging about how we fixed that later (and I'll have to do a deep dive into that issue at some point because our solution is more of a workaround and less of a fix). To fix the console, basically, we re-create the Kubeconfig. As you might imagine, this changes certificates, which are an integral part of the ignition process. This means that our current ignition setup simply... doesn't work. According to most RedHat documentation I can find, you're supposed to hold onto your ignition files. The problem with this is, as I mentioned, our certs got all munged by our console malarkey.

So I go to look for resources that may help me figure out how to create _new_ ignition configs. There is, of course, the option of using `openshift-install` to regenerate the whole thing using an install manifest. This, naturally, didn't work.

There's three main parts of this whole setup that could be wrong:

- The version of Fedora CoreOS
- The version of `openshift-install`
- The Certificate Authority we're passing to the installer

Last time I did this, I used a pretty old version; Maybe I had to futz with the Certificate Authority a bit, but it worked. This time, though, no such luck. When I started mixing and matching from this category, I would get:

- "Certificate signed by unknown authority" errors on the worker ignition console
- An actual ignition that spun forever and never gave me a `csr`
- A bizarre error: `Failed to set up standard input: Inappropriate ioctl for device`

By futz with the Certificate Authority, I mean follow Method #2 on [this blog post.](https://www.linkedin.com/pulse/how-add-new-worker-node-existing-openshift-4-cluster-ibm-miranda/) It worked once before, I think...

So this went on and on for the next few days until last night, when I had the realization that we take _really_ good backups, and maybe, just maybe, if I restored the VM to a copy from Monday night, fixed all the HA nonsense and boot order malarkey, it would request to re-join the cluster on its own.

![CSRs! FINALLY!](posts/images/csr.png)

And that's exactly what happened.

You see, workers don't really store any critical cluster information. Only what they need to join the cluster themself. So, you can do whatever you want to them, and they'll come back (to a reasonable extent, of course). 

So, if this ever happens to you, don't panic. Check your infrastructure first, and only use reignition as a _last resort._

(And take some friggin' backups)

(Now it's time for me to figure out why I can't ignite new workers. God, I need to do some OKD housekeeping. Our services homedir looks like it was hit by a tornado)
