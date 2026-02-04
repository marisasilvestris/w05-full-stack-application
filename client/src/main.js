// Get the container where listings will be displayed
const display = document.getElementById("app");

// Get the form element
const form = document.getElementById("form");

// Base URL of the Express server (must match app.listen port in server.js)
const baseURL = "http://localhost:3000";

// Fetch all listings from the server
async function fetchListings() {
  // Send GET request to the /listings endpoint
  const response = await fetch(`${baseURL}/listings`);

  // Convert the response into JavaScript data
  const listings = await response.json();

  // Return the listings so other functions can use them
  return listings;
}

// Display listings on the page
async function displayListings() {
  // Clear existing content to avoid duplicates
  display.innerHTML = "";

  // Get listings from the server
  const listings = await fetchListings();

  // Loop through each listing
  listings.forEach((listing) => {
    // Create elements for a listing card
    const card = document.createElement("div");
    const title = document.createElement("h3");
    const name = document.createElement("p");
    const category = document.createElement("p");
    const brief = document.createElement("p");
    const body = document.createElement("p");

    // Insert data from the database into elements
    title.textContent = listing.title;
    name.textContent = `Posted by: ${listing.name}`;
    category.textContent = `Category: ${listing.category}`;
    brief.textContent = listing.brief;
    body.textContent = listing.body;

    // Append all text elements to the card
    card.append(title, name, category, brief, body);

    // Append the card to the main display container
    display.appendChild(card);
  });
}

// Run displayListings when the page loads
displayListings();

// Handle form submission
async function handleSubmit(event) {
  // Prevent default page refresh
  event.preventDefault();

  // Collect data from the form
  const formData = new FormData(form);

  // Convert form data into a plain object
  const userInput = Object.fromEntries(formData);

  // Send POST request to server with form data
  await fetch(`${baseURL}/listings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });

  // Reset the form
  form.reset();

  // Refresh listings to show the new post
  displayListings();
}

// Listen for the form submit event
form.addEventListener("submit", handleSubmit);

