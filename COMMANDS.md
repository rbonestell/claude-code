# COMMANDS.md - SuperClaude Command Execution Framework

Command execution framework for Claude Code SuperClaude integration.

## Command System Architecture

### Core Command Structure
```yaml
---
command: "/{command-name}"
category: "Primary classification"
purpose: "Operational objective"
wave-enabled: true|false
performance-profile: "optimization|standard|complex"
---
```

### Command Processing Pipeline
1. **Input Parsing**: `$ARGUMENTS` with `@<path>`, `!<command>`, `--<flags>`
2. **Context Resolution**: Auto-persona activation and MCP server selection
3. **Wave Eligibility**: Complexity assessment and wave mode determination
4. **Execution Strategy**: Tool orchestration and resource allocation
5. **Quality Gates**: Validation checkpoints and error handling

### Integration Layers
- **Claude Code**: Native slash command compatibility
- **Persona System**: Auto-activation based on command context
- **Agent System**: Specialized agents for domain-specific execution
- **MCP Servers**: Context7, Sequential, Puppeteer integration
- **Wave System**: Multi-stage orchestration for complex operations

## Wave System Integration

**Wave Orchestration Engine**: Multi-stage command execution with compound intelligence. Auto-activates on complexity ≥0.7 + files >20 + operation_types >2.

**Wave-Enabled Commands**:
- **Tier 1**: `/analyze`, `/build`, `/implement`, `/improve`
- **Tier 2**: `/design`, `/task`

### Development Commands

**`/build $ARGUMENTS`**
```yaml
---
command: "/build"
category: "Development & Deployment"
purpose: "Project builder with framework detection"
wave-enabled: true
performance-profile: "optimization"
primary-agent: "coder"
supporting-agents: ["designer", "architect"]
---
```
- **Auto-Persona**: Frontend, Backend, Architect, Scribe
- **Auto-Agent**: coder (primary), designer (UI components), architect (structure)
- **MCP Integration**: Context7 (UI patterns and framework docs), Sequential (logic)
- **Tool Orchestration**: [Read, Grep, Glob, Bash, TodoWrite, Edit, MultiEdit]
- **Arguments**: `[target]`, `@<path>`, `!<command>`, `--<flags>`

**`/implement $ARGUMENTS`**
```yaml
---
command: "/implement"
category: "Development & Implementation"
purpose: "Feature and code implementation with intelligent persona activation"
wave-enabled: true
performance-profile: "standard"
primary-agent: "coder"
supporting-agents: ["designer", "security-analyst"]
---
```
- **Auto-Persona**: Frontend, Backend, Architect, Security (context-dependent)
- **Auto-Agent**: coder (primary), designer (UI parts), security-analyst (auth features)
- **MCP Integration**: Context7 (UI patterns and framework docs), Sequential (complex logic)
- **Tool Orchestration**: [Read, Write, Edit, MultiEdit, Bash, Glob, TodoWrite, Task]
- **Arguments**: `[feature-description]`, `--type component|api|service|feature`, `--framework <name>`, `--<flags>`


### Analysis Commands

**`/analyze $ARGUMENTS`**
```yaml
---
command: "/analyze"
category: "Analysis & Investigation"
purpose: "Multi-dimensional code and system analysis"
wave-enabled: true
performance-profile: "complex"
primary-agent: "architect"
supporting-agents: ["security-analyst"]
---
```
- **Auto-Persona**: Analyzer, Architect, Security
- **Auto-Agent**: architect (primary), security-analyst (security aspects)
- **MCP Integration**: Sequential (primary), Context7 (patterns and UI analysis)
- **Tool Orchestration**: [Read, Grep, Glob, Bash, TodoWrite]
- **Arguments**: `[target]`, `@<path>`, `!<command>`, `--<flags>`

**`/troubleshoot [symptoms] [flags]`** - Problem investigation | Auto-Persona: Analyzer, QA | MCP: Sequential, Puppeteer

**`/explain [topic] [flags]`** - Educational explanations | Auto-Persona: Mentor, Scribe | MCP: Context7, Sequential


### Quality Commands

**`/improve [target] [flags]`**
```yaml
---
command: "/improve"
category: "Quality & Enhancement"
purpose: "Evidence-based code enhancement"
wave-enabled: true
performance-profile: "optimization"
primary-agent: "architect"
supporting-agents: ["coder", "designer"]
---
```
- **Auto-Persona**: Refactorer, Performance, Architect, QA
- **Auto-Agent**: architect (analysis), coder (implementation), designer (UI improvements)
- **MCP Integration**: Sequential (logic), Context7 (patterns and UI improvements)
- **Tool Orchestration**: [Read, Grep, Glob, Edit, MultiEdit, Bash]
- **Arguments**: `[target]`, `@<path>`, `!<command>`, `--<flags>`


**`/cleanup [target] [flags]`** - Project cleanup and technical debt reduction | Auto-Persona: Refactorer | MCP: Sequential

### Additional Commands

**`/document [target] [flags]`** - Documentation generation | Auto-Persona: Scribe, Mentor | Auto-Agent: tech-writer | MCP: Context7, Sequential

**`/estimate [target] [flags]`** - Evidence-based estimation | Auto-Persona: Analyzer, Architect | MCP: Sequential, Context7

**`/task [operation] [flags]`** - Long-term project management | Auto-Persona: Architect, Analyzer | MCP: Sequential

**`/test [type] [flags]`** - Testing workflows | Auto-Persona: QA | Auto-Agent: test-engineer | MCP: Puppeteer, Sequential

**`/git [operation] [flags]`** - Git workflow assistant | Auto-Persona: DevOps, Scribe, QA | MCP: Sequential

**`/design [domain] [flags]`** - Design orchestration | Auto-Persona: Architect, Frontend | Auto-Agent: designer | MCP: Context7, Sequential

**`/security [target] [flags]`** - Security audits | Auto-Persona: Security | Auto-Agent: security-analyst | MCP: Sequential, Context7

### Meta & Orchestration Commands

**`/index [query] [flags]`** - Command catalog browsing | Auto-Persona: Mentor, Analyzer | MCP: Sequential

**`/load [path] [flags]`** - Project context loading | Auto-Persona: Analyzer, Architect, Scribe | MCP: All servers

**Iterative Operations** - Use `--loop` flag with improvement commands for iterative refinement

**`/spawn [mode] [flags]`** - Task orchestration | Auto-Persona: Analyzer, Architect, DevOps | MCP: All servers

## Command Execution Matrix

### Performance Profiles
```yaml
optimization: "High-performance with caching and parallel execution"
standard: "Balanced performance with moderate resource usage"
complex: "Resource-intensive with comprehensive analysis"
```

### Command Categories
- **Development**: build, implement, design
- **Planning**: workflow, estimate, task
- **Analysis**: analyze, troubleshoot, explain
- **Quality**: improve, cleanup
- **Testing**: test
- **Security**: security
- **Documentation**: document
- **Version-Control**: git
- **Meta**: index, load, spawn

### Agent Integration
Commands automatically route to specialized agents:
- **architect**: `/analyze`, `/improve` (analysis phase)
- **coder**: `/implement`, `/build`, `/improve` (implementation phase)
- **designer**: `/design`, UI-focused `/build` and `/implement`
- **security-analyst**: `/security`, security-focused `/analyze`
- **test-engineer**: `/test`, validation phases of `/improve`
- **tech-writer**: `/document`, documentation aspects of other commands

### Wave-Enabled Commands
7 commands: `/analyze`, `/build`, `/design`, `/implement`, `/improve`, `/task`, `/workflow`

