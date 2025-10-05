#!/bin/bash
# CAOS Apps - Quick Start Script

echo "🎮 CAOS IS LIFE - Cloudflare Workers Setup"
echo "=========================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Build the worker
echo "🔨 Building worker..."
npm run build
echo ""

# Check if build was successful
if [ -f "dist/main.js" ]; then
    BUILD_SIZE=$(ls -lh dist/main.js | awk '{print $5}')
    echo "✅ Build successful! Worker size: $BUILD_SIZE"
    echo ""
    
    echo "📁 Your CAOS Apps:"
    echo "   • Home:      /"
    echo "   • Dino:      /dino"
    echo "   • Emergency: /emergency"
    echo "   • Schedule:  /schedule"
    echo "   • Tic Tac Toe: /tictactoe"
    echo ""
    
    echo "🚀 Next steps:"
    echo "   1. Update wrangler.toml with your account_id"
    echo "   2. Run: npm run dev (test locally)"
    echo "   3. Run: npm run deploy (deploy to Cloudflare)"
    echo ""
    
    # Check if wrangler is configured
    if grep -q 'account_id = ""' wrangler.toml 2>/dev/null; then
        echo "⚠️  Warning: account_id not set in wrangler.toml"
        echo "   Run: wrangler whoami"
        echo ""
    fi
else
    echo "❌ Build failed! Check errors above."
    exit 1
fi

echo "📖 Documentation:"
echo "   • README.md - User guide"
echo "   • DEPLOYMENT.md - Deployment guide"
echo "   • CLEANUP_SUMMARY.md - Project changes"
echo ""
echo "✨ CAOS IS LIFE - Ready to deploy! 🚀"
