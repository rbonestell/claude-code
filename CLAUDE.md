# HyperClaude Nano

## ⛔ READ THIS FIRST - MANDATORY TOOL POLICY ⛔

**📖 SEE: [MANDATORY_TOOL_POLICY.md](MANDATORY_TOOL_POLICY.md) - THIS OVERRIDES EVERYTHING**

**ABSOLUTE RULE: NEVER use bash commands for file operations**
**VIOLATION = IMMEDIATE FAILURE. Zero tolerance. No exceptions.**

### ⛔ BANNED BASH COMMANDS ⛔

- `cat`, `head`, `tail`, `less`, `more` → **USE Read**
- `grep`, `rg`, `ag`, `ack` → **USE Grep**
- `find`, `ls` (for searching) → **USE Glob**
- `echo >`, `echo >>`, `>`, `>>` → **USE Write**
- `sed`, `awk`, `perl -pi` → **USE Edit/MultiEdit**
- `tree`, `du -h` → **USE Glob + Read**
- `wc -l`, `wc -w` → **USE Read + process**

### WHEN FORCED TO USE BASH:

**MUST provide justification BEFORE execution:**
"Using bash because: [specific reason built-ins cannot work]"

## Config

TodoWrite: 3+steps|complex|multi-file | Path:abs | MCP:auto | Task(subagent_type,prompt,description)
Wave: >15f|>5t|>3d → W1:arch→W2:sec→W3:[coder,designer]→W4:test→W5:doc

## Core

Evidence>Assumptions | Code>Docs | Efficiency>Verbosity | SOLID+DRY+KISS+YAGNI
**BUILT-INS>Bash** | Read→Edit>Write | Parallel>Sequential | Test→Validate

## TodoWrite Triggers

- 3+ operations/steps
- Multi-file/component tasks
- Non-trivial/complex work
- User requests tracking
- Skip: single/trivial/info-only

## Agents (8)

general-purpose|architect|coder|designer|security-analyst|test-engineer|tech-writer|cloud-engineer

## Commands (14)

/analyze|/build|/cleanup|/design|/document|/explain|/implement|/improve|/index|/load|/task|/test|/troubleshoot|/workflow

### Mappings

/analyze→architect | /build→coder,designer | /cleanup→coder | /design→designer
/document→tech-writer | /explain→general | /implement→coder | /improve→architect,coder
/index→tech-writer | /load→general | /task→architect | /test→test-engineer
/troubleshoot→architect | /workflow→architect,coder

## MCP (5)

memory: entities,relations,search,store
context7: resolve-lib,get-docs
tree-sitter: search,usage,analyze,errors
puppeteer: navigate,interact,test
sequential-thinking: complex,--think

## 🔴 TOOL PRIORITY - ZERO TOLERANCE 🔴

### FILE OPERATIONS (NEVER BASH):

1. **Read** - ALWAYS first choice for viewing files
2. **Grep** - ALWAYS for content search
3. **Glob** - ALWAYS for file discovery
4. **Tree-sitter** - ALWAYS for code analysis
5. **Bash** - ONLY with explicit justification

### EDIT OPERATIONS (NEVER BASH):

1. **MultiEdit** - Multiple changes same file
2. **Edit** - Single change
3. **Write** - New files only
4. **NEVER** - echo, sed, awk, perl

### PARALLEL MANDATORY:

- ALWAYS parallel: reads, searches, independent ops
- NEVER sequential when parallel possible

## Git

Commit:explicit-request+HEREDOC
PR:parallel-info→gh-create
Never:-i,force,amend(unless-hook)

## Planning

ExitPlanMode:implementation-only
Skip:research,exploration,info

## Wave Deploy

W1:architect→design,analysis
W2:security→review
W3:[coder,designer]→parallel
W4:test-engineer→coverage
W5:tech-writer→docs

## Validation

Before-complete:tests,lint,typecheck
Store-success→memory
Fail→retry|fallback|ask

## ❌ VIOLATIONS - AUTOMATIC FAILURE ❌

1. Using `cat` instead of Read
2. Using `grep/rg` instead of Grep
3. Using `find` instead of Glob
4. Using `echo >` instead of Write
5. Using `sed/awk` instead of Edit
6. Not explaining why bash or custom script was necessary
7. Sequential ops when parallel available

## ✅ CORRECT PATTERNS ✅

```
# WRONG - NEVER DO THIS:
bash: cat file.txt
bash: grep "pattern" *.js
bash: find . -name "*.py"
bash: echo "content" > file.txt

# RIGHT - ALWAYS DO THIS:
Read: file.txt
Grep: pattern in *.js
Glob: **/*.py
Write: content to file.txt
```

## Enforcement Protocol

**BEFORE ANY OPERATION:**

1. Can built-in tool do this? → USE IT
2. Absolutely impossible with built-ins? → EXPLAIN WHY
3. Only then use bash WITH JUSTIFICATION

**NO EXCEPTIONS. NO SHORTCUTS. BUILT-INS FIRST, ALWAYS.**

# Important Reminders

Do what has been asked; nothing more, nothing less.
NEVER create files unless absolutely necessary.
ALWAYS prefer editing existing files.
NEVER proactively create documentation.
**ALWAYS USE BUILT-IN TOOLS - NO EXCUSES.**
