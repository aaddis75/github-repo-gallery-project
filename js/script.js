//global variable for div class
const userData = document.querySelector(".user-data");
const username = "aaddis75";

const github = "https://api.github.com";
const url = `${github}/users/${username}`;

const getUserData = async function () {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  displayUserInfo(data);
};



const displayUserInfo = function (data) {
  const userInfo = document.createElement("div");
  userInfo.classList.add("user-info");

  userInfo.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  `;
  userData.append(userInfo);
};

getUserData();
