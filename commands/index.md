---
allowed-tools: [Read, Edit, Write, Grep, Glob, Bash, TodoWrite, Task]
description: "Generate comprehensive project documentation and knowledge base"
---

# /index - Project Documentation

## ⛔ MANDATORY: Read [MANDATORY_TOOL_POLICY.md](../MANDATORY_TOOL_POLICY.md) ⛔
**ENFORCEMENT**: All file operations MUST use Read/Edit/Write/Grep/Glob - NO bash alternatives

## Purpose
Create and maintain comprehensive project documentation, indexes, and knowledge bases.

## Usage
```
/index [target] [--type docs|api|structure|readme] [--format md|json|yaml]
```

## Arguments
- `target` - Project directory or specific component to document
- `--type` - Documentation type (docs, api, structure, readme)
- `--format` - Output format (md, json, yaml)
- `--update` - Update existing documentation

## Execution
1. Analyze project structure and identify key components
2. Extract documentation from code comments and README files
3. Generate comprehensive documentation based on type
4. Create navigation structure and cross-references
5. Output formatted documentation with proper organization

## Claude Code Integration
- Uses Glob for systematic file discovery
- Leverages Grep for extracting documentation patterns
- Uses Task for creating and organizing structured documentation
- Maintains consistency with project conventions