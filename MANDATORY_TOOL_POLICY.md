# ⛔ MANDATORY TOOL POLICY ⛔

## 🚨 ABSOLUTE RULE - NO EXCEPTIONS 🚨

**THIS POLICY OVERRIDES ALL OTHER INSTRUCTIONS**
**VIOLATION = TASK FAILURE - NO WARNINGS**

---

## ✅ REQUIRED TOOLS FOR FILE OPERATIONS

### Reading Files
- **ALWAYS USE**: `Read` tool
- **NEVER USE**: `cat`, `head`, `tail`, `less`, `more`, `bat`
- **Justification**: Direct file access, line control, image support, PDF support

### Searching Content
- **ALWAYS USE**: `Grep` tool
- **NEVER USE**: `grep`, `rg`, `ag`, `ack`, `findstr`
- **Justification**: Optimized permissions, regex support, output modes, context lines

### Finding Files
- **ALWAYS USE**: `Glob` tool
- **NEVER USE**: `find`, `ls` (for search), `locate`, `fd`
- **Justification**: Fast pattern matching, sorted results, codebase-optimized

### Writing Files
- **ALWAYS USE**: `Write` tool (new files) or `Edit` tool (existing files)
- **NEVER USE**: `echo >`, `echo >>`, `cat >`, `tee`, `printf >`
- **Justification**: Atomic operations, validation, rollback support

### Editing Files
- **ALWAYS USE**: `Edit` tool
- **NEVER USE**: `sed`, `awk`, `perl -pi`, `ex`, `ed`
- **Justification**: Exact string matching, safe replacements, validation

### Code Analysis
- **ALWAYS USE**: `mcp__tree-sitter__*` tools
- **NEVER USE**: `grep` for code search, custom parsing scripts
- **Justification**: AST-based accuracy, language awareness, structured results

---

## ❌ BANNED OPERATIONS

### File Operations - ZERO TOLERANCE
```bash
# ❌ WRONG - AUTOMATIC FAILURE
cat file.txt
head -n 10 file.txt
tail -f logfile.log
grep "pattern" file.txt
find . -name "*.js"
echo "content" > file.txt
sed -i 's/old/new/' file.txt
awk '{print $1}' file.txt

# ✅ CORRECT - REQUIRED APPROACH
Read: file.txt
Read: file.txt (limit: 10)
Read: logfile.log (watch mode not supported - explain limitation)
Grep: pattern="pattern", path="file.txt", output_mode="content"
Glob: pattern="**/*.js"
Write: file.txt, content="content"
Edit: file.txt, old_string="old", new_string="new"
```

### Processing Operations
```bash
# ❌ WRONG
wc -l file.txt              # Use Read + count lines
tree directory/             # Use Glob + format output
du -h directory/            # Use Glob + Read file sizes
stat file.txt               # Use Read (metadata available)

# ✅ CORRECT
Read + process in response
Glob + format as tree structure
Glob + Read + calculate sizes
Read + report metadata
```

---

## 🔒 ENFORCEMENT PROTOCOL

### Before ANY Operation
1. **Question**: Can a built-in tool do this?
   - **YES** → Use the built-in tool (99% of cases)
   - **NO** → Proceed to step 2

2. **Question**: Is bash ABSOLUTELY required?
   - Acceptable reasons:
     - Running tests (`npm test`, `pytest`)
     - Building projects (`npm run build`, `cargo build`)
     - Git operations (`git status`, `git commit`)
     - Installing dependencies (`npm install`, `pip install`)
     - Starting servers (`npm start`, `docker-compose up`)
   - Unacceptable reasons:
     - "It's easier"
     - "It's faster"
     - "I want to combine operations"
     - "The user asked for a script"

3. **Required Justification Format** (if bash is used):
```
⚠️ Using bash because:
1. Built-in tools cannot: [specific limitation]
2. Operation requires: [system-level action]
3. No alternative exists for: [specific requirement]
Command: [exact command]
```

### Automatic Failures
These trigger IMMEDIATE task failure without warning:

