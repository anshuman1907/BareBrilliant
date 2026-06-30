#!/usr/bin/env bash
# Runs the linter on the edited file. Informational — exit code not used to block.
# Called as PostToolUse hook for Write|Edit tool matches.

set -euo pipefail

FILE_PATH="${CLAUDE_TOOL_INPUT_FILE_PATH:-}"

if [[ -z "$FILE_PATH" ]]; then
  exit 0
fi

# Only lint JS/TS files
if [[ "$FILE_PATH" =~ \.(js|jsx|ts|tsx)$ ]]; then
  if command -v npx &>/dev/null; then
    npx eslint --no-eslintrc -c .eslintrc.json "$FILE_PATH" 2>&1 || true
  fi
fi

exit 0
