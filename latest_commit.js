function latest_commit() { 
    fetch(
      "https://api.github.com/repos/willnilges/willnilges.github.io/branches/master"
    )
      .then(response => {
        response.json().then(json => {
          console.log(json);
          var date = json.commit.commit.author.date;
          var datearray = date.split('T');
          console.log(datearray[0]);
          document.getElementById("latest_commit").innerHTML = datearray[0];
        });
      })
      .catch(error => {
        console.log(error);
      });
}

