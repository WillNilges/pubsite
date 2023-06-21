---
title: "A small update"
date: 2020-01-13T00:00:00Z
categories: [ "Blog" ]
draft: false
---

Hello, and happy new year!

New year, new semester. I wanted to make a small blog post to get things
rolling and announce two things that I\'m doing/have done.

For the last 6(?) months, I\'ve been working on a thing called
[ShelfLife](https://www.github.com/willnilges/shelflife), a OpenShift
application that manages cluster resources by tracking project usage and
automatically diverting resources away from stale pods and unused
projects, eventually archiving them and deleting them off the cluster.
The MVP for this app is done, and as soon as I figure out some API key
nonsense, I\'ll have that up and running in a VM. Next steps with that
are to create a web dashboard where people can retrieve their archived
projects and restore them to the cluster, so that RTPs don\'t have to do
it. After that, I want to containerize the application and add some more
features so that it can run directly on the cluster instead of in a VM
and be even more useful. After that\'s done, I\'d like to write a second
version in Go, and commit it directly, as a cluster feature, to the
OpenShift repository on github.\
So that\'s the plan on that.

As for the second thing, I\'ve undertaken an independent study this
semester, working with these neat machines called OLPCs. Might\'ve heard
of these about 12 years back when they got deployed to developing
countries to help kiddos learn. The full name of the project is the One
Laptop Per Child project.

![](https://upload.wikimedia.org/wikipedia/commons/b/b1/LaptopOLPC_a.jpg)

It\'s been a passing interest of mine for a while, and the issue with
them is that they\'re old. They don\'t run modern Linux, and I would
like them to. So I\'ll be blogging about that in the coming months.

Stay tuned, and follow Willard in his adventures to survive yet
*another* semester of engineering school.
