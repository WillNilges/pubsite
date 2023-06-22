---
title: "Updating Jet to Rocky Linux 9: A Tromp Through Version Conflicts and Dependency Hell"
date: 2023-05-24T00:00:00Z
categories: [ "Blog" ]
draft: false
---

## Background

At CSH, we provide a large amount of raw computing resources for our members, one of the more tumultuous resources being access to datacenter-grade GPUs. Jet, our GPU compute machine, has two GPUS: an Nvidia Tesla K80, and an Nvidia Tesla M10. Both of these are older GPUs, the former being nearly 10 years old. As such, newer Nvidia Datacenter drivers don’t support this GPU, so last year, when we built the machine, we installed Rocky Linux 8, intending that to be a RHEL-compatible LTS distro that would officially support the older driver, and allow us to maintain the same system configuration for the next couple of years until we can generate the interest and funds to update to newer hardware.

Unfortunately, Rocky Linux 8 does not have new enough versions of certain Podman dependencies such as `shadow-utils` to allow our network account UID mapping to work properly, making it impossible for users to containerize their GPU workloads.


## Rocky 8 vs Rocky 9

The best way we figured to fix this would be to upgrade to Rocky Linux 9, and try to get the `.run`-packaged Nvidia driver to work, instead of the DNF-packaged CUDA toolkit we used on Rocky 8. The reason we couldn't turn to the DNF package was due to the lack of Python 3.6, which, for some insane reason, is a dependency of some arcane, bespoke nvidia-dnf plugin.

To accomplish this, a _very_ unofficial upgrade guide was followed. There are a number of them floating around on the internet, and unfortunately the one we used has been lost to time and the bowels of my search history, but there is [quite a long thread](https://forums.rockylinux.org/t/rocky-linux-8-upgrade-to-rocky-linux-9/6629) on the Rocky Linux forums about this issue that may prove useful for debugging.

Several issues we ran into:

* The database implementation for DNF changed between Rocky 8 and 9, so we had to re-build our DNF database, which was a whole endeavor (again, lost to space and time). For a minute there after updating, we simply could not use DNF. The issue was related to left-over Rocky 8 GPG keys, so if you have issues with DNF after updating and rebooting, look at your GPG keyring.
    * This command might help: `rpm -q gpg-pubkey --qf '%{NAME}-%{VERSION}-%{RELEASE}\t%{SUMMARY}\n'`
* Due to some extremely cursed package shenanigans, some of our config files for services like Ceph were deleted, which had to be rectified manually.
    * Similarly, we had to manually update the repos that services like Puppet pulled from.


## The Nvidia Driver(s)

First, we needed to install the latest 470 driver we could, which was done by going to the Nvidia Driver Downloads page: [https://www.nvidia.com/Download/index.aspx?lang=en-us](https://www.nvidia.com/Download/index.aspx?lang=en-us)

This was the one we installed.

[https://us.download.nvidia.com/tesla/470.182.03/NVIDIA-Linux-x86_64-470.182.03.run](https://us.download.nvidia.com/tesla/470.182.03/NVIDIA-Linux-x86_64-470.182.03.run)

The reason this was necessary is because we’re running Kernel 5.14, which seems to be unsupported by the 470.182.01 driver supplied by the toolkit. If you look at the install logs for the included `.run` file (which you can get by unpacking the CUDA toolkit installer), you’ll see compiler errors for missing function headers, which, presumably, was alleviated in the 03 hotfix. Thanks novideo.

Then, we needed to download the Cuda Toolkit 11.4 Update 4, and install everything except the driver, which we installed earlier: [https://developer.nvidia.com/cuda-11-4-4-download-archive?target_os=Linux&target_arch=x86_64&Distribution=RHEL&target_version=8&target_type=runfile_local](https://developer.nvidia.com/cuda-11-4-4-download-archive?target_os=Linux&target_arch=x86_64&Distribution=RHEL&target_version=8&target_type=runfile_local)


```
wget https://developer.download.nvidia.com/compute/cuda/11.4.4/local_installers/cuda_11.4.4_470.82.01_linux.run
```

Finally, we installed the Nvidia Container Toolkit following the Podman Instructions for RHEL 8. We had to spoof the repo URL to get it to download. Certified Novideo moment.

[https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#id9](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#id9)

[https://nvidia.github.io/libnvidia-container/centos8/libnvidia-container.repo](https://nvidia.github.io/libnvidia-container/centos8/libnvidia-container.repo)

I'm hoping this guide can help out others who are struggling with running older Nvidia hardware on newer versions of Linux. This is far from a comprehensive guide, but it's what worked for us. I don't mean to state the obvious, but it's appalling the disregard that Nvidia shows for those of us who don't have the means to fork over thousands of dollars for a new GPU every couple of years. They could very easily make simple, no-nonsense drivers that work seamlessly with their older hardware, but they instead force us to do these absurd dances, because they don't care. 

You can get modern Linux running on just about any computer from the last 20 years. Intel still ships drivers for ancient Wi-Fi chips. Nvidia, why does this have to be this hard?
