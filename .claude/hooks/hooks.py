#!/usr/bin/env python3
"""
Central hook dispatcher. Reads hook type from CLAUDE_HOOK_TYPE env var
and routes to the appropriate handler.

Exit codes:
  0 = allow / success
  2 = block (PreToolUse only — stops Claude from proceeding)
"""

import json
import os
import sys


def main():
    hook_type = os.environ.get("CLAUDE_HOOK_TYPE", "")
    tool_name = os.environ.get("CLAUDE_TOOL_NAME", "")

    # Read tool input from stdin (JSON)
    try:
        payload = json.load(sys.stdin)
    except json.JSONDecodeError:
        payload = {}

    if hook_type == "PreToolUse":
        handle_pre_tool_use(tool_name, payload)
    elif hook_type == "PostToolUse":
        handle_post_tool_use(tool_name, payload)
    elif hook_type == "Notification":
        handle_notification(payload)
    else:
        sys.exit(0)


def handle_pre_tool_use(tool_name: str, payload: dict):
    """Block dangerous operations before they run."""
    if tool_name in ("Write", "Edit"):
        file_path = payload.get("file_path", "")
        _block_sensitive_paths(file_path)
    sys.exit(0)


def handle_post_tool_use(tool_name: str, payload: dict):
    """React after a tool runs (informational — exit code ignored for blocking)."""
    sys.exit(0)


def handle_notification(payload: dict):
    """Handle session-level notifications."""
    sys.exit(0)


def _block_sensitive_paths(file_path: str):
    sensitive = [
        "lib/auth/",
        "src/database/migrations/",
        "app/api/",
        ".env",
    ]
    for pattern in sensitive:
        if pattern in file_path:
            print(
                f"BLOCKED: writes to '{pattern}' require explicit confirmation.",
                file=sys.stderr,
            )
            sys.exit(2)


if __name__ == "__main__":
    main()
