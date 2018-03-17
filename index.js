//XHR = XMLHttpRequest for transferring data between client and server


//1. make a request
function getRepositories() {
  //create new instance of XMLHttpRequest
  const req = new XMLHttpRequest()

  //for handling response #2
  req.addEventListener('load', showRepositories);

  //call open with HTTP verb and URI for the request
  req.open('GET', 'https://api.github.com/users/octocat/repos')

  //call send to make it happen
  req.send()
}

//2. handling the response
function showRepositories(event, data) {
  let repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="'+ r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join(' ')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

//1. getting commits request
function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener('load', showCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}

//2. handling the response of commits request
function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join(' ')}`
  document.getElementById("commits").innerHTML = commitsList
}
