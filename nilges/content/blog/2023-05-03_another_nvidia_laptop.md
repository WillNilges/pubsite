---
title: "I Bought Another Nvidia Laptop"
date: 2023-05-03T00:00:00Z
categories: [ "Blog" ]
draft: false
---

If you scroll back in this blog, you'll find quite a few posts about my terrible experience getting my Dell XPS 15 9560 to work properly on Linux. The Nvidia GPU was the primary cause of my grief, because as far as I could tell at the time, Nvidia simply did not care about that market. Sometime in 2019, I gave up, and bought a ThinkPad X1 Yoga.

Well, now I've somehow managed to get interested in GPUs again. Over the last year, I have explored CUDA, DX11, and a variety of open source VR projects through my classwork, and those fascinating topics have convinced me to buy a ThinkPad T15g, with an Nvidia RTX 2070 Super. I wanted to have a mobile workstation again in order to more effectively work on these things on the go. I have a desktop with an RTX 3070, and access to CSH's GPU compute machine sporting an older Tesla K80 and Tesla M10, but this guy completes my, as a friend might say, "Immersion into the Nvidia ecosystem."

Anyway, it's been five years since I owned that XPS, and the question to ask is: Has the mobile Nvidia Experience improved any? So far, it seems like the answer is "yes, somewhat". There are new projects out there like [EnvyControl](https://github.com/bayasdev/envycontrol) which advertise an "an easy way to switch between GPU modes on Nvidia Optimus systems", the CUDA toolkit download page has more than an N+1-year-old distribution of Ubuntu officially supported, and my battery estimates have been as high as 6 hours. Not bad.

I'm running Fedora 38 with GNOME 44, installed the CUDA dkms package through RPMFusion, and installed EnvyControl, then ran `sudo envycontrol -s hybrid --rtd3 2`, and... my system is stable? So it seems... I can run containerized GPU workloads thanks to a workaround involving the centos8 repos and the Nvidia Container Toolkit, and I can game. So all is well for now.

I think the major difference this time around is A: I have a ThinkPad, and Lenovo actually knows a thing or two about designing a laptop (unlike Dell) and B: The 2070 is a Turing Architecture card, which supports RTD3, a fancy power control solution that can disable chunks of your GPU when not in use to save power (and heat!)

I will probably update this post if anything changes, but for now, here's an abridged guide to getting the Nvidia Container Toolkit to run on Fedora 38:

```
curl -s -L https://nvidia.github.io/libnvidia-container/centos8/libnvidia-container.repo | sudo tee /etc/yum.repos.d/nvidia-container-toolkit.repo
sudo dnf update
sudo dnf install nvidia-container-toolkit
nvidia-ctk --version # To make sure it's installed
sudo sed -i 's/^#no-cgroups = false/no-cgroups = true/;' /etc/nvidia-container-runtime/config.toml # To allow rootless GPU containers (I could see this breaking some containers, but it's in the documentation)
podman run --rm --security-opt=label=disable      --hooks-dir=/usr/share/containers/oci/hooks.d/      nvidia/cuda:11.6.2-base-ubuntu20.04 nvidia-smi # To see if it's actually working
```

For more information, check the [documentation](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#installation-guide)
