#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUILD_DIR="$SCRIPT_DIR/build"
DEST_DIR="$SCRIPT_DIR/.."

echo "Building project..."
npm run build --prefix "$SCRIPT_DIR"

echo "Copying build files to parent directory..."
cp -f "$BUILD_DIR/index.html" "$DEST_DIR/index.html"
cp -f "$BUILD_DIR/asset-manifest.json" "$DEST_DIR/asset-manifest.json"
cp -f "$BUILD_DIR/manifest.json" "$DEST_DIR/manifest.json"
cp -f "$BUILD_DIR/robots.txt" "$DEST_DIR/robots.txt"
cp -f "$BUILD_DIR/favicon.ico" "$DEST_DIR/favicon.ico"

# Copy any other root-level files (excluding directories)
for f in "$BUILD_DIR"/*; do
  if [ -f "$f" ]; then
    cp -f "$f" "$DEST_DIR/$(basename "$f")"
  fi
done

echo "Copying static/ directory..."
cp -rf "$BUILD_DIR/static/" "$DEST_DIR/static/"

echo "Deploy complete."
