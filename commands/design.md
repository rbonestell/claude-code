---
allowed-tools: [Read, Grep, Glob, Write, Edit, TodoWrite, Task]
description: "Design system architecture, APIs, and component interfaces"
---

# /design - System and Component Design

## Purpose

Design system architecture, APIs, component interfaces, and technical specifications.

## Usage

```bash
/design [target] [--type architecture|api|component|database] [--format diagram|spec|code]
```

## Arguments

- `target` - System, component, or feature to design
- `--type` - Design type (architecture, api, component, database)
- `--format` - Output format (diagram, spec, code)
- `--iterative` - Enable iterative design refinement

## Execution

1. Use @agent-architect to analyze requirements and design constraints
2. For UI/UX design, engage @agent-designer for visual components
3. @agent-architect creates system design and architectural patterns
4. @agent-designer creates UI specifications and component designs
5. Pass design specs to @agent-coder for implementation planning
6. Validate design against requirements and best practices
7. Generate design documentation and implementation guides

## Claude Code Integration

- Uses Task tool to orchestrate @agent-architect and @agent-designer
- Uses Read for requirement analysis
- Leverages Write for design documentation
- Applies TodoWrite for design task tracking
- Maintains consistency with architectural patterns
- Shares design specifications between agents via MCP memory server
