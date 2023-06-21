---
title: "ImagineRIT 2022 — CSHacked"
date: 2022-01-01T00:00:00Z
categories: [ "Project" ]
draft: false
---

One day I was over at a friend\'s house, discussing how CSH didn\'t have
an Imagine project yet. We got to talking, and progressed through a
variety of topics, involving tracking, Bluetooth, data privacy, and
scavenger hunts. This rabbit hole of a conversation eventually led to an
idea.

She had the idea that this project would be something fun, cool,
educational, and not creepy. It was something that people, if they were
curious about, could see how much time they spent at each booth, and see
what they appeared (through our data) to be most interested in. However,
seeing an opportunity to perhaps educate (and entertain) people, I
decided it would be cool to do the idea through the lens of data privacy
and anonymity. What could we learn from people just by snooping on the
devices they carried in their pockets? What could we tell them that
would be educational, memorable, and entertaining? What takeaways about
security and privacy can we plant that will help them going forward in
their lives?

But we didn\'t end up doing that, because that would require some
seriously expensive hardware. Instead, we\'re using ESP32s to create BLE
asset tracking tags. During ImagineRIT, we will run a sort of
geocaching-eque game where participants use our BLE-tracking network to
find CSH\'ers (in costume, of course) and claim a prize.

[Embedded Source
Code](https://github.com/ComputerScienceHouse/Imagine2022-Embedded)

[Backend Source
Code](https://github.com/ComputerScienceHouse/Imagine2022-Backend)

[Ingestion Server Source
Code](https://github.com/josephbgerber/ingestion)

[Simulator Source
Code](https://github.com/wilsonmcdade/imaginerit22-testdata)
