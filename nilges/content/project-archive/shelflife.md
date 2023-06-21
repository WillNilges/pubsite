---
title: "ShelfLife"
date: 2019-01-01T00:00:00Z
categories: [ "Project" ]
draft: false
---

ShelfLife is a utility used to automatically monitor and manage
resources on an OKD cluster. When active on a cluster, it monitors the
projects consuming resources, looking for anything that goes stale. What
\"stale\" means is up to you, but by default, it looks for projects that
haven\'t been worked on for a period of time, and sends increasingly
urgent emails to their owners before removing all compute resources and
eventually archiving the project in an S3 bucket to save the cluster\'s
compute resources. It has a plethora of features for categorizing
projects for stricter or looser timelines, backup and archival features,
and soon, a management frontend. [Check it out on
GitHub.](https://www.github.com/willnilges/ShelfLife)
