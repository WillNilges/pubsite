# Installing Gitea on OKD 4.7

### 5 September, 2021

---

### Introduction
Now that I have this fancy new OKD 4 cluster all set up, I decided I wanted to do a few things with it before I start ~Ruining everything~ doing Operator development. Because, ya know, I had a few web services hosted on VMs (mostly crappy development stuff). It's not like I was hurting for resources or address space on my internal network, but it feels nice to run those kinds of things more efficently, you know?

So anyway, a few of these things involve hosting documents and websites that contain info for my place of residence that I'd rather not share on the open internet (stuff like house passwords, configuration files, etc). Typically, these were just chucked in a directory and served through Apache or something. But with OKD, I figured I could run Gitea and make it much easier to deploy and manage versions of these items.

### Installation

First, create a new project on your cluster. Call it, "Gitea."

Next, switch to the project on the console, and install the Gitea Helm chart.

```
helm repo add gitea-charts https://dl.gitea.io/charts/
helm install gitea gitea-charts/gitea
```

There are three pods that run Gitea. There's the Gitea pod itself, the gitea-memcached pod, and a gitea-postgresql pod. All of these need some amount of fanagling. gitea-memcached has its own Service Account that controls and deploys it, but the other two come from StatefulSets and are controlled by the default Service Account.

### Storage

You'll need two Persistent Volumes (PVs) for the Persistent Volume Claims (PVCs) that Gitea requests. One for Gitea itself, and one for Postgres.

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: gitea-pv01
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  nfs:
    path: /var/nfsshare/gitea/pv01
    server: 10.10.51.70

---

apiVersion: v1
kind: PersistentVolume
metadata:
  name: gitea-pv02
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  nfs:
    path: /var/nfsshare/gitea/pv02
    server: 10.10.51.70

```

Make sure that you give each PV its own directory in whatever storage you're using. I made a mistake and accidentally sloshed it all together into one directory and ran into a ton of mouting and permissions errors. Pay attention to the above `path` field in the YAML snippets and make sure you set yours up the same way.

### Security Context Constraints

Next, because that's a Helm Chart designed for K8s, you need to modify the Service Context Constraints (`scc`s) of all the pods. Because some of them insist on running as a certain UID (including Root), you must add the `anyuid` scc to `default` and `nonroot` to gitea-memcached. If you don't do this, nothing will spin up and you'll get a ton of UID and group related events in your logs.

```
oc adm policy add-scc-to-user anyuid -z default
oc adm policy add-scc-to-user nonroot -z gitea-memcached
```

Finally, add some routes so that you can connect to your new Gitea instance.

I'm lazy, and just used the web interface for this.

![Routing Screenie](routing.png)

Sick, now you've got Gitea running. Go ahead and add an account.

### Errors I ran into (and their solutions)

#### Security Context Constraints

```
Error creating: pods "gitea-memcached-574858645d-" is forbidden: unable to validate against any security context constraint: [provider restricted: .spec.securityContext.fsGroup: Invalid value: []int64{1001}: 1001 is not an allowed group spec.containers[0].securityContext.runAsUser: Invalid value: 1001: must be in the ranges: [1000660000, 1000669999]]

create Pod gitea-postgresql-0 in StatefulSet gitea-postgresql failed error: pods "gitea-postgresql-0" is forbidden: unable to validate against any security context constraint: [provider restricted: .spec.securityContext.fsGroup: Invalid value: []int64{1001}: 1001 is not an allowed group spec.containers[0].securityContext.runAsUser: Invalid value: 1001: must be in the ranges: [1000660000, 1000669999]]

