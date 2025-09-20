---
allowed-tools: [Read, Grep, Glob, TodoWrite, Task]
description: "Design system architecture, APIs, and component interfaces"
wave-enabled: true
complexity-threshold: 0.6
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
2. **PARALLEL**: Engage @agent-designer for visual components while @agent-architect works on system design
3. @agent-architect creates system design and architectural patterns (parallel with step 4)
4. @agent-designer creates UI specifications and component designs (parallel with step 3)
5. Pass design specs to @agent-coder for implementation planning
6. Validate design against requirements and best practices
7. Generate design documentation and implementation guides

**Note**: Steps 2-4 execute in parallel for optimal performance per CLAUDE.md directives

## Claude Code Integration

- Uses Task tool to orchestrate @agent-architect and @agent-designer in parallel
- Uses Read for requirement analysis
- Uses Task for design documentation and specification creation
- Applies TodoWrite for design task tracking
- Maintains consistency with architectural patterns
- Shares design specifications between agents via MCP memory server
