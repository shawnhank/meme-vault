
# ⛑️ Challenges & Lessons Learned
### 🔁 Refactoring Challenges: Retrofitting Authentication and Modular Architecture

Refactoring the app to support authentication and multiple data models introduced significant complexity — especially because we had already built a working CRUD system with memes as the primary focus. Once we introduced users, sessions, ownership logic, and profile features, much of the original single-model, single-controller structure had to be re-evaluated and broken apart. This wasn’t just an add-on — it was a backwards re-architecture.

The biggest pain point was **splitting logic that had been written for a flat, anonymous experience** and redistributing it across multiple controllers (auth, users, memes, favorites, ratings, tags). Routes had to be reorganized so that they mapped cleanly to each controller, with appropriate middleware layered in for isLoggedIn and isOwner where needed. In many cases, this meant pulling logic *out* of server.js and untangling view assumptions that no longer made sense in a multi-user, multi-model app — like assuming any user could edit or delete any meme.

We also had to **retrofit session awareness into views and route guards**, making sure req.session.user and res.locals.currentUser were correctly wired into every action and view layer. Partial views like the nav bar, meme cards, and profile headers had to be rewritten to check for ownership, login state, and conditional features (e.g., show Edit/Delete buttons only if the logged-in user owns the meme). This was especially tricky in shared components where we had previously assumed a simple data shape and no user-specific logic.

Retrofitting after MVP also meant many features had to be un-done and reimplemented using better separation of concerns — e.g., moving validation logic into middleware, abstracting flash message helpers, and using consistent layout partials. It slowed us down temporarily, but long-term gave the app the structure needed to support community features, profile systems, and stretch goals like tags, ratings, and favorites — all while keeping the codebase maintainable and testable.

⸻

### 🐛 Bug Reflection: Favorite Logic Broke When Switching to Multiple Images

When we upgraded the Meme model from using a single imageUrl field to an array of imageUrls (to support up to 3 media items per meme), we encountered an unexpected issue with the favorites system. The favorite model and controller logic still worked fine under the hood — users could still favorite and unfavorite memes — but the **UI display and logic in our views began to break silently**.

The core problem stemmed from partials and views that had previously been written under the assumption that meme.imageUrl was a single string. When we changed that field to meme.imageUrls[], the favorites page and the community member profile view both tried to render <img src="<%= meme.imageUrl %>">, which silently failed because the property no longer existed. This meant meme thumbnails weren’t appearing, and the favorite/unfavorite buttons were sometimes not conditionally rendered properly — especially in shared partials that expected a simple string URL.

Fixing this required a sweep through all views and logic that referenced imageUrl, replacing it with imageUrls[0] where appropriate (to show the first image), and updating conditionals and loops to account for the array format. We also had to update the favorite controller to ensure that it still correctly populated and displayed memes in all relevant contexts using the updated structure.

⸻

### ⭐️ Ratings System Challenges: One Rating per User, Clean Display, No Duplicates (WIP)

Implementing a 1–5 star rating system brought several architectural and UX challenges that didn’t surface during simpler features like favorites or tags. The goal was clear: allow logged-in users to rate memes, one rating per meme, and show the average rating on both the meme detail and index pages. But enforcing that logic cleanly and efficiently required multiple layers of change.

The **first major challenge** was ensuring **only one rating per user per meme**. We solved this with a compound index on the Rating model (user + meme), and used .findOneAndUpdate() with { upsert: true } in the controller to update the rating if it already existed or create it if it didn’t. Without this, duplicate ratings were possible, which polluted the average and made the UX inconsistent.

The **second challenge** was in the view logic — especially when showing the user’s existing rating. We had to conditionally render the input field’s default value based on whether the user had rated the meme before. This meant carefully checking if a rating existed and dynamically updating the button text to “Update Rating” or “Submit Rating” depending on context.

The **final complexity** was computing and displaying the average rating without affecting performance. We had to pull all ratings for a meme in the show and index controllers, calculate the average, and inject it back into the meme objects for rendering — all without altering the original schema. This required wrapping the ratings fetch and average calculation in a Promise chain and using Promise.all() to avoid N+1 query issues on the index view.

Overall, the ratings feature added a lot of value to user engagement — but also taught us how even small social features can have nontrivial data constraints, view implications, and user-flow edge cases that require careful full-stack coordination.


