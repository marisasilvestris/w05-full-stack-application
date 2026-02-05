const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});

const sections = {
  "/": "home",
  "/about": "about",
  "/contact": "contact"
};

function showPage(path) {
  const pageId = sections[path] || "home";

  document.querySelectorAll("main section").forEach(section => {
    section.style.display = "none";
  });

  document.getElementById(pageId).style.display = "block";
}

window.addEventListener("popstate", () => {
  showPage(window.location.pathname);
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const path = link.getAttribute("href");

    history.pushState({}, "", path);
    showPage(path);
  });
});

showPage(window.location.pathname);
