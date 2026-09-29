#!/usr/bin/env bash

# ==============================================================================
# MS Tailors — Luxury Bespoke Tailoring Platform & Admin Panel
# Unified Build & Run Script
# ==============================================================================

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_ROOT/backend/MsTailors.Api"
FRONTEND_DIR="$PROJECT_ROOT/frontend"

echo "================================================================="
echo "   MS TAILORS — BESPOKE SARTORIAL HOUSE (PANADURA, SRI LANKA)   "
echo "================================================================="

# 1. Build Backend API (.NET 8)
echo ""
echo "-> Building ASP.NET Core 8 Web API..."
cd "$BACKEND_DIR"
dotnet build

# 2. Build Frontend (Next.js 14)
echo ""
echo "-> Building Next.js 14 Frontend..."
cd "$FRONTEND_DIR"
npm run build

echo ""
echo "================================================================="
echo "   BUILD COMPLETE — STARTING LIVE SERVICES                      "
echo "================================================================="
echo "-> Backend API:        http://localhost:5000"
echo "-> Swagger Docs:       http://localhost:5000/swagger"
echo "-> Frontend Client:    http://localhost:3000"
echo "-> Atelier CMS:        http://localhost:3000/admin"
echo "-> Default Admin User: admin / Admin@MsTailors2026"
echo "================================================================="
echo "Press Ctrl+C to terminate both servers."
echo ""

# Function to handle process termination
cleanup() {
  echo ""
  echo "Shutting down MS Tailors services..."
  if [ -n "$BACKEND_PID" ]; then
    kill "$BACKEND_PID" 2>/dev/null || true
  fi
  if [ -n "$FRONTEND_PID" ]; then
    kill "$FRONTEND_PID" 2>/dev/null || true
  fi
  exit 0
}

trap cleanup SIGINT SIGTERM

# Start Backend in background
cd "$BACKEND_DIR"
dotnet run --no-build --launch-profile http &
BACKEND_PID=$!

# Start Frontend in background
cd "$FRONTEND_DIR"
npm run dev &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
