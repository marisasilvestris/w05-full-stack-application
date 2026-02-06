//This file lets you create listings that appear on the page without a server//
//You can use this to test the client side without the server being set up//
//Helps you style on the client side too//
//in your html file, make sure to link this file instead of main.js//

const display = document.getElementById("app");
const form = document.getElementById("form");
const filterButtons = document.querySelectorAll(".category-btn");
const openFormBtn = document.getElementById("open-form-btn");
const closeFormBtn = document.getElementById("close-form-btn");
const listingPopup = document.getElementById("listing-popup");

let listingsData = [];

openFormBtn.addEventListener("click", () => {
  listingPopup.style.display = "flex";
});

closeFormBtn.addEventListener("click", () => {
  listingPopup.style.display = "none";
});

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
      const isHidden = body.style.display === "none";
      body.style.display = isHidden ? "block" : "none";
      viewBtn.textContent = isHidden ? "Hide Details" : "View Details";
    });

    card.append(title, category, brief, viewBtn, body);
    display.appendChild(card);
  });
}

// Category filtering
function filterByCategory(category) {
  if (category === "all") {
    displayListings(listingsData);
  } else {
    const filtered = listingsData.filter(l => l.category === category);
    displayListings(filtered);
  }
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterByCategory(button.dataset.category);
  });
});

// Add new listing
form.addEventListener("submit", event => {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(form));
  listingsData.push(formData);
  form.reset();
  listingPopup.style.display = "none";
  displayListings(listingsData);
});


openFormBtn.addEventListener("click", () => {
  popup.style.display = "flex";
});

closeFormBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

popup.addEventListener("click", e => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});

form.addEventListener("submit", event => {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(form));
  listingsData.push(formData);

  form.reset();
  popup.style.display = "none";
  displayListings(listingsData);
});