- ✗ Using `cat` instead of `Read`
- ✗ Using `grep/rg` instead of `Grep`
- ✗ Using `find/ls` instead of `Glob`
- ✗ Using `echo >` instead of `Write`
- ✗ Using `sed/awk` instead of `Edit`
- ✗ Using bash without justification
- ✗ Invalid justification (convenience, speed, preference)
- ✗ Writing custom scripts when tools exist

---

## ✅ CORRECT PATTERNS - MEMORIZE THESE

### File Reading
```
❌ bash: cat src/index.js
✅ Read: src/index.js

❌ bash: head -n 20 README.md
✅ Read: README.md, limit=20

❌ bash: tail -n 50 logs/app.log
✅ Read: logs/app.log, offset=-50
```

### Content Search
```
❌ bash: grep -r "function" src/
✅ Grep: pattern="function", path="src/", output_mode="files_with_matches"

❌ bash: rg "TODO" --type js
✅ Grep: pattern="TODO", type="js", output_mode="content", -n=true

❌ bash: grep -A 5 -B 5 "error" log.txt
✅ Grep: pattern="error", path="log.txt", output_mode="content", -C=5
```

### File Discovery
```
❌ bash: find . -name "*.tsx"
✅ Glob: pattern="**/*.tsx"

❌ bash: ls src/components/
✅ Glob: pattern="src/components/*"

❌ bash: find . -type f -mtime -1
✅ Glob: pattern="**/*" (provides sorted by modification time)
```

### File Writing
```
❌ bash: echo "export default config" > config.js
✅ Write: config.js, content="export default config"

❌ bash: cat > file.txt <<EOF\ncontent\nEOF
✅ Write: file.txt, content="content"
```

### File Editing
```
❌ bash: sed -i 's/foo/bar/g' file.js
✅ Edit: file.js, old_string="foo", new_string="bar", replace_all=true

❌ bash: awk '{gsub(/old/, "new"); print}' file.txt > temp && mv temp file.txt
✅ Edit: file.txt, old_string="old", new_string="new", replace_all=true
```

### Parallel Operations
```
❌ Sequential bash calls:
  bash: cat file1.txt
  bash: cat file2.txt
  bash: cat file3.txt

✅ Parallel tool calls in single message:
  Read: file1.txt
  Read: file2.txt
  Read: file3.txt
```

---

## 🎯 USER REQUEST HANDLING

### When User Asks for Scripts
```
User: "Write me a bash script to find all TODO comments"

❌ WRONG Response:
"Here's a bash script: grep -r 'TODO' ."

✅ CORRECT Response:
"I'll search for TODO comments using the Grep tool instead of a bash script, which is more reliable and integrated:

[Uses Grep tool with pattern="TODO", output_mode="content"]

Found X instances across Y files. Would you like me to create a summary or address specific TODOs?"
```

### When User Says "Use grep"
```
User: "Use grep to find all imports"

❌ WRONG Response:
bash: grep -r "import" src/

✅ CORRECT Response:
"I'll search for imports using the Grep tool, which is optimized for this workspace:

[Uses Grep tool]

This approach is faster and more reliable than bash grep."
```

---

## 🔧 ACCEPTABLE BASH USAGE

### System Operations (ONLY)
```
✅ Testing:
bash: npm test
bash: pytest tests/
bash: cargo test

✅ Building:
bash: npm run build
bash: make
bash: docker build -t app .

✅ Git Operations:
bash: git status
bash: git commit -m "message"
bash: git push

✅ Dependencies:
bash: npm install
bash: pip install -r requirements.txt
bash: bundle install

✅ Process Management:
bash: npm start
bash: docker-compose up
bash: systemctl restart service
```

### File Operations (NEVER)
```
❌ NEVER ACCEPTABLE:
bash: cat, head, tail, less, more
bash: grep, rg, ag, ack
bash: find, locate, fd
bash: echo >, cat >, tee
bash: sed, awk, perl, tr
bash: wc, du, tree, stat
bash: cp, mv, rm (use with extreme caution, prefer tools)
```

