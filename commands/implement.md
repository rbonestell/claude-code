---
allowed-tools: [Read, Write, Edit, MultiEdit, Bash, Glob, TodoWrite, Task]
description: "Feature and code implementation with intelligent persona activation and MCP integration"
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
1. Use architect agent via Task tool to analyze requirements and create implementation plan
2. Pass architect's findings to coder agent (for logic) and/or designer agent (for UI components)
3. Auto-activate relevant personas (frontend, backend, security, etc.)
4. Coordinate with MCP servers (Context7 for UI patterns and framework best practices, Sequential for complex logic)
5. Generate implementation code following architect's specifications and best practices
6. Optionally engage test-engineer agent for test coverage (when --with-tests flag is used)
7. Apply security and quality validation
8. Provide testing recommendations and next steps

## Claude Code Integration
- Uses Task tool to orchestrate architect → coder/designer → test-engineer agent workflow
- Leverages Read and Glob for codebase analysis and context understanding
- Uses Write/Edit/MultiEdit for code generation and modification
- Applies TodoWrite for implementation progress tracking
- Coordinates with MCP servers for specialized functionality
- Auto-activates appropriate personas based on implementation type
- Shares implementation plans between agents via MCP memory server

## Agent Orchestration
- **Architect Agent**: Analyzes requirements, creates implementation specifications
- **Coder Agent**: Implements business logic, services, and backend functionality
- **Designer Agent**: Implements UI components, frontend features, and UX elements
- **Test-Engineer Agent**: Creates test coverage when --with-tests flag is used

## Auto-Activation Patterns
- **Frontend**: UI components → designer agent with frontend persona
- **Backend**: APIs, services → coder agent with backend persona
- **Security**: Authentication → architect analysis → coder with security persona
- **Full-Stack**: Combined architect → parallel coder + designer agents
- **Performance**: Architect analysis → coder with performance persona

## Examples
```
/implement user authentication system --type feature --with-tests
/implement dashboard component --type component --framework react
/implement REST API for user management --type api --safe
/implement payment processing service --type service --iterative
```