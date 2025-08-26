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
| **@agent-architect** | System design & analysis | Sequential, Context7, Memory, Tree-Sitter | general-purpose | `/analyze`, `--agent-architect` |
| **@agent-coder** | Implementation & coding | Write, Edit, Context7, Memory, Tree-Sitter | coder | `/implement`, `--agent-coder` |
| **@agent-designer** | UI/UX & frontend | Puppeteer, Context7, Memory | designer | `/design`, `--agent-designer` |
| **@agent-security-analyst** | Security & compliance | Sequential, Grep, Memory | security-analyst | `/security`, `--agent-security` |
| **@agent-test-engineer** | Testing & QA | Puppeteer, Sequential, Memory | test-engineer | `/test`, `--agent-test` |
| **@agent-tech-writer** | Documentation & guides | Context7, Tree-Sitter, Memory, Puppeteer | tech-writer | `/document`, `--agent-tech-writer` |

## Agent Capabilities Matrix

### @agent-architect
**Specialization**: System architecture, code review, pattern analysis
- **Strengths**: Holistic system understanding, technical debt assessment, design patterns
- **Best For**: System analysis, architecture review, improvement planning
- **Output**: Structured findings, pattern documentation, execution plans
- **Handoff**: Provides specifications to @agent-coder and @agent-designer

### @agent-coder
**Specialization**: Code implementation, refactoring, bug fixes
- **Strengths**: Pattern-consistent implementation, framework expertise, testing
- **Best For**: Feature development, bug fixes, refactoring, code remediation
- **Input**: Accepts @agent-architect findings and @agent-designer specifications
- **Output**: Production-ready code with tests

### @agent-designer
**Specialization**: UI/UX design, frontend development, accessibility
- **Strengths**: Design systems, responsive design, performance optimization, Context7 UI patterns
- **Best For**: Component creation, UI implementation, visual validation
- **Input**: Accepts @agent-architect constraints and requirements
- **Output**: Design specifications for @agent-coder implementation
- **MCP Integration**: Uses Context7 for UI component patterns and best practices

### @agent-security-analyst
**Specialization**: Security audits, vulnerability assessment, compliance
- **Strengths**: Threat modeling, OWASP compliance, security patterns
- **Best For**: Security reviews, penetration testing, compliance audits
- **Output**: Security findings, remediation recommendations
- **Integration**: Feeds critical issues to all other agents

### @agent-test-engineer
**Specialization**: Test creation, E2E testing, quality assurance
- **Strengths**: Test strategy, coverage analysis, regression testing
- **Best For**: Test suite development, validation, performance testing
- **Input**: Test requirements from @agent-coder and @agent-designer
- **Output**: Test results, coverage reports, quality metrics
- **MCP Integration**: Uses Puppeteer for browser automation and E2E testing

### @agent-tech-writer
**Specialization**: Technical documentation, API references, user guides
- **Strengths**: Clear writing, pattern recognition, documentation frameworks
- **Best For**: README creation, API documentation, user guides, documentation sites
- **Input**: Accepts patterns from @agent-architect, implementations from @agent-coder, UI specs from @agent-designer
- **Output**: Complete documentation, coverage metrics, documentation sites
- **MCP Integration**: Uses Context7 for best practices, Tree-Sitter for code analysis

## Agent Selection Algorithm

### Automatic Selection
Agents are automatically selected based on:

1. **Command Mapping**:
   - `/analyze` → @agent-architect
   - `/implement` → @agent-coder
   - `/design` → @agent-designer
   - `/test` → @agent-test-engineer
   - `/security` → @agent-security-analyst
   - `/document` → @agent-tech-writer

2. **Keyword Detection**:
   ```yaml
   @agent-architect: [architecture, design, review, patterns, analysis]
   @agent-coder: [implement, fix, refactor, develop, code]
   @agent-designer: [UI, component, frontend, responsive, accessibility]
   @agent-security-analyst: [vulnerability, security, audit, compliance, threat]
   @agent-test-engineer: [test, QA, coverage, validation, E2E]
   @agent-tech-writer: [document, documentation, README, API docs, guide, tutorial]
   ```

3. **File Pattern Analysis**:
   - `*.tsx`, `*.jsx`, `*.css` → @agent-designer
   - `*.test.*`, `*.spec.*` → @agent-test-engineer
   - `*auth*`, `*security*` → @agent-security-analyst
   - Controllers, models, services → @agent-coder
   - Config files, architecture docs → @agent-architect
   - `*.md`, `README*`, `CHANGELOG*`, `docs/*` → @agent-tech-writer

4. **Complexity Scoring**:
   - High complexity + system-wide → @agent-architect
   - Implementation focus → @agent-coder
   - Visual/UX focus → @agent-designer
   - Quality focus → @agent-test-engineer
   - Security focus → @agent-security-analyst
   - Documentation needs → @agent-tech-writer

### Manual Selection
Use explicit flags to override automatic selection:
- `--agent-architect` - Force @agent-architect
- `--agent-coder` - Force @agent-coder
- `--agent-designer` - Force @agent-designer
- `--agent-security` - Force @agent-security-analyst
- `--agent-test` - Force @agent-test-engineer
- `--agent-tech-writer` - Force @agent-tech-writer

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
    agent: @agent-architect
    task: "System analysis and pattern identification"
    output: "review:findings:*"
  
  wave_2:
    agent: @agent-security-analyst
    task: "Security audit of identified components"
    output: "security:vulnerabilities:*"
  
  wave_3:
    agents: [@agent-coder, @agent-designer]
    task: "Implement fixes and UI improvements"
    parallel: true
    input: ["review:findings:*", "security:vulnerabilities:*"]
  
  wave_4:
    agent: @agent-test-engineer
    task: "Validate all changes"
    input: ["test:requirements:*"]
  
  wave_5:
    agent: @agent-tech-writer
    task: "Create comprehensive documentation"
    input: ["review:findings:*", "implementation:status:*", "design:updates:*"]
    output: "docs:completed:*"
```

### Agent-Specific Wave Strategies

- **@agent-architect**: Systematic analysis waves
- **@agent-coder**: Progressive implementation waves
- **@agent-designer**: Iterative design refinement waves
- **@agent-security-analyst**: Comprehensive audit waves
- **@agent-test-engineer**: Validation and regression waves
- **@agent-tech-writer**: Progressive documentation waves

## Performance Metrics

### Agent Effectiveness Tracking

```yaml
metrics:
  success_rate:
    @agent-architect: 95%  # Successful analyses
    @agent-coder: 92%      # Clean implementations
    @agent-designer: 94%   # Accessible designs
    @agent-security-analyst: 97%   # Vulnerabilities found
    @agent-test-engineer: 90%       # Test coverage achieved
  
  token_efficiency:
    @agent-architect: 15K avg
    @agent-coder: 10K avg
    @agent-designer: 8K avg
    @agent-security-analyst: 12K avg
    @agent-test-engineer: 7K avg
  
  handoff_quality:
    @agent-architect_to_@agent-coder: 94%
    @agent-designer_to_@agent-coder: 92%
    @agent-coder_to_@agent-test-engineer: 96%
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
# @agent-architect auto-selected for analysis
/analyze @src/ --comprehensive

# @agent-coder auto-selected for implementation
/implement "Add user authentication"

# @agent-designer auto-selected for UI work
/design "Create responsive dashboard"
```

### Manual Agent Selection
```bash
# Force @agent-architect for detailed review
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
- Example: @agent-architect + mentor persona = educational analysis

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