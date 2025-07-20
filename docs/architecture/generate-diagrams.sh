#!/bin/bash

# Generate claude-organize architecture diagrams with mermaid-cli
# Requires: npm install -g @mermaid-js/mermaid-cli

echo "🎨 Generating claude-organize architecture diagrams..."

# Check if mmdc is installed
if ! command -v mmdc &> /dev/null; then
    echo "❌ mermaid-cli not found. Please install it with:"
    echo "   npm install -g @mermaid-js/mermaid-cli"
    exit 1
fi

# Navigate to the architecture directory
cd "$(dirname "$0")"

# Generate architecture diagram
echo "📐 Generating architecture diagram..."
mmdc -i architecture.mmd \
     -o architecture.png \
     -c mermaid-config.json \
     -w 2400 \
     -H 1600 \
     --backgroundColor "#000000"

# Generate sequence diagram
echo "📊 Generating sequence diagram..."
mmdc -i sequence.mmd \
     -o sequence.png \
     -c mermaid-config.json \
     -w 2400 \
     -H 1800 \
     --backgroundColor "#000000"

# Check if generation was successful
if [ -f "architecture.png" ] && [ -f "sequence.png" ]; then
    echo "✅ Diagrams generated successfully!"
    echo "   - architecture.png (2400x1600)"
    echo "   - sequence.png (2400x1800)"
    
    # Optional: Open the diagrams (macOS)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "📂 Opening diagrams..."
        open architecture.png
        open sequence.png
    fi
else
    echo "❌ Error generating diagrams. Please check the .mmd files for syntax errors."
    exit 1
fi