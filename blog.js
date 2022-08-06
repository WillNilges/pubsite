var posts = [
    "2021-09-11_recovering_an_okd4_worker.md",
    "2021-09-11_selinux_httpd.md",
    "2021-09-05_Gitea_on_OKD4.md",
    "2021-08-27_okd4_but_again.md",
    "2021-08-13_restoring_old_project.md",
    "2021-08-07_firewalld_services_blocker.md",
    "2020-12-12_a_tldr_on_okd4.md",
    "2020-05-17_subnetting_and_forgetting.md",
];

function getPost(post, target, legacy=false) {
    console.log(post);
    fetch('./posts/md/' + post)
    .then(
        function(response) {
            if (response.status !== 200) {
              console.log('Whoops! Can\'t get post. Status Code: ' +
                response.status);
              return;
            }

            // Examine the text in the response
           response.text().then(function(data) {
                //console.log(data);
                if (legacy) {
                    target.innerHTML += data;
                } else {
                    target.innerHTML += markdown(data);
                }
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

function loadPosts() {
    let postsSpot = document.getElementById("blogJS");

    posts.forEach((post, index) => {
        getPost(post, postsSpot);
    });
}

function generatePostLinks() {
    let postDiv = document.getElementById("blogJS");
    posts.forEach((post, index) => {
        postDiv.innerHTML += `<a id="${post}" onclick="window.location.replace('post.html')">${post}</a><br>`;
        
    });
}

//getPost("test.md", document.getElementById("blogJS"));

//loadPosts();


generatePostLinks();
