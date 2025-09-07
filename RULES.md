# RULES.md - SuperClaude Framework Actionable Rules

Simple actionable rules for Claude Code SuperClaude framework operation.

## Core Operational Rules

### Task Management Rules (MANDATORY)
- **MANDATORY**: TodoWrite(3+ tasks) → Execute → Track progress → Validate completion
- **ENFORCEMENT**: Commands with 3+ steps MUST call TodoWrite or execution is blocked
- **AGENTS**: All agents MUST initialize TodoWrite within first 3 operations
- **VALIDATION**: Todo completion required before marking any task as done
- Use batch tool calls when possible, sequential only when dependencies exist
- Always validate before execution, verify after completion
- Run lint/typecheck before marking tasks complete
- Use /spawn and /task for complex multi-session workflows
- Maintain ≥90% context retention across operations

### File Operation Security
- Always use Read tool before Task operations for file modifications
- Use absolute paths only, prevent path traversal attacks
- Prefer batch operations and transaction-like behavior
- Never commit automatically unless explicitly requested

### Framework Compliance
- Check package.json/pyproject.toml before using libraries
- Follow existing project patterns and conventions
- Use project's existing import styles and organization
- Respect framework lifecycles and best practices

### Systematic Codebase Changes
- **MANDATORY**: Complete project-wide discovery before any changes
- Search ALL file types for ALL variations of target terms
- Document all references with context and impact assessment
- Plan update sequence based on dependencies and relationships
- Execute changes in coordinated manner following plan
- Verify completion with comprehensive post-change search
- Validate related functionality remains working
- Use Task tool for comprehensive searches when scope uncertain

## Quick Reference

### Do
✅ MANDATORY: Initialize TodoWrite for 3+ step operations
✅ Read before Task operations
✅ Use absolute paths
✅ Batch tool calls
✅ Validate before execution
✅ Check framework compatibility
✅ Auto-activate personas
✅ Preserve context across operations
✅ Use quality gates (see ORCHESTRATOR.md)
✅ Complete discovery before codebase changes
✅ Verify completion with evidence

### Don't
❌ Skip TodoWrite initialization for multi-step operations
❌ Mark tasks complete without updating TodoWrite status
❌ Skip Read operations before file modifications
❌ Use relative paths
❌ Auto-commit without permission
❌ Ignore framework patterns
❌ Skip validation steps
❌ Mix user-facing content in config
❌ Override safety protocols
❌ Make reactive codebase changes
❌ Mark complete without verification

### Auto-Triggers
- **TodoWrite**: Auto-triggered for 3+ step operations, multi-file changes, complex workflows
- Wave mode: complexity ≥0.7 + multiple domains
- Personas: domain keywords + complexity assessment  
- MCP servers: task type + performance requirements
- Quality gates: all operations apply 8-step validation (now includes TodoWrite validation)
- Compression: auto-enable --uc at 60% context usage
- Shared patterns: reference @SHARED_PATTERNS.md for consistency