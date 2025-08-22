---
allowed-tools: [Read, Grep, Glob, Edit, MultiEdit, TodoWrite, Task]
description: "Apply systematic improvements to code quality, performance, and maintainability"
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

1. Use architect agent to analyze code for improvement opportunities
2. Architect creates improvement plan with risk assessment and patterns
3. Pass findings to coder agent for code improvements
4. For UI improvements, engage designer agent in parallel
5. Apply improvements with appropriate validation
6. Optionally use test-engineer agent to verify improvements
7. Report changes and quality metrics

## Claude Code Integration

- Uses Task tool to orchestrate architect → coder/designer agent workflow
- Uses Read for comprehensive code analysis
- Leverages MultiEdit for batch improvements
- Applies TodoWrite for improvement tracking
- Maintains safety and validation mechanisms
- Shares improvement plans between agents via MCP memory server
