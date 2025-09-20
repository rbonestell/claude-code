---
allowed-tools: [Read, Grep, Glob, Bash, TodoWrite, Task]
description: "Analyze code quality, security, performance, and architecture"
wave-enabled: true
complexity-threshold: 0.6
---

# /analyze - Code Analysis

## Purpose
Execute comprehensive code analysis across quality, security, performance, and architecture domains.

## Usage
```
/analyze [target] [--focus quality|security|performance|architecture] [--depth quick|deep]
```

## Arguments
- `target` - Files, directories, or project to analyze
- `--focus` - Analysis focus area (quality, security, performance, architecture)
- `--depth` - Analysis depth (quick, deep)
- `--format` - Output format (text, json, report)

## Execution
1. Discover and categorize files for analysis
2. Apply appropriate analysis tools and techniques (use @agent-architect for system-wide analysis)
3. **PARALLEL**: For security focus, engage @agent-security-analyst alongside architect
4. Generate findings with severity ratings
5. Create actionable recommendations with priorities
6. Present comprehensive analysis report

**Wave Trigger**: Activates for codebases >15 files or >5 component types

## Claude Code Integration
- Uses Glob for systematic file discovery
- Leverages Grep for pattern-based analysis
- Applies Read for deep code inspection
- Utilizes @agent-architect via Task tool for comprehensive system analysis
- Maintains structured analysis reporting