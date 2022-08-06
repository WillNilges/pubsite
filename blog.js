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
                console.log(data);
                if (legacy) {
                    target.innerHTML = data;
                } else {
                    target.innerHTML = markdown(data);
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

getPost("test.md", document.getElementById("blogJS"));
