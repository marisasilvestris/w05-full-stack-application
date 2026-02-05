//This file lets you create listings that appear on the page without a server//
//You can use this to test the client side without the server being set up//
//Helps you style on the client side too//
//in your html file, make sure to link this file instead of main.js//

const display = document.getElementById("app");
const form = document.getElementById("form");
const filterButtons = document.querySelectorAll(".category-btn");

let listingsData = [];

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

function filterByCategory(category) {
    if (category.toLowerCase() === "all") {
    displayListings(listingsData);
} else {
    const filtered = listingsData.filter(
        listing => listing.category === category
    );
    displayListings(filtered);
}
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
    filterByCategory(button.dataset.category);
  });
});

form.addEventListener("submit", event => {
    event.preventDefault();

const formData = Object.fromEntries(new FormData(form));
listingsData.push(formData);

form.reset();
displayListings(listingsData);
});
