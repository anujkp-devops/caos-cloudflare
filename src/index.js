// Static files content will be injected by webpack
const STATIC_FILES = {};

const ROUTE_MAP = {
  "dino": "dino.html",
  "emergency": "emergency.html",
  "schedule": "schedule.html",
  "tictactoe": "tictactoe.html",
};

const POLLINATIONS_TEXT_ENDPOINT = "https://text.pollinations.ai";

/**
 * Fetch text from Pollinations API
 */
async function fetchPollinationsText(prompt, system = null) {
  const combinedPrompt = system
    ? `[SYSTEM PROMPT]: ${system}\n[USER PROMPT]: ${prompt}`
    : prompt;

  const headers = {
    "Accept": "text/plain",
    "Content-Type": "application/json",
    "User-Agent": "CAOS-JS-Agent/1.0",
  };

  try {
    // Try POST request first
    const response = await fetch(POLLINATIONS_TEXT_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({ prompt: combinedPrompt }),
    });

    if (response.ok) {
      const text = await response.text();
      return text.trim();
    }

    // Fallback to GET request
    const encodedPrompt = encodeURIComponent(combinedPrompt);
    const fallbackUrl = `${POLLINATIONS_TEXT_ENDPOINT}/${encodedPrompt}`;

    const fallbackHeaders = {
      "Accept": "text/plain",
      "User-Agent": "CAOS-JS-Agent/1.0",
    };

    const fallbackResponse = await fetch(fallbackUrl, {
      headers: fallbackHeaders,
    });

    const text = await fallbackResponse.text();
    return text.trim();
  } catch (error) {
    console.error("Error fetching from Pollinations:", error);
    return "The oracle is temporarily unavailable. Please try again later.";
  }
}

/**
 * Get content type based on file extension
 */
function getContentType(filename) {
  if (filename.endsWith('.html')) return 'text/html; charset=utf-8';
  if (filename.endsWith('.css')) return 'text/css; charset=utf-8';
  if (filename.endsWith('.js')) return 'application/javascript; charset=utf-8';
  if (filename.endsWith('.svg')) return 'image/svg+xml';
  if (filename.endsWith('.json')) return 'application/json';
  return 'text/plain';
}

/**
 * Extract path from URL
 */
function extractPath(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname;
  } catch (error) {
    return '/';
  }
}

/**
 * Main request handler for Cloudflare Worker
 */
async function handleRequest(request) {
  const url = request.url;
  let path = extractPath(url);

  // Handle root path
  if (path === '/' || path === '') {
    const content = STATIC_FILES['index.html'] || '<h1>Index not found</h1>';
    return new Response(content, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  // Handle API endpoint
  if (path === '/api/ai_request') {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      const body = await request.json();
      const mode = body.mode;

      if (mode === 'sarcastic_guidance') {
        const topic = body.topic || 'mystery';
        const systemPrompt =
          'You are a bored, deeply sarcastic teenager who gives unhelpful and counterintuitive advice.';
        const userPrompt = `Produce a short paragraph of snarky, unhelpful guidance about a ${topic}.`;
        const responseText = await fetchPollinationsText(userPrompt, systemPrompt);

        return new Response(JSON.stringify({ text: responseText }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({ items: [] }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (error) {
      console.error('Error in AI request handler:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // Handle static files
  if (path.startsWith('/static/')) {
    const filename = path.substring(8); // Remove '/static/' prefix
    const content = STATIC_FILES[filename];

    if (content) {
      return new Response(content, {
        headers: { 'Content-Type': getContentType(filename) },
      });
    } else {
      return new Response(`File not found: ${filename}`, {
        status: 404,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  }

  // Handle app pages (clean URLs)
  const pageName = path.substring(1); // Remove leading /
  if (ROUTE_MAP[pageName]) {
    const filename = ROUTE_MAP[pageName];
    const content = STATIC_FILES[filename] || `<h1>Page not found: ${filename}</h1>`;
    return new Response(content, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  // 404 for everything else
  return new Response('<h1>404 - Not Found</h1>', {
    status: 404,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

/**
 * Entry point for Cloudflare Worker
 */
export default {
  async fetch(request, env, ctx) {
    try {
      return await handleRequest(request);
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(`Internal Server Error: ${error.message}`, {
        status: 500,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  },
};
