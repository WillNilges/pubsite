const posts = [
    "2021-09-15_selinux_httpd.md",
    "2021-09-11_recovering_an_okd4_worker.md",
    "2021-09-05_Gitea_on_OKD4.md",
    "2021-08-27_okd4_but_again.md",
    "2021-08-13_restoring_old_project.md",
    "2021-08-07_firewalld_services_blocker.md",
    "2020-12-12_a_tldr_on_okd4.md",
    "2020-05-17_subnetting_and_forgetting.md",
];

// I'm not very good with computers.
const titles = [
  "Fixing some random 403's",
  "Installing Gitea on OKD 4.7",
  "Recovering an OKD 4 Worker",
  "OKD 4, but again.",
  "Troubles with `firewalld`",
  "Re-Installing my First Major Project",
  "A TL;DR on OKD 4",
  "Subnetting and Forgetting",
]

//.... I'm REALLY not good with computers. These are old posts that are written in HTML and thus don't work with this system.
// I've included them for posterity, but I'm not very proud of them.

const legacyPosts = [
    "2020-05-11_finishing_up.html",
    "new_year.html",
    "future_is_open.html",
    "proper_i3_scaling.html",
    "arch_scaling_hack.html",
    "grub_arch_fix.html",
    "seminar_mk_ii.html",
    "windows_broke_time.html",
    "graphics_output.html",
    "no_automount.html",
    "pimp_my_de.html",
    "bumblebee_on_arch.html",
    "networking_on_cli.html",
];

const legacyTitles = [
    "Trying (and failing) to finish ShelfLife",
    "A small update",
    "The Future is Open reigstration happening now!",
    "How to properly scale i3 on HiDPI displays",
    "A neat HiDPI scaling hack",
    "Installing GRUB on Arch",
    "Intro to GNU/Linux (But mostly RHEL for RIT CE students) Mk II.",
    "Windows broke my time!",
    "Graphics output!",
    "Thunar won't automount external drives",
    "Pimp my DE seminar notes",
    "How to install Bumblebee on Arch",
    "How to set up networking on an uncooperative CLI",
];

const legacyDates = [
  "2020-05-11",
  "2020-01-13",
  "2019-10-02",
  "2019-08-13",
  "2019-07-12",
  "2019-03-13",
  "2019-02-02",
  "2019-02-04",
  "2018-12-17",
  "2018-11-27",
  "2018-11-05",
  "2018-10-29",
  "2018-10-29",
];

//"embedded_nightmare.html",

function getPost(post, legacy) {
    console.log(post);
    console.log(`legacy = ${legacy}`);
    let baseUrl = './posts/md/';
    if (legacy === true) {
        baseUrl = './posts/'
    }
    fetch(baseUrl + post)
    .then(
        function(response) {
            if (response.status !== 200) {
              console.log('Whoops! Can\'t get post. Status Code: ' +
                response.status);
              return;
            }

           response.text().then(function(data) {
                let target = document.getElementById("main")
                //console.log(data);
                if (legacy) {
                    target.innerHTML += data;
                } else {
                    target.innerHTML += markdown(data);
                }
                //let sectionHeader = document.getElementById("sectionHeader");
                //let title = data.split('\n', 1)[0];
                //sectionHeader.innerHTML = title;
                return data;
            }); 
        }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function generatePost() {
    const params = new URLSearchParams(
      window.location.search
    );
    const postTitle = params.get("post"); // value1 
    if (postTitle.split(".").pop() === "html") {
        console.log('Loading legacy post!');
        getPost(postTitle, true);
    } else {
        getPost(postTitle);
    }
}

function loadPosts() {
    let postsSpot = document.getElementById("blogJS");

    posts.forEach((post, index) => {
        getPost(post, postsSpot);
    });
}

function generatePostLinks() {
    let postDiv = document.getElementById("main");
    postDiv.innerHTML += `<div class="postList">`;
    posts.forEach( (post, index) => {
        let postDate = post.split("_")[0];
        let title = titles[index];
        postDiv.innerHTML +=
                `<div class="post">
                <a id="${post}" onclick="window.location.href = 'post.html?post=${post}'"><h2 style="margin-bottom:0;">${title}</h2></a>
                <h3 style="margin-top:0;">${postDate}</h3>
                </div>`;
    });
    
    legacyPosts.forEach((post, index) => {
        let title = legacyTitles[index];
        let postDate = legacyDates[index];
        postDiv.innerHTML += 
                `<div class="post">
                <a id="${post}" onclick="window.location.replace('post.html?post=${post}')"><h2 style="margin-bottom:0;">${title}</h2></a>
                <h3 style="margin-top:0;">${postDate}</h3>
                </div>`;
    });
    postDiv.innerHTML += `</div>`;
}

