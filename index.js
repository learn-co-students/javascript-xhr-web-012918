function getRepositories() {
  const req = new XMLHttpRequest();

  req.open("GET", 'https://api.github.com/users/jaf7/repos');
  req.addEventListener("load", showRepositories);
  req.send();
}

function showRepositories(event, data) {
  // (*this* is set to the XMLHttpRequest object that fired the event)
  const resp = JSON.parse(this.responseText);
  console.dir(resp)
  let repoList = "<ul>";
  repoList += resp.map( repo => "<li>" + `<a href=${repo.html_url} target="_blank">${repo.name}</a>`
                                + " - " + `<a href="#" data-repo=${repo.name} onclick="getCommits(this)">Get These Commits</a>`
                                + "</li>"
                      ).join('');
  repoList += "</ul>";
  document.querySelector('#repositories').innerHTML = repoList;
}

function getCommits(anchorElement) {
  const req = new XMLHttpRequest();
  const commitName = anchorElement.dataset.repo;
  req.open("GET", `https://api.github.com/repos/jaf7/${commitName}/commits`);
  req.addEventListener("load", showCommits);
  req.send();
}

function showCommits(event, data) {
  const resp = JSON.parse(this.responseText);
  let commitsList = "<ul>"
  commitsList += resp.map( commitItem => "<li>" + `${commitItem.commit.message}`
                                         + " - " + `<a href=${commitItem.html_url} target="_blank">View This Commit</a>`
                                         + "</li>"
                         ).join('');
  commitsList += "</ul>";
  document.querySelector('#commits').innerHTML = commitsList
}