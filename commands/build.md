---
allowed-tools: [Read, Bash, Glob, TodoWrite, Task]
description: "Build, compile, and package projects with error handling and optimization"
wave-enabled: true
complexity-threshold: 0.5
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

1. Use @agent-architect to analyze project structure and build configuration
2. **PARALLEL**: Pass analysis to @agent-coder for build scripts AND @agent-designer for UI assets
3. @agent-coder generates/modifies build scripts (parallel with designer)
4. @agent-designer optimizes assets for UI projects (parallel with coder)
5. Validate dependencies and environment setup
6. Execute build process with error monitoring
7. Handle build errors and provide diagnostic information
8. Optionally use @agent-test-engineer for build validation
9. Optimize build output and report results

**Wave Trigger**: Activates for projects >15 files or >5 component types

## Claude Code Integration

- Uses Task tool to orchestrate @agent-architect → parallel(@agent-coder, @agent-designer) workflow
- Uses Bash for build command execution
- Leverages Read for build configuration analysis
- Applies TodoWrite for build progress tracking
- Maintains comprehensive error handling and reporting
- Shares build configurations between agents via MCP memory server
