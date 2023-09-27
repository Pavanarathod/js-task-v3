"use strict";
const repositoriesContainer = document.getElementById("repositories");
const loadingIndicator = document.getElementById("loading");

let page = 1;
const perPage = 30; // Number of repositories to load per page
let isLoading = false;

async function loadRepositories() {
  if (isLoading) return;

  isLoading = true;
  loadingIndicator.style.display = "block";

  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=topic:reactjs&page=${page}&per_page=${perPage}`
    );

    if (!response.ok) {
      throw new Error(`Error loading data: ${response.statusText}`);
    }

    const data = await response.json();
    const repositories = data.items;

    repositories.forEach((repo) => {
      // Create HTML elements for each repository and append to repositoriesContainer
      const repoElement = document.createElement("div");
      repoElement.className = "repo";
      repoElement.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description}</p>
        <p>Stars: ${repo.stargazers_count}</p>
      `;
      repositoriesContainer.appendChild(repoElement);
    });

    isLoading = false;
    loadingIndicator.style.display = "none";
    page++; // Increment page for the next load
  } catch (error) {
    console.error("Error:", error);
    isLoading = false;
    loadingIndicator.style.display = "none";
  }
}

// Initial load
loadRepositories();

// Infinite scroll
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadRepositories();
  }
});
