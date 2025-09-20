---
allowed-tools: [Read, Bash, Glob, TodoWrite, Task, WebSearch, WebFetch]
description: "Feature and code implementation with intelligent persona activation and MCP integration"
wave-enabled: true
complexity-threshold: 0.6
---

# /implement - Feature Implementation

## Purpose
Implement features, components, and code functionality with intelligent expert activation and comprehensive development support.

## Usage
```
/implement [feature-description] [--type component|api|service|feature] [--framework react|vue|express|etc] [--safe]
```

## Arguments
- `feature-description` - Description of what to implement
- `--type` - Implementation type (component, api, service, feature, module)
- `--framework` - Target framework or technology stack
- `--safe` - Use conservative implementation approach
- `--iterative` - Enable iterative development with validation steps
- `--with-tests` - Include test implementation
- `--documentation` - Generate documentation alongside implementation

## Execution
1. Use @agent-architect via Task tool to analyze requirements and create implementation plan
2. **PARALLEL**: Pass architect's findings to @agent-coder AND @agent-designer simultaneously
3. @agent-coder implements logic (parallel with designer)
4. @agent-designer implements UI components (parallel with coder)
5. Auto-activate relevant personas (frontend, backend, security, etc.)
6. Coordinate with MCP servers (Context7 for patterns, Sequential for complex logic)
7. Generate implementation code following architect's specifications
8. **PARALLEL**: Engage @agent-test-engineer AND @agent-tech-writer when flags are used
9. Apply security and quality validation
10. Provide testing recommendations and next steps

**Wave Trigger**: Activates Wave orchestration for >15 files, >5 types, or >3 domains
**Search Priority**: WebSearch > WebFetch for framework documentation

## Claude Code Integration
- Uses Task tool to orchestrate @agent-architect → parallel(@agent-coder, @agent-designer) → parallel(@agent-test-engineer, @agent-tech-writer) workflow
- Leverages Read and Glob for codebase analysis and context understanding
- Uses Task for code generation, modification, and file operations
- Applies TodoWrite for implementation progress tracking
- Coordinates with MCP servers for specialized functionality
- Auto-activates appropriate personas based on implementation type
- Shares implementation plans between agents via MCP memory server
- @agent-tech-writer receives implementation details from @agent-coder/@agent-designer for documentation creation

## Agent Orchestration
- **@agent-architect**: Analyzes requirements, creates implementation specifications
- **@agent-coder**: Implements business logic, services, and backend functionality
- **@agent-designer**: Implements UI components, frontend features, and UX elements
- **@agent-test-engineer**: Creates test coverage when --with-tests flag is used
- **@agent-tech-writer**: Creates comprehensive documentation when --documentation flag is used

## Auto-Activation Patterns
- **Frontend**: UI components → @agent-designer with frontend persona
- **Backend**: APIs, services → @agent-coder with backend persona
- **Security**: Authentication → @agent-architect analysis → @agent-coder with security persona
- **Full-Stack**: Combined @agent-architect → parallel @agent-coder + @agent-designer
- **Performance**: @agent-architect analysis → @agent-coder with performance persona

## Examples
```
/implement user authentication system --type feature --with-tests --documentation
/implement dashboard component --type component --framework react --documentation
/implement REST API for user management --type api --safe --documentation
/implement payment processing service --type service --iterative
```