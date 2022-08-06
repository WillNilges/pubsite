function getPostMd(filename) {
    let posts = [ "test.md" ];
    let target = document.getElementById("blogJS");
    posts.forEach((post, index) => {
        console.log(post);
        fetch('./posts/md/test.md')
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Whoops! Can\'t get post. Status Code: ' +
                response.status);
              return;
            }

            // Examine the text in the response
           response.text().then(function(data) {
                console.log(data);
                target.innerHTML = markdown(data);
            }); 
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
    });
}

function getPostHtml(filename) {
    
}

getPostMd();
