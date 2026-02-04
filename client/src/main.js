const display = document.getElementById("app");
const form = document.getElementById("form");
const baseURL = "http://localhost:3000";

async function fetchListings() {
  const response = await fetch(`${baseURL}/listings`);
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

    title.textContent = listing.title;
    name.textContent = `Posted by: ${listing.name}`;
    category.textContent = `Category: ${listing.category}`;
    brief.textContent = listing.brief;
    body.textContent = listing.body;
    
    card.append(title, name, category, brief, body);

    display.appendChild(card);
  });
}

displayListings();

async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const userInput = Object.fromEntries(formData);

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

