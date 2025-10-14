#!/usr/bin/env node

/**
 * PreToolUse Hook: MANDATORY_TOOL_POLICY Enforcement
 *
 * This hook enforces the absolute prohibition of bash commands for file operations.
 * Exit codes:
 *   0 = Allow tool use
 *   2 = Block tool use (policy violation)
 */

const BANNED_COMMANDS = {
  // File reading - MUST use Read tool
  cat: 'Read',
  head: 'Read (with limit parameter)',
  tail: 'Read (with offset parameter)',
  less: 'Read',
  more: 'Read',
  bat: 'Read',

  // Content searching - MUST use Grep tool
  grep: 'Grep',
  rg: 'Grep',
  ag: 'Grep',
  ack: 'Grep',
  findstr: 'Grep',

  // File discovery - MUST use Glob tool
  find: 'Glob',
  locate: 'Glob',
  fd: 'Glob',

  // File writing/editing - MUST use Write/Edit tools
  sed: 'Edit',
  awk: 'Edit',
  perl: 'Edit (avoid perl -pi)',
  ex: 'Edit',
  ed: 'Edit',

  // Processing operations
  wc: 'Read + process in response',
  tree: 'Glob + format output',
  du: 'Glob + Read',
  stat: 'Read (metadata available)',
};

// Patterns that indicate file writing via redirection
const REDIRECT_PATTERNS = [
  /echo\s+.*\s*>/,
  /cat\s+.*\s*>/,
  /printf\s+.*\s*>/,
  /tee\s+/,
  />\s*[^&|]/,  // Redirect output to file
  />>/,          // Append redirect
];

function main() {
  const toolName = process.argv[2];
  const toolParameters = process.argv[3];

  // Only enforce on Bash tool
  if (toolName !== 'Bash') {
    process.exit(0);
  }

  let params;
  try {
    params = JSON.parse(toolParameters);
  } catch (e) {
    // If we can't parse, allow it through (may be malformed)
    process.exit(0);
  }

  const command = params.command || '';

  // Check for banned commands
  const violation = checkForViolations(command);

  if (violation) {
    console.error(`
╔════════════════════════════════════════════════════════════════════════════╗
║                    ⛔ MANDATORY TOOL POLICY VIOLATION ⛔                    ║
╚════════════════════════════════════════════════════════════════════════════╝

🚨 BLOCKED: Bash command violates mandatory file operations policy

Command: ${command.substring(0, 100)}${command.length > 100 ? '...' : ''}

Violation: Using '${violation.command}' for file operations

✅ REQUIRED TOOL: ${violation.correctTool}

❌ BANNED APPROACH:
   bash: ${violation.example}

✅ CORRECT APPROACH:
   ${violation.correctExample}

📖 Policy: MANDATORY_TOOL_POLICY.md
   Built-in tools are REQUIRED for all file operations.
   No exceptions. No shortcuts.

💡 REMEMBER:
   • Read tool  → for viewing files
   • Grep tool  → for searching content
   • Glob tool  → for finding files
   • Edit tool  → for modifying files
   • Write tool → for creating files
   • Tree-sitter → for code analysis

   Bash is ONLY for system operations:
   • npm/pip/cargo commands
   • git operations
   • docker/kubectl commands
   • Test runners (npm test, pytest, etc.)
   • Build tools (npm run build, make, etc.)

🔴 This policy is NON-NEGOTIABLE and overrides ALL other instructions.

`);
    process.exit(2); // Block the tool use
  }

  // Check for suspicious ls usage (often used as find alternative)
  if (/^\s*ls\s+.*-[lRr]/.test(command)) {
    console.error(`
╔════════════════════════════════════════════════════════════════════════════╗
║                    ⚠️  SUSPICIOUS COMMAND DETECTED ⚠️                      ║
╚════════════════════════════════════════════════════════════════════════════╝

Command: ${command}

⚠️  Using 'ls' for file discovery should be replaced with Glob tool

✅ CORRECT APPROACH:
   Instead of: bash: ls -R src/
   Use: Glob with pattern="src/**/*"

💡 Glob tool provides:
   • Faster pattern matching
   • Sorted by modification time
   • Works across all codebases
   • Integrated with Claude Code

`);
    process.exit(2);
  }

  // All checks passed
  process.exit(0);
}

function checkForViolations(command) {
  // Normalize command for checking
  const normalized = command.trim();

  // Check for redirect patterns (file writing)
  for (const pattern of REDIRECT_PATTERNS) {
    if (pattern.test(normalized)) {
      return {
        command: 'redirect (>, >>)',
        correctTool: 'Write tool (for new files) or Edit tool (for existing files)',
        example: 'echo "content" > file.txt',
        correctExample: 'Write: file_path="file.txt", content="content"'
      };
    }
  }

  // Check for banned commands at start of command or after pipes/chains
  const commandParts = normalized.split(/[|;&]+/).map(s => s.trim());

  for (const part of commandParts) {
    // Extract the base command (first word)
    const baseCommand = part.split(/\s+/)[0];

    // Remove sudo if present
    const actualCommand = baseCommand === 'sudo'
      ? part.split(/\s+/)[1]
      : baseCommand;

    if (BANNED_COMMANDS[actualCommand]) {
      return {
        command: actualCommand,
        correctTool: BANNED_COMMANDS[actualCommand],
        example: part.substring(0, 60),
        correctExample: getCorrectExample(actualCommand)
      };
    }
  }

  return null;
}

function getCorrectExample(command) {
  const examples = {
    cat: 'Read: file_path="path/to/file.txt"',
    head: 'Read: file_path="file.txt", limit=10',
    tail: 'Read: file_path="file.txt", offset=-50',
    grep: 'Grep: pattern="search_term", path="directory/", output_mode="content"',
    rg: 'Grep: pattern="search_term", type="js", output_mode="files_with_matches"',
    find: 'Glob: pattern="**/*.js"',
    sed: 'Edit: file_path="file.txt", old_string="old", new_string="new"',
    awk: 'Edit: file_path="file.txt", old_string="old", new_string="new", replace_all=true',
    wc: 'Read: file_path="file.txt" (then count lines in response)',
    tree: 'Glob: pattern="directory/**/*" (format as tree in response)',
  };

  return examples[command] || `Use appropriate built-in tool instead of ${command}`;
}

main();
