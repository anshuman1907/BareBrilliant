#!/usr/bin/env bash
# Blocks writes to sensitive paths. Exit 2 = block, exit 0 = allow.
# Called as PreToolUse hook for Write|Edit tool matches.

set -euo pipefail

FILE_PATH="${CLAUDE_TOOL_INPUT_FILE_PATH:-}"

SENSITIVE_PATTERNS=(
  "lib/auth/"
  "src/database/migrations/"
  "app/api/"
  ".env"
)

for pattern in "${SENSITIVE_PATTERNS[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "BLOCKED: '$FILE_PATH' matches sensitive path '$pattern'. Explicit confirmation required." >&2
    exit 2
  fi
done

exit 0
