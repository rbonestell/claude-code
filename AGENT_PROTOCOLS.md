# AGENT_PROTOCOLS.md - Inter-Agent Communication Specifications

Comprehensive protocols for data exchange and coordination between SuperClaude specialized agents.

## Overview

This document defines the structured communication protocols that enable seamless collaboration between specialized agents (architect, coder, designer, security-analyst, test-engineer) within the SuperClaude framework.

## Core Communication Principles

1. **Structured Data Exchange**: All inter-agent communication uses JSON format
2. **MCP Memory Server**: Primary channel for persistent data sharing
3. **Validation Required**: All handoffs include validation checksums
4. **Async-Safe**: Protocols support both synchronous and async operations
5. **Version Control**: Data structures include version for compatibility

## Memory Server Key Structure

### Namespace Convention
```
{domain}:{agent}:{type}:{identifier}
```

### Key Registry

```yaml
# Architect Agent Keys
"project:patterns:identified": List of identified patterns
"project:patterns:preserve": Patterns to maintain
"project:patterns:refine": Patterns needing improvement
"architectural:decisions:*": Architecture constraints and decisions
"review:findings:*": Code review results with priorities
"execution:plan:*": Phased execution recommendations

# Coder Agent Keys
"implementation:patterns:*": Code patterns used
"code:modules:*": Module implementations
"test:requirements:*": Testing requirements for modules
"refactoring:status:*": Refactoring progress tracking

# Designer Agent Keys  
"design:patterns:*": UI/UX patterns catalog
"ui:components:*": Component specifications
"design:tokens:*": Design system tokens
"accessibility:requirements:*": WCAG compliance specs

# Security-Analyst Agent Keys
"security:vulnerabilities:*": Identified vulnerabilities
"security:recommendations:*": Security remediation plans
"compliance:requirements:*": Regulatory compliance needs
"threat:models:*": Threat assessment results

# Test-Engineer Agent Keys
"test:results:*": Test execution results
"test:coverage:*": Coverage metrics by module
"test:scenarios:*": Test case specifications
"regression:suite:*": Regression test definitions
```

## Agent Handoff Protocols

### 1. Architect → Coder Protocol

**Purpose**: Transfer system analysis to implementation specifications

**Data Structure**:
```json
{
  "version": "1.0",
  "timestamp": "ISO-8601",
  "from": "architect",
  "to": "coder",
  "patterns": {
    "identified": [
      {
        "name": "Repository",
        "locations": ["src/data/*"],
        "description": "Data access pattern"
      }
    ],
    "preserve": ["Authentication pattern at auth/*"],
    "refine": ["Error handling in services/*"]
  },
  "findings": [
    {
      "id": "ARCH-001",
      "priority": "CRITICAL",
      "type": "security|bug|design|quality",
      "location": {
        "file": "src/api/user.js",
        "lines": "45-67",
        "component": "UserService"
      },
      "issue": "SQL injection vulnerability",
      "recommendation": "Use parameterized queries",
      "pattern_to_follow": "src/data/base.repository.js",
      "estimated_effort": "2 hours",
      "test_requirements": ["SQL injection test", "Input validation"]
    }
  ],
  "execution_plan": {
    "immediate": ["ARCH-001", "ARCH-002"],
    "short_term": ["ARCH-003", "ARCH-004"],
    "long_term": ["ARCH-005"]
  },
  "constraints": {
    "framework": "Express 4.x",
    "node_version": "18.x",
    "database": "PostgreSQL 14"
  }
}
```

**Validation**: SHA-256 hash of findings array

### 2. Architect → Designer Protocol

**Purpose**: Transfer design requirements and constraints

**Data Structure**:
```json
{
  "version": "1.0",
  "timestamp": "ISO-8601",
  "from": "architect",
  "to": "designer",
  "design_requirements": {
    "components": ["Dashboard", "UserProfile", "Settings"],
    "design_system": "Material Design 3",
    "responsive": {
      "breakpoints": [320, 768, 1024, 1440],
      "mobile_first": true
    },
    "accessibility": {
      "wcag_level": "AA",
      "aria_required": true,
      "keyboard_nav": true
    },
    "performance": {
      "lighthouse_target": 90,
      "bundle_size_limit": "200KB",
      "lazy_loading": true
    }
  },
  "user_flows": [
    {
      "name": "User Registration",
      "steps": ["Landing", "Form", "Verification", "Dashboard"],
      "priority": "HIGH"
    }
  ],
  "constraints": {
    "framework": "React 18",
    "css_approach": "CSS Modules",
    "browser_support": ["Chrome 90+", "Firefox 88+", "Safari 14+"]
  }
}
```

### 3. Designer → Coder Protocol

**Purpose**: Transfer UI specifications for implementation

**Data Structure**:
```json
{
  "version": "1.0",
  "timestamp": "ISO-8601",
  "from": "designer",
  "to": "coder",
  "components": [
    {
      "name": "UserProfile",
      "type": "functional|class",
      "props": {
        "user": {
          "type": "User",
          "required": true
        },
        "onEdit": {
          "type": "function",
          "required": false
        }
      },
      "styling": {
        "approach": "CSS Modules",
        "files": ["UserProfile.module.css"],
        "responsive": true
      },
      "interactions": {
        "hover": "Highlight with shadow",
        "click": "Navigate to edit mode",
        "keyboard": "Tab navigation, Enter to edit"
      },
      "accessibility": {
        "role": "article",
        "aria_label": "User profile information",
        "focus_management": true
      },
      "performance": {
        "lazy_load": true,
        "code_split": true,
        "bundle_size": "50KB max"
      },
      "test_scenarios": [
        "Renders with user data",
        "Handles missing optional props",
        "Keyboard navigation works",
        "Edit callback fires correctly"
      ]
    }
  ],
  "design_tokens": {
    "colors": {
      "primary": "#007AFF",
      "secondary": "#5856D6",
      "error": "#FF3B30"
    },
    "spacing": {
      "unit": 8,
      "scale": [0, 0.5, 1, 2, 3, 4, 6, 8]
    },
    "typography": {
      "fontFamily": "Inter, system-ui",
      "scale": [12, 14, 16, 20, 24, 32, 48]
    }
  }
}
```

### 4. Coder → Test-Engineer Protocol

**Purpose**: Transfer implementation details for test creation

**Data Structure**:
```json
{
  "version": "1.0",
  "timestamp": "ISO-8601",
  "from": "coder",
  "to": "test-engineer",
  "modules": [
    {
      "name": "UserService",
      "path": "src/services/user.service.js",
      "type": "service|component|utility",
      "methods": [
        {
          "name": "createUser",
          "parameters": ["userData"],
          "returns": "Promise<User>",
          "throws": ["ValidationError", "DatabaseError"]
        }
      ],
      "dependencies": ["DatabaseService", "ValidationService"],
      "test_requirements": {
        "unit": ["Happy path", "Validation errors", "Database errors"],
        "integration": ["Database connection", "Transaction rollback"],
        "e2e": ["User registration flow"]
      },
      "coverage_target": {
        "statements": 90,
        "branches": 85,
        "functions": 95,
        "lines": 90
      }
    }
  ],
  "api_endpoints": [
    {
      "path": "/api/users",
      "method": "POST",
      "payload": {"name": "string", "email": "email"},
      "responses": {
        "201": "User created",
        "400": "Validation error",
        "500": "Server error"
      },
      "test_cases": ["Valid user", "Duplicate email", "Invalid email"]
    }
  ]
}
```

### 5. Security-Analyst → All Agents Protocol

**Purpose**: Broadcast security findings to all agents

**Data Structure**:
```json
{
  "version": "1.0",
  "timestamp": "ISO-8601",
  "from": "security-analyst",
  "to": "all",
  "severity": "CRITICAL|HIGH|MEDIUM|LOW",
  "vulnerabilities": [
    {
      "id": "SEC-001",
      "type": "SQL Injection",
      "cwe": "CWE-89",
      "owasp": "A03:2021",
      "location": {
        "file": "src/api/search.js",
        "lines": "23-45",
        "method": "searchUsers"
      },
      "description": "User input directly concatenated to SQL query",
      "impact": "Database compromise, data breach",
      "remediation": {
        "immediate": "Use parameterized queries",
        "long_term": "Implement ORM layer",
        "example": "src/data/secure-query.example.js"
      },
      "test_verification": "security/sql-injection.test.js",
      "priority": "IMMEDIATE"
    }
  ],
  "compliance": {
    "gdpr": ["Data encryption required", "User consent needed"],
    "pci": ["Credit card data must be tokenized"],
    "hipaa": []
  },
  "recommendations": {
    "architect": ["Implement security layer in architecture"],
    "coder": ["Apply secure coding practices"],
    "designer": ["Add security indicators to UI"],
    "test-engineer": ["Create security test suite"]
  }
}
```

### 6. Test-Engineer → All Agents Protocol

**Purpose**: Report test results and quality metrics

**Data Structure**:
```json
{
  "version": "1.0",
  "timestamp": "ISO-8601",
  "from": "test-engineer",
  "to": "all",
  "test_run": {
    "id": "run-2024-01-15-001",
    "environment": "staging",
    "duration": "5m 23s"
  },
  "results": {
    "passed": 245,
    "failed": 3,
    "skipped": 7,
    "total": 255
  },
  "failures": [
    {
      "test": "UserService.createUser with invalid email",
      "file": "tests/services/user.test.js",
      "line": 45,
      "error": "Expected ValidationError, got undefined",
      "module": "UserService",
      "impact": "Validation bypass possible"
    }
  ],
  "coverage": {
    "overall": {
      "statements": 87.5,
      "branches": 82.3,
      "functions": 91.2,
      "lines": 88.1
    },
    "by_module": {
      "UserService": {
        "statements": 95.0,
        "uncovered_lines": [67, 89, 102]
      }
    }
  },
  "performance": {
    "slowest_tests": [
      {"name": "E2E Registration", "duration": "45s"},
      {"name": "Database Migration", "duration": "23s"}
    ],
    "api_response_times": {
      "p50": "45ms",
      "p95": "230ms",
      "p99": "890ms"
    }
  },
  "recommendations": {
    "coder": ["Fix validation in UserService.createUser"],
    "architect": ["Consider caching for slow endpoints"],
    "designer": ["Add loading states for slow operations"]
  }
}
```

## Wave Orchestration Protocols

### Multi-Agent Wave Coordination

```json
{
  "wave_id": "wave-2024-01-15-001",
  "wave_type": "comprehensive_improvement",
  "phases": [
    {
      "phase": 1,
      "name": "Analysis",
      "agent": "architect",
      "input": "project:scope:*",
      "output": "review:findings:*",
      "duration": "estimated:2h"
    },
    {
      "phase": 2,
      "name": "Security Audit",
      "agent": "security-analyst",
      "input": "review:findings:*",
      "output": "security:vulnerabilities:*",
      "duration": "estimated:1h"
    },
    {
      "phase": 3,
      "name": "Implementation",
      "agents": ["coder", "designer"],
      "parallel": true,
      "input": ["review:findings:*", "security:vulnerabilities:*"],
      "output": ["implementation:status:*", "design:updates:*"],
      "duration": "estimated:4h"
    },
    {
      "phase": 4,
      "name": "Validation",
      "agent": "test-engineer",
      "input": ["implementation:status:*", "design:updates:*"],
      "output": "test:results:*",
      "duration": "estimated:1h"
    }
  ],
  "checkpoints": {
    "after_phase_1": "Review findings before proceeding",
    "after_phase_2": "Assess security criticality",
    "after_phase_3": "Verify implementation completeness",
    "after_phase_4": "Confirm all tests pass"
  }
}
```

## Error Handling Protocols

### Handoff Failure Recovery

```json
{
  "error_type": "handoff_failure",
  "from_agent": "architect",
  "to_agent": "coder",
  "error": "Invalid data structure",
  "recovery": {
    "retry_count": 3,
    "retry_delay": "exponential",
    "fallback": "general-purpose agent",
    "notification": "user"
  }
}
```

### Data Validation Errors

```json
{
  "error_type": "validation_error",
  "agent": "coder",
  "expected_schema": "architect_output_v1.0",
  "received_schema": "unknown",
  "fields_missing": ["patterns.identified", "execution_plan"],
  "action": "request_regeneration"
}
```

## Performance Metrics

### Handoff Efficiency Tracking

```json
{
  "metrics": {
    "average_handoff_time": "234ms",
    "success_rate": "94.5%",
    "data_size_average": "15.3KB",
    "validation_failures": 23,
    "retry_rate": "5.5%"
  },
  "by_route": {
    "architect_to_coder": {
      "count": 145,
      "success_rate": "96%",
      "avg_time": "189ms"
    },
    "designer_to_coder": {
      "count": 89,
      "success_rate": "93%",
      "avg_time": "267ms"
    }
  }
}
```

## Best Practices

### For Sending Agents

1. **Always validate** data structure before sending
2. **Include version** for compatibility checking
3. **Add timestamp** for temporal tracking
4. **Provide clear IDs** for traceability
5. **Include estimates** for planning

### For Receiving Agents

1. **Validate schema** before processing
2. **Check version** compatibility
3. **Acknowledge receipt** within 500ms
4. **Report issues** immediately
5. **Store state** before processing

### For System Monitoring

1. **Track all handoffs** for metrics
2. **Monitor failure rates** by route
3. **Alert on degradation** >10%
4. **Log all errors** with context
5. **Review patterns** weekly

## Protocol Evolution

### Version Management

- Current protocol version: 1.0
- Backward compatibility: 2 versions
- Deprecation notice: 30 days
- Migration tools: Provided

### Change Process

1. Propose change in RFC format
2. Review by all agent maintainers
3. Test in staging environment
4. Gradual rollout with monitoring
5. Full deployment after validation

## Appendix: Schema Definitions

Full JSON schemas for all protocol messages are available at:
- `/schemas/architect-output.json`
- `/schemas/designer-output.json`
- `/schemas/coder-output.json`
- `/schemas/security-output.json`
- `/schemas/test-output.json`

## Support

For protocol issues or enhancements:
- Create issue in project repository
- Tag with `protocol-enhancement`
- Include example data and use case