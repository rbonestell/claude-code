# AGENTS.md - SuperClaude Custom Agent Integration

Custom agent system for specialized task execution within the SuperClaude framework.

## Overview

The agent system provides specialized AI personalities optimized for specific technical domains. Each agent has unique capabilities, tool access, and communication protocols that integrate seamlessly with SuperClaude commands, personas, and orchestration.

**Core Features**:
- **Specialized Expertise**: Domain-specific knowledge and approaches
- **Tool Optimization**: Curated tool access per agent
- **Inter-Agent Communication**: Structured data exchange via MCP servers
- **Intelligent Routing**: Automatic agent selection based on task analysis
- **Manual Override**: Explicit agent selection via flags

## Agent Registry

### Available Agents

| Agent | Domain | Primary Tools | Task Tool Type | Activation |
|-------|---------|--------------|----------------|------------|
| **architect** | System design & analysis | Sequential, Context7, Memory, Tree-Sitter | general-purpose | `/analyze`, `--agent-architect` |
| **coder** | Implementation & coding | Write, Edit, Context7, Memory, Tree-Sitter | coder | `/implement`, `--agent-coder` |
| **designer** | UI/UX & frontend | Puppeteer, Context7, Memory, Magic* | designer | `/design`, `--agent-designer` |
| **security-analyst** | Security & compliance | Sequential, Grep, Memory | security-analyst | `/security`, `--agent-security` |
| **test-engineer** | Testing & QA | Playwright, Sequential, Memory | test-engineer | `/test`, `--agent-test` |

*Magic server integration pending availability

## Agent Capabilities Matrix

### Architect Agent
**Specialization**: System architecture, code review, pattern analysis
- **Strengths**: Holistic system understanding, technical debt assessment, design patterns
- **Best For**: System analysis, architecture review, improvement planning
- **Output**: Structured findings, pattern documentation, execution plans
- **Handoff**: Provides specifications to coder and designer agents

### Coder Agent  
**Specialization**: Code implementation, refactoring, bug fixes
- **Strengths**: Pattern-consistent implementation, framework expertise, testing
- **Best For**: Feature development, bug fixes, refactoring, code remediation
- **Input**: Accepts architect findings and designer specifications
- **Output**: Production-ready code with tests

### Designer Agent
**Specialization**: UI/UX design, frontend development, accessibility
- **Strengths**: Design systems, responsive design, performance optimization
- **Best For**: Component creation, UI implementation, visual validation
- **Input**: Accepts architect constraints and requirements
- **Output**: Design specifications for coder implementation

### Security-Analyst Agent
**Specialization**: Security audits, vulnerability assessment, compliance
- **Strengths**: Threat modeling, OWASP compliance, security patterns
- **Best For**: Security reviews, penetration testing, compliance audits
- **Output**: Security findings, remediation recommendations
- **Integration**: Feeds critical issues to all other agents

### Test-Engineer Agent
**Specialization**: Test creation, E2E testing, quality assurance
- **Strengths**: Test strategy, coverage analysis, regression testing
- **Best For**: Test suite development, validation, performance testing
- **Input**: Test requirements from coder and designer
- **Output**: Test results, coverage reports, quality metrics

## Agent Selection Algorithm

### Automatic Selection
Agents are automatically selected based on:

1. **Command Mapping**:
   - `/analyze` → architect
   - `/implement` → coder
   - `/design` → designer
   - `/test` → test-engineer
   - `/security` → security-analyst

2. **Keyword Detection**:
   ```yaml
   architect: [architecture, design, review, patterns, analysis]
   coder: [implement, fix, refactor, develop, code]
   designer: [UI, component, frontend, responsive, accessibility]
   security: [vulnerability, security, audit, compliance, threat]
   test: [test, QA, coverage, validation, E2E]
   ```

3. **File Pattern Analysis**:
   - `*.tsx`, `*.jsx`, `*.css` → designer
   - `*.test.*`, `*.spec.*` → test-engineer
   - `*auth*`, `*security*` → security-analyst
   - Controllers, models, services → coder
   - Config files, architecture docs → architect

4. **Complexity Scoring**:
   - High complexity + system-wide → architect
   - Implementation focus → coder
   - Visual/UX focus → designer
   - Quality focus → test-engineer
   - Security focus → security-analyst

### Manual Selection
Use explicit flags to override automatic selection:
- `--agent-architect` - Force architect agent
- `--agent-coder` - Force coder agent
- `--agent-designer` - Force designer agent
- `--agent-security` - Force security-analyst agent
- `--agent-test` - Force test-engineer agent

## Inter-Agent Communication Protocol

### Data Exchange via MCP Memory Server

Agents share data using structured keys in mcp__memory:

```yaml
memory_keys:
  # Architect outputs
  "project:patterns:*": Design patterns identified
  "architectural:decisions:*": Architecture constraints
  "review:findings:*": Code review results
  
  # Designer outputs
  "design:patterns:*": UI patterns and components
  "ui:components:*": Component specifications
  "design:tokens:*": Design system tokens
  
  # Coder outputs
  "implementation:patterns:*": Code patterns used
  "code:modules:*": Module implementations
  "test:requirements:*": Testing needs
  
  # Security outputs
  "security:vulnerabilities:*": Found vulnerabilities
  "security:recommendations:*": Security fixes
  
  # Test outputs
  "test:results:*": Test execution results
  "test:coverage:*": Coverage metrics
```

