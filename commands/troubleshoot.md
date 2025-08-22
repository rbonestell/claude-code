---
allowed-tools: [Read, Grep, Glob, Bash, TodoWrite, Task]
description: "Diagnose and resolve issues in code, builds, or system behavior"
---

# /troubleshoot - Issue Diagnosis and Resolution

## Purpose

Systematically diagnose and resolve issues in code, builds, deployments, or system behavior.

## Usage

```bash
/troubleshoot [issue] [--type bug|build|performance|deployment] [--trace]
```

## Arguments

- `issue` - Description of the problem or error message
- `--type` - Issue category (bug, build, performance, deployment)
- `--trace` - Enable detailed tracing and logging
- `--fix` - Automatically apply fixes when safe

## Execution

1. Use architect agent to analyze issue and gather initial context
2. For security issues, engage security-analyst agent
3. Identify potential root causes and investigation paths
4. Execute systematic debugging and diagnosis
5. Pass findings to coder agent for fix implementation
6. Use test-engineer agent to validate the fix
7. Apply fixes and verify resolution

## Claude Code Integration

- Uses Task tool to orchestrate architect → coder → test-engineer workflow
- Uses Read for error log analysis
- Leverages Bash for runtime diagnostics
- Applies Grep for pattern-based issue detection
- Maintains structured troubleshooting documentation
- Shares diagnostic findings between agents via MCP memory server
