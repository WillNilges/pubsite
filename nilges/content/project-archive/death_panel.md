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
