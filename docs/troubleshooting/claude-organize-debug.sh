#!/bin/bash
# Debug wrapper for claude-organize to see what data is passed

echo "=== CLAUDE-ORGANIZE DEBUG ===" >> /tmp/claude-organize-debug.log
echo "Date: $(date)" >> /tmp/claude-organize-debug.log
echo "PWD: $PWD" >> /tmp/claude-organize-debug.log
echo "Args: $@" >> /tmp/claude-organize-debug.log
echo "ENV CLAUDE_ORGANIZE_JS: $CLAUDE_ORGANIZE_JS" >> /tmp/claude-organize-debug.log
echo "Input data:" >> /tmp/claude-organize-debug.log

# Capture stdin to both log and pass through
INPUT=$(cat)
echo "$INPUT" >> /tmp/claude-organize-debug.log
echo "=== END DEBUG ===" >> /tmp/claude-organize-debug.log
echo "" >> /tmp/claude-organize-debug.log

# Pass the input to the actual claude-organize
echo "$INPUT" | claude-organize