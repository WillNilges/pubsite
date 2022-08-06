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
    // posts.forEach((post, index) => {
    //     
    // });
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
        postDiv.innerHTML += `<div class="post">`;
        postDate = post.split("_")[0];
        fetch('./posts/md/' + post)
        .then(
            function(response) {
                response.text().then(function(data) {
                    let title = data.split('\n', 1)[0];
                    postDiv.innerHTML +=
                            `<a id="${post}" onclick="window.location.replace('post.html?post=${post}')"><h2 style="margin-bottom:0;">${title}</h2></a>`;
                    postDiv.innerHTML += `<h3 style="margin-top:0;">${postDate}</h3>`;
                    postDiv.innerHTML += `</div>`;
                }); 
            }
        );
    });
    /*
    postDiv.innerHTML += markdown('## Legacy Posts')
    postDiv.innerHTML += markdown('---')
    legacyPosts.forEach((post, index) => {
        postDiv.innerHTML += 
            `<a id="${post}" onclick="window.location.replace('post.html?post=${post}')">${post}</a><br>`;
    });
    postDiv.innerHTML += `</div>`;
    */
}

