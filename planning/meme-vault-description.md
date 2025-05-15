# Meme Vault

A place for the memes. Your memes. The weird ones, the cursed ones, the ones that live rent-free in your brain.

## What is this?

A fully functional MEN Stack CRUD app (MongoDB + Express + Node.js) that lets users:
	•	🖼️ Create and edit memes
	•	🏷️ Tag them with moods like “relatable” or “chaotic good”
	•	🌟 Review them like you’re rating fine wine
	•	💥 Delete them when they stop being funny

All wrapped in a sweet, minimalist Pico.css UI that makes your memes look as good as they probably don’t deserve.

## Features
	•	Full CRUD for Meme
	•	One-to-many: each Meme gets Reviews
	•	Many-to-many: Meme ↔ Tags
	•	Partials for clean layouts and reusable forms
	•	Stretch-ready for things like collections, favoriting, or GIF integrations

## Folder Vibe

models/       → meme, tag, and review schemas
views/        → memes, tags, reviews, partials, layout, 404
public/       → styles (Pico!), scripts (probably empty)
server.js     → flat file, full routes, no drama
seed.js       → sample data for rapid testing

## How to Run It

git clone this-meme-vault-repo
cd memes_vault
npm install
nodemon
mongoose
morgan
_will have more packages to add here_

Make sure you have a .env with:

DATABASE_URL=mongodb://localhost:27017/memevault

Then visit: http://localhost:3000

## Why tho?

Because we needed a project.
Because memes are a legitimate form of communication.
Because CRUD shouldn’t be boring.

Credits

Built by someone with opinions about spacing, alignment, and absurd humor.

⸻

Yes, this is a real app. No, it won’t judge your meme taste. But we might.

## Attributions

[Water.css](https://github.com/kognise/water.css) [Water.css Docs](https://watercss.kognise.dev/#installation)