create Pod gitea-0 in StatefulSet gitea failed error: pods "gitea-0" is forbidden: unable to validate against any security context constraint: [provider restricted: .spec.securityContext.fsGroup: Invalid value: []int64{1000}: 1000 is not an allowed group spec.initContainers[1].securityContext.runAsUser: Invalid value: 1000: must be in the ranges: [1000660000, 1000669999]]
```

If you see this in your Event logs, then you need to bind SCCs to the `gitea-memcached` SA and the `default` SA. You might have to scale your pods up and down to get this to proc.

#### Chown and Permissions

```
[38;5;6mpostgresql [38;5;5m20:14:26.90 [0m
[38;5;6mpostgresql [38;5;5m20:14:26.90 [0m[1mWelcome to the Bitnami postgresql container[0m
[38;5;6mpostgresql [38;5;5m20:14:26.90 [0mSubscribe to project updates by watching [1mhttps://github.com/bitnami/bitnami-docker-postgresql[0m
[38;5;6mpostgresql [38;5;5m20:14:26.91 [0mSubmit issues and feature requests at [1mhttps://github.com/bitnami/bitnami-docker-postgresql/issues[0m
[38;5;6mpostgresql [38;5;5m20:14:26.91 [0m
[38;5;6mpostgresql [38;5;5m20:14:26.92 [0m[38;5;2mINFO [0m ==> ** Starting PostgreSQL setup **
[38;5;6mpostgresql [38;5;5m20:14:26.96 [0m[38;5;2mINFO [0m ==> Validating settings in POSTGRESQL_* env vars..
chmod: changing permissions of '/proc/self/fd/1': Permission denied
```

```
[38;5;6mpostgresql [38;5;5m02:54:28.91 [0m
[38;5;6mpostgresql [38;5;5m02:54:28.91 [0m[1mWelcome to the Bitnami postgresql container[0m
[38;5;6mpostgresql [38;5;5m02:54:28.92 [0mSubscribe to project updates by watching [1mhttps://github.com/bitnami/bitnami-docker-postgresql[0m
[38;5;6mpostgresql [38;5;5m02:54:28.92 [0mSubmit issues and feature requests at [1mhttps://github.com/bitnami/bitnami-docker-postgresql/issues[0m
[38;5;6mpostgresql [38;5;5m02:54:28.93 [0m
[38;5;6mpostgresql [38;5;5m02:54:28.94 [0m[38;5;2mINFO [0m ==> ** Starting PostgreSQL setup **
[38;5;6mpostgresql [38;5;5m02:54:28.98 [0m[38;5;2mINFO [0m ==> Validating settings in POSTGRESQL_* env vars..
[38;5;6mpostgresql [38;5;5m02:54:29.00 [0m[38;5;2mINFO [0m ==> Loading custom pre-init scripts...
[38;5;6mpostgresql [38;5;5m02:54:29.01 [0m[38;5;2mINFO [0m ==> Initializing PostgreSQL database...
chmod: changing permissions of '/bitnami/postgresql/data': Operation not permitted
[38;5;6mpostgresql [38;5;5m02:54:29.05 [0m[38;5;3mWARN [0m ==> Lack of permissions on data directory!
chmod: changing permissions of '/bitnami/postgresql/data': Operation not permitted
[38;5;6mpostgresql [38;5;5m02:54:29.05 [0m[38;5;3mWARN [0m ==> Lack of permissions on data directory!
[38;5;6mpostgresql [38;5;5m02:54:29.06 [0m[38;5;2mINFO [0m ==> pg_hba.conf file not detected. Generating it...
[38;5;6mpostgresql [38;5;5m02:54:29.06 [0m[38;5;2mINFO [0m ==> Generating local authentication configuration
ls: cannot open directory '/bitnami/postgresql/data': Permission denied
```

```
[root@okd4-services ~]# kubectl logs gitea-0 -c init-directories
+ chown 1000:1000 /data
chown: /data: Operation not permitted
```

Or any other kind of `chown` error, you need to look at your PV setup. Chances are you're creating them in the same directory so they're colliding. In the beginning, I accidentally tried to create these PVs in `/var/nfsshare/registry` which caused a _lot_ of fireworks.
