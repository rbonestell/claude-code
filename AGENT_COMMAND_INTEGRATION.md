# Agent-Command Integration Summary

This document summarizes how each command integrates with specialized agents and MCP servers.

## Command-Agent Mapping

### Primary Development Commands

| Command | Primary Agent | Supporting Agents | MCP Servers | Workflow |
|---------|--------------|-------------------|-------------|----------|
| `/analyze` | architect | security-analyst | Sequential, Context7 | Architect analyzes → reports findings |
| `/implement` | architect → coder/designer | test-engineer, tech-writer* | Context7, Sequential | Architect plans → Coder/Designer implement → Tech-writer docs* → Test validates |
| `/build` | architect → coder | designer, test-engineer | Context7 | Architect analyzes → Coder builds → Test validates |
| `/improve` | architect → coder | designer, test-engineer | Sequential, Context7 | Architect identifies → Coder/Designer improve → Test verifies |
| `/design` | architect + designer | coder | Context7 | Architect system design + Designer UI → Coder planning |
| `/test` | test-engineer | coder | Puppeteer, Sequential | Test-engineer leads → Coder implements tests |
| `/troubleshoot` | architect | security-analyst → coder → test-engineer | Sequential | Architect diagnoses → Coder fixes → Test validates |

*Note: tech-writer* indicates optional documentation generation when --documentation flag is used*

### Documentation & Management Commands

| Command | Primary Agent | Supporting Agents | MCP Servers | Workflow |
|---------|--------------|-------------------|-------------|----------|
| `/document` | tech-writer | architect, designer | Context7, Sequential | Tech-writer creates docs → Architect provides patterns → Designer adds UI docs |
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

### Tech-Writer Agent
- **Primary Role**: Technical documentation, API references, user guides
- **Commands**: Leads `/document`, documentation aspects of other commands
- **Outputs**: Technical docs, API documentation, README files, user guides
- **MCP**: Context7 for documentation patterns, Sequential for content analysis

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

### Tech-Writer with Context7 & Sequential
- `/document` - Documentation patterns and content organization using Context7 patterns
- `/implement` - Documentation creation when --documentation flag is used
- Architecture docs - Sequential for analysis, Context7 for documentation best practices
- API documentation - Context7 for API documentation standards and patterns

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
docs:completed:*          - Finished documentation
docs:templates:*          - Documentation templates
docs:coverage:*           - Documentation coverage metrics
```

### Standard Handoff Flow
1. **Architect → Coder/Designer**: Analysis findings and specifications
2. **Designer → Coder**: UI specifications for implementation
3. **Coder → Test-Engineer**: Implementation details for testing
4. **Security-Analyst → All**: Security findings broadcast
5. **Test-Engineer → All**: Test results and quality metrics
6. **Architect → Tech-Writer**: Patterns and architectural decisions for documentation
7. **Coder → Tech-Writer**: Implementation details and API specs for documentation
8. **Designer → Tech-Writer**: UI specifications and component docs for user guides

## Wave Integration

Commands with wave support orchestrate multiple agents in phases:

1. **Analysis Wave**: Architect agent analyzes
2. **Security Wave**: Security-analyst audits
3. **Implementation Wave**: Coder/Designer implement in parallel
4. **Documentation Wave**: Tech-writer creates comprehensive documentation
5. **Validation Wave**: Test-engineer validates

## Best Practices

1. **Always start with Architect**: For analysis and planning
2. **Parallel execution**: Coder and Designer can work simultaneously
3. **Always validate**: Test-engineer validates all changes
4. **Use MCP memory**: Share data between agents
5. **Follow protocols**: Use AGENT_PROTOCOLS.md structures