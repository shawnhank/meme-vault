### RESTful Routes Table

#### `memes` routes
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/memes` | Index – list all memes |
| `GET` | `/memes/new` | Form – create new meme |
| `POST` | `/memes` | Create new meme |
| `GET` | `/memes/:id` | Show – view single meme |
| `GET` | `/memes/:id/edit` | Form – edit meme |
| `PUT` | `/memes/:id` | Update meme |
| `DELETE` | `/memes/:id` | Delete meme |

#### `users` routes
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/users/:id` | Show user profile |
| `GET` | `/users/:id/edit` | Edit user profile form |
| `PUT` | `/users/:id` | Update user profile |
| `GET` | `/users/:id/change-password` | Change password form |
| `PUT` | `/users/:id/change-password` | Update password |

#### `auth` routes
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/register` | Registration form |
| `POST` | `/register` | Handle registration |
| `GET` | `/login` | Login form |
| `POST` | `/login` | Handle login |
| `GET` | `/logout` | Logout user |

#### `favorites` routes
| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/memes/:id/favorite` | Add meme to favorites |
| `DELETE` | `/memes/:id/favorite` | Remove meme from favorites |
| `GET` | `/users/:id/favorites` | List user's favorite memes |

#### `ratings` routes
| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/memes/:id/ratings` | Add or update rating |
| `DELETE` | `/memes/:id/ratings` | Remove user rating |

#### `tags` routes
| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/memes/:id/tags` | Add tag to meme |
| `DELETE` | `/memes/:id/tags/:tagId` | Remove tag from meme |
| `GET` | `/users/:id/tags` | List user's tags |
| `GET` | `/users/:id/tags/:tagId` | List memes with that tag |

#### `comments` routes
| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/memes/:id/comments` | Add comment to meme |
| `POST` | `/memes/:id/comments/:parentId` | Reply to a comment |
| `DELETE` | `/comments/:id` | Delete comment |

#### `community` routes
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/community` | List all users |
