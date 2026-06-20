# Sanctix Demo Project

This repository is governed by Sanctix.

## Agent Governance

Audit endpoint: configured by sanctix init
Hook mode: enforce
Governance: Sanctix (sanctix.ai)

## Rules

- Run sanctix status before starting work
- Run sanctix start "task description" to begin a governed session
- Run sanctix stop when the task is complete
- Do not bypass governance hooks
- Do not delete .sanctix/ directory contents

## Task Examples

Three governed tasks available for testing:

1. "Change the README title to Sanctix Demo Calculator"
2. "Add a square root function to calculator.py with a test"
3. "Refactor divide to return None instead of raising ValueError"
