//global variable for div class
const userData = document.querySelector(".user-data");
const username = "aaddis75";
const repoList = document.querySelector(".repo-list");

const viewReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const repos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

const github = "https://api.github.com";
const url = `${github}/users/${username}`;
const reposUrl = `${github}/users/${username}/repos?sort=updated&per_page=100`;

const getUserData = async function () {
  const response = await fetch(url);
  const data = await response.json();
  //console.log(data);
  displayUserInfo(data);
};

const fetchRepos = async function () {
  const response = await fetch(reposUrl);
  const data = await response.json();
  console.log(data);
  displayInfo(data);
};

const displayUserInfo = function (data) {
  const userInfo = document.createElement("div");
  userInfo.classList.add("user-info");

  userInfo.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <p><strong>Name:</strong> ${data.name}</p>
    <p class="bio"><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  `;
  userData.append(userInfo);
  fetchRepos();
};

const displayInfo = function (repos) {
  document.querySelector(".search-container").classList.remove("hide");
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    const repoButton = document.createElement("button");
    repoButton.classList.add("repo-name");
    repoButton.innerText = repo.name;
    repoItem.append(repoButton);
    repoList.append(repoItem);
  }
};

getUserData();

repoList.addEventListener("click", function (e) {
  if (e.target.matches(".repo-name")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

const getRepoInfo = async function (repoName) {
  const repoUrl = `${github}/repos/${username}/${repoName}`;
  const response = await fetch(repoUrl);
  const repoInfo = await response.json();
  console.log(repoInfo);
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();

  const languages = [];
  for (const key in languageData) {
    languages.push(key);
  }

  displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
  repoData.innerHTML = "";
  const repoInfoDiv = document.createElement("div");
  repoInfoDiv.classList.add("repo-info");
  repoInfoDiv.innerHTML = `
<h3>Name: ${repoInfo.name}</h3>
<p>Description: ${repoInfo.description}</p>
<p>Default Branch: ${repoInfo.default_branch}</p>
<p>Languages: ${languages.join(", ")}</p>
<a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
`;
  viewReposButton.classList.remove("hide");
  repoData.classList.remove("hide");
  repos.classList.add("hide");
  repoData.append(repoInfoDiv);
};

viewReposButton.addEventListener("click", function () {
  repos.classList.remove("hide");
  repoData.classList.add("hide");
  viewReposButton.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
  const searchText = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const lowerCaseSearchText = searchText.toLowerCase();

  for (const repo of repos) {
    const repoText = repo.innerText.toLowerCase();
    if (repoText.includes(lowerCaseSearchText)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});
