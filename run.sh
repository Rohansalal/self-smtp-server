#!/bin/bash

echo "📧 Protech Email Backend - Running all services"

# Check if Redis is installed
if ! command -v redis-server &> /dev/null; then
    echo "❌ Redis not installed."
    echo ""
    echo "To install Redis:"
    echo "  macOS: brew install redis"
    echo "  Ubuntu: sudo apt-get install redis-server"
    echo "  Docker: docker run -d -p 6379:6379 redis:alpine"
    echo ""
fi

# Check if Redis is running
if ! pgrep -x "redis-server" > /dev/null; then
    echo "⚠️ Redis not running. Start with: redis-server"
    echo ""
fi

# Function to cleanup background processes on exit
cleanup() {
    echo ""
    echo "Stopping services..."
    pkill -f "tsx watch" 2>/dev/null
    pkill -f "tsx src/server.ts" 2>/dev/null
    pkill -f "tsx src/queue/worker.ts" 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start backend server in background
echo "🚀 Starting backend server..."
cd apps/backend
npm run dev &
BACKEND_PID=$!

echo ""
echo "✅ Backend running at http://localhost:3000"
echo "   - Health: http://localhost:3000/health"
echo "   - tRPC: http://localhost:3000/trpc"
echo ""

# Wait for backend to start
sleep 3

# Check if worker should be started
if pgrep -x "redis-server" > /dev/null; then
    echo "🚀 Starting email worker..."
    npx tsx src/queue/worker.ts &
    WORKER_PID=$!
    echo "✅ Worker running"
else
    echo "⚠️ Skipping worker (Redis not running)"
fi

echo ""
echo "Press Ctrl+C to stop all services"

# Wait indefinitely
wait