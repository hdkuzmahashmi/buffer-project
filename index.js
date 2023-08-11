const pisSpan = document.querySelector("[data-js=people-in-space]");
const btnAll = document.querySelector("[data-js=btn-all]");
const btnIss = document.querySelector("[data-js=btn-iss]");
const btnTia = document.querySelector("[data-js=btn-tia]");
const section = document.querySelector("[data-js=section]");

btnAll.addEventListener("click", getPeopleInSpace);

btnIss.addEventListener("click", getIssPeopleInSpace);

btnTia.addEventListener("click", getTiangongPeopleInSpace);

async function getPeopleInSpace() {
  const url = "http://api.open-notify.org/astros.json";
  const respone = await fetch(url);
  const data = await respone.json();
  pisSpan.textContent = data.number;

  createPeopleElement(data.people);
}
async function getIssPeopleInSpace() {
  const url = "http://api.open-notify.org/astros.json";
  const respone = await fetch(url);
  if (!respone.ok) {
    return;
  }
  const data = await respone.json();
  console.log(data.people);
  const issPeople = data.people.filter((f) => f.craft == "ISS");
  pisSpan.textContent = issPeople.length;

  createPeopleElement(issPeople);
}

async function getTiangongPeopleInSpace() {
  const url = "http://api.open-notify.org/astros.json";
  const respone = await fetch(url);
  if (!respone.ok) {
    return;
  }
  const data = await respone.json();
  console.log(data.people);
  const issPeople = data.people.filter((f) => f.craft == "Tiangong");
  pisSpan.textContent = issPeople.length;
  createPeopleElement(issPeople);
}

function createPeopleElement(people) {
  section.innerHTML = "";
  const ul = document.createElement("ul");
  people.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = element.name;
    li.style.color = "white";
    const small = document.createElement("small");
    small.textContent = element.craft;
    small.style.color = "red";
    li.append(small);
    ul.append(li);
  });
  section.append(ul);
}
