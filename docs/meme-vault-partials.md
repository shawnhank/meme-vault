
# 🧩 Partial Templates Usage in Meme Vault

**Total EJS files using partials:** `16`  
**Total partial includes across all views:** `56`

---

## ✅ Common Partial Templates

| Partial | Purpose |
|--------|---------|
| `header.ejs` | Top nav, session-aware links, logo |
| `flash.ejs` | Injects Bootstrap-styled flash messages |
| `test-footer.ejs` | Page footer, shown on all views |
| `_form.ejs` | Centralized form markup for `new` and `edit` meme |
| `meme-thumbnails.ejs` | Renders uniform thumbnail grid for meme collections |

---

## 📄 Pages That Use Partials

- `views/404.ejs` (includes: 3)
- `views/index.ejs` (includes: 3)
- `views/auth/login.ejs` (includes: 3)
- `views/auth/register.ejs` (includes: 3)
- `views/favorites/index.ejs` (includes: 4)
- `views/memes/edit.ejs` (includes: 4)
- `views/memes/index.ejs` (includes: 4)
- `views/memes/new.ejs` (includes: 4)
- `views/memes/show.ejs` (includes: 3)
- `views/search/index.ejs` (includes: 4)
- `views/tags/index.ejs` (includes: 3)
- `views/tags/show.ejs` (includes: 4)
- `views/users/change-password.ejs` (includes: 3)
- `views/users/community.ejs` (includes: 3)
- `views/users/form.ejs` (includes: 3)
- `views/users/show.ejs` (includes: 5)
