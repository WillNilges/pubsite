/*function revealPost(String post){
    var x = document.getElementById(post);
    
}*/
function makeTogglable(){
    var z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        //element = z[i];
        if (z[i].id.includes("title") && z[i+1].id.includes("post")) {
            togglePost(z[i].id, z[i+1].id);
        }
    }
}

function togglePost(title_id, post_id) {
    title = document.getElementById(title_id);
    post = document.getElementById(post_id);
    post.style.display = "none";
   
    title.addEventListener('click', function(){
        hideNShow(post); 
    });
}

function hideNShow(post){
    if (post.style.display === "none") {
        post.style.display = "block";
        var replace = post.innerHTML.replace(title.innerHTML, ' ');
        post.innerHTML = replace;
    } else {
        post.style.display = "none";
    }
}

//var myEl = document.getElementById('subnetting_and_forgetting_title');
//var x = document.getElementById('subnetting_and_forgetting');
//
//myEl.addEventListener('click', function() {
//    if (x.style.display === "none") {
//        x.style.display = "block";
//    } else {
//        x.style.display = "none";
//    }
//}, false);
