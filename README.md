# Memes App — Full CRUD Project with Styling

## Overview

This project is a full-stack web application using Node.js, Express, MongoDB, and EJS to
manage a resource called "memes." It supports all CRUD operations (Create, Read, Update,
Delete) and follows best practices in file organization, route design, and Bootstrap-based
styling.

---

## Technology Stack

* Node.js + Express.js
* MongoDB + Mongoose
* EJS (Embedded JavaScript Templates)
* Bootstrap 5 (via CDN)

---

## Folder Structure

```
views/
├── index.ejs
├── partials/
│   ├── header.ejs
│   └── footer.ejs
├── memes/
│   ├── index.ejs
│   ├── new.ejs
│   ├── edit.ejs
│   └── show.ejs
public/
├── css/
│   └── main.css
models/
├── meme.js
```

---

## CRUD Functionality Map

| Action          | HTTP Method | Route             | View      | Description                            |
| --------------- | ----------- | ----------------- | --------- | -------------------------------------- |
| Create (Form)   | GET         | /memes/new       | new\.ejs  | Show form to add a new meme           |
| Create (Submit) | POST        | /memes           | —         | Save new meme and redirect            |
| Read (Index)    | GET         | /memes           | index.ejs | Show all memes                        |
| Read (Show)     | GET         | /memes/\:id      | show\.ejs | Show one meme's details               |
| Update (Form)   | GET         | /memes/\:id/edit | edit.ejs  | Show edit form with pre-filled data    |
| Update (Submit) | PUT         | /memes/\:id      | —         | Update meme and redirect to show page |
| Delete          | DELETE      | /memes/\:id      | —         | Delete meme and redirect to index     |

---

## CRUD Functionality

### CREATE (POST)

* Route: `GET /memes/new`
* View: `views/memes/new.ejs`
* Form submits to: `POST /memes`
* Action: Creates a new meme document in MongoDB and redirects to `/memes`
* Includes Cancel button that links back to `/memes`

### READ (GET)

* List All Memes:

  * Route: `GET /memes`
  * View: `views/memes/index.ejs`
  * Displays name and image of each meme using Bootstrap `list-group`
  * Each name and image link to that meme’s show page

* Show One Meme:

  * Route: `GET /memes/:id`
  * View: `views/memes/show.ejs`
  * Displays full details of a single meme
  * Includes Edit, Delete, and Back buttons

### UPDATE (PUT)

* Route: `GET /memes/:id/edit`
* View: `views/memes/edit.ejs`
* Form pre-filled with existing data
* Submits to: `PUT /memes/:id`
* Action: Updates the meme document and redirects to `/memes/:id`
* Cancel button returns user to show page without saving changes

### DELETE (DELETE)

* Route: `DELETE /memes/:id`
* Action: Deletes meme and redirects to `/memes`
* Success feedback message shown conditionally using query string: `?deleted=true`

---

## Visual Styling Decisions

### Global Layout

* `main` element wrapped in Bootstrap `container` with `max-width: 900px`
* Ensures content doesn’t stretch full width
* Consistent margins and horizontal padding on all views
* Layout remains fully responsive due to Bootstrap’s grid and container system

### Navigation

* Implemented using Bootstrap `navbar`
* Aligned left using `justify-content-start` and `gap-3`
* Nav items styled with `navbar-brand` and `nav-link`
* Appears consistently on every page

### Index View

* Uses `ul.list-group` with `li.list-group-item` for clean framed entries
* Links wrapped around both the name and image
* Success message after delete styled with `alert alert-success`

### Show View

* Meme image shown at top*
* Below image: buttons for Edit, Delete, and Back* grouped in a `d-flex gap-3` row
* Description displayed using `white-space: pre-line` to preserve paragraphs
* Entire content optionally wrapped in `bg-light border rounded p-4` card style

### Forms (New / Edit)

* Forms use Bootstrap `form-control`, `form-label`, and spacing classes
* Description textarea uses `rows="15"` for better visibility
* Submit and Cancel buttons grouped using `d-flex gap-2 mt-4`
* Form does not stretch full-width due to container wrapper

---

## Final Touches

* Hero section added to homepage with Unsplash image and proper attribution
* Navigation buttons centered and cleanly grouped
* All views use `partials/header` and `partials/footer` for consistency
* Layout fully responsive across screen sizes using Bootstrap defaults

---

## Manual Testing Checklist

* Add new meme from `/memes/new`
* View all memes via `/memes`
* View individual meme via `/memes/:id`
* Edit meme via `/memes/:id/edit`
* Cancel from Edit returns without changes
* Delete meme via `/memes/:id`
* After delete, success message appears

---

## Future Improvements

* Undo delete feature (requires soft delete or flash logic)
* Session-based flash messages instead of query strings
* Dynamic sort/filter/search in index view
* File upload support for custom meme images

---

## Attributions

Hero image courtesy of [WACA](https://www.waca.or.jp/en/growthhacking/kithow-many-types-of-meme/)
Meme Images and Descriptions courtesy of: 
- [Giphy](https://giphy.com)
- [Tenor](htttps://tenor.com)
- [Know Your Meme](https://knowyourmeme.com/)
CSS courtesy of [Bootstrap](https://getbootstrap.com/)

---

## Future Improvements:

[] Undo Delete Functionality
[] User Auth (login/logout)
[] Tagging/Comments/Ratings
[] Dark mode UI option
