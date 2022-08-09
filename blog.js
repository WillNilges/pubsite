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

/*function loadPosts() {
    let postsSpot = document.getElementById("blogJS");

    posts.forEach((post, index) => {
        getPost(post, postsSpot);
    });
}*/

function generatePostLinks() {
    let postDiv = document.getElementById("main");
    postDiv.innerHTML += `<div class="postList">`;
    postObj.forEach( (post, index) => {
        postDiv.innerHTML +=
                `<div class="post">
                <a id="${post.filename}" onclick="window.location.href = 'post.html?post=${post.filename}'"><h2 style="margin-bottom:0;">${post.title}</h2></a>
                <h3 style="margin-top:0;">${post.date}</h3>
                </div>`;
    });
    legacyPostObj.forEach((post, index) => {
        postDiv.innerHTML += 
                `<div class="post">
                <a id="${post.filename}" onclick="window.location.replace('post.html?post=${post.filename}')"><h2 style="margin-bottom:0;">${post.title}</h2></a>
                <h3 style="margin-top:0;">${post.date}</h3>
                </div>`;
    });
    postDiv.innerHTML += `</div>`;
}

