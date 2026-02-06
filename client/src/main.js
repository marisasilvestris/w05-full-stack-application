const display = document.getElementById("app");
const form = document.getElementById("form");
const popUp = document.getElementById("listing-popup");
const openFormBtn = document.getElementById("open-form-btn");
const closeFormBtn = document.getElementById("close-form-btn");
const filterButtons = document.querySelectorAll(".category-btn");
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
    card.className = "listing-card";

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
      const isHidden = body.style.display === "none";
      body.style.display = isHidden ? "block" : "none";
      viewBtn.textContent = isHidden ? "Hide Details" : "View Details";
    });

    card.append(title, category, brief, viewBtn, body);
    display.appendChild(card);
  });
}

function filterByCategory(category) {
  if (category === "all") {
    displayListings(listingsData);
  } else {
    const filtered = listingsData.filter(
      listing => listing.category === category
    );
    displayListings(filtered);
  }
}


// Category buttons
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterByCategory(button.dataset.category);
  });
});

// Pop-up form
openFormBtn.addEventListener("click", () => {
  popUp.style.display = "flex";
});

closeFormBtn.addEventListener("click", () => {
  popUp.style.display = "none";
});

popUp.addEventListener("click", e => {
  if (e.target === popUp) {
    popUp.style.display = "none";
  }
});

// Form submit
async function handleSubmit(event) {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(form));
  
  await fetch(`${baseURL}/listings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  form.reset();
  popUp.style.display = "none";
  fetchListings();
}

form.addEventListener("submit", handleSubmit);

fetchListings();

