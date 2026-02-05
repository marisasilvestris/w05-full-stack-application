const display = document.getElementById("app");
const form = document.getElementById("form");
const baseURL = "http://localhost:3000";
let listingsData = [];

async function fetchListings() {
  const response = await fetch(`${baseURL}/listings`);
  listingsData = await response.json();
  displayListings(listingsData);
}

function displayListings(listings) {
  display.innerHTML = "";

listings.forEach(listing => {
  const card = document.createElement("div");
  const title = document.createElement("h3");
  const category = document.createElement("p");
  const brief = document.createElement("p");
  const body = document.createElement("p");
  const viewBtn = document.createElement("button");

title.textContent = listing.title;
category.textContent = `Category: ${listing.category}`;
brief.textContent = listing.brief;
body.textContent = listing.body;
body.style.display = "none";

viewBtn.textContent = "View Details";
viewBtn.addEventListener("click", () => {
  if (body.style.display === "none") {
    body.style.display = "block";
    viewBtn.textContent = "Hide Details";
  } else {
    body.style.display = "none";
    viewBtn.textContent = "View Details";
  }
});

card.append(title, category, brief, viewBtn, body);
display.appendChild(card);
  });
}

function filterByCategory(category) {
  if (category === "all") {
    displayListings(listingsData);
  } else {
    const filtered = listingsData.filter(l => l.category === category);
    displayListings(filtered);
  }
}

document.querySelectorAll(".category-btn").forEach(button => {
  button.addEventListener("click", () => {
    filterByCategory(button.dataset.category);
  });
});

async function handleSubmit(event) {
  event.preventDefault();

const formData = new FormData(form);
const userInput = Object.fromEntries(formData);

await fetch(`${baseURL}/listings`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(userInput)
  });

form.reset();
fetchListings();
}

form.addEventListener("submit", handleSubmit);

fetchListings();
