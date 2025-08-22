
# 🤖 My Claude Code Collection

[![Claude Code](https://img.shields.io/badge/Claude%20Code-Enhanced-blue)](https://docs.anthropic.com/en/docs/claude-code)
[![SuperClaude](https://img.shields.io/badge/SuperClaude-Framework-purple)](https://github.com/SuperClaude-Org/SuperClaude_Framework)
[![Agents](https://img.shields.io/badge/Agents-5%20Specialized-orange)](agents/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A powerful collection of battle-tested Claude Code configurations, specialized agents, and the SuperClaude Framework that transforms AI-assisted development into a multi-agent orchestrated workflow.

## ✨ Overview

This repository contains my comprehensive Claude Code setup featuring:
- **5 Specialized Agents** for domain-specific expertise (architect, coder, designer, security-analyst, test-engineer)
- **SuperClaude Framework** resources adapted and enhanced to utilize my custom agents
- **Inter-agent Communication** protocols for seamless handoffs and collaboration
- **Wave Orchestration** for complex multi-phase operations

The SuperClaude Framework files in this repository have been modified from the original to integrate with my custom agents, providing enhanced routing, specialized task execution, and multi-agent coordination capabilities.

## 🎯 Features

- **🤖 Specialized Agents** - Domain experts for architecture, coding, UI/UX, security, and testing
- **🌊 Wave Orchestration** - Multi-agent coordination for comprehensive tasks
- **⚡ Smart Commands** - Auto-routing to appropriate agents based on context
- **🔄 Agent Handoffs** - Structured communication protocols between agents
- **🎭 Persona Overlays** - Behavioral modifiers that enhance agent capabilities
- **🚀 MCP Integration** - Memory sharing, documentation lookup, and visual validation

**Note:**
- The root `~/.claude.json` file contains MCP server configurations (see below)

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
        "@modelcontextprotocol/server-sequential-thinking"
      ],
      "env": {}
    }
  },
```

These MCP servers enable:
- **memory**: Inter-agent communication and persistent storage
- **puppeteer**: Visual validation and browser automation (used by designer agent)
- **context7**: Library documentation and best practices lookup
- **tree-sitter**: Code structure analysis and pattern recognition
- **sequential-thinking**: Complex multi-step problem solving and systematic analysis (used by architect and security-analyst agents)

## 🤖 Specialized Agents

### Architect Agent
**Purpose**: System design, code review, pattern analysis
**Auto-activates**: `/analyze`, complex system analysis
**Best for**: Architecture reviews, technical debt assessment, design patterns

### Coder Agent
**Purpose**: Implementation, refactoring, bug fixes
**Auto-activates**: `/implement`, `/build`, feature development
**Best for**: Writing code, fixing bugs, implementing features

### Designer Agent
**Purpose**: UI/UX design, frontend development, accessibility
**Auto-activates**: `/design`, UI component creation
**Best for**: Creating components, responsive design, visual validation

### Security-Analyst Agent
**Purpose**: Security audits, vulnerability assessment, compliance
**Auto-activates**: `/security`, security-focused analysis
**Best for**: Finding vulnerabilities, OWASP compliance, threat modeling

### Test-Engineer Agent
**Purpose**: Test creation, E2E testing, quality assurance
**Auto-activates**: `/test`, validation tasks
**Best for**: Writing tests, coverage analysis, regression testing

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
```

## 🛠️ Setup

1. **Clone this repo to your Claude Code config directory:**

   ```bash
   git clone https://github.com/rbonestell/claude-code.git ~/.claude
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
- **File patterns** (*.test.js → test-engineer, *.css → designer)
- **Complexity** of the task (system-wide → architect)

### Wave Orchestration
For complex tasks, waves coordinate multiple agents:
1. **Analysis Wave**: Architect analyzes the system
2. **Security Wave**: Security-analyst audits for vulnerabilities
3. **Implementation Wave**: Coder and Designer work in parallel
4. **Validation Wave**: Test-Engineer validates all changes

### Agent Communication
Agents share data through structured protocols:
- **Architect** → provides findings and patterns to Coder/Designer
- **Designer** → provides UI specs to Coder
- **Coder** → provides test requirements to Test-Engineer
- **Security-Analyst** → broadcasts vulnerabilities to all agents
- **Test-Engineer** → reports quality metrics to all agents

### Persona Enhancement
Personas modify agent behavior:
- **Agent**: Technical capability (what it can do)
- **Persona**: Behavioral style (how it does it)
- **Combination**: Enhanced specialization (architect + mentor = educational analysis)

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

### For Complex Operations
```bash
/improve @project/ --wave-mode    # Full multi-agent improvement
/implement "big feature" --wave-mode --validate  # Validated implementation
```

## 📝 License

MIT - Use and modify these configurations freely in your own development workflow
