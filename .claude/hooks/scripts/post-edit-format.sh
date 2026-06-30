#!/usr/bin/env bash
# Formats the edited file after a Write or Edit. Informational hook.
# Called as PostToolUse hook for Write|Edit tool matches.

set -euo pipefail

FILE_PATH="${CLAUDE_TOOL_INPUT_FILE_PATH:-}"

if [[ -z "$FILE_PATH" || ! -f "$FILE_PATH" ]]; then
  exit 0
fi

# Prettier for JS/TS/JSON/CSS/MD
if [[ "$FILE_PATH" =~ \.(js|jsx|ts|tsx|json|css|md)$ ]]; then
  if command -v npx &>/dev/null; then
    npx prettier --write "$FILE_PATH" 2>/dev/null || true
  fi
fi

# Python: black
if [[ "$FILE_PATH" =~ \.py$ ]]; then
  if command -v black &>/dev/null; then
    black "$FILE_PATH" 2>/dev/null || true
  fi
fi

exit 0
