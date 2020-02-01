---
layout: post
title:  "Intro to GNU/Linux (But mostly RHEL for RIT CE students) Mk II."
date:   2019-02-02 15:32:23 -0500
categories: jekyll update
---

This seminar will be a light introduction to GNU/Linux for those who are brand new or at least know their way around.

Link to slides <a href="https://docs.google.com/presentation/d/14ia1Dp34B1xmx9fCBu5X7Xu4dv563XABAFjvPaCinRs/edit?usp=sharing">here</a>. (Only available to those with an RIT email address for now).

<strong>It covers:</strong>

- What GNU/Linux is
- A brief history of its development
- Linux Jargon (scattered throughout)
- The basics of the GNOME desktop environment
  - How to log in
  - How to navigate the desktop
  - How to use Nautilus (GNOME's file manager)
  

- The Command Line
  - Common Commands
    - Navigation (ls, la, cd)
    - Viewing (cat, grep)
    - Moving stuff (mv, cp)
    - Making Directories (mkdir)
    - Doing stuff as root (sudo)
  

- Installing and Updating Packages
  - yum


- Running Programs
- ./
- sh
- bash


- Text Editing
- nano
- vim
- emacs


- Environment Variables
- Modules
- Programming Commands
- python
- javac
- java
- mcs
- mono
- gcc


- Basic Troubleshooting



<h2 id="what-is-gnu-linux-">What is GNU/Linux?</h2>

Linux is FOSS, meaning that it is free to use and install and the source code is available in its entirety online for free.

Linux is what most of the cloud runs on. An overwhelming majority of servers run Linux that support e-mail, message boards, FTP, social media, and everything in-between. There is a very, very low chance that Linux has not affected your life in some way.

A few of the main features that GNU/Linux boasts is that it's highly configurable, usually pretty lightweight, and extremely secure. GNU/Linux doesn't collect your data or force updates. You own the software that is on your computer, and can do whatever you want with it. (Gonna go ahead and steal this quote), “[A] Linux based OS allow[s] you to work the way you want [to] instead of making you work the way [it] want[s you to].”

Linux is worked on by a huge community that spans a multitude of corporations and communities. A lot of different people work on a lot of different things for Linux. An OS is big: It's gotta have drivers, a GUI, file managers, command line interfaces, and a whole buncha programs to do computer-y things. We got AAA corporate software engineers and random college students in their dorm rooms contributing to the same desktop environment repo.

(Based on (and incorporates with) UNIX, GNU, and other systems)
Lastly, I think some people might get mad if I don't mention this, Linux is a part of a bigger ecosystem of software. Linux is a kernel upon which an OS is built, so most complete distros use GNU project code and a few other things that sum up to a complete user experience.
<h2 id="a-brief-history">A Brief History</h2>

<strong>Minics &gt; Unics &gt; Unix &gt; Minix &gt; Linux.</strong>

Unix was designed after the development of a different system called Minics which was super overengineered and basically unusable.
Important aspects of Minics:
Clarity: Modular design, simple file structure, and straightforward system calls.
Portability: Written in C, UNIX is aimed for wide-scale use and adoption.
“A basis in C means Unix is adaptable and easy to run on a variety of hardware.”
Simultaneity: Sustains multiple users and workflows. Kernel and user stay separate.

GNU began development when Richard Stallman decided that he wanted to use computers in an environment where he could freely share software with his peers without the burden of licensing and what not. He left his research position at MIT to pursue this project instead, as remaining at MIT would mean not being able to distribute it freely.

Linus Torvalds began developing Linux in 1991 after being fed up with MINIX's licensing. Torvalds announced on a MINIX  user group that he was developing his own OS, and a few years after starting development on MINIX using the GNU C compiler, version 1.0 dropped in 1994. (I highly encourage you to read up on the history and look at the source of the earlier versions if you have any interest at all.
<h2 id="distros">Distros</h2>

Here's a _very_ brief, _very_ basic timeline of major linux distros. TLDR: Linux 1.0 came out in the early 90's and so all of the biggest distros came out around then.

  - RedHat (1993)
    - Fedora (2003)
    - RHEL (2000)
  

- Debian (1993)
  - Ubuntu (2004)


- Slackware (1993)
- Arch (2002)



<h2 id="the-basics">The Basics</h2>

So first, before I go into any great detail about any one DE or Distro (we'll only cover GNOME in this seminar) I thought it would be good to take a peek at other tools and DEs as well just to get you started.

<strong>Perks of GNOME</strong>

- Popular DE
- Sleek and Modern
- Beginner Friendly
- <del>uses a lot of ram</del>
- Tons of easy-to-use plugins and modifications
- Metric tons of support
- Everyone uses it
- RIT uses it

### The GNOME desktop

<img alt="Default GNOME desktop" src="https://raw.githubusercontent.com/WillNilges/willnilges.github.io/master/posts/linux_seminar_files/RHEL_gnome_desktop.png" width="30%" height="30%">

This is what the GNOME desktop looks like as configured by RIT's CE department. It's got a top bar with a few different things. On the right, you've got a power and status menu which lets you change things like volume, open settings menu, and log out. It's also got a clock and some status icons. On the left, you've got the Applications menu, (which we'll cover in the next <del>slide</del> section), which is probably your best bet for launching applications. On the bottom is a window list as well as a virtual desktop list that shows everything that is currently open.

### The Applications Menu

<img alt="Applications Menu" src="https://raw.githubusercontent.com/WillNilges/willnilges.github.io/master/posts/linux_seminar_files/RHEL_gnome_activities.png" width="30%" height="30%">

This is the Applications menu (AKA the Activities Menu). In the center is an overview of all open windows. On the left, you have a dock that displays pinned programs for quick access (just like macOS) as well as any other open programs. When an icon is clicked, the Applications menu will close and the windows for that open program will be brought to the front. On the right, there is a list of all virtual desktops (These can be switched between with 
`CTRL+ALT+<Arrow Key>`). Up top, there is a search bar for finding programs, files, and directories. Above that is the usual top bar.

### File Management

<img alt="File Manager" src="https://raw.githubusercontent.com/WillNilges/willnilges.github.io/master/posts/linux_seminar_files/file_mgr.png" width="30%" height="30%">

_Here is what Nautilus usually looks like by default on RHEL._

You've got:

- An area to view the files that are actually in your current directory
  - Quick access bar over on the left that can show directories, mounted volumes, network locations, etc.
  - In the top bar, from left to right, you have forward and back, an indicator that tells you your current path, and, if you hit CTRL+L, shows an address bar so you can enter a path yourself.
  - A search function, then a toggle for list view or icon view
  - A menu which houses options like zoom and how to sort your stuff.

## Graphical Text Editors

Linux has many graphical text editors available. They're not much different from text editors on Windows, especially because most of the popular ones are the same. Atom, VS Code, and Sublime are all available on Linux. Even IDEs like the JetBrains collection are available for download and the install process is quite painless.

There are, of course, Linux exclusive ones, such as Gedit, Leafpad, and Mousepad. They're kind of like Notepad++.

<img alt="gedit" src="https://raw.githubusercontent.com/WillNilges/willnilges.github.io/master/posts/linux_seminar_files/gedit.png" width="30%" height="30%">

## The Command Line
  
<img alt="Command Line" src="https://raw.githubusercontent.com/WillNilges/willnilges.github.io/master/posts/linux_seminar_files/term1.png" width="30%" height="30%">
  
The command line is the most powerful tool in Linux. You can do pretty anything you'd need to do in Linux on your terminal. It has tools for anything and everything from text editing to networking configuration to audio adjustment.
  
The default shell RHEL uses is BASH, as does most every other distro. (There are others like CSH and ZSH but don't worry about that right now).
    Most everything you would want to do on your computer (that doesn't require graphics) can be done through the shell.

**Important Notes**

- It is your friend
- The lightest of weight
- Fastest way to use your computer
- Has great power
- Requires great responsibility
    
By the way, here's a list of commonly used commands.

### Common Commands
    
- _ls_ - Lists visible files in current directory
- _la_ - Lists all files in current directory (including hidden files)
- cat - Outputs contents of text file
- _grep &lt;phrase&gt;_ - looks for phrase in command output or file
- _cd &lt;path&gt;_ - Changes working directory to &lt;path&gt; (eg. /home/will/Documents)
- _mv &lt;file&gt; &lt;destination&gt;_ - Moves a file or directory to new path
- _cp &lt;file&gt; &lt;destination&gt;_ - Copies a file or directory to new path (For directories, use the -r option)
- _mkdir &lt;dir name&gt;_ - Creates a directory named &lt;dir name&gt;
- _chmod_ - Changes permissions on files (Normally used for marking programs as runnable)
- _chown_ - Allows you to change permissions for files (set which account owns a file)
- _sudo_ - (SuperUser DO) Executes a command as root
    
    
To run most programs on the CLI, you'll probably do one of these things:
    
- _./&lt;file name&gt;_ - Used to run the vast majority of executables. Requires marking a file as runnable.
- _bash &lt;file name&gt;_ - Used to run shell scripts. Usually doesn't need any kind of permissions.
    
## Important CE specific stuff

 ### Environment Variables
    
Shell stores variables to determine behavior
    
_printenv \<variable\>_ - Prints environment variables
    
_env VAR1="value" &lt;command&gt; &lt;command_options&gt;_ - modifies environment variables
      _set_ - Change the value of shell attributes and positional parameters
      <h4 id="modules">Modules</h4>
      
Allow dynamic modification of user environment via module files. They can load specific versions of programs and run them from the command line.
      
module load  - Loads modulefile. Each modulefile contains information needed to configure the shell for an application.
      
Used for MATLAB, vivado, tensorflow.

### Packages on RHEL
      
To install packages on RHEL, type <code style="font-family: Menlo, Consolas, &quot;DejaVu Sans Mono&quot;, monospace;">sudo yum install &lt;package_name&gt;</code>

<img alt="yum install" src="https://raw.githubusercontent.com/WillNilges/willnilges.github.io/master/posts/linux_seminar_files/term2.png" width="30%" height="30%">
        
To install packages on RHEL, type <code style="font-family: Menlo, Consolas, &quot;DejaVu Sans Mono&quot;, monospace;">sudo yum update</code>

<img alt="yum update" src="https://raw.githubusercontent.com/WillNilges/willnilges.github.io/master/posts/linux_seminar_files/term3.png" width="30%" height="30%">

<h3 id="text-editing">Text Editing</h3>

There are several ways to edit text in Linux. Arguably the fastest and lightest weight method is to use a Terminal. The big three are:
          
<img alt="nano" src="https://raw.githubusercontent.com/WillNilges/willnilges.github.io/master/posts/linux_seminar_files/term4.png" width="30%" height="30%">

_nano - simple, easy to use CLI-based text editor that comes with most distros_

Really good CLI editor for beginners. It's only got one mode, and straightforward customization and hotkeys.
          
<img alt="vim" src="https://raw.githubusercontent.com/WillNilges/willnilges.github.io/master/posts/linux_seminar_files/term5.png" width="30%" height="30%">

_vim - A lightweight, customizable, modal text editor_

For the more advanced users, Vim is extremely powerful and robust, but has a steep learning curve. There are tons of addons and tweaks available, and most everyone is posting their config files on their GitHub.
          
<img alt="emacs" src="https://raw.githubusercontent.com/WillNilges/willnilges.github.io/master/posts/linux_seminar_files/emacs.png" width="30%" height="30%">

_Emacs - Buffer based, shortcut heavy text editor for any and all applications._

Emacs is probably the most complex text editor of the ones here. It's got everything: Text editors, compilers, terminal emulators (so does vim but don't worry about it), an email client, and many, many games! It's written in some kind of cursed Lisp and C mix. It's insane, and if you want to learn it, prepare your spirits.
          <h3 id="code-compilation-and-execution">Code Compilation and Execution</h3>
          
You can easily run every language from the terminal.
          
Like I said, there was:
          
      - _./&lt;file name&gt;_ - Used to run the vast majority of executables. Requires marking a file as runnable.
      - _bash &lt;file name&gt;_ - Used to run shell scripts. Usually doesn't need any kind of permissions.
          
          
But then there's also tools for every language. Here are a few commonly used ones:
          
      - <code>python</code> - Tool to launch the Python interpreter and shell
      - <code>javac</code> - Reads Java class and interface definitions and compiles them into bytecode and class files
      - <code>java</code> - Tool to launch Java applications
      - <code>mcs</code> - mono C# compiler
      - <code>mono</code> - C# runtime environment
      - <code>gcc</code> - C compiler
      - <code>g++</code> - C and C++ compiler
      - <code>clang</code> - C, C++, and Objective-C compiler
          
          <h2 id="conclusion">Conclusion</h2>
          
Aaaaand that's about it. If you have any questions, comments, or suggestions, open an issue or pull request. I will probably be updating this from time to time, so check back for more content.
          
Thanks for reading!
### Sources
- https://www.linux.com/what-is-linux
- https://www.digitalocean.com/community/tutorials/brief-history-of-linux">https://www.digitalocean.com/community/tutorials/brief-history-of-linux
- https://www.youtube.com/watch?v=UjDQtNYxtbU">https://www.youtube.com/watch?v=UjDQtNYxtbU
- https://www.gnu.org/software/emacs/tour/index.html">https://www.gnu.org/software/emacs/tour/index.html
- https://wiki.archlinux.org/index.php/environment_variables">https://wiki.archlinux.org/index.php/environment_variables