# Sanctix Demo

A simple Python calculator pre-wired for Sanctix governance.

Use this repository to try Sanctix without pointing it at your real codebase.

## What is Sanctix?

Sanctix governs AI agent sessions. Every tool call is captured in a
tamper-evident audit chain. Sessions are scored and trust builds over time.

## Quick start

See SANCTIX.md for setup instructions.

## Project structure

  calculator.py       Simple calculator with add, subtract, multiply, divide
  test_calculator.py  pytest unit tests
  SANCTIX.md          Getting started guide
  .claude/            Pre-wired Claude Code hook configuration
  .cursor/            Pre-wired Cursor hook configuration
  AGENTS.md           Codex governance rules

## Run the tests

  pip install pytest
  pytest test_calculator.py -v
