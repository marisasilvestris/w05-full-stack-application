//This file lets you create listings that appear on the page without a server//
//You can use this to test the client side without the server being set up//
//Helps you style on the client side too//
//in your html file, make sure to link this file instead of main.js//

const display = document.getElementById("app");
const form = document.getElementById("form");

const listingsData = [];

function displayListings() {
    display.innerHTML = "";

listingsData.forEach(listing => {
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

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
const formData = Object.fromEntries(new FormData(form));
listingsData.push(formData); 

form.reset();
displayListings(); 
});