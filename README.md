
# Meme Vault
A place for the memes. Your memes. The weird ones, the cursed ones, the ones that live rent-free in your brain. Meme Vault is your gateway to community-curated meme collections. Tag, rate, favorite, and share your humor with the world.

## What is this?

A fully functional MEN Stack CRUD app (MongoDB + Express + Node.js) that lets users:
	•	🖼️ Upload/Create, Collect and Share your best memes
	•	🏷️ Tag them with moods like “relatable” or “chaotic good”
	•	💥 Delete them when they stop being funny

All wrapped in a sweet, minimalist Bootstrap UI that makes your memes look as good as they probably don’t deserve. Be sure to check out Dark Mode for that home theater vibe.


[Inigo Montoya](https://raw.githubusercontent.com/shawnhank/meme-vault/refs/heads/main/public/images/Hero-Elf4IhEXUAApPJQ.jpeg)<!-- {"preview":"true"} -->


# 🔥 Project Overview
Meme Vault is a full-stack content-sharing platform built with the MEN stack (MongoDB, Express, Node.js) and EJS. Users can sign up for a free account, post memes, explore community creations, and interact through favorites, tags, and (soon) ratings. It mixes classic CRUD (Create, Read, Updaet and Delete) features  with modern UX to create a playful yet structured app for all things meme.

I built Meme Vault to push my software development skills, blending authentication, session control, real-time data relationships, and responsive UI polish. It's the most complete project I've shipped to date.

This app was built based on requirements for the General Assembly Software Engineering Bootcamp. Here are the [Project Requirements  ➝](https://github.com/shawnhank/meme-vault/blob/main/docs/MEN%20Stack%20CRUD%20App%20Project%20Requirements.md)


Fun fact: the landing page video was AI-generated with runway.ml!


# 🚀 Free Live Demo
You can access Meme Vault at:
* ~[https://memevault.thisdemo.rocks](https://memevault.thisdemo.rocks/)~
* ~[https://mv.thisdemo.rocks](https://mv.thisdemo.rocks/)~
⠀These are hosted on a personal VPS with strict HTTPS security via Cloudflare tunnels.

⠀Hosted on Heroku as well
* ~[https://ga-meme-vault-7f99ef07fc82.herokuapp.com](https://ga-meme-vault-7f99ef07fc82.herokuapp.com/)~

with a couple of DNS aliases to my own domain:
* ~[https://ga-meme-vault.thisdemo.rocks](https://ga-meme-vault.thisdemo.rocks/)~
* ~[https://ga-mv-thisdemo.rocks](https://ga-mv-thisdemo.rocks/)~


# 📸 Screenshots
*Placeholders — swap in final screenshots* [Landing Page - Dark Mode](https://raw.githubusercontent.com/shawnhank/meme-vault/refs/heads/main/public/images/screenshots/meme-vault-app-screenshots_22.png)
[Landing Page - Light Mode](https://raw.githubusercontent.com/shawnhank/meme-vault/refs/heads/main/public/images/screenshots/meme-vault-app-screenshots-24.png) [All Memes Index View](https://raw.githubusercontent.com/shawnhank/meme-vault/refs/heads/main/public/images/screenshots/meme-vault-app-screenshots_12.png)
[Meme Detail View](https://raw.githubusercontent.com/shawnhank/meme-vault/refs/heads/main/public/images/screenshots/meme-vault-app-screenshots_25.png) [User Profile](https://raw.githubusercontent.com/shawnhank/meme-vault/refs/heads/main/public/images/screenshots/meme-vault-app-screenshots_19.png)
[Edit Profile]([meme-vault-app-screenshots_26](https://raw.githubusercontent.com/shawnhank/meme-vault/refs/heads/main/public/images/screenshots/meme-vault-app-screenshots_26.png))
[Favorites View - Dark](https://raw.githubusercontent.com/shawnhank/meme-vault/refs/heads/main/public/images/screenshots/meme-vault-app-screenshots_15.png)
[Favorites View - Light](https://raw.githubusercontent.com/shawnhank/meme-vault/refs/heads/main/public/images/screenshots/meme-vault-app-screenshots_14.png)
[View by Tags/Categories](https://raw.githubusercontent.com/shawnhank/meme-vault/refs/heads/main/public/images/screenshots/meme-vault-app-screenshots_10.png)
[404](https://raw.githubusercontent.com/shawnhank/meme-vault/refs/heads/main/public/images/screenshots/meme-vault-app-screenshots_6.png)

# 🧠 Key Features
### ✅ Core MVP
* Full auth system with bcrypt, session-based login
* Meme CRUD: create, view, edit, delete
* Flash (disappering) status messages
* Profile pages with meme ownership display
* Community directory with profile navigation & Avatars courtesy of DiceBear
* Search bar with keyword matching (Memes, Tags, Users)
* Responsive layout using Bootstrap 5 (wiith Dark Mode)


⠀✨ Bonus Features
* Favorites: users can save memes and view a personalized collection
* Tags: owner-defined tags per meme + tag browser
* Thumbnail image grid layout with hover overlya interactivity
* Multi-image support (up to 3 per meme)
* DiceBear avatars tied to each user
* Creator/Owner profile links from every meme
* 404 page with friendly fallback


⠀See the ~[Full Feature Tracker](https://raw.githubusercontent.com/shawnhank/meme-vault/refs/heads/main/docs/meme-vault-feature-tracker.md)~ for even more enhancements.

# 🧱 Tech Stack
* **MongoDB + Mongoose**: data models, relations, and population
* **Express + Node.js**: routes, controllers, session config
* **EJS**: server-rendered views with Bootstrap styling
- **HTML, CSS & JavaScript**
* **Bootstrap 5**: grid layout, responsive forms, navs, and buttons
* **RunwayML**: used for hero video creation
* **Cloudflare + Cloudflared**: DNS, Tunneling App Access to VPS
- **Multer (future enhancment)**: setup ready for local file uploads
⠀
# 🗂 Project Structure
This project uses a standard MEN stack layout with some opinionated enhancements for clarity and reusability.
See: ~[Project Structure & Layout](https://raw.githubusercontent.com/shawnhank/meme-vault/refs/heads/main/docs/meme-vault-project-structure.md)~

# 🔄 Data Relationships
This project uses all three major relationship types:
* **One-to-One**: each user has one avatar seed
* **One-to-Many**: users create many memes
* **Many-to-Many** (via join models):
  * Memes ↔ Tags (through TagAssignment)
  * Memes ↔ Users (via Favorites)
  * (Future) Memes ↔ Ratings, Comments

⠀See: ~[Data Model Diagram](https://raw.githubusercontent.com/shawnhank/meme-vault/refs/heads/main/docs/meme-vault-data-models.png)~ and the [Add Meme Workflow Diagram](https://raw.githubusercontent.com/shawnhank/meme-vault/refs/heads/main/docs/add-meme-full-flow-diagram.png)

# 📊 RESTful Routes + Access Control
Meme Vault uses standard RESTful conventions with method-override and ownership protection.
See: ~[Full Routes Map ➝](https://github.com/shawnhank/meme-vault/blob/main/docs/meme-vault-restful-routes.md)~

# 🧪 Manual QA Checklist
This project was tested using a full scenario-based manual QA system:
* Auth flow (register, login, logout)
* CRUD on memes w/ success/failure flash
* Favorites UX + profile integration
* Tags display + tag-based filtering
* Ownership-based edit/delete protection
* User navigation + community view
* 404 handling and fallback behavior

⠀More in ~[Testing & QA Docs ➝](https://github.com/shawnhank/meme-vault/blob/main/docs/meme-vault-manual-test-eval-checklist.md)~

# 🛠 Setup & Local Development
```
git clone https://github.com/shawnhank/meme-vault.git
cd meme-vault
npm install
cp .env.example .env
```

Fill in your .env file:
```PORT=3000
MONGODB_URI=mongodb://localhost:27017/meme-vault (local)
MONGODB_URI=ONGODB_URI=mongodb+srv://user:password@cluster#.4040404.mongodb.net/memes?retryWrites=true&w=majority&appName=cluster0 (hosted in the cloud Atlas, AWS, Azure, GCP, etc.)
SESSION_SECRET=shhhthisissecret
```

Then run:
```npm start```

More info in  the [Hosting Meme Vault Locally with Cloudflare Tunnels doc  ➝](https://github.com/shawnhank/meme-vault/blob/main/docs/hosting-meme-vault-locally.md)


# 🧭 Trello Board
Track the original planning and user stories: ~[Trello – Meme Vault Board](https://trello.com/b/fUwClIB4)~

# 🙌 Attributions
* **DiceBear Avatars**: ~[https://avatars.dicebear.com/](https://avatars.dicebear.com/)~
* **Bootstrap**: ~[https://getbootstrap.com](https://getbootstrap.com/)~
* **RunwayML** (hero video): ~[https://runwayml.com](https://runwayml.com/)~
* **Image Sources**: Giphy, Tenor, Know Your Meme, Wikipedia
* **Cloudflare / Cloudflared**: secure HTTPS tunneling
* **OpenAI: ChatCPT, Sora**: for logo and favicon

⠀
# 🎯 Next Steps
* Add ratings (1–5 stars, average rating per meme)
* Implement comment threads (nested, editable)
* Admin tools for moderation (stretch)
* Global sort + filter controls
* Image carousel on meme detail page

⠀See: ~[Roadmap & Icebox ➝](https://github.com/shawnhank/meme-vault/blob/main/docs/meme-vault-icebox.md)~

# ✨ Creator Note
This app was a blast to build. It pulls together everything I’ve learned in the bootcamp so far: from full-stack architecture to UI/UX polish and even AI-assisted creative assets. It’s my most complete and expressive work to date.
Thanks for checking it out — feedback welcome!
