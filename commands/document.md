---
allowed-tools: [Read, Grep, Glob, Write, Edit, Task]
description: "Create focused documentation for specific components or features"
---

# /document - Focused Documentation

## Purpose

Generate precise, focused documentation for specific components, functions, or features.

## Usage

```bash
/document [target] [--type inline|external|api|guide] [--style brief|detailed]
```

## Arguments

- `target` - Specific file, function, or component to document
- `--type` - Documentation type (inline, external, api, guide)
- `--style` - Documentation style (brief, detailed)
- `--template` - Use specific documentation template

## Execution

1. Use architect agent to analyze component and extract key information
2. Identify documentation requirements and audience
3. For API documentation, architect provides technical specifications
4. For user guides, engage designer agent for UI documentation
5. Generate appropriate documentation based on type and style
6. Apply consistent formatting and structure
7. Integrate with existing documentation ecosystem

## Claude Code Integration

- Uses Task tool to engage architect agent for technical documentation
- Uses Read for deep component analysis
- Leverages Edit for inline documentation updates
- Applies Write for external documentation creation
- Maintains documentation standards and conventions
