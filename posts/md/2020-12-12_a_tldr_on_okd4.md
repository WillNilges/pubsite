# A TL;DR on OKD 4
## 12 December, 2020

So I'm a part of this org called Computer Science House. We do a lotta DevOps, and this year, our STAR cert expired.

That was really bad.

Well, not really. We were pretty used to STAR certs expiring. It's a pretty regular process and it goes like this: You pay for one in 2016. When you do that, it lasts 2 years. But then it expires in 2018, and when that happens you pay for a new one and spend about 3 weeks trying to track down all the systems that use it. Our mistake was using it for OKD 3.

Two years later, the 2018 STAR cert expired. But, luckily, LetsEncrypt now does STAR certs. So, we were able to replace most of our expired STAR certs with that and automate it with Puppet. But, OKD 3 was a different beast.

I'm not even really sure what happened, but it turns out that container orchestration is complicated. So, in the end, our OKD 3 cluster was decidedly on its last legs. At this point, it hosted many of our services as well as various member projects. It was not a service we wanted to lose.

However, with repairing the damage the expired cert did more or less out of the equation, we decided to look forward to OKD 4, which had been out for a number of months when we made the decision to switch.

For some reason, I volunteered (or was volunteered?) to be the one to install the new cluster. This turned out to be quite the process.

In early October, I started researching OKD 4. Turns out that the install process has been heavily revised from OKD 3, which involved an untold amount of trifiling with an Ansible script to get working. I managed to install it exactly once, and it was a huge pain. OKD 4, however, is more or less a re-write, and, while more manual (with the manual configuration of network, load balancing, etc), is much easier to set up. A good guide for this can be found [here](https://itnext.io/guide-installing-an-okd-4-5-cluster-508a2631cbee?gi=be44dbb2f87f), but the gist was this (We installed on baremetal Proxmox):

### The TL;DR

- Make sure your storage backplane is fast enough (We'll come back to this)
- Provision Service, Master, Worker, and Bootstrap nodes on Proxmox with recommended amounts of resources
- Configure DNS server and DHCP server with appropriate DNS entries and MAC addresses (This step took the longest to figure out. It's ALWAYS the DNS)
- Configure HAProxy, firewalld, and OKD 4 on Service node
- Ignite Bootstrap node
- Ignite Master nodes
- Ignite Worker nodes
- Profit
- Configure Cluster from there

### The two big Problems

- First and foremost, the DNS. CSH posesses a public IP block. It's how we run all of our services on the internet. However, we still have a gateway, DNS, etc to supply all these machines with a network edge. To manage DNS, we run a service called STARRS which allows a user to easily set up static and DHCP IP addresses, A records, and CNAMES for hosts based on MAC addresses. It has a few shortcomings in how it handles SRV records, PTR records, and wildcard entries, though, and it took time to figure out that most of that needed to be added to our DNS server manually via `nsupdate`.
- Second, our less-than-healthy Ceph cluster. It uses a lot of older, secondhand drives that ought to be replaced. Despite our 10Gb Ceph network speeds, the drives bottlenecked etcd so much that I could scarcely get a cluster to even ignite, and when I did, it fell apart quickly. The solution to this conundrum was using local RAID 6 arrays on the proxmox nodes we ran OKD on.

### In conclusion

In the end, we got OKD 4 up and running, and I learned a lot. You can find some useful bootstrapping and config scripts and a Golang config file generator [I'm working on.](https://github.com/willnilges/okd4-utils)