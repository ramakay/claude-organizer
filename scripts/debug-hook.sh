#!/bin/bash
# Debug wrapper for claude-organize

echo "=== HOOK CALLED ===" >> /tmp/claude-organize-debug.log
echo "Date: $(date)" >> /tmp/claude-organize-debug.log
echo "PWD: $PWD" >> /tmp/claude-organize-debug.log
echo "Input:" >> /tmp/claude-organize-debug.log
cat >> /tmp/claude-organize-debug.log
echo "" >> /tmp/claude-organize-debug.log

# Call the actual claude-organize
cat | claude-organize