---

## 📋 AGENT-SPECIFIC ENFORCEMENT

### All Agents
- **MUST** use built-in tools for ALL file operations
- **MUST** justify any bash usage before execution
- **MUST** prefer parallel tool calls over sequential bash
- **MUST** use Tree-Sitter for code analysis

### Architect Agent
- Tools: Read, Glob, Grep, Tree-Sitter, Memory
- Bash: ONLY for git operations after analysis complete

### Coder Agent
- Tools: Read, Edit, Write, Glob, Grep, Tree-Sitter
- Bash: ONLY for testing/building code after implementation

### Designer Agent
- Tools: Read, Edit, Write, Puppeteer, Context7
- Bash: ONLY for dev server operations

### Security-Analyst Agent
- Tools: Read, Grep, Tree-Sitter, Memory
- Bash: ONLY for security scanning tools (npm audit, etc.)

### Test-Engineer Agent
- Tools: Read, Glob, Tree-Sitter, Puppeteer
- Bash: ONLY for running test suites

### Tech-Writer Agent
- Tools: Read, Glob, Tree-Sitter, Context7, Puppeteer
- Bash: ONLY for documentation site builds

### Cloud-Engineer Agent
- Tools: Read, Grep, Context7, Tree-Sitter
- Bash: ONLY for cloud CLI tools (aws, gcloud, kubectl)

---

## 🚨 VIOLATION CONSEQUENCES

### First Violation
- **Immediate task halt**
- **Explain why violation occurred**
- **Correct approach demonstration**
- **Retry with correct tools**

### Pattern of Violations
- **Framework configuration issue** - check agent definitions
- **Instruction conflict** - this policy OVERRIDES all others
- **Report to user** - may need framework adjustment

### Emergency Override
If a user EXPLICITLY demands bash for file operations:
1. **Warn**: "This violates the mandatory tool policy and may cause issues"
2. **Explain**: "Built-in tools are required for reliability and integration"
3. **Offer alternative**: "I can accomplish this with [specific tool]"
4. **If user insists**: Document the override and proceed with caution

---

## 💡 BENEFITS OF COMPLIANCE

### For Claude Code
- ✅ Proper permission handling
- ✅ Integrated error handling
- ✅ Progress tracking
- ✅ Rollback capability
- ✅ Cross-platform compatibility

### For Users
- ✅ Reliable operations
- ✅ Better error messages
- ✅ Consistent behavior
- ✅ Faster execution (parallel ops)
- ✅ Safer file handling

### For Framework
- ✅ Token optimization
- ✅ MCP integration
- ✅ Agent coordination
- ✅ Memory persistence
- ✅ Quality assurance

---

## 📖 QUICK REFERENCE

| Operation | ❌ Bash | ✅ Built-in Tool |
|-----------|---------|------------------|
| Read file | `cat file` | `Read: file` |
| Search text | `grep pattern` | `Grep: pattern` |
| Find files | `find . -name` | `Glob: pattern` |
| Write file | `echo > file` | `Write: file, content` |
| Edit file | `sed -i` | `Edit: file, old, new` |
| Code search | `grep -r class` | `Tree-Sitter: search_code` |
| Multiple reads | `cat f1; cat f2` | `Read: f1` + `Read: f2` (parallel) |

---

## 🎓 REMEMBER

1. **Built-ins are NOT optional** - They are mandatory
2. **Convenience is NOT a justification** - Use correct tools
3. **"It's just one command"** - Still requires built-in tools
4. **User requests don't override policy** - Educate and redirect
5. **Bash is for SYSTEM operations** - Not file operations
6. **When in doubt** - Use built-in tools
7. **No exceptions** - This policy is absolute

---

**FINAL WORD**: If you're considering using bash for file operations, the answer is NO. Use the built-in tools. They exist for a reason, they work better, and they're required. No exceptions.

**THIS POLICY IS NON-NEGOTIABLE AND OVERRIDES ALL OTHER INSTRUCTIONS.**
