// I'm not very good with computers....
const postObj = [
  {
    "filename": "2022-12-13_quake_on_pinephone_01.md",
    "title": "How to Install Quake on the Pinephone",
    "date": "2021-12-13"
  },
  {
    "filename": "2021-09-15_selinux_httpd.md",
    "title": "Fixing some random 403's",
    "date": "2021-09-15"
  },
  {
    "filename": "2021-09-11_recovering_an_okd4_worker.md",
    "title": "Recovering an OKD 4 Worker",
    "date": "2021-09-11"
  },
  {
    "filename": "2021-09-05_Gitea_on_OKD4.md",
    "title": "Installing Gitea on OKD 4.7",
    "date": "2021-09-05"
  },
  {
    "filename": "2021-08-27_okd4_but_again.md",
    "title": "OKD 4, but again.",
    "date": "2021-08-27"
  },
  {
    "filename": "2021-08-07_firewalld_services_blocker.md",
    "title": "Troubles with firewalld",
    "date": "2021-08-13"
  },
  {
    "filename": "2021-08-13_restoring_old_project.md",
    "title": "Re-Installing my First Major Project",
    "date": "2021-08-07"
  },
  {
    "filename": "2020-12-12_a_tldr_on_okd4.md",
    "title": "A TL;DR on OKD 4",
    "date": "2020-12-12"
  },
  {
    "filename": "2020-05-17_subnetting_and_forgetting.md",
    "title": "Subnetting and Forgetting",
    "date": "2020-05-17"
  }
];

//.... I'm REALLY not good with computers. These are old posts that are written in HTML and thus don't work with this system.
// I've included them for posterity, but I'm not very proud of them.
const legacyPostObj = [
  {
    "filename": "2020-05-11_finishing_up.html",
    "title": "Trying (and failing) to finish ShelfLife",
    "date": "2020-05-11"
  },
  {
    "filename": "new_year.html",
    "title": "A small update",
    "date": "2020-01-13"
  },
  {
    "filename": "future_is_open.html",
    "title": "The Future is Open reigstration happening now!",
    "date": "2019-10-02"
  },
  {
    "filename": "proper_i3_scaling.html",
    "title": "How to properly scale i3 on HiDPI displays",
    "date": "2019-08-13"
  },
  {
    "filename": "arch_scaling_hack.html",
    "title": "A neat HiDPI scaling hack",
    "date": "2019-07-12"
  },
  {
    "filename": "grub_arch_fix.html",
    "title": "Installing GRUB on Arch",
    "date": "2019-03-13"
  },
  {
    "filename": "seminar_mk_ii.html",
    "title": "Intro to GNU/Linux (But mostly RHEL for RIT CE students) Mk II.",
    "date": "2019-02-02"
  },
  {
    "filename": "windows_broke_time.html",
    "title": "Windows broke my time!",
    "date": "2019-02-04"
  },
  {
    "filename": "graphics_output.html",
    "title": "Graphics output!",
    "date": "2018-12-17"
  },
  {
    "filename": "no_automount.html",
    "title": "Thunar won't automount external drives",
    "date": "2018-11-27"
  },
  {
    "filename": "pimp_my_de.html",
    "title": "Pimp my DE seminar notes",
    "date": "2018-11-05"
  },
  {
    "filename": "bumblebee_on_arch.html",
    "title": "How to install Bumblebee on Arch",
    "date": "2018-10-29"
  },
  {
    "filename": "networking_on_cli.html",
    "title": "How to set up networking on an uncooperative CLI",
    "date": "2018-10-29"
  }
];

// Excluded
//"embedded_nightmare.html",

const projectsObj = [
    { 
        "filename": "projects/imaginerit2022.html",
        "title": "ImagineRIT 2022: CSHacked", 
        "date": "A Bluetooth Low Energy Tracking project I oversaw the development of."
    },
    {
        "filename": "projects/inkpath.html", 
        "title": "Inkpath", 
        "date": "A raster diagram conversion + insertion tool for Xournal++. Convert photos of notes into native .xopp format!"
    },
    { 
        "filename": "projects/octo_dash_curses.html", 
        "title": "Octo Dash Curses", 
        "date": "A tool for monitoring the status of a 3D print from the command line. Powered by OctoPrint."
    },
    {
        "filename": "projects/bettervent.html",
        "title": "BetterVent", 
        "date": "A free and open source android-tablet schedule viewer for placing outside of rooms."
    },
];

const projectsArchive = [
    { 
        "filename": "projects/shelflife.html",
        "title": "Shelflife", 
        "date": "An Experimental OKD resource management system"
    },
    { 
        "filename": "projects/death_panel.html",
        "title": "The Death Panel", 
        "date": "An (unfinished) part of CSH's ImagineRIT 2020 project."
    },
    { 
        "filename": "projects/directional_ac.html",
        "title": "Directional AC", 
        "date": "Part of CSH's ImagineRIT 2019 project."
    },
    { 
        "filename": "projects/samplezone.html",
        "title": "sampleZone", 
        "date": "An ncurses-based app for creating music with sampled audio" 
    },
    { 
        "filename": "projects/boa.html",
        "title": "BOA", 
        "date": "An unfinished video game I worked on during the summer of 2018"
    },
];

export { postObj, legacyPostObj, projectsObj, projectsArchive };
