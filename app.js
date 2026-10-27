const postList = document.querySelector("#post-list");
const status = document.querySelector("#status");
const searchInput = document.querySelector("#search-input");

let posts = [];

function renderPosts(items) {
  if (!items.length) {
    postList.innerHTML = "";
    status.textContent = "No stories match your search.";
    return;
  }

  status.textContent = `${items.length} stories`;
  postList.innerHTML = items
    .map(
      (post, index) => `
        <article class="post-card">
          <div class="post-number">0${index + 1}</div>
          <p class="post-meta">Journal · 5 min read</p>
          <h3>${post.title}</h3>
          <p>${post.body.replace(/\n/g, " ")}</p>
          <a href="#post-${post.id}" aria-label="Read ${post.title}">Read story <span>↗</span></a>
        </article>`
    )
    .join("");
}

async function loadPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6");
    if (!response.ok) throw new Error("Unable to load posts");
    posts = await response.json();
    renderPosts(posts);
  } catch (error) {
    status.textContent = "Could not load stories. Please refresh and try again.";
    console.error(error);
  }
}

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase().trim();
  renderPosts(
    posts.filter((post) => `${post.title} ${post.body}`.toLowerCase().includes(query))
  );
});

document.querySelector("#year").textContent = new Date().getFullYear();
loadPosts();
