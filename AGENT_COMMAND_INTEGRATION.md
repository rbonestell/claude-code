# Agent-Command Integration Summary

This document summarizes how each command integrates with specialized agents and MCP servers.

## Command-Agent Mapping

### Primary Development Commands

| Command | Primary Agent | Supporting Agents | MCP Servers | Workflow |
|---------|--------------|-------------------|-------------|----------|
| `/analyze` | architect | security-analyst | Sequential, Context7 | Architect analyzes → reports findings |
| `/implement` | architect → coder/designer | test-engineer | Context7, Sequential | Architect plans → Coder/Designer implement → Test validates |
| `/build` | architect → coder | designer, test-engineer | Context7 | Architect analyzes → Coder builds → Test validates |
| `/improve` | architect → coder | designer, test-engineer | Sequential, Context7 | Architect identifies → Coder/Designer improve → Test verifies |
| `/design` | architect + designer | coder | Context7 | Architect system design + Designer UI → Coder planning |
| `/test` | test-engineer | coder | Puppeteer, Sequential | Test-engineer leads → Coder implements tests |
| `/troubleshoot` | architect | security-analyst → coder → test-engineer | Sequential | Architect diagnoses → Coder fixes → Test validates |

### Documentation & Management Commands

| Command | Primary Agent | Supporting Agents | MCP Servers | Workflow |
|---------|--------------|-------------------|-------------|----------|
| `/document` | architect | designer | Context7 | Architect technical docs, Designer UI docs |
| `/task` | architect | coder, designer, test-engineer | Sequential, Context7 | Architect plans → Agents execute → Test validates |
| `/workflow` | architect | all agents | Sequential, Context7 | Comprehensive multi-agent orchestration |

## Agent Responsibilities

### Architect Agent
- **Primary Role**: System analysis, design, planning
- **Commands**: Leads `/analyze`, initiates `/implement`, `/improve`, `/build`
- **Outputs**: Findings, patterns, execution plans
- **MCP**: Sequential for analysis, Context7 for patterns

### Coder Agent
- **Primary Role**: Implementation, bug fixes, refactoring
- **Commands**: Implements in `/implement`, `/build`, `/improve`
- **Outputs**: Production code, fixes, refactored code
- **MCP**: Context7 for patterns, Sequential for logic

### Designer Agent
- **Primary Role**: UI/UX, frontend components
- **Commands**: UI in `/implement`, `/design`, frontend `/build`
- **Outputs**: Component specs, UI implementations
- **MCP**: Context7 for UI patterns, component best practices, and framework docs

### Security-Analyst Agent
- **Primary Role**: Security audits, vulnerability assessment
- **Commands**: Security issues in `/troubleshoot`, `/analyze`
- **Outputs**: Security findings, remediation plans
- **MCP**: Sequential for analysis

### Test-Engineer Agent
- **Primary Role**: Testing, validation, quality assurance
- **Commands**: Leads `/test`, validates all implementations
- **Outputs**: Test results, coverage reports
- **MCP**: Puppeteer for E2E, Sequential for planning

## MCP Server Usage by Command

### Context7 (Documentation & Patterns)
- `/implement` - Framework patterns and best practices
- `/build` - Build configuration patterns
- `/improve` - Improvement patterns
- `/design` - Design patterns
- `/document` - Documentation patterns
- `/task` - Framework patterns

### Sequential (Complex Analysis)
- `/analyze` - System-wide analysis
- `/implement` - Complex logic planning
- `/improve` - Improvement analysis
- `/troubleshoot` - Root cause analysis
- `/test` - Test planning
- `/task` - Multi-step reasoning

### Designer Agent with Context7
- `/implement` - UI component specifications using Context7 patterns
- `/design` - Design system components with Context7 best practices
- `/workflow` - UI workflow planning with Context7 framework docs

### Puppeteer (Testing)
- `/test` - E2E test execution
- `/workflow` - Performance validation

## Inter-Agent Communication Protocol

All agents communicate via MCP memory server using structured JSON:

### Key Namespaces
```
project:patterns:*        - Design patterns
architectural:decisions:* - Architecture constraints
review:findings:*         - Analysis results
implementation:status:*   - Code implementation status
design:updates:*          - UI specifications
security:vulnerabilities:* - Security findings
test:results:*            - Test outcomes
```

### Standard Handoff Flow
1. **Architect → Coder/Designer**: Analysis findings and specifications
2. **Designer → Coder**: UI specifications for implementation
3. **Coder → Test-Engineer**: Implementation details for testing
4. **Security-Analyst → All**: Security findings broadcast
5. **Test-Engineer → All**: Test results and quality metrics

## Wave Integration

Commands with wave support orchestrate multiple agents in phases:

1. **Analysis Wave**: Architect agent analyzes
2. **Security Wave**: Security-analyst audits
3. **Implementation Wave**: Coder/Designer implement in parallel
4. **Validation Wave**: Test-engineer validates

## Best Practices

1. **Always start with Architect**: For analysis and planning
2. **Parallel execution**: Coder and Designer can work simultaneously
3. **Always validate**: Test-engineer validates all changes
4. **Use MCP memory**: Share data between agents
5. **Follow protocols**: Use AGENT_PROTOCOLS.md structures