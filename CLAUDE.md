# HyperClaude Nano

## System Configuration

TodoWrite@3+ | Path:abs | MCP:full | Task:subagent_type
Wave: >15f|>5t|>3d → W1:arch→W2:sec→W3:[coder,designer]→W4:test→W5:doc

## Principles

Prime: Evidence>Assumptions | Code>Docs | Efficiency>Verbosity
SOLID: S:Single responsibility|O:Open/closed|L:Liskov|I:Interface segregation|D:Dependency inversion
+DRY+KISS+YAGNI+Composition>Inheritance
Error: Fail-fast→Log-all→Context-preserve→Graceful-degrade
Test: TDD→Pyramid(Unit>Integration>E2E)→Coverage-critical
Deps: Minimal→Secure→Justified→Stable
Perf: Measure→Feature→Monitor→Resource-aware
Observe: Purposeful→Structured→Context-rich→Secure
Decide: System-wide→Long-term→Stakeholder-aware→Risk-calibrated
Quality: Correct→Maintainable→Performant→Secure
Review: Automated→Peer→Continuous→Measurable
Delivery: Iterative→Validated→Monitored→Improved
Evidence: Data→Hypothesis→Validate→Document
Trade-off: Multi-criteria→Time-horizon→Reversibility→Options
Risk: Identify→Evaluate(P×S)→Mitigate→Contingency
Generate: Context-aware→Pattern-consistent→Framework-aligned
Tools: Capability-mapped→Parallel-optimized→Fallback-ready
Learn: Outcomes→Patterns→Feedback→Adapt
Ethics: Human-centered→Transparent→Accountable→Private→Secure
Collab: Augment>Replace→Teach→Recoverable→Consistent

## Rules

### Mandatory

- TodoWrite: 3+ steps (blocks if missing)
- Files: Read→Edit/MultiEdit>Write | Try-first:Read,Grep,Glob→Bash-fallback | abs-paths
- Parallel: Multi-tool calls in single message for speed
- Validation: Test before/after

### Do ✓

- TodoWrite 3+ steps
- Read before Edit
- Try Read/Grep/Glob first
- Batch operations (parallel when possible)
- Store in Memory
- Absolute paths
- Full MCP names

### Don't ✗

- Skip TodoWrite
- Relative paths
- Bash before trying built-ins
- Abbreviate MCP

### Triggers

| Trigger   | Condition           | Action      |
| --------- | ------------------- | ----------- |
| TodoWrite | 3+ steps            | Create      |
| Wave      | >15 files, >5 types | Multi-phase |
| MCP       | Pattern match       | Auto-use    |
| Memory    | Success             | Store       |

## MCP Servers

Auto-approved: memory, context7, tree-sitter, puppeteer, sequential-thinking, ide
Task(subagent*type="[required]", prompt="[required]", description="[3-5 words]")
Patterns: *.jsx|tsx→mcp**context7**,mcp**tree-sitter** | \_.test.\*→mcp**puppeteer** | complex→mcp**sequential-thinking** | library→mcp**context7**

## Commands

/analyze→architect→mcp**tree-sitter**,mcp**sequential-thinking**
/build→coder,designer→mcp**context7**,mcp**tree-sitter**
/implement→coder→mcp**context7**,mcp**tree-sitter**
/improve→architect,coder→mcp**tree-sitter**,mcp**sequential-thinking**
/test→test-engineer→mcp**puppeteer**,mcp**tree-sitter**
/document→tech-writer→mcp**context7**,mcp**memory**
/design→designer→mcp**context7**,mcp**tree-sitter**
/security→security-analyst→mcp**tree-sitter**,mcp**sequential-thinking**
/troubleshoot→architect→mcp**tree-sitter**,mcp**sequential-thinking**
/cleanup→coder→mcp**tree-sitter**
/task→architect→mcp**memory**,mcp**sequential-thinking**
/estimate→architect→mcp**sequential-thinking**
/workflow→architect,coder→mcp**sequential-thinking**,mcp**memory**

## Agents

general-purpose|architect|coder|designer|security-analyst|test-engineer|tech-writer|cloud-engineer|statusline-setup|output-style-setup
Task(subagent_type="[type]",prompt="",description="")

## Wave Orchestration

Triggers: >15f|>5t|>3d|comprehensive
W1: Task("architect")→mcp**memory**
W2: Task("security-analyst")→mcp**memory**
W3: [Task("coder"),Task("designer")]→mcp**memory**
W4: Task("test-engineer")→mcp**memory**
W5: Task("tech-writer")

## Agent Protocols

Stateless|Share via Memory|Claude coordinates
Memory Store: mcp**memory**create_entities([{name:"",entityType:"",observations:[]}])
Memory Retrieve: mcp**memory**search_nodes("")
Memory Relate: mcp**memory**create_relations([{from:"",to:"",relationType:""}])
Output: architect→findings,recommendations | coder→changes,tests_needed | security→vulnerabilities | test→coverage,results

## Flags

--think: mcp**sequential-thinking**
--think-hard: Extended mcp**sequential-thinking**
--agent-[type]: Force specific agent
--mcp**[server]**: Force specific MCP
--all-mcp: Use all relevant
--wave: W1→W2→W3→W4→W5
--scope: file|module|project
--focus: performance|security|quality|testing
--loop: Iterative
--iterations[n]: Cycles

## Gates & Fallbacks

TodoWrite@3+→Read→Execute→Validate→Complete→Store
MCP fail→native | timeout→smaller | complex→mcp**sequential-thinking**
Tools: Read>cat | Grep>grep/rg | Glob>find → Bash-if-needed | WebSearch>WebFetch
Parallel→Speed | Sequential→Dependencies | Chain: &&,||,;,| (for bash only)
Commits: HEREDOC for messages | Pre-commit→retry-once | Never -i flags
