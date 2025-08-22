---
allowed-tools: [Read, Bash, Glob, TodoWrite, Edit, Task]
description: "Build, compile, and package projects with error handling and optimization"
---

# /build - Project Building

## Purpose

Build, compile, and package projects with comprehensive error handling and optimization.

## Usage

```bash
/build [target] [--type dev|prod|test] [--clean] [--optimize]
```

## Arguments

- `target` - Project or specific component to build
- `--type` - Build type (dev, prod, test)
- `--clean` - Clean build artifacts before building
- `--optimize` - Enable build optimizations
- `--verbose` - Enable detailed build output

## Execution

1. Use architect agent to analyze project structure and build configuration
2. Pass analysis to coder agent for build script generation/modification
3. For UI projects, engage designer agent for asset optimization
4. Validate dependencies and environment setup
5. Execute build process with error monitoring
6. Handle build errors and provide diagnostic information
7. Optionally use test-engineer agent for build validation
8. Optimize build output and report results

## Claude Code Integration

- Uses Task tool to orchestrate architect → coder/designer agent workflow
- Uses Bash for build command execution
- Leverages Read for build configuration analysis
- Applies TodoWrite for build progress tracking
- Maintains comprehensive error handling and reporting
- Shares build configurations between agents via MCP memory server
