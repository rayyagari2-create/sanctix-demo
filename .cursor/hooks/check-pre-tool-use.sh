#!/bin/bash
# Sanctix pre-tool-use hook for Cursor
# Populated by sanctix init
# If not initialized: allow all
if [ -f ".sanctix/sanctix.config.json" ]; then
  SANCTIX_AUDIT_URL=$(grep -o '"auditUrl":"[^"]*"' .sanctix/sanctix.config.json | cut -d'"' -f4)
  echo "{\"permission\":\"allow\"}"
else
  echo "{\"permission\":\"allow\"}"
fi
