# Getting Started with Sanctix

This repository is pre-configured for Sanctix governance.
Complete setup in under 10 minutes.

## Prerequisites

- Node.js 18 or higher
- npm
- Claude Code, Cursor or Codex installed

## Step 1: Install Sanctix

  npm install -g @sanctix/client

## Step 2: Initialize governance

With a hosted invite code (recommended):
  sanctix init --hosted --invite <your-invite-code>

Or with a self-hosted audit service:
  sanctix init --audit-url http://localhost:8787

## Step 3: Check status

  sanctix status

You should see:
  Audit service: connected
  Hooks: active (claude_code / cursor / codex)

## Step 4: Start a governed session

  sanctix start "Add a square root function to calculator.py" --yes

Copy the export commands and run them. Then launch your runtime:
  claude --dangerously-skip-permissions   (Claude Code)
  cursor .                                (Cursor)
  codex                                   (Codex)

## Step 5: Do the work

Let your runtime complete the task.
Every tool call is captured in the audit chain.

## Step 6: Stop the session

  sanctix stop --yes

You will see the correlation ID for this session.
Use it to view the full audit trail:
  awf audit show --correlation-id <id>

## Three example tasks

1. Change README title:
   sanctix start "Change the README title to Sanctix Demo Calculator"

2. Add a function:
   sanctix start "Add a square root function to calculator.py with a test"

3. Refactor existing code:
   sanctix start "Refactor divide to return None instead of raising ValueError"

## Uninstall

  sanctix uninstall --yes

This removes all Sanctix hooks and configuration cleanly.
