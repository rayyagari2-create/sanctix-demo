#!/usr/bin/env node
"use strict";

const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');

const { captureToolContext } = require(path.join(__dirname, 'tool-capture.cjs'));
const { postAuditEvent }     = require(path.join(__dirname, 'post-audit-event.cjs'));

const AUDIT_URL      = process.env.SANCTIX_AUDIT_URL  || 'http://localhost:8787';
const API_KEY        = process.env.SANCTIX_API_KEY    || null;
const HOOK_MODE      = process.env.SANCTIX_HOOK_MODE  || 'enforce';
const CORRELATION_ID = process.env.AWF_CORRELATION_ID || crypto.randomUUID();
const USER_ID        = process.env.AWF_USER_ID        || 'user';

const LOG_PATH = '/tmp/sanctix-audit.log';

let input = {};
try {
  input = JSON.parse(fs.readFileSync(0, 'utf8'));
} catch (_e) {
  input = {};
}

const command   = (input && input.tool_input && input.tool_input.command) || 'unknown';
const timestamp = new Date().toISOString();

const blocked = ['rm -rf /', 'DROP TABLE', 'delete from audit'];
const isBlocked = HOOK_MODE === 'enforce' &&
  blocked.some((b) => command.toLowerCase().includes(b.toLowerCase()));

try {
  fs.appendFileSync(LOG_PATH, JSON.stringify({
    timestamp,
    tool: 'Bash',
    command: String(command).substring(0, 200),
    hook: 'pre-tool-use',
    decision: isBlocked ? 'block' : 'allow',
  }) + '\n');
} catch (_e) {}

(async () => {
  let toolCtx = null;
  try { toolCtx = captureToolContext(input); } catch (_e) {}

  try {
    await postAuditEvent({
      actor_type:       'agent',
      event_type:       'hook.bash.pre_tool_use',
      timestamp_utc:    timestamp,
      correlation_id:   CORRELATION_ID,
      user_id:          USER_ID,
      runtime_provider: 'claude_code',
      event_data: {
        tool_name:     toolCtx && toolCtx.tool_name,
        file_path:     toolCtx && toolCtx.file_path,
        command:       toolCtx && toolCtx.command,
        args_redacted: toolCtx && toolCtx.args_redacted,
      },
      before_state: toolCtx && toolCtx.before_state,
    }, { url: AUDIT_URL, apiKey: API_KEY, timeoutMs: 500 });
  } catch (_e) {}

  if (isBlocked) {
    process.stdout.write(JSON.stringify({
      decision: 'block',
      reason: 'Command blocked by Sanctix governance',
    }));
    process.exit(2);
  }

  process.exit(0);
})();
