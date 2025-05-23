
# Hosting Meme Vault Locally with Cloudflare Tunnels

This guide walks you through running your Meme Vault app on your own server (e.g. `minipc2` running Debian) with a public HTTPS URL via Cloudflare Tunnel.

---

## 1. Prerequisites

Make sure your server has:

- Node.js and npm
- MongoDB (or use Atlas)
- Git (optional, if cloning from GitHub)
- cloudflared (Cloudflare Tunnel client)

---

## 2. Setup Instructions

### A. Clone or Copy the Project

```bash
git clone https://github.com/your-username/meme-vault.git
cd meme-vault
```

Or upload the folder manually to your server.

---

### B. Install Dependencies

```bash
npm install
```

---

### C. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
nano .env
```

Set the following variables:

```env
MONGODB_URI=your-mongodb-atlas-or-local-uri
SESSION_SECRET=some-random-secret
```

---

### D. Run the App

```bash
node server.js
```

App should be accessible at:  
`http://localhost:3000`

---

### E. Create a Cloudflare Tunnel

Install `cloudflared` if not already:

```bash
sudo apt install cloudflared
```

Start a tunnel:

```bash
cloudflared tunnel --url http://localhost:3000
```

You’ll get a public URL like:

```
https://memevault.example.cloudflare.dev
```

---

## 3. Optional: Use PM2 to Keep the App Running

Install PM2:

```bash
npm install -g pm2
```

Run and persist the app:

```bash
pm2 start server.js
pm2 save
pm2 startup
```

---

## 4. Security Tips

- If using local MongoDB, bind it to `127.0.0.1` only
- Do not expose your app without HTTPS (Cloudflare handles this for you)
- Keep your `.env` file private and in `.gitignore`

---

## 5. Done

You are now hosting Meme Vault from your own server, accessible from anywhere through Cloudflare Tunnel.
