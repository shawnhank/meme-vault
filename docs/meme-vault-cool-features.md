
# ✅ Meme Vault – Full Feature Summary (With Code Snippets)

This document outlines all core, advanced, and nuanced features implemented in the Meme Vault web application, along with representative code snippets.

---

## 🔐 Authentication & Security

```js
// Password validation in User model
password: {
  type: String,
  required: true,
  validate: {
    validator: function (value) {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);
    },
    message: 'Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.'
  }
}
```

```js
// Middleware: isLoggedIn
function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    req.flash('error', 'You must be logged in first.');
    return res.redirect('/login');
  }
  next();
}
```

---

## 👤 User Profile Avatar

```js
// Avatar seed in user model
avatarSeed: {
  type: String,
  required: true,
  default: () => Math.random().toString(36).slice(2, 10)
}
```

```ejs
<% if (currentUser && currentUser._id === user._id) { %>
  <a href="/users/<%= user._id %>/edit">Edit Profile</a>
<% } %>
```

---

## 🖼 Meme CRUD Features

```js
// Meme model supports up to 3 images
images: {
  type: [String],
  validate: [val => val.length <= 3, '{PATH} exceeds the limit of 3']
}
```

```ejs
<% meme.images.forEach(url => { %>
  <img src="<%= url %>" alt="Meme Image">
<% }) %>
```

---

## 🏷 Tag System

```js
// Meme model tags reference
tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
```

```ejs
<% meme.tags.forEach(tag => { %>
  <span class="badge"><%= tag.name %></span>
<% }) %>
```

---

## ❤️ Favorites

```js
// Add/remove favorite
router.post('/memes/:id/favorite', isLoggedIn, addFavorite);
router.delete('/memes/:id/favorite', isLoggedIn, removeFavorite);
```

```ejs
<form action="/memes/<%= meme._id %>/favorite?_method=DELETE" method="POST">
  <button>Unfavorite</button>
</form>
```

---

## 🧪 Conditional Logic to personalize  UI/UX

```ejs
<% if (currentUser && currentUser._id === meme.createdBy._id) { %>
  <a href="/memes/<%= meme._id %>/edit">Edit</a>
<% } %>
```

```ejs
<% if (currentUser) { %>
  <a href="/logout">Logout</a>
<% } else { %>
  <a href="/login">Login</a>
<% } %>
```

## 🧠 Feature: Dynamic User Profile Header Logic

### **Purpose:**
On the user profile page, we want to show either:
	* 	My Memes / My Favorites — if you’re viewing your **own** profile
	* 	Alex's Memes / Alex's Favorites — if you’re viewing **someone else’s** profile

⸻

### ✅ Server-Side Logic (Controller)

In the users.show controller:

```const isSelf = req.session.user && req.session.user._id === user._id.toString();
const firstName = user.name.split(' ')[0];

res.render('users/show', {
  user,
  memes,
  favorites,
  isSelf,
  firstName
});
```

### ✅ EJS Logic (View)

In views/users/show.ejs:

```<h2>
  <%= isSelf ? 'My Memes' : ￼`￼${firstName}'s Memes`￼ %>
</h2>

<h2>
  <%= isSelf ? 'My Favorites' : `${firstName}'s Favorites` %>
</h2>
```

⸻

### 🔍 Why It Matters
* Enhances clarity: users immediately know if they’re viewing their own profile or someone else’s.
* Helps personalize the experience without creating separate views or duplicating logic.
* Scales cleanly across other features like editing and change-password — which are also gated by isSelf.

---

## 🧾 JavaScript Functions

```js
// Get first name
const firstName = user.name.split(' ')[0];
```

```js
// Auto-dismiss flash
setTimeout(() => {
  const alert = document.querySelector('.alert');
  if (alert) alert.classList.remove('show');
}, 5000);
```

---

## ✨ Styling and Frontend Polish

```ejs
<!-- Flash message partial -->
<% if (success) { %>
  <div class="alert alert-success alert-dismissible fade show"><%= success %></div>
<% } %>
```

```ejs
<!-- Auto-link social -->
<% if (user.social.instagram) { %>
  <a href="https://instagram.com/<%= user.social.instagram %>">Instagram</a>
<% } %>
```

---

## 🔁 Flash Messages

```js
// Flash middleware
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});
```

---

## 🗂 Views and Partials

```ejs
<!-- Shared form partial -->
<%- include('./_form', { formAction: '/memes', formMethod: 'POST', buttonText: 'Create', resource: null }) %>
```

---

## 🧠 Error Handling

```js
// 404 fallback
app.use((req, res) => {
  res.status(404).render('404');
});
```

---

## 🔍 Search

```js
// Keyword search
const results = await Meme.find({ name: new RegExp(req.query.q, 'i') });
```

---

⭐ Ratings (WIP)

```js
// Compound index to enforce one rating per user per meme
ratingSchema.index({ user: 1, meme: 1 }, { unique: true });
```

```js
// Update or insert rating
await Rating.findOneAndUpdate(
  { user: req.session.user._id, meme: req.params.id },
  { value: req.body.value },
  { upsert: true }
);
```

---

## 💬 Comments (WIP)

```js
// Post comment or reply
router.post('/memes/:id/comments', isLoggedIn, createComment);
router.post('/memes/:id/comments/:parentId', isLoggedIn, replyToComment);
```

```ejs
<% comment.replies.forEach(reply => { %>
  <div class="reply"><%= reply.content %></div>
<% }) %>
```

---
## 📊 Admin & Analytics (Stretch)

- Tags, favorites, comments, ratings stored in separate collections
- Easily extended to admin dashboards

