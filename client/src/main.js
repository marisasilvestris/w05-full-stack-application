const display = document.getElementById("app");
const form = document.getElementById("form");
const baseURL = "http://localhost:3000";

async function fetchListings() {
  let pathname = window.location.pathname;
  if (pathname === `/`) {
    pathname = `/listings`;
  }
  console.log(pathname);

  const response = await fetch(`${baseURL}${pathname}`);
  console.log(response);

  const listings = await response.json();

  return listings;
}
async function displayListings() {
  display.innerHTML = "";

  const listings = await fetchListings();

  listings.forEach((listing) => {
    const card = document.createElement("div");
    const title = document.createElement("h3");
    const name = document.createElement("p");
    const category = document.createElement("p");
    const brief = document.createElement("p");
    const body = document.createElement("p");
    const btnid = document.createElement(`button`);
    btnid.textContent = `go to listing ${listing.id}`;
    const btncat = document.createElement(`button`);
    btncat.textContent = `go to ${listing.category}`;

    title.textContent = listing.title;
    name.textContent = `Posted by: ${listing.name}`;
    category.textContent = `Category: ${listing.category}`;
    brief.textContent = listing.brief;
    body.textContent = listing.body;

    btnid.addEventListener(`click`, () => {
      window.location.pathname = `listing/${listing.id}`;
    });

    btncat.addEventListener(`click`, () => {
      window.location.pathname = `category/${listing.category}`;
    });

    card.append(title, btncat, name, category, brief, body, btnid);

    display.appendChild(card);
  });
}

displayListings();

async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);
  console.log(formData);
  const userInput = Object.fromEntries(formData);
  console.log(userInput);
  userInput.category = userInput.category.toLowerCase();
  console.log(userInput);

  await fetch(`${baseURL}/listings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });

  form.reset();

  displayListings();
}

form.addEventListener("submit", handleSubmit);
