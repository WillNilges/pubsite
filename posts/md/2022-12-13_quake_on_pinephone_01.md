# How to Install Quake on the Pinephone

### 13 December, 2022

---

![Quake running natively on the Pinephone on Postmarket OS](posts/images/quake_on_pinephone.jpg)

### Introduction

I dunno if I've ever discussed this online, but I _really_ like Quake. I dunno why I got so into it, but it must've started in late 2017, early 2018-ish. I was in my senior year of highschool, and stumbled upon [OpenArena](http://openarena.ws/smfnews.php), a fork of [ioquake3](https://github.com/ioquake/ioq3), which in and of itself is a community-supported fork of [Quake](https://github.com/id-Software/Quake-III-Arena). I'm actually not even sure if that lineage is correct. Quake and its sequels is one of those legendary games that was forked a million-and-a-half times since it was released to the FOSS world under a GPL license in 2005(?).

Anyway, all I remember is that I thought it was Neat™ becuase it was FOSS. I think the only game at the time I had ever seen that was FOSS was [Space Station 13](https://spacestation13.com/), which is an _exquisite_ mess of a game, and one that I no longer dare touch with a 10 foot pole. Without understanding much about the context, nor the history, of the game, I just started messing around. It became the go-to lunchtime/study hall passtime. One day, in the spring semester, I was given an assignment in _math_ class to write a paper... about _math_.

So of course I chose to write about OpenArena, and all the cool Vector math that goes on therein.

Ever since then, Quake has been a curiosity of mine. I've made brief studies of the source code, but never actually _modified_ or _compiled_ the game.

Now I have a PinePhone, so I thought, "why the hell not?"

### Tutorial

I figured out how to do it _on the pinephone,_ with PostmarketOS. It wasn't actually that hard. The hard part would be cross-compiling this on an X86 machine. Oof.

1. Download [quakespasm](https://quakespasm.sourceforge.net/download.htm) on your pinephone. Specifically, you need the tar.gz at `Source code and Making`.
2. Uncompress it, and `cd` into the `Quake` directory.
3. Install dependencies with `sudo apk add gcc make sdl2-dev libvorbis-dev libmad-dev` _(I might be missing something. this is directly from memory)_
4. Run `make USE_SDL2=1`
5. Acquire the `id1` data pack directory from any legal copy of Quake, place it into the `Quake` directory
6. Happy fragging

### Next Steps

I'd really like to get this cross-compiling on my server. It'd be neat to package this and add it to the postmarketOS repositories. All the dependencies are there, so I don't see why not. Making a modified version of Quake that was playable on the pinephone, with onscreen controls, would be SICK.

As I figure stuff out, I'll be posting updats in the [pinequake](https://github.com/WillNilges/pinequake) repo.

Cheers.
