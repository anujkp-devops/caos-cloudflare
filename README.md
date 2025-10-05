# CAOS IS LIFE - Cloudflare Workers# Python hello world for Cloudflare Workers



> **CAOS IS LIFE**: The nexus where order dissolves and backwards brilliance thrives.Your Python code in [index.py](https://github.com/cloudflare/python-worker-hello-world/blob/master/index.py), running on Cloudflare Workers.



A collection of chaotic micro apps running serverlessly on Cloudflare Workers.In addition to [Wrangler](https://github.com/cloudflare/wrangler2) and [npm](https://www.npmjs.com/get-npm), you will need to install [Transcrypt](https://www.transcrypt.org/docs/html/installation_use.html), including Python 3.7 and virtualenv.



## 🎮 Micro Apps#### Wrangler



- **DINO APP** - Embrace the spike. Score only blossoms when you collide with cacti.- Clone repository (`git clone https://github.com/cloudflare/python-worker-hello-world`)

- **EMERGENCY APP** - Disaster guidance with the enthusiasm of a snarky teenager (AI-powered).- Run `npm install`

- **SCHEDULE APP** - To-do triumph measured in strategic procrastination.- Update `wrangler.toml` with your project `name`, `account_id`, and `route` as required

- **TIC TAC TOE** - You only win when the computer triumphs. Sabotage yourself brilliantly.

Further documentation for Wrangler can be found [here](https://developers.cloudflare.com/workers/wrangler/).

## 🚀 Quick Start

#### Transcrypt

### Prerequisites

Before building your project, you'll need to do one-time setup of Transcrypt.  Assuming you have Python 3.7 and virtualenv installed per the linked instructions above, that setup on unix systems looks like the following (for windows see [virtualenv docs](https://virtualenv.pypa.io/en/latest/user_guide.html#activators)):

- Node.js (v16+)

- npm```

- Cloudflare accountcd projectname

- Wrangler CLI (install with `npm install -g wrangler`)

virtualenv env

### Installation

source env/bin/activate

```bash

# Clone the repositorypip install transcrypt

git clone https://github.com/anujkp-devops/caos-cloudflare.git```

cd caos-cloudflare

After that you can run Wrangler commands, such as `wrangler publish` to push your code to Cloudflare.  If you exit virtualenv (`deactivate`) and return to the project directory later, you'll need to activate virtualenv (`source env/bin/activate`) but will not need to rerun the other installation commands.

# Install dependencies

npm installIf `python3` is not Python 3.7 on your system, make sure you install it, create the virtualenv using the right version of Python, and edit webpack.config.js under `command` to specify the correct path to the Python 3.7 executable in the virtualenv directory. If you are using Windows, see [this workaround for an issue with transcrypt-loader paths](https://github.com/QQuick/Transcrypt/issues/624#issuecomment-507866238).



# Build the workerFor more information on how Python translates to Javascript, see the [Transcrypt docs](https://www.transcrypt.org/documentation). especially the [module mechanism](https://www.transcrypt.org/docs/html/special_facilities.html#transcrypt-s-module-mechanism) and [aliases](http://www.transcrypt.org/docs/html/special_facilities.html#pragma-alias).

npm run build

```Because of aliases, for a KV namespace binding named `KV` you can use `KV.put` normally, but need to use `KV.js_get` instead of `KV.get`. For example, a handler using KV might look like:



### Local Development```

def handleRequest(request):

```bash    return KV.js_get('foo').then(

# Login to Cloudflare (first time only)        lambda v: __new__(Response('Python Worker hello world! ' + v, {

wrangler login        'headers' : { 'content-type' : 'text/plain' }

    })))

# Run locally```

npm run dev

```

Visit `http://localhost:8787` to see your CAOS apps!

### Deployment

```bash
# Get your account ID
wrangler whoami

# Update wrangler.toml with your account_id

# Deploy to Cloudflare Workers
npm run deploy
```

Your app will be live at: `https://caos-cloudflare-app.<your-subdomain>.workers.dev`

## 📁 Project Structure

```
caos-cloudflare/
├── src/
│   └── index.js           # Main Cloudflare Worker
├── static/                # All static assets
│   ├── index.html         # Home page
│   ├── dino.html          # Dino game
│   ├── emergency.html     # Emergency app
│   ├── schedule.html      # Schedule app
│   ├── tictactoe.html     # Tic Tac Toe
│   ├── style.css          # Global styles
│   ├── script.js          # Shared scripts
│   ├── dino.js            # Dino game logic
│   ├── emergency.js       # Emergency app logic
│   ├── schedule.js        # Schedule app logic
│   ├── tictactoe.js       # Tic Tac Toe logic
│   └── cloudflare-logo.svg
├── dist/                  # Build output (generated)
│   └── main.js            # Compiled worker
├── webpack.config.js      # Webpack configuration
├── wrangler.toml          # Cloudflare config
└── package.json           # Dependencies
```

## 🛠️ How It Works

1. **Webpack** bundles all static files (HTML, CSS, JS, SVG) into the worker
2. **Cloudflare Worker** serves content and handles routing:
   - `/` → Home page
   - `/dino` → Dino game
   - `/emergency` → Emergency app (with AI)
   - `/schedule` → Schedule app
   - `/tictactoe` → Tic Tac Toe
   - `/static/*` → Static assets
   - `/api/ai_request` → AI endpoint (Pollinations API)
3. **Serverless** deployment on Cloudflare's edge network (300+ locations)

## 🧠 AI Integration

The Emergency App uses the [Pollinations AI API](https://pollinations.ai) to generate sarcastic disaster guidance. No API key required!

Example:
```bash
curl -X POST https://your-worker.workers.dev/api/ai_request \
  -H "Content-Type: application/json" \
  -d '{"mode": "sarcastic_guidance", "topic": "fire"}'
```

## 🎨 Features

- ✅ Clean URL routing
- ✅ Serverless architecture
- ✅ Global edge deployment
- ✅ AI-powered content
- ✅ Mobile-responsive design
- ✅ Zero backend maintenance
- ✅ Sub-50ms cold starts

## 📝 Scripts

```bash
npm run build   # Build the worker bundle
npm run dev     # Run locally with wrangler
npm run deploy  # Deploy to Cloudflare Workers
```

## 🌐 Custom Domain

To use a custom domain, add to `wrangler.toml`:

```toml
route = { pattern = "yourdomain.com/*", zone_id = "your-zone-id" }
```

Then deploy:
```bash
npm run deploy
```

## 📊 Performance

- **Cold Start**: < 50ms
- **Global**: 300+ Cloudflare data centers
- **Free Tier**: 100,000 requests/day
- **Scalability**: Automatic

## 📄 License

Dual licensed under MIT and Apache 2.0

## 🤝 Contributing

CAOS thrives on chaos! Feel free to contribute your own backwards brilliance.

## 🔗 Links

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [Pollinations AI](https://pollinations.ai)

---

**CAOS IS LIFE** - Powered by Cloudflare Workers 🚀
