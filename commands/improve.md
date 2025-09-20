---
allowed-tools: [Read, Grep, Glob, TodoWrite, Task]
description: "Apply systematic improvements to code quality, performance, and maintainability"
wave-enabled: true
complexity-threshold: 0.6
---

# /improve - Code Improvement

## Purpose

Apply systematic improvements to code quality, performance, maintainability, and best practices.

## Usage

```bash
/improve [target] [--type quality|performance|maintainability|style] [--safe]
```

## Arguments

- `target` - Files, directories, or project to improve
- `--type` - Improvement type (quality, performance, maintainability, style)
- `--safe` - Apply only safe, low-risk improvements
- `--preview` - Show improvements without applying them

## Execution

1. Use @agent-architect to analyze code for improvement opportunities
2. @agent-architect creates improvement plan with risk assessment and patterns
3. **PARALLEL**: Pass findings to @agent-coder AND @agent-designer simultaneously
4. @agent-coder implements code improvements (parallel with designer)
5. @agent-designer implements UI improvements (parallel with coder)
6. Apply improvements with appropriate validation
7. Optionally use @agent-test-engineer to verify improvements
8. Report changes and quality metrics

**Wave Trigger**: Activates for improvements spanning >15 files or >5 types

## Claude Code Integration

- Uses Task tool to orchestrate @agent-architect → parallel(@agent-coder, @agent-designer) workflow
- Uses Read for comprehensive code analysis
- Uses Task for batch improvements and file operations
- Applies TodoWrite for improvement tracking
- Maintains safety and validation mechanisms
- Shares improvement plans between agents via MCP memory server
