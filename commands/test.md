---
allowed-tools: [Read, Bash, Glob, TodoWrite, Task]
description: "Execute tests, generate test reports, and maintain test coverage"
wave-enabled: true
complexity-threshold: 0.5
---

# /test - Testing and Quality Assurance

## Purpose

Execute tests, generate comprehensive test reports, and maintain test coverage standards.

## Usage

```bash
/test [target] [--type unit|integration|e2e|all] [--coverage] [--watch]
```

## Arguments

- `target` - Specific tests, files, or entire test suite
- `--type` - Test type (unit, integration, e2e, all)
- `--coverage` - Generate coverage reports
- `--watch` - Run tests in watch mode
- `--fix` - Automatically fix failing tests when possible

## Execution

1. Use @agent-test-engineer to analyze test requirements
2. @agent-test-engineer discovers and categorizes available tests
3. If creating new tests, @agent-coder implements test code
4. Execute tests with appropriate configuration
5. @agent-test-engineer monitors results and collects metrics
6. Generate comprehensive test reports with coverage analysis
7. Provide recommendations for test improvements to all agents

**Wave Trigger**: Activates for test suites >15 files or >5 test types

## Claude Code Integration

- Uses Task tool to orchestrate @agent-test-engineer (primary) with @agent-coder support
- Uses Bash for test execution and monitoring
- Leverages Glob for test discovery
- Applies TodoWrite for test result tracking
- Maintains structured test reporting and coverage analysis
- Shares test results with all agents via MCP memory server
