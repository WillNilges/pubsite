**29 October, 2018**\

So, if you\'ve read my aboutme page recently, you\'ll know that I\'m
currently working on putting together a cool custom controller for a GDD
project for Imagine RIT 2020. Basically, the controller is going to be
totally custom and will have many buttons, knobs, switches, dials, and
displays so that people can walk by our booth and press fancy buttons to
make random stuff happen in our game. (It\'s more of a control panel,
really). Basically, the panel will have the ability to impact the game
world by activating abilities, changing stuff like gravity, screen
orientation, etc. I want to make this happen by basically engineering a
custom chassis, stuffing a bunch of really neat-o looking buttons
inside, and having some kind of controller emulate keypresses

Only one problem, though: Embedded platforms are kind of a nightmare.

I\'m writing about this becuase I know some people I think\'d get a kick
out of this story, and I think it\'s really going to be an example of
just how goddamn annoying computers can be.

Okay, so here\'s the thing. I need a microcontroller board that can do
all the things I needed it to do. I believe the best thing for this
project would be an Arduino Leonardo, since it can do all the Arduino-y
things, but can also be used as an HID device, meaning keyboard
emulation. However, I didn\'t want to use something I was familiar with
(in persuit of knowledge™). My original thought was to use the Teensy
3.6 that CSH had. However, when I went to the research room a few weeks
ago to look for it, I couldn\'t find it for the life of me! So, I had to
look for alternatives.

I researched two of them: The Arduino has a project called HoodLoader2
that operated on the fact that Arduinos (I think all of them) actually
have two microcontrollers on them. The Arduino Uno has a 16u2 and an
ATmega328. The important thing to me was that HoodLoader2 enabled the
user to program the 16u2, which enabled the use of any Arduino as an HID
device (like a keyboard). I didn\'t really want to do this, since it was
Arduino.

So, I had another option: I remembered that I got a neat board from one
of my friends called the FRDM-K64F. This board is a low-cost, open
source microcontroller platform that (apparently) is used in the
automotive industry. The reason I went after this board was that I found
a HID library for it and was like, \"Well, I don\'t have a Leonardo
(which is the coward\'s way out) or a Teensy so I\'ll try using this.\"

**Boy, was that a fucking mistake.**

This K64F was a total blunder, and to this day I haven\'t actually
gotten it to work. Granted, I did learn a lot, but no actual results.
TLDR is I\'m convinced that I\'ve got the wrong firmware, but here\'s
the full story:

So the K64F is a board previously used in CMPE-460, Interface and
Digital Electronics, which covers various topics related to sensors,
motors, and signals that now uses the NXP Kinetis. At some point, a CSH
alum got her hands on one of these boards, gave it away to another
CSH\'er, who gave it to me. Having not worked with this platform before,
I immediately started googling everything, and stumbled upon mbed\'s
site. Mbed is a platform that allows easy programming and use of a *ton*
of different microcontrollers. It\'s possible to program the FRDM-K64F
in a few different ways, but the way I wanted to do it was mbed.
