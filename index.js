

function getRepositories() {
  const request = new XMLHttpRequest()
    request.addEventListener("load", showRepositories);
    request.open("GET",'https://api.github.com/users/octocat/repos')
    request.send()
};

function getCommits(el) {
  const name = el.dataset.repo
  const request = new XMLHttpRequest()
  request.addEventListener("load",showCommits)
  request.open("GET", "https://api.github.com/repos/octocat/" + name + "/commits")
  request.send()
}

function showRepositories(event, data ) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
 const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
    document.getElementById("repositories").innerHTML = repoList
};

function showCommits () {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
};
