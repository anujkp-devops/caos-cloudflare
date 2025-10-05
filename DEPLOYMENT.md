# CAOS IS LIFE - Cloudflare Workers Deployment Guide

This project has been migrated from an aiohttp-based Python application to run serverlessly on Cloudflare Workers.

## Architecture

- **Worker Code**: `src/worker.py` - Main Python worker that handles all routing and API requests
- **Static Assets**: `New/static/` - All HTML, CSS, JS, and SVG files bundled into the worker
- **Build System**: Webpack + Transcrypt to compile Python to JavaScript for Cloudflare Workers

## Features

- ✅ Clean URL routing (/, /dino, /emergency, /schedule, /tictactoe)
- ✅ Static file serving (CSS, JS, SVG)
- ✅ AI-powered Emergency App using Pollinations API
- ✅ All micro apps: Dino, Emergency, Schedule, Tic Tac Toe
- ✅ Serverless deployment on Cloudflare Workers

## Setup & Installation

### Prerequisites

1. Node.js (v16 or higher)
2. Python 3.x
3. Cloudflare account
4. Wrangler CLI

### Install Dependencies

```bash
# Install Node.js dependencies
npm install
```

### Configuration

1. Update `wrangler.toml` with your Cloudflare account ID:
   ```toml
   account_id = "your-account-id-here"
   ```

   To find your account ID:
   ```bash
   wrangler whoami
   ```

## Development

### Local Development

```bash
# Build the worker
npm run build

# Run locally with Wrangler
npm run dev
```

This will start a local development server at `http://localhost:8787`

### Testing Locally

1. Visit `http://localhost:8787` - Home page
2. Visit `http://localhost:8787/emergency` - Emergency App (with AI)
3. Visit `http://localhost:8787/dino` - Dino App
4. Visit `http://localhost:8787/schedule` - Schedule App
5. Visit `http://localhost:8787/tictactoe` - Tic Tac Toe

## Deployment

### Deploy to Cloudflare Workers

```bash
# Deploy to Cloudflare
npm run deploy
```

After deployment, your app will be available at:
- `https://caos-cloudflare-app.<your-subdomain>.workers.dev`

### Custom Domain (Optional)

To use a custom domain:

1. Add a route in `wrangler.toml`:
   ```toml
   route = { pattern = "yourdomain.com/*", zone_id = "your-zone-id" }
   ```

2. Deploy again:
   ```bash
   npm run deploy
   ```

## Project Structure

```
.
├── src/
│   └── index.js            # Main Cloudflare Worker (JavaScript)
├── static/                 # Static assets (HTML, CSS, JS, SVG)
│   ├── index.html
│   ├── dino.html
│   ├── emergency.html
│   ├── schedule.html
│   ├── tictactoe.html
│   ├── style.css
│   ├── script.js
│   ├── emergency.js
│   ├── schedule.js
│   ├── tictactoe.js
│   ├── dino.js
│   └── cloudflare-logo.svg
├── dist/                   # Build output (generated)
│   └── main.js             # Compiled worker
├── webpack.config.js       # Webpack configuration
├── wrangler.toml           # Cloudflare Workers configuration
└── package.json            # Node.js dependencies

```

## How It Works

1. **Build Process**: Webpack bundles all static files and JavaScript into one worker file
2. **Static Files**: Custom webpack plugin injects all static files into the worker code
3. **Routing**: Worker handles all routes and serves appropriate HTML/static files
4. **API Calls**: `/api/ai_request` endpoint calls Pollinations AI for emergency guidance
5. **Serverless**: Everything runs on Cloudflare's edge network

## API Endpoints

- `GET /` - Home page
- `GET /{page}` - App pages (dino, emergency, schedule, tictactoe)
- `GET /static/*` - Static assets
- `POST /api/ai_request` - AI request handler for Emergency App

### AI Request Example

```bash
curl -X POST https://your-worker.workers.dev/api/ai_request \
  -H "Content-Type: application/json" \
  -d '{"mode": "sarcastic_guidance", "topic": "fire"}'
```

### Troubleshooting

### Build Errors

If you encounter build errors:

```bash
# Clean and rebuild
rm -rf dist/
npm run build
```

### Wrangler Authentication

If not logged in:

```bash
wrangler login
```

## Migration Notes

This application was migrated to run serverlessly on Cloudflare Workers with:
- **JavaScript Worker** (instead of Python/aiohttp)
- **Bundled static assets** (no file system needed)
- **Edge network deployment** (300+ Cloudflare data centers)
- **AI integration** (Pollinations API for Emergency App)

## Performance

- **Cold Start**: < 50ms (Cloudflare Workers are fast!)
- **Global**: Deployed to 300+ Cloudflare data centers worldwide
- **Scalability**: Automatically scales with traffic
- **Cost**: Free tier includes 100,000 requests/day

## License

MIT / Apache 2.0 (dual licensed)
