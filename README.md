# 🤖 My Claude Code Collection

[![Claude Code](https://img.shields.io/badge/Claude%20Code-Enhanced-blue)](https://docs.anthropic.com/en/docs/claude-code)
[![SuperClaude](https://img.shields.io/badge/SuperClaude-Framework-purple)](https://github.com/SuperClaude-Org/SuperClaude_Framework)
[![Agents](https://img.shields.io/badge/Agents-7%20Specialized-orange)](agents/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A powerful collection of battle-tested Claude Code configurations, specialized AI agents, and an enhanced SuperClaude Framework that makes AI-assisted development smarter, faster, and more organized.

## ✨ What Is This?

Think of this as your AI development team in a box. Instead of one AI assistant trying to do everything, you get specialized experts that work together - like having a real development team at your fingertips.

### What Makes This Special

- **🤖 7 Specialized AI Agents** - Each agent is an expert in their domain:
  - **Architect** - System design and code structure expert
  - **Coder** - Implementation and bug-fixing specialist  
  - **Designer** - UI/UX and frontend expert
  - **Security Analyst** - Vulnerability and compliance specialist
  - **Test Engineer** - Quality assurance and testing expert
  - **Tech Writer** - Documentation and guide creator
  - **Cloud Engineer** - Infrastructure and deployment specialist

- **📋 Smart Task Management** - Automatically tracks what needs to be done, what's in progress, and what's complete (using TodoWrite)

- **🌊 Team Coordination** - Agents work together in organized "waves" - like a real team passing work between departments

- **⚡ Intelligent Routing** - The system automatically knows which expert to use based on what you're asking

- **✅ Quality Assurance** - Built-in 9-step validation ensures high-quality output every time

### In Simple Terms

When you ask for help with a project, the framework:
1. Figures out what kind of help you need
2. Assigns the right expert (or team of experts)
3. Tracks the work through completion
4. Ensures quality at every step
5. Delivers professional-grade results

It's like having a full development team that understands context, remembers previous decisions, and works together seamlessly.

## 🎯 Key Features

### Core Capabilities

- **🤖 Specialized Agents** - 7 domain experts that excel in their specific areas
- **📋 Smart Task Tracking** - Automatic task management for complex operations
- **🌊 Team Coordination** - Multiple agents working together in organized phases
- **⚡ Intelligent Commands** - System understands context and routes to the right expert
- **🔄 Seamless Handoffs** - Agents share information and build on each other's work
- **🎭 Behavioral Modifiers** - Adjust how agents approach problems (mentor mode, performance focus, etc.)
- **🚀 External Integrations** - Connects to documentation, code analysis, and testing tools
- **✅ Quality Validation** - 9-step quality checks ensure professional results

### How It Works

The framework uses **MCP (Model Context Protocol) servers** - think of these as specialized tools that give the AI agents superpowers:
- Remember things between conversations
- Look up documentation
- Analyze code structure
- Run browser tests
- Share information between agents

**Note:** Configuration happens in your `~/.claude.json` file (details below)

## 🛠️ MCP Server Configuration

### What Are MCP Servers?

MCP servers are external tools that enhance Claude Code's capabilities. Think of them as specialized assistants that help with specific tasks. The framework documentation may use shorthand names (like "Sequential" or "mcp__tree-sitter"), but the actual tool names in Claude Code are shown below.

### Required Configuration

Add these to your `~/.claude.json` file (in the root of your home directory):

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

### What Each Server Does

| Server Name | Documentation Shorthand | Purpose |
|-------------|------------------------|---------|
| **memory** | Memory, mcp__memory | Helps agents remember information and share data with each other |
| **puppeteer** | Puppeteer, mcp__puppeteer | Tests websites and captures screenshots |
| **context7** | Context7, mcp__context7 | Looks up documentation and best practices for libraries |
| **tree-sitter** | Tree-Sitter, mcp__tree-sitter | Analyzes code structure and finds patterns |
| **sequential-thinking** | Sequential, mcp__sequential | Solves complex problems step-by-step |

## 🤖 Meet Your AI Development Team

Each agent is a specialist, just like team members in a real development company:

### 🏗️ Architect Agent
**The System Designer**
- **What they do**: Analyzes your codebase, identifies patterns, plans improvements
- **When they help**: System analysis, code reviews, architecture decisions
- **Auto-activates for**: `/analyze` command, complex system questions
- **Real-world equivalent**: Senior architect who reviews code and plans system structure

### 💻 Coder Agent  
**The Implementation Expert**
- **What they do**: Writes code, fixes bugs, implements features
- **When they help**: Building new features, fixing issues, refactoring code
- **Auto-activates for**: `/implement`, `/build` commands
- **Real-world equivalent**: Senior developer who writes clean, working code
- **Special ability**: Uses the Task tool for safe, incremental code changes

### 🎨 Designer Agent
**The UI/UX Specialist**
- **What they do**: Creates user interfaces, ensures accessibility, optimizes frontend
- **When they help**: Building components, responsive design, user experience
- **Auto-activates for**: `/design` command, UI-related requests
- **Real-world equivalent**: Frontend developer with strong design skills

### 🔒 Security-Analyst Agent
**The Security Expert**
- **What they do**: Finds vulnerabilities, ensures compliance, reviews security
- **When they help**: Security audits, threat assessment, compliance checks
- **Auto-activates for**: `/security` command, security concerns
- **Real-world equivalent**: Security engineer who keeps your code safe

### 🧪 Test-Engineer Agent
**The Quality Guardian**
- **What they do**: Creates tests, ensures quality, validates changes
- **When they help**: Writing test suites, coverage analysis, E2E testing
- **Auto-activates for**: `/test` command, quality assurance needs
- **Real-world equivalent**: QA engineer who ensures everything works correctly

### 📚 Tech-Writer Agent
**The Documentation Pro**
- **What they do**: Creates clear documentation, API guides, tutorials
- **When they help**: README files, user guides, API documentation, documentation sites
- **Auto-activates for**: `/document` command, documentation requests
- **Real-world equivalent**: Technical writer who makes complex things understandable
- **Special ability**: Can build full documentation sites with Nextra, Docusaurus, or VitePress

### ☁️ Cloud-Engineer Agent
**The Infrastructure Specialist**
- **What they do**: Manages cloud resources, writes infrastructure code, optimizes costs
- **When they help**: Cloud deployments, infrastructure setup, multi-cloud migrations
- **Auto-activates for**: Infrastructure files (Terraform, CloudFormation, etc.)
- **Real-world equivalent**: DevOps engineer who manages cloud infrastructure
- **Supports**: AWS, Azure, GCP, and 20+ other cloud providers

## 📚 How to Use It

### Simple Examples - Let the System Choose

The framework automatically picks the right agent based on what you ask:

```bash
# Analyzing code? Architect agent steps in
/analyze @src/ 

# Building something? Coder agent takes over
/implement "Add user authentication"

# Need UI? Designer agent handles it
/design "Create a dashboard"

# Security check? Security analyst investigates
/security @api/

# Need tests? Test engineer writes them
/test "User registration"

# Documentation? Tech writer creates it
/document @src/
```

### Taking Control - Choose Your Expert

Sometimes you want a specific expert:

```bash
# Want architectural perspective on improvements
/improve @src/ --agent-architect

# Need designer to lead the build
/build --agent-designer

# Security-focused code review
/analyze --agent-security
```

### Advanced: Combining Agents with Personas

Personas are like behavioral modifiers - they change HOW an agent approaches the task:

```bash
# Architect explains while analyzing (great for learning)
/analyze --agent-architect --persona-mentor

# Coder focuses on clean code principles
/implement --agent-coder --persona-refactorer

# Designer optimizes for performance
/design --agent-designer --persona-performance
```

### Team Mode: Multiple Agents Working Together

For complex tasks, agents work in coordinated "waves":

```bash
# Full team improvement cycle
/improve @project/ --wave-mode

What happens:
1. Architect analyzes the system
2. Security analyst checks for vulnerabilities  
3. Coder and Designer work in parallel on fixes
4. Test engineer validates everything
```

### Real-World Scenarios

```bash
# Building a complete feature
/implement "E-commerce checkout" --wave-mode
# The team collaborates: Architect designs → Designer creates UI → Coder implements → Tests validate

# Security-conscious development
/implement "Payment processing" --agent-coder --persona-security
# Coder implements with security as top priority

# Performance optimization
/improve @app/ --focus performance
# Focused improvement on speed and efficiency

# Complete documentation site
/document @project/ --framework nextra
# Tech writer creates a full documentation website
```

## 🛠️ Quick Setup (5 minutes)

### Step 1: Get the Framework

Clone this repository to your Claude Code configuration folder:

```bash
cd ~/.claude
git init
git remote add origin https://github.com/rbonestell/claude-code.git
git fetch origin
git pull origin main
```

### Step 2: Configure MCP Servers

Add the MCP server configurations to your `~/.claude.json` file (see MCP Server Configuration section above for the exact JSON to add).

### Step 3: Start Using It!

That's it! The framework is now active. Try these commands to see it in action:

```bash
/analyze        # Analyze your current project
/implement "feature name"  # Build something new
/document       # Create documentation
```

## 🎨 Understanding Key Concepts

### How Agents Are Chosen

The framework is smart about picking the right expert:

**Based on the command you use:**
- `/analyze` → Architect takes the lead
- `/implement` → Coder jumps in
- `/design` → Designer handles it
- `/test` → Test Engineer takes over

**Based on what you're asking about:**
- Mention "UI" or "component" → Designer agent
- Talk about "security" or "vulnerability" → Security analyst
- Ask about "performance" → Performance-focused approach

**Based on the files involved:**
- Test files (*.test.js) → Test engineer
- Style files (*.css) → Designer
- Infrastructure files (*.tf) → Cloud engineer

### How Teams Work Together (Waves)

Think of waves like a relay race where each team member does their part:

**Example: Improving a project**
1. **Wave 1**: Architect analyzes what needs improvement
2. **Wave 2**: Security analyst checks for vulnerabilities
3. **Wave 3**: Coder and Designer work on fixes simultaneously
4. **Wave 4**: Test engineer validates everything works

Each wave builds on the previous one, creating a comprehensive solution.

### How Agents Share Information

Agents don't work in isolation - they share findings:

- **Architect** shares system analysis with everyone
- **Security analyst** alerts everyone to vulnerabilities
- **Designer** gives UI specifications to the coder
- **Coder** provides code for testing
- **Test engineer** reports results to the team
- **Tech writer** documents what everyone built

### What Are Personas?

Personas are like personality modifiers for agents:

- **Mentor persona**: Makes any agent explain things educationally
- **Performance persona**: Focuses on speed and efficiency
- **Security persona**: Prioritizes safety and protection
- **Refactorer persona**: Emphasizes clean, maintainable code

You can combine any agent with any persona for specialized behavior!

## 📋 Smart Task Management

### How the Framework Tracks Work

For complex operations (anything with 3+ steps), the framework automatically manages tasks using TodoWrite. Think of it as a smart project manager that:

- **Tracks Progress**: Knows what's done, what's in progress, what's next
- **Ensures Completion**: Won't let tasks be marked complete without validation
- **Coordinates Handoffs**: Makes sure each agent knows the current status

### When Task Tracking Kicks In

The system automatically starts tracking when you use commands like:

- `/analyze` - Multi-phase analysis needs tracking
- `/implement` - Planning → coding → testing cycle
- `/build` - Multiple build steps
- `/improve` - Analysis → enhancement → validation
- `/design` - Design → implementation → review

### Quality Assurance Built-In

Every task goes through 9 quality checkpoints:

1. **Start**: Verify task setup is correct
2. **Middle Steps**: Check code quality, security, performance
3. **End**: Validate everything works and is complete

This ensures professional-grade output every time.

### Why This Matters

- **Nothing Gets Forgotten**: Every step is tracked
- **Clear Progress**: You always know what's happening
- **Quality Guaranteed**: Can't skip important validation
- **Team Coordination**: Agents know what others have done

## 🚀 Quick Start Examples

### Analyzing Your Code

```bash
/analyze                     # Quick system analysis
/analyze @src/              # Analyze specific folder
/analyze --focus security   # Security-focused review
```

### Building Features

```bash
/implement "user login"      # Build a new feature
/build                      # Build your project
/design "dashboard"         # Create UI components
```

### Quality & Testing

```bash
/test                       # Create tests
/improve                    # Improve code quality
/security                   # Security audit
```

### Documentation

```bash
/document                   # Create documentation
/document --type readme     # Update README
/document --framework nextra # Build doc site
```

### Advanced: Full Team Mode

```bash
/improve --wave-mode        # Complete team improvement
/implement "big feature" --wave-mode  # Multi-agent feature build
```

## 🔧 Complete Setup Guide

### What You Need

1. **Claude Code** - The AI coding assistant (you're already using it!)
2. **Node.js** - To run the MCP servers (most developers have this)
3. **Git** - For getting the framework files

### Installation (One Time Setup)

#### Step 1: Get the Framework Files

```bash
cd ~/.claude
git init
git remote add origin https://github.com/rbonestell/claude-code.git
git fetch origin
git pull origin main
```

#### Step 2: Add MCP Servers to Configuration

Open `~/.claude.json` and add the MCP server configuration from the "MCP Server Configuration" section above.

#### Step 3: Restart Claude Code

Close and reopen Claude Code to load the new configuration.

#### Step 4: Test It Works

Try a simple command:

```bash
/analyze
```

If you see the Architect agent activate, you're all set!

## 🔍 Troubleshooting

### Common Questions

### "Why does it say 'Call TodoWrite for multi-step operation'?"

- This is normal for complex tasks
- The system wants to track the work properly
- Just let it create the task list automatically

### "How do I know which agent is working?"

- The agent will identify itself when it starts
- Look for messages like "Architect agent analyzing..."

### "Can I use my own tools instead of the Task tool?"

- The framework uses the Task tool for safe code changes
- This is intentional - it prevents accidental file overwrites
- The Task tool is designed for incremental, reversible changes

### "What if an MCP server isn't working?"

- The framework has fallbacks for most operations
- You can continue working with reduced capabilities
- Check your `~/.claude.json` configuration

### Getting Help

- Framework issues: Check the documentation files in `.claude/`
- Missing features: The framework is extensible - you can add your own agents
- Best practices: Let the auto-selection work first, then override if needed

## 📝 License

MIT - Use and modify these configurations freely in your own development workflow
