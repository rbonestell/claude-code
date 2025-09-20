# Agent Communication Protocols

## Overview

Standardized communication templates and handoff protocols for inter-agent collaboration within the HyperClaude Nano framework.

## Communication Templates

### Template T2: Architect → Coder Handoff

```json
{
  "handoff_type": "architect_to_coder",
  "patterns_ref": "project:patterns:identified:arch-[ID]",
  "findings_ref": "review:findings:arch-[ID]",
  "plan_ref": "execution:plan:arch-[ID]",
  "constraints_ref": "arch:constraints:[ID]",
  "patterns": {
    "identified": [],
    "preserve": [],
    "refine": []
  },
  "findings": [
    {
      "id": "[TYPE]-[PRIORITY]-[NUMBER]",
      "priority": "CRITICAL|HIGH|MEDIUM|LOW",
      "type": "security|bug|design|quality",
      "location": {
        "file": "path/to/file",
        "lines": "start-end"
      },
      "description": "",
      "suggested_fix": {
        "approach": "",
        "pattern_to_follow": "",
        "estimated_effort": ""
      },
      "test_requirements": [],
      "dependencies": []
    }
  ],
  "execution_plan": {
    "immediate": [],
    "short_term": [],
    "long_term": []
  }
}
```

### Template T3: Designer → Coder Handoff

```json
{
  "handoff_type": "designer_to_coder",
  "components_ref": "ui:components:[ID]",
  "tokens_ref": "design:tokens:[ID]",
  "tests_ref": "ui:tests:[ID]",
  "components": [
    {
      "name": "",
      "type": "component|layout|page",
      "props": {},
      "states": [],
      "accessibility": {},
      "performance": {}
    }
  ],
  "design_tokens": {
    "colors": {},
    "typography": {},
    "spacing": {},
    "shadows": {}
  },
  "validation": {
    "visual_tests": [],
    "responsive": [],
    "a11y": []
  }
}
```

### Template T6: Todo Status Handoff

```json
{
  "handoff_type": "todo_status",
  "agent": "[agent-name]",
  "timestamp": "[ISO-8601]",
  "todos": [
    {
      "content": "",
      "status": "pending|in_progress|completed",
      "activeForm": "",
      "evidence": "",
      "blockers": []
    }
  ],
  "next_agent": "[agent-name]",
  "context": {}
}
```

## Memory Key Conventions

### Project-Level Keys

- `project:patterns:*` - Architectural and code patterns
- `project:config:*` - Configuration and settings
- `project:context:*` - Project-specific context

### Review & Analysis Keys

- `review:findings:*` - Code review findings
- `review:metrics:*` - Quality metrics
- `review:coverage:*` - Test coverage data

### Architecture Keys

- `arch:decisions:*` - Architectural decisions (ADRs)
- `arch:constraints:*` - Technical constraints
- `arch:patterns:*` - Design patterns in use

### Implementation Keys

- `implementation:patterns:*` - Code implementation patterns
- `implementation:modules:*` - Module implementations
- `implementation:changes:*` - Recent changes

### Design Keys

- `design:patterns:*` - UI/UX patterns
- `design:tokens:*` - Design system tokens
- `ui:components:*` - Component specifications

### Testing Keys

- `test:patterns:*` - Testing patterns
- `test:requirements:*` - Test requirements
- `test:coverage:*` - Coverage metrics

### Documentation Keys

- `docs:templates:*` - Documentation templates
- `docs:glossary:*` - Project glossary
- `docs:coverage:*` - Documentation coverage

### Security Keys

- `security:patterns:*` - Security patterns
- `security:findings:*` - Vulnerability findings
- `security:policies:*` - Security policies

## Query Protocols

### Pattern Clarification Query

```json
{
  "query_type": "pattern_clarification",
  "from_agent": "[sender]",
  "to_agent": "[recipient]",
  "issue_id": "[ID]",
  "context": "",
  "options": [],
  "need": ""
}
```

### Dependency Resolution Query

```json
{
  "query_type": "dependency_resolution",
  "from_agent": "[sender]",
  "to_agent": "[recipient]",
  "issues": [],
  "conflicts": [],
  "impact": "",
  "need": "order|workaround|alternative"
}
```

### Status Query

```json
{
  "query_type": "status",
  "from_agent": "[sender]",
  "to_agent": "[recipient]",
  "request": "current_status|eta|blockers|progress"
}
```

## Broadcast Protocols

### Security Alert Broadcast

```json
{
  "broadcast_type": "security_alert",
  "from_agent": "security-analyst",
  "severity": "CRITICAL|HIGH",
  "vulnerability": "",
  "affected_components": [],
  "immediate_action": ""
}
```

### Completion Broadcast

```json
{
  "broadcast_type": "completion",
  "from_agent": "[agent-name]",
  "completed_tasks": [],
  "deliverables": {},
  "next_steps": []
}
```

## Handoff Flow Patterns

### Sequential Handoff

```
Architect → Coder → Test-Engineer → Tech-Writer
```

### Parallel Handoff

```
Architect → [Coder, Designer] → Test-Engineer
```

### Conditional Handoff

```
if (security_issues):
  → Security-Analyst → Coder
else:
  → Coder → Test-Engineer
```

## Agent Response Times

Expected response patterns for inter-agent queries:

- **Pattern Clarification**: Immediate (within same session)
- **Dependency Resolution**: Quick (1-2 operations)
- **Status Query**: Immediate
- **Security Alert**: Immediate priority shift

## Error Handling

### Failed Handoff Protocol

```json
{
  "error_type": "handoff_failure",
  "from_agent": "[sender]",
  "to_agent": "[intended_recipient]",
  "reason": "agent_unavailable|invalid_data|missing_dependencies",
  "fallback": "retry|skip|manual_intervention"
}
```

### Data Validation Errors

All agents should validate incoming data structure before processing:

1. Check required fields
2. Validate data types
3. Verify referenced Memory keys exist
4. Confirm file paths are valid

## Performance Optimization

### Batch Operations

Agents should batch related queries/updates:

```json
{
  "batch_operation": true,
  "operations": [
    {"type": "memory_store", "keys": []},
    {"type": "memory_retrieve", "keys": []},
    {"type": "pattern_analysis", "files": []}
  ]
}
```

### Cache Strategies

- Store frequently accessed patterns in Memory
- Reference Memory keys instead of full data
- Use incremental updates for large datasets

## Version Compatibility

Protocol Version: 1.0.0
Compatible with: HyperClaude Nano Framework
Last Updated: 2024

All agents should include protocol version in handoffs for compatibility checking.