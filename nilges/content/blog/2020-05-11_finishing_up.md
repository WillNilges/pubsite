---
title: "Trying (and failing) to finish ShelfLife"
date: 2020-05-10T00:00:00Z
categories: [ "Blog" ]
draft: false
---

Yo, It's been a while. The semester is finally over and I can finally
pay attention to projects again. It's been an unhealthy amount of time
since I've touched anything :(

Anyway, today I'm looking into Kube/Openshift operators. I've realized
that the best way to deploy ShelfLife on this cluster (or any cluster,
for that matter) is to use an operator...

Duh.

This is actually old news, I knew that like 6 months ago, but now I'm
going to try to implement it, I guess. For no particular reason.

Anyway, to do this, I think we need some .yaml files. Basically, from
looking at the code of other operators, I think we need some yaml to
create a service account, give it some role bindings (namely cluster
roles) so it can touch all the levers in the cluster, and then... uhhh.
I guess give it an API key or something. That part I'm still kind of
fuzzy about.

But from reading this there is a nonzero chance that I had the right
idea in the beginning. I am going to try to avoid going in circles like
I did over winter break though.

But like, looking through these readmes on other projects, it's more or
less what I want.

Kube is hard.

So it looks like I might be able to actually construct this manually
with `oc` commands, but we\'ll have to mess around with this some more.
Also I have to remember how to use OpenShift. :L\
So we also got this deployment.yaml file that I guess is used to
actually stick the operator on the cluster. What an idea. I think I
wanna poke at these roles again first. So lemme do that.

For reference, here's what cluster-admin looks like according to
`oc describe clusterrole.rbac | less`

::: codeBlock
    Name:         cluster-admin
    Labels:       kubernetes.io/bootstrapping=rbac-defaults
    Annotations:  authorization.openshift.io/system-only=true
                  rbac.authorization.kubernetes.io/autoupdate=true
    PolicyRule:
      Resources  Non-Resource URLs  Resource Names  Verbs
      ---------  -----------------  --------------  -----
      *.*        []                 []              [*]
:::

I think I just got it.

one of these two commands worked. (Actually, you just need the second
one, pretty sure).

::: codeBlock
    oc policy add-role-to-user cluster-admin system:serviceaccount:default:shelflife-dev-bot
    oc adm policy add-cluster-role-to-user cluster-admin system:serviceaccount:default:shelflife-dev-bot # This one works!
:::

Now, that's not exactly what I want, since, well, it's probably not good
to shunt cluster-admins onto systems willie nilly. So, we gotta make a
cluster role. I was messing around with a `shelflife` cluster role
earlier in the year (Like, January). Here's what it looks like according
to `oc describe clusterrole.rbac | less`. To create this, use this
command:

::: codeBlock
`oc create clusterrole shelflife --verb=get,watch,list,delete --resource=pods,namespaces,deployments,builds,buildconfigs,deploymentconfigs,deployments,podtemplates,projects`.
:::

\

::: codeBlock
    Name:         shelflife
    Labels:       <none>
    Annotations:  <none>
    PolicyRule:
      Resources                            Non-Resource URLs  Resource Names  Verbs
      ---------                            -----------------  --------------  -----
      namespaces                           []                 []              [get watch list delete]
      pods                                 []                 []              [get watch list delete]
      podtemplates                         []                 []              [get watch list delete]
      deploymentconfigs.apps.openshift.io  []                 []              [get watch list delete]
      buildconfigs.build.openshift.io      []                 []              [get watch list delete]
      builds.build.openshift.io            []                 []              [get watch list delete]
      deployments.extensions               []                 []              [get watch list delete]
      projects.project.openshift.io        []                 []              [get watch list delete]
:::

This does not work. However, when doing
`oc adm policy add-cluster-role-to-user cluster-admin system:serviceaccount:default:sl-test`,
it works.

Groovy. so uhhhhhhhhh, what's the deal? Well, I think we're missing a
resource. I'm not sure what, though, and I don't know if I have a way to
find out. I guess I could look at every API call the app needs to
make...

However, that sounds boring. I think, for now, cluster-admin is
workable. This is definitely not something I'm going to do for version
1.0, I just reeeeeallly want to make the app work, since I passed it as
a major project. I need to find out how to make and use .yaml files to
do all this cluster magic automatically.

Here are the commands you need to create a service account, give it
sufficient permissions, and get a key to add to your `.env` file:

::: codeBlock
::: codeBlock
    oc create sa shelflife-dev-bot
    oc adm policy add-cluster-role-to-user cluster-admin system:serviceaccount:default:shelflife-dev-bot
    oc get token shelflife-dev-bot
:::
:::

I'll just.... uhhhh.... add this to the README for now.

As I look through this code, it's occurring to me that I need a bit more
polish on this app. Actually, a bit is kind of an understatement. Please
hold.
