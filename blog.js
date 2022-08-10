// Used to generate a single post when you click on it from the homepage
function generatePost() {
    const params = new URLSearchParams(
      window.location.search
    );
    const postTitle = params.get("post"); 
    const target = document.getElementById("main");
    if (postTitle.split(".").pop() === "html") {
        console.log('Loading legacy post!');
        renderInOrder(target, [postTitle], true);
    } else {
        renderInOrder(target, [postTitle]);
    }
}

// Used to fetch descriptions of useful links on the useful links page
function generateUsefulLinks() {
    const linkPosts = ["useful_links/regexr.md", "useful_links/bash_colors.md"]; // TODO (willnilges): Move me to separate file
    const target = document.getElementById("main")
    renderInOrder(target, linkPosts);
}

// thanks ethan
// A better version of getPost() that is less dumb and ugly and stoopid
function renderInOrder(target, articles, legacy) {
    let baseUrl = './posts/md/';
    if (legacy === true) {
        baseUrl = './posts/'
    }
    Promise.allSettled(
        articles.map(
            item=>fetch(
                baseUrl + item
            ).then(
                response=>response.text()
            )
        )
    ).then(
        arr=>arr.forEach(
            item2=>{
                if (legacy) {
                    target.innerHTML += item2.value;
                } else {
                    target.innerHTML += markdown(item2.value);
                }
            }
        )
    );
}

// Generates the list of links on the homepage
function generatePostLinksOld() {
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

function generatePostLinks(target, postList, legacy) {
    target.innerHTML += `<div class="postList">`;
    postList.forEach((post, index) => {
        subTitle = "";
        if (post.date !== undefined) {
           subTitle = `<h3 style="margin-top:0;">${post.date}</h3>`
        }
        target.innerHTML +=
                `<div class="post">
                <a id="${post.filename}" onclick="window.location.href = 'post.html?post=${post.filename}'"><h2 style="margin-bottom:0;">${post.title}</h2></a>
                ${subTitle}
                </div>`;
    });
    target.innerHTML += `</div>`;
}

