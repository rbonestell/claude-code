---
allowed-tools: [Read, Grep, Glob, Task]
description: "Create clear, accurate technical documentation following project patterns"
---

# /document - Technical Documentation

## Purpose

Create clear, accurate technical documentation that follows existing project patterns and helps users succeed with the software.

## Usage

```bash
/document [target] [--type readme|api|guide|inline|reference] [--scope focused|comprehensive] [--framework nextra|docusaurus|vitepress|none]
```

## Arguments

- `target` - File, directory, function, or feature to document
- `--type` - Documentation type:
  - `readme` - Project or module README files
  - `api` - API reference documentation
  - `guide` - User guides and tutorials
  - `inline` - Code comments and annotations
  - `reference` - Technical specifications and configurations
- `--scope` - Documentation depth (focused for specific items, comprehensive for full coverage)
- `--framework` - Documentation framework to use (optional, defaults to existing or none)

## Execution

1. **Pattern Analysis Phase**
   - Use @agent-tech-writer to analyze existing documentation patterns
   - Identify project's documentation style and conventions
   - Understand the codebase structure and implementation
   - Determine target audience and their needs

2. **Content Generation Phase**
   - @agent-tech-writer creates documentation following identified patterns
   - For API docs: Extract from actual implementation and annotations
   - For guides: Focus on real user tasks and common scenarios
   - For README: Follow project's existing structure or best practices
   - Ensure technical accuracy over comprehensive coverage

3. **Quality Assurance Phase**
   - Validate accuracy against actual code implementation
   - Check consistency with existing documentation
   - Ensure examples work and are practical
   - Verify accessibility and readability

4. **Integration Phase**
   - Place documentation in appropriate locations
   - Update cross-references and navigation
   - Ensure documentation fits naturally in project

## Claude Code Integration

- **Primary Agent**: @agent-tech-writer for all documentation tasks
- **Supporting Agents**:
  - @agent-architect: When needing system design context
  - @agent-coder: For extracting implementation details
  - @agent-designer: For UI component documentation
- **MCP Servers**:
  - Tree-Sitter: Analyze code structure and extract signatures
  - Context7: Research best practices when patterns unclear
  - Memory: Store and retrieve documentation patterns
- **Tools**:
  - Read/Grep: Analyze existing documentation
  - Task: Create, update, and manage documentation files
  - Task: Coordinate with other agents when needed

## Examples

```bash
# Document a specific API endpoint
/document src/api/users.js --type api --scope focused

# Create comprehensive project README
/document . --type readme --scope comprehensive

# Generate user guide for a feature
/document src/features/auth --type guide

# Add inline documentation to code
/document src/utils/validators.js --type inline

# Build documentation site with Nextra
/document . --type guide --scope comprehensive --framework nextra
```

## Best Practices

- Always analyze existing patterns first
- Focus on what users need to accomplish
- Write from the user's perspective
- Provide working, practical examples
- Maintain technical accuracy
- Let content drive structure, not framework features
