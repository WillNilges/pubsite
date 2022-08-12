function togglePost(title_id, post_id) {
    let title = document.getElementById(title_id);
    let post = document.getElementById(post_id);
    if (window.innerWidth < 800) { // The 800px is defined in the CSS document :3
    post.style.display = "none";
    }
   
    title.addEventListener('click', function(){
        hideNShow(post); 
    });
}

function hideNShow(post){
    if (window.innerWidth < 800) {
        if (post.style.display === "none") {
            post.style.display = "block";
            //var replace = post.innerHTML.replace(title.innerHTML, ' ');
            //post.innerHTML = replace;
        } else {
            post.style.display = "none";
        }
    }
}

export { togglePost, hideNShow };
