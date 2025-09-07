# COMMANDS.md - SuperClaude Command Execution Framework

Command execution framework for Claude Code SuperClaude integration.

**Note on MCP Servers**: This document references MCP servers by shorthand names (Context7, Sequential, etc.) for readability. For actual tool invocation, use full function names with `mcp__` prefix as documented in MCP.md.

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
2. **TodoWrite Validation**: MANDATORY check for multi-step operations (3+ steps)
3. **Context Resolution**: Auto-persona activation and MCP server selection
4. **Wave Eligibility**: Complexity assessment and wave mode determination
5. **Execution Strategy**: Tool orchestration and resource allocation
6. **Quality Gates**: Validation checkpoints and error handling

### TodoWrite Enforcement System (MANDATORY)

**Pre-Execution Validation**: ALL commands MUST validate TodoWrite initialization before execution:

1. **Multi-Step Detection**: Commands with 3+ operations require TodoWrite
2. **Initialization Check**: Verify TodoWrite called within first 3 operations
3. **Execution Block**: Commands cannot proceed without proper TodoWrite setup
4. **Override Flag**: `--skip-todo` allows explicit opt-out (with warning)

**TodoWrite Required Commands**:
- `/analyze` (system analysis has multiple phases)
- `/implement` (planning → coding → testing)  
- `/build` (analysis → compilation → validation)
- `/improve` (analysis → enhancement → validation)
- `/design` (planning → creation → validation)
- `/troubleshoot` (investigation → diagnosis → resolution)
- `/task` (planning → execution → completion)
- `/workflow` (multi-stage orchestration)

**TodoWrite Enforcement Logic**:
```yaml
if (estimated_steps >= 3 OR multi_file_operation OR agent_handoff):
  if (!TodoWrite_initialized AND !--skip-todo):
    block_execution()
    display_message("MANDATORY: Call TodoWrite for multi-step operation")
    suggest_todos(estimated_steps)
  endif
endif
```

### Integration Layers
- **Claude Code**: Native slash command compatibility with TodoWrite enforcement
- **Persona System**: Auto-activation based on command context
- **Agent System**: Specialized agents for domain-specific execution (ALL require TodoWrite)
- **MCP Servers**: Context7, Sequential, Puppeteer integration
- **Wave System**: Multi-stage orchestration for complex operations (TodoWrite mandatory)

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
- **Tool Orchestration**: [Read, Grep, Glob, Bash, TodoWrite, Task]
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
- **Tool Orchestration**: [Read, Task, Bash, Glob, TodoWrite]
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
- **Tool Orchestration**: [Read, Grep, Glob, Task, Bash]
- **Arguments**: `[target]`, `@<path>`, `!<command>`, `--<flags>`


**`/cleanup [target] [flags]`** - Project cleanup and technical debt reduction | Auto-Persona: Refactorer | MCP: Tree-Sitter (dead code), Memory (patterns), Sequential

### Additional Commands

**`/document [target] [flags]`** - Documentation generation | Auto-Persona: Scribe, Mentor | Auto-Agent: tech-writer | MCP: Context7, Sequential, Memory (templates)

**`/estimate [target] [flags]`** - Evidence-based estimation | Auto-Persona: Analyzer, Architect | MCP: Memory (historical), Context7 (benchmarks), Sequential

**`/task [operation] [flags]`** - Long-term project management | Auto-Persona: Architect, Analyzer | MCP: Sequential, Memory (project state)

**`/test [type] [flags]`** - Testing workflows | Auto-Persona: QA | Auto-Agent: test-engineer | MCP: Puppeteer, Sequential, Memory (test patterns)

**`/git [operation] [flags]`** - Git workflow assistant | Auto-Persona: DevOps, Scribe, QA | MCP: Memory (commit patterns), Sequential, Tree-Sitter (changes)

**`/design [domain] [flags]`** - Design orchestration | Auto-Persona: Architect, Frontend | Auto-Agent: designer | MCP: Context7, Sequential, Memory (UI patterns)

**`/security [target] [flags]`** - Security audits | Auto-Persona: Security | Auto-Agent: security-analyst | MCP: Tree-Sitter (vulnerabilities), Sequential, Context7, Memory (security patterns)

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