### Handoff Protocols

#### Architect → Coder/Designer
```json
{
  "patterns": {
    "identified": ["Repository", "Factory", "Observer"],
    "preserve": ["Existing auth pattern"],
    "refine": ["Data access layer"]
  },
  "findings": [
    {
      "id": "ARCH-001",
      "type": "design",
      "location": "src/services",
      "recommendation": "Apply dependency injection"
    }
  ],
  "execution_plan": {
    "immediate": ["Critical fixes"],
    "short_term": ["Refactoring"],
    "long_term": ["Architecture improvements"]
  }
}
```

#### Designer → Coder
```json
{
  "design_specs": {
    "components": [
      {
        "name": "UserProfile",
        "props_interface": "IUserProfileProps",
        "styling_approach": "CSS Modules",
        "accessibility": "WCAG AA compliant"
      }
    ],
    "design_tokens": {
      "colors": {},
      "typography": {},
      "spacing": {}
    }
  }
}
```

## Wave Integration

### Multi-Agent Wave Patterns

Waves can orchestrate multiple agents for comprehensive operations:

```yaml
comprehensive_review:
  wave_1:
    agent: architect
    task: "System analysis and pattern identification"
    output: "review:findings:*"
  
  wave_2:
    agent: security-analyst
    task: "Security audit of identified components"
    output: "security:vulnerabilities:*"
  
  wave_3:
    agents: [coder, designer]
    task: "Implement fixes and UI improvements"
    parallel: true
    input: ["review:findings:*", "security:vulnerabilities:*"]
  
  wave_4:
    agent: test-engineer
    task: "Validate all changes"
    input: ["test:requirements:*"]
```

### Agent-Specific Wave Strategies

- **architect**: Systematic analysis waves
- **coder**: Progressive implementation waves
- **designer**: Iterative design refinement waves
- **security-analyst**: Comprehensive audit waves
- **test-engineer**: Validation and regression waves

## Performance Metrics

### Agent Effectiveness Tracking

```yaml
metrics:
  success_rate:
    architect: 95%  # Successful analyses
    coder: 92%      # Clean implementations
    designer: 94%   # Accessible designs
    security: 97%   # Vulnerabilities found
    test: 90%       # Test coverage achieved
  
  token_efficiency:
    architect: 15K avg
    coder: 10K avg
    designer: 8K avg
    security: 12K avg
    test: 7K avg
  
  handoff_quality:
    architect_to_coder: 94%
    designer_to_coder: 92%
    coder_to_test: 96%
```

## Agent Configuration

```yaml
agent_config:
  # Routing
  auto_selection: true
  confidence_threshold: 0.85
  fallback_agent: "general-purpose"
  
  # Communication
  memory_server: true
  structured_handoff: true
  validation_required: true
  
  # Performance
  parallel_agents: true
  max_concurrent: 3
  token_budget_per_agent: 30K
  
  # Quality
  require_tests: true
  require_documentation: true
  pattern_compliance: 0.9
```

## Usage Examples

### Automatic Agent Selection
```bash
# Architect agent auto-selected for analysis
/analyze @src/ --comprehensive

# Coder agent auto-selected for implementation
/implement "Add user authentication"

# Designer agent auto-selected for UI work
/design "Create responsive dashboard"
```

### Manual Agent Selection
```bash
# Force architect for detailed review
/improve @src/ --agent-architect

# Force security analyst for audit
/analyze @api/ --agent-security

# Multiple agents in sequence
/analyze --agent-architect && /implement --agent-coder
```

### Wave with Multiple Agents
```bash
# Comprehensive improvement using all agents
/improve @project/ --wave-mode --wave-strategy comprehensive
```

## Integration Points

### With SuperClaude Commands
- Commands automatically route to appropriate agents
- Agent selection enhances command effectiveness
- Multi-agent coordination via wave system

### With Personas
- Personas provide behavioral overlay to agents
- Agent technical expertise + Persona style
- Example: architect agent + mentor persona = educational analysis

### With MCP Servers
- Agents leverage MCP servers for enhanced capabilities
- Shared memory enables inter-agent communication
- Coordinated server usage prevents conflicts

## Best Practices

1. **Let Auto-Selection Work**: The system usually picks the right agent
2. **Use Waves for Complex Tasks**: Multi-agent waves for comprehensive work
3. **Leverage Inter-Agent Data**: Agents build on each other's outputs
4. **Monitor Handoff Quality**: Ensure clean data exchange between agents
5. **Respect Agent Boundaries**: Use agents for their specialized domains

## Troubleshooting

### Common Issues

**Agent Not Selected**:
- Check keyword matches
- Verify file patterns
- Use explicit `--agent-*` flag

**Poor Handoff Quality**:
- Verify memory server connection
- Check data structure compatibility
- Review agent output format

**Token Exhaustion**:
- Enable `--uc` mode
- Reduce scope with `--scope`
- Use wave delegation

## Future Enhancements

- Dynamic agent learning from outcomes
- Custom agent definition support
- Cross-project agent knowledge sharing
- Agent performance optimization
- Enhanced parallel agent coordination