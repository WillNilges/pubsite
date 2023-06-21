## **BetterVent**

BetterVent is a scheduling app I am developing for Computer Science
House. We have tablets outside our special rooms that run this software.
It displays the current time, which event is currently taking place, and
which events are coming up. It also lets people make short, quick
reservations for if they need to snag a room for a bit. Check on its
progress and fork me
[here](https://www.github.com/willnilges/bettervent).

![bettervent on display in front of the
lounge.](posts/images/bettervent-image.png)

Bettervent is open source, and you can find my repo on GitHub. You can
also look at Reservator that I tried to fork from, but that app ended up
being an overengineered undocumented nightmare, so I tossed everything
out and started writing my own from scratch.\
\
Lately i\'ve gotten busy making quality-of-life improvements to the UI
and catching new and exciting bugs, but also adding the additional small
feature here and there. At this point, I\'d call BetterVent complete.
Check out the README for more information.

## **BOA**

BOA is a Unity game that I am currently developing in C#. It\'s a
fast-paced, PVP, multiplayer shooter with a heavy focus on mobility and
reaction time that drew a lot of inspiration from Terraria and
OpenArena. Terraria PVP is a lot of fun in the 2D voxel-like
environments that comprise that game, but I\'d like it to be faster, and
more focused on the combat. OpenArena is a lot like that, and also
captures the general feel I want for the game.

I\'ve had to put it on hold for a while as I focus on school, work, and
my projects for CSH, but it\'ll (hopefully) be done by ~~mid 2019~~
~~2020™~~ ~~2021™™~~.

## **The Death Panel**

The Death Panel is a hackable custom control panel that was created for
CSH\'s Imagine RIT 2020 project. Our project was a minigame suite with a
twist, and for the panel (which ) The idea is that this panel will act
as an \"admin panel\" for a given minigame that is currently being
played. When you push a button, anything can happen!

![Concept CAD #1 of The Death
Panel™](posts/images/deathpanel-concept1.png)

The project consists of a few different parts: Firstly, there\'s the
games, which were intended to be couch-based multiplayer-style. Then,
there\'s the physical panel. This panel will have a bunch of various
controls designed simply to cause chaos in the game and attract
onlookers from the floor of Gordon Field House, where our booth would be
located. The final component is all of the software that ran on the
controller, which was a Raspberry Pi with a bunch of I2C controllers
wired into it. There was a lot of communication happening all the time
between the PC, the buttons, and the controller\'s display, and it was
all written in Rust and C#.

![Prototype of the software
working.](https://user-images.githubusercontent.com/42927786/128588306-a0fae672-d68f-45b1-9dc4-5ffefc4e8732.jpg)

[You can find the source code, parts list, and assembly instructions on
GitHub.](https://www.github.com/willnilges/deathpanel)

## **Directional AC**

Directional AC is a project I worked on for Imagine RIT 2019 as part of
a bigger smart-car project made by CSH. The project helps to complete
our concept of the interior of a futuristic car we\'ve dubbed the
Computerized Autonomous Roadster (CAR). It involves enabling the fans in
a car\'s AC system to track a passenger and adjust its direction, power,
and temperature using a 3D-printed bracket and camera setup.

![Directional AC on display at Imagine
RIT](posts/images/dirac-imagine-2019.png)

The project is currently capable of tracking a passenger\'s face
accurately and adjusting direction. I\'m going to continue work on it to
add more features and refine the bracket. Follow development
[here](https://github.com/willnilges/directionalac).

## ImagineRIT 2022 {#imaginerit2022}

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

## Inkpath {#Inkpath}

Whiteboard transcription that doesn\'t suck!

[Source code is on GitHub](https://github.com/WillNilges/inkpath/)

## Octo Dash Curses

I'm fairly new to the world of 3D Printing (Only had my printer since
August 2020), but I'm loving it so far. I've got an Ender 3 Pro hooked
up to an OctoPrint server, and that's how I've been managing my printer
this whole time.

One feature that I wish it had was a dashboard page you could go to in a
browser and check the status of your print, like a Graphana or Datadog
dashboard for servers. I also noticed that print progress doesn't
display on your printer when you have an OctoPrint server connected.

![image](https://preview.redd.it/whjm31bugcc61.png?width=688&format=png&auto=webp&s=c350056359ef808fb897d1f7ed294c2096957496)

Octo Dash Curses is a lightweight, rugged, and dead-simple way to
monitor your 3D Printer, right from your OctoPrint server! The idea is
that, because it is implemented using ncurses, it does not require a
display server. This makes ODC ideal for using a dashboard display
connected directly to your OctoPrint server and reducing the number of
things you need to install/run on it.

That *also* means that it's perfect for monitoring your server over
telnet (or, preferrably, SSH). You can use ODC as a quick and easy way
to get the status of your print from your laptop using a script, or you
can view the status directly from your print server's console.

The project uses the OctoPrint API, so all you need is the binary, a
config file, and an API key. It's super simple to set up!

![image](https://user-images.githubusercontent.com/42927786/106819172-6b123a80-6647-11eb-8e4a-3ed618a47daa.png)

[You can find the latest release on
GitHub](https://github.com/WillNilges/octo-dash-curses/)

## **SampleZone**

SampleZone is a command line mixer made by Steve Greene (sgreene570) I
contribute to. It uses ncurses to allow for mixing and pitch shifting of
audio files. There\'s a lot planned for this program, so stay tuned!
Follow upstream development
[here](https://www.github.com/sgreene570/sampleZone).

## **ShelfLife**

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
