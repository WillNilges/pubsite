# Troubles with `firewalld`

### 7 August, 2021

---

This weekend, I decided to pop open my blog to tweak and fix a few layout and organization things. To be able to quickly iterate, I quickly installed `httpd` on a development VM so that I could treat it like a real webserver and not just host it locally on my laptop.

Usually, when I do this, I use Ubuntu and Apache, which is pretty quick and simple to get running. Fedora, however, likes to be special, and use `httpd`. It also happens to have `firewalld`, which is a service I have experience with, but, I'll admit, has been a while.

So I go to host the files, I change the configs and the ownership on the website files and everything, and I patch the firewall on the "Public" zone.

```
$ sudo chown -R wilnil:apache /var/www/html
$ sudo firewall-cmd --permanent --zone=public --add-service=http
$ sudo firewall-cmd --permanent --zone=public --add-service=https
```

And, of course, it wouldn't be a blog post if it worked, now would it?

No, for some reason this Fedora server didn't much care for the Public Zone, and, in fact, it wasn't even enabled, despite having services.

```
$ sudo firewall-cmd --list-all-zones
public
  target: default
  icmp-block-inversion: no
  interfaces: 
  sources: 
  services: dhcpv6-client http https mdns ssh
  ports: 
  protocols: 
  masquerade: no
  forward-ports: 
  source-ports: 
  icmp-blocks: 
  rich rules:
```

Ok, then, skippie. If you're so smart, then what zones _are_ active!?

```
$ sudo firewall-cmd --get-active-zones
FedoraServer
  interfaces: ens18
```

Oh.

Well, then, uh...

```
$ sudo firewall-cmd --permanent --zone=FedoraServer --add-service=http
$ sudo firewall-cmd --permanent --zone=FedoraServer --add-service=https
```

¯\\\_(ツ)_/¯

Not sure if this is some kind of security risk, but for a quick dev server, it got the job done.
