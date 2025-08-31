
# 🤖 My Claude Code Collection

[![Claude Code](https://img.shields.io/badge/Claude%20Code-Enhanced-blue)](https://docs.anthropic.com/en/docs/claude-code)
[![SuperClaude](https://img.shields.io/badge/SuperClaude-Framework-purple)](https://github.com/SuperClaude-Org/SuperClaude_Framework)
[![Agents](https://img.shields.io/badge/Agents-6%20Specialized-orange)](agents/)
[![TodoWrite](https://img.shields.io/badge/TodoWrite-Enforced-red)](commands/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A powerful collection of battle-tested Claude Code configurations, specialized agents, and the SuperClaude Framework that transforms AI-assisted development into a multi-agent orchestrated workflow with comprehensive task management enforcement.

## ✨ Overview

This repository contains my comprehensive Claude Code setup featuring:

- **6 Specialized Agents** for domain-specific expertise (architect, coder, designer, security-analyst, test-engineer, tech-writer)
- **SuperClaude Framework** resources adapted and enhanced to utilize my custom agents
- **Mandatory TodoWrite Integration** ensuring all multi-step operations are properly tracked and managed
- **Inter-agent Communication** protocols for seamless handoffs and collaboration
- **Wave Orchestration** for complex multi-phase operations
- **9-Step Quality Gates** with TodoWrite validation at initialization and completion

The SuperClaude Framework files in this repository have been modified from the original to integrate with my custom agents, providing enhanced routing, specialized task execution, multi-agent coordination capabilities, and mandatory task management protocols.

## 🎯 Features

- **🤖 Specialized Agents** - Domain experts for architecture, coding, UI/UX, security, testing, and documentation
- **📋 Mandatory TodoWrite** - Comprehensive task tracking enforced across all multi-step operations  
- **🌊 Wave Orchestration** - Multi-agent coordination for comprehensive tasks with TodoWrite integration
- **⚡ Smart Commands** - Auto-routing to appropriate agents based on context
- **🔄 Agent Handoffs** - Structured communication protocols with mandatory todo status validation
- **🎭 Persona Overlays** - Behavioral modifiers that enhance agent capabilities
- **🚀 MCP Integration** - Memory sharing, documentation lookup, and visual validation
- **✅ 9-Step Quality Gates** - Enhanced validation cycle with TodoWrite enforcement at initialization and completion

**Note:**

- The root `~/.claude.json` file contains MCP server configurations (see below)
- All agents require TodoWrite initialization for multi-step operations (3+ steps)

## 🛠️ MCP Servers

I use the following _global_ MCP servers in my `~/.claude.json` configuration (defined at the configuration root):

```json
  "mcpServers": {
    "memory": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory@latest"],
      "env": {}
    },
    "puppeteer": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer@latest"],
      "env": {}
    },
    "context7": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"],
      "env": {}
    },
    "tree-sitter": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@nendo/tree-sitter-mcp@latest", "--mcp"],
      "env": {}
    },
    "sequential-thinking": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sequential-thinking@latest"
      ],
      "env": {}
    }
  },
```

These MCP servers enable:

- **memory**: Inter-agent communication and persistent storage
- **puppeteer**: Visual validation and browser automation (used by @agent-designer)
- **context7**: Library documentation and best practices lookup
- **tree-sitter**: Code structure analysis and pattern recognition
- **sequential-thinking**: Complex multi-step problem solving and systematic analysis (used by @agent-architect and @agent-security-analyst)

## 🤖 Specialized Agents

### Architect Agent

**Purpose**: System design, code review, pattern analysis
**Auto-activates**: `/analyze`, complex system analysis
**TodoWrite**: Required for multi-step analysis tasks (initialization within 3 operations)
**Best for**: Architecture reviews, technical debt assessment, design patterns

### Coder Agent

**Purpose**: Implementation, refactoring, bug fixes
**Auto-activates**: `/implement`, `/build`, feature development
**TodoWrite**: Required for implementation tasks (planning → coding → testing phases)
**Best for**: Writing code, fixing bugs, implementing features

### Designer Agent

**Purpose**: UI/UX design, frontend development, accessibility
**Auto-activates**: `/design`, UI component creation
**TodoWrite**: Required for UI design/development tasks (planning → creation → validation)
**Best for**: Creating components, responsive design, visual validation

### Security-Analyst Agent

**Purpose**: Security audits, vulnerability assessment, compliance
**Auto-activates**: `/security`, security-focused analysis
**TodoWrite**: Required for security analysis tasks (scanning → assessment → reporting)
**Best for**: Finding vulnerabilities, OWASP compliance, threat modeling

### Test-Engineer Agent

**Purpose**: Test creation, E2E testing, quality assurance
**Auto-activates**: `/test`, validation tasks
**TodoWrite**: Required for testing tasks (planning → implementation → validation)
**Best for**: Writing tests, coverage analysis, regression testing

### Tech-Writer Agent

**Purpose**: Technical documentation, README files, user guides, documentation sites
**Auto-activates**: `/document`, documentation tasks
**TodoWrite**: Required for documentation tasks (analysis → writing → validation)
**Best for**: Creating clear documentation, API references, tutorials, documentation websites with Nextra/Docusaurus/VitePress

## 📚 Usage Examples

### Basic Commands with Auto-Agent Routing

```bash
# Architect agent automatically selected for system analysis
/analyze @src/ --comprehensive

# Coder agent handles implementation
/implement "Add user authentication with JWT"

# Designer agent creates UI components
/design "Create responsive dashboard with dark mode"

# Security analyst performs audit
/security @api/ --owasp

# Test engineer creates test suite
/test --e2e "User registration flow"

# Tech writer creates documentation
/document @src/ --type api --scope comprehensive
```

### Manual Agent Selection

```bash
# Force specific agent with flags
/improve @src/ --agent-architect    # Architectural improvements
/build --agent-designer             # UI-focused build
/analyze --agent-security           # Security-focused analysis
```

### Agent + Persona Combinations

```bash
# Combine agents with personas for enhanced behavior
/analyze --agent-architect --persona-mentor  # Educational analysis
/implement --agent-coder --persona-refactorer # Clean code focus
/design --agent-designer --persona-performance # Optimized UI
```

### Multi-Agent Wave Operations

```bash
# Comprehensive improvement using multiple agents
/improve @project/ --wave-mode
# Wave 1: Architect analyzes
# Wave 2: Security audits  
# Wave 3: Coder + Designer implement
# Wave 4: Test-Engineer validates

# Enterprise-scale operations
/analyze @monorepo/ --wave-mode --enterprise
```

### Complex Scenarios

```bash
# Full-stack feature with multiple agents
/implement "E-commerce checkout" --wave-mode
# Architect designs the flow → Designer creates UI → Coder implements → Test validates

# Security-first implementation
/implement "Payment processing" --agent-coder --persona-security

# Performance optimization across stack
/improve @app/ --focus performance --wave-mode
# Architect identifies bottlenecks → Coder optimizes backend → Designer optimizes frontend

# Comprehensive documentation generation
/document @project/ --type guide --scope comprehensive --framework nextra
# Tech-Writer analyzes patterns → Creates user guides → Builds documentation site
```

## 🛠️ Setup

1. **Clone/sync this repo to your Claude Code config directory:**

   ```bash
   cd ~/.claude
   git init
   git remote add origin https://github.com/rbonestell/claude-code.git
   git fetch origin
   git pull origin main
   ```

2. **Configure MCP servers in `~/.claude.json`:**
   Add the MCP server configurations shown above

3. **Start using enhanced Claude Code:**
   Your agents will automatically activate based on context, or use flags for manual control

## 🎨 Key Concepts

### Agent Selection

Agents are automatically selected based on:

- **Command used** (`/analyze` → architect, `/implement` → coder)
- **Keywords** in your request (UI → designer, security → security-analyst)
- **File patterns** (*.test.js → test-engineer,*.css → designer)
- **Complexity** of the task (system-wide → architect)

### Wave Orchestration

For complex tasks, waves coordinate multiple agents:

1. **Analysis Wave**: Architect analyzes the system
2. **Security Wave**: Security-analyst audits for vulnerabilities
3. **Implementation Wave**: Coder and Designer work in parallel
4. **Validation Wave**: Test-Engineer validates all changes

### Agent Communication

Agents share data through structured protocols:

- **Architect** → provides findings and patterns to Coder/Designer/Tech-Writer
- **Designer** → provides UI specs to Coder and documentation to Tech-Writer
- **Coder** → provides implementation details to Test-Engineer and Tech-Writer
- **Security-Analyst** → broadcasts vulnerabilities to all agents
- **Test-Engineer** → reports quality metrics to all agents
- **Tech-Writer** → creates documentation based on input from all agents

### Persona Enhancement

Personas modify agent behavior:

- **Agent**: Technical capability (what it can do)
- **Persona**: Behavioral style (how it does it)
- **Combination**: Enhanced specialization (architect + mentor = educational analysis)

## 📋 TodoWrite & Task Management

### Mandatory TodoWrite Integration

**All multi-step operations (3+ steps) REQUIRE TodoWrite initialization:**

```yaml
# Commands that MUST use TodoWrite:
mandatory_commands:
  - /analyze      # Multi-phase system analysis
  - /implement    # Planning → coding → testing
  - /build        # Analysis → compilation → validation  
  - /improve      # Analysis → enhancement → validation
  - /design       # Planning → creation → validation
  - /troubleshoot # Investigation → diagnosis → resolution
  - /task         # Planning → execution → completion
  - /workflow     # Multi-stage orchestration
```

### TodoWrite Enforcement

**Pre-execution validation blocks commands that don't properly initialize TodoWrite:**

- **Multi-Step Detection**: Automatically detects operations requiring task tracking
- **Initialization Check**: Verifies TodoWrite called within first 3 operations  
- **Execution Block**: Commands cannot proceed without proper TodoWrite setup
- **Override Option**: Use `--skip-todo` flag to explicitly opt-out (with warning)

### Quality Gates Integration

**9-Step validation cycle with mandatory TodoWrite checkpoints:**

1. **Step 0**: TodoWrite initialization validation *(MANDATORY)*
2. **Step 1-8**: Standard quality gates (syntax, security, testing, etc.)
3. **Step 9**: TodoWrite completion validation *(MANDATORY)*

**Agents cannot complete tasks until TodoWrite status is properly validated.**

### Agent TodoWrite Requirements

Every specialized agent follows mandatory TodoWrite protocols:

- **Initialization**: TodoWrite must be called within first 3 operations
- **Status Updates**: Todo status updated at each phase transition  
- **Handoff Validation**: Todo status included in all inter-agent communication
- **Completion Gates**: Tasks cannot be marked complete without proper validation

## 🚀 Quick Start Guide

### For System Analysis

```bash
/analyze @project/           # Architect analyzes entire project
/analyze --focus security    # Security-focused analysis
/analyze --agent-architect --persona-mentor  # Educational walkthrough
```

### For Implementation

```bash
/implement "feature description"     # Coder implements feature
/implement --type component          # Designer creates UI component
/build @src/ --agent-designer       # Designer-led build
```

### For Testing & Quality

```bash
/test --comprehensive              # Test-Engineer creates full suite
/improve --focus quality           # Multi-agent quality improvement
/security @api/                    # Security audit
```

### For Documentation

```bash
/document . --type readme          # Tech-Writer creates README
/document @api/ --type api         # Generate API documentation
/document --type guide --framework nextra  # Build documentation site
/document src/auth --type inline   # Add inline code documentation
```

### For Complex Operations

```bash
/improve @project/ --wave-mode    # Full multi-agent improvement (TodoWrite auto-enforced)
/implement "big feature" --wave-mode --validate  # Validated implementation with TodoWrite
```

### TodoWrite Integration Examples

```bash
# TodoWrite automatically enforced for multi-step operations
/analyze @src/ --comprehensive
# → System detects multi-step analysis
# → Blocks until TodoWrite initialized
# → Agent creates todos: "Analyze patterns", "Review security", "Generate report"

# Override TodoWrite enforcement (not recommended)
/implement "simple fix" --skip-todo
# → Warning: Skipping task management for multi-step operation

# Monitor TodoWrite status across agent handoffs
/improve @project/ --wave-mode
# → Wave 1: Architect initializes TodoWrite with analysis todos
# → Wave 2: Security-analyst validates todos before proceeding  
# → Wave 3: Coder/Designer inherit todo status for implementation
# → Wave 4: Test-engineer validates completion before marking todos done
```

## 🔧 Setup & Configuration

### Prerequisites

1. **Claude Code** with MCP server support
2. **Node.js** for MCP server installations  
3. **Git** for configuration management

### Installation Steps

1. **Clone/sync this repo to your Claude Code config directory:**

   ```bash
   cd ~/.claude
   git init
   git remote add origin https://github.com/rbonestell/claude-code.git
   git fetch origin
   git pull origin main
   ```

2. **Configure MCP servers in `~/.claude.json`:**
   Add the MCP server configurations shown in the MCP Servers section above

3. **Start using enhanced Claude Code:**
   - Agents automatically activate based on context
   - TodoWrite enforcement ensures proper task management
   - Use flags for manual agent/persona control

### TodoWrite Troubleshooting

**Common Issues:**

- **"MANDATORY: Call TodoWrite for multi-step operation"**
  - This is expected behavior for complex tasks
  - Initialize TodoWrite with appropriate todos for your operation
  - Use `--skip-todo` flag only if absolutely necessary

- **Agent won't complete task**  
  - Check if all todos are marked as completed
  - Ensure proper evidence/validation is provided
  - Review todo status with TodoRead before marking complete

- **Inter-agent handoff blocked**
  - Verify sending agent has updated todo status
  - Check that handoff includes todo validation reference
  - Review MCP memory server connection

**Best Practices:**

- Let the system enforce TodoWrite - it improves task tracking and completion rates
- Create specific, actionable todos that match your operation phases
- Update todo status in real-time as you progress
- Don't mark tasks complete without proper validation

## 📝 License

MIT - Use and modify these configurations freely in your own development workflow
