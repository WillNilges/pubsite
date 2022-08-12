import { markdown } from "./drawdown.js";

// TODO (willnilges): One day I'll learn how to properly use Async... One day :')

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
                let renderedHTML = "";
                if (legacy) {
                    renderedHTML += item2.value;
                } else {
                    renderedHTML += markdown(item2.value);
                }
                target.innerHTML += `<div class="article">${renderedHTML}</div>`
            }
        )
    );
}

function generatePostLinks(target, postList, legacy) {
    target.innerHTML += `<div class="postList">`;
    postList.forEach((post, index) => {
        let subTitle = "";
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

const getContent = async function(content, legacy) {
    return fetch(content)
        .then(res=>res.text())
        .then(text=> {
            if (legacy) {
                return text;
            } else {
                return markdown(text);
            }
        });
}

export { getContent, generatePostLinks, renderInOrder, generatePost };
