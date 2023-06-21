## Inkpath

### Whiteboard transcription that doesn't suck!

While finishing up my 5th and final year of a Computer Engineering degree at RIT, I explored the CUDA language, particularly its applications in accelerating computer vision algorithms in OpenCV. You can find work on that [here](https://github.com/WillNilges/inkpath-cuda), which will hopefully eventually make its way to [Inkpath](https://github.com/WillNilges/inkpath/).(no promises on that, open to maintainers lol)

![Inkpath image transcription process](posts/images/inkpath_process.jpg)

Inkpath is a plugin for Xournal++ that I've been working on for the past two years or so. It allows a notetaker to take photos of whiteboards, notebooks, basically anything with a white background, and transcribe those notes into Xournal++ so that you can interact with it, re-color it, shrink it, expand it, whatever.

Up until Fall 2022, it was written in C, and used a _really_ old project called Autotrace to do the centerline tracing and vectorization required as a first step. It uses extensions to the Xournal++ Lua API I wrote to send that image data to your document.

![Inkpath image transcription process](posts/images/roland_sip_comparison.jpg)

Now, Inkpath is written in C++, and uses OpenCV to do the image processing. There exists a [project](https://github.com/WillNilges/inkpath-cuda) where I spent a month implementing the thresholding algorithms in CUDA to speed them up. This worked really well, but the real bottleneck is that Lua sucks and is slow, and calling the API 10,000 times takes a while, so these optimizations don't really matter.

Hopefully I can help get the next version of Xournal++ out soon so that utilizing this won't require compilation from github.

[Check out Inkpath](https://github.com/willnilges/inkpath).
