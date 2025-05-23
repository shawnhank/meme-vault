// ratings.js — controls star click rating and delete rating functionality for a meme

document.addEventListener("DOMContentLoaded", () => {
  // Locate the star rating container on the page
  const container = document.querySelector("#star-rating");

  // Locate the "Remove Rating" button on the page
  const deleteBtn = document.querySelector("#delete-rating");

  // If the container exists, setup the star rating logic
  if (container) {
    const stars = Array.from(container.querySelectorAll(".star")); // all ★ elements
    const memeId = container.dataset.memeId; // pulled from data attribute
    const userRating = +container.dataset.userRating; // user's existing rating

    // Highlight saved rating on page load
    if (userRating) {
      stars.forEach(star => {
        if (+star.dataset.value <= userRating) {
          star.classList.add("selected");
        }
      });
    }

    // Add hover effect to preview rating
    stars.forEach(star => {
      star.addEventListener("mouseenter", () => {
        const value = +star.dataset.value;
        stars.forEach(s => {
          s.classList.toggle("hover", +s.dataset.value <= value);
        });
      });

      star.addEventListener("mouseleave", () => {
        stars.forEach(s => s.classList.remove("hover"));
      });

      // Click to rate
      star.addEventListener("click", async () => {
        const value = +star.dataset.value;
        try {
          await fetch(`/ratings/${memeId}/ratings`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `value=${value}`
          });
          alert("Rating saved!");
          location.reload(); // reload to update average + visual state
        } catch (err) {
          console.error("Rating submission failed:", err);
          alert("There was a problem saving your rating.");
        }
      });
    });
  }

  // If the "Remove Rating" button exists, attach delete logic
  if (deleteBtn) {
    const memeId = document.querySelector("#star-rating")?.dataset.memeId;
    if (memeId) {
      deleteBtn.addEventListener("click", async () => {
        try {
          await fetch(`/ratings/${memeId}/ratings`, { method: "DELETE" });
          location.reload(); // reload to reflect cleared rating
        } catch (err) {
          console.error("Rating deletion failed:", err);
          alert("Could not remove your rating.");
        }
      });
    }
  }
});