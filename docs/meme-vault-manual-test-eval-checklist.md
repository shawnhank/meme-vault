
### 🧪 Phase 5 – Dev Workflow & Testing Support

- [ ] Run full manual test checklist:

#### 🧭 General Navigation
- [ ] Home page loads with hero image
- [ ] Header and footer appear on all views
- [ ] Favicon displays in browser tab (if implemented)
- [ ] 404 page appears for unknown routes (e.g. /banana-pants)

#### 👥 Visitor / Guest Experience
- [ ] Can view all memes on `/memes`
- [ ] Can view individual meme detail pages
- [ ] Cannot see Edit/Delete buttons on meme show page
- [ ] Cannot access `/memes/new`, `/memes/:id/edit`, or `/users/:id/edit`
- [ ] Cannot trigger unauthorized edits/deletes via URL or form submission

#### 🔐 Authentication Flow
- [ ] Can register with valid email + strong password
- [ ] Duplicate email shows error message
- [ ] Can log in with valid credentials
- [ ] Incorrect login shows error flash
- [ ] Can log out and session ends
- [ ] Nav updates correctly on login/logout

#### 📝 Meme CRUD Functionality
- [ ] Can create a meme with all required fields
- [ ] Can view newly created meme in list and on detail page
- [ ] Can edit a meme I created
- [ ] Edit form is pre-filled with current data
- [ ] Can cancel editing and return to meme show view
- [ ] Can delete meme I created
- [ ] Cannot edit/delete someone else's meme

#### 📄 Form Validation and UX
- [ ] All required fields enforce validation
- [ ] Edit and Create forms use Bootstrap styling
- [ ] Cancel buttons work correctly and return to expected views

#### 👤 User Profile & Community Pages
- [ ] Can view my profile page and see my memes
- [ ] Can edit profile (name, bio, links)
- [ ] Changes persist across sessions
- [ ] Change password works with validation + feedback
- [ ] Only I can access my profile edit/change-password pages
- [ ] `/community` page lists all users with links to their profile pages
- [ ] Can click another user and view their meme list

#### ✨ Flash Messages & Alerts
- [ ] Flash appears for login, logout, meme create/edit/delete
- [ ] Flash is styled with Bootstrap and dismissible
- [ ] No duplicate flash messages appear on any page

#### ❄️ Ownership Protection (UI + Server)
- [ ] Only creator sees Edit/Delete buttons
- [ ] Server blocks unauthorized PUT/DELETE requests
- [ ] Guests redirected or blocked from protected routes

#### ⚖️ Security + Edge Testing
- [ ] Visiting invalid routes returns 404 page
- [ ] Trying to edit/delete others' memes via URL fails
- [ ] Submitting empty forms shows proper error feedback
