
# 📺 Meme Vault – MVP Build Tracker

> **Status:** All features with an X are implemented and live.
---

## 📁 Phase 1 – Codebase Structure & Cleanup

- [x] Extracted route and controller logic for memes, users, tags, favorites, authentication
- [x] Set up User model with email + hashed password (bcrypt)
- [x] Created `isLoggedIn` and `isOwner` middleware
- [x] Integrated `connect-flash` and `res.locals` helpers
- [x] Moved business logic from `server.js` into proper controllers

---

## 🔐 Phase 2 – Authentication & Sessions

- [x] Full login, register, logout system (session-based)
- [x] Auth views: `register.ejs` and `login.ejs`
- [x] Validates name, email, password fields (incl. confirm match)
- [x] Handles duplicate email + shows flash errors
- [x] Passwords stored securely with bcrypt
- [x] Middleware protection on meme create/edit/delete routes
- [x] Stores `createdBy` in Meme model using session user ID

---

## 👤 Phase 3 – User Profiles & Ownership

- [x] Created `/users/:id` public profile route and view
- [x] Profile page lists all memes created by that user
- [x] `/community` route lists all users with links to profile pages
- [x] Profile edit route/view with prefilled form
- [x] Implemented secure password change flow (validation, hash)
- [x] "Edit Profile" and "Change Password" visible only to logged-in owner

---

## 🎨 Phase 4 – UX & UI Polish

- [x] Dynamic nav links for visitors vs. logged-in users
- [x] Bootstrap flash message styling with dismissible alerts
- [x] Accessible `alt` text added to all images
- [x] Fallback 404 route + `views/404.ejs` template
- [x] Shared form partial for `new` and `edit` views (`_form.ejs`)
- [x] Consistent button visibility logic (edit/delete) based on ownership
- [x] Bootstrap-based layout and responsive design polish

---

## 🧪 Phase 5 – Testing & QA

- [x] Manual test pass:
  - Navigation, public access
  - Meme CRUD (ownership validated)
  - Flash message flow
  - Profile features and route protection
  - 404 behavior and validation edge cases

---

## 🌐 General Navigation

- [x] Home page with static hero image
- [x] Consistent header/footer on all pages
- [x] 404 page renders on unknown routes
- [x] Favicon included in browser tab

---

## 🧑‍🤝‍🧑 Visitor Experience

- [x] Can browse all memes and view individual meme pages
- [x] Cannot see edit/delete buttons
- [x] Cannot access any protected routes or forms via URL
- [x] Protected DELETE routes are safely ignored on direct URL visit

---

## 🧾 Meme CRUD Features

- [x] Create meme with required fields
- [x] Edit meme with prefilled form
- [x] Delete meme with ownership protection
- [x] Full flash message coverage for each action
- [x] Cancel buttons return user to expected views

---

## 👥 User Profile & Community

- [x] View and edit own profile (name, bio, links)
- [x] Community page with links to all user profiles
- [x] Profiles show memes owned by the user
- [x] Change password with validation, confirm match, secure save

---

## ✉️ Flash Message UX

- [x] Flash messages for login, logout, meme actions, errors
- [x] Bootstrap styled, automatically dismiss after 5 seconds
- [x] No duplicate flashes rendered

---

## 🔒 Ownership & Security

- [x] UI hides controls from non-owners
- [x] Server blocks unauthorized PUT/DELETE requests
- [x] Route protection with middleware and redirect fallback

---

## 🧊 Icebox Features Implemented

- [x] View memes created by a specific user on their profile
- [x] Create a `/community` index page for browsing profiles
- [x] Support multiple image URLs per meme (max: 3)
- [x] Show creator and created/updated timestamps on meme detail
- [x] Add dark mode toggle
- [x] Add categories/tags per meme (stored + displayed)
- [x] Add "favorite" feature:
  - [x] Logged-in users can favorite/unfavorite memes
  - [x] Favorite count shown on meme detail
  - [x] Favorites listed on user profile page
- [x] Add avatar support using DiceBear:
  - [x] Show avatar in nav, profile, community list
  - [x] Avatar seed stored per user
- [x] Refactor profile pages for clean display of "X's Memes" and "X's Favorites"
- [x] Show thumbnail previews of memes in community and favorite lists
- [x] Stylize all index/show pages with consistent layout classes
- [x] Remove redundant sign-up content from `register` and protected pages
- [x] Add "Back to Community" and "View Creator Profile" buttons for nav
- [x] Rebuild All Memes / My Memes views as image-only grid layout
- [x] Sort index views by createdAt, updatedAt, favorite count, comment count
- [x] Add global tag system for reuse, filtering, and tag-browsing (no autocomplete)


