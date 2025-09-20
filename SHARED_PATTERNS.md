# Shared MCP Optimization Patterns

## Overview

Unified MCP server usage patterns and optimization strategies shared across all HyperClaude Nano agents for maximum efficiency and consistency.

## MCP Server Matrix

### Context7 Server

**Primary Use Cases:**

- Framework documentation and best practices
- Library API references and examples
- Language-specific patterns and idioms
- Security standards and compliance guidelines

**Optimization Strategies:**

```yaml
query_patterns:
  specific_first: "[exact_library] [exact_feature] documentation"
  fallback_general: "[language] [concept] best practices"
  cache_results: true
  batch_queries: true

performance:
  cache_hit_target: 70%
  query_reduction: 50%
  token_savings: 40%
```

**Agent-Specific Usage:**

- **Architect**: Design patterns, architectural best practices
- **Coder**: Framework APIs, implementation examples
- **Designer**: UI frameworks, accessibility standards
- **Security**: Security guidelines, vulnerability databases
- **Test-Engineer**: Testing frameworks, assertion libraries
- **Tech-Writer**: Documentation standards, style guides
- **Cloud-Engineer**: IaC documentation, provider APIs

### Memory Server

**Primary Use Cases:**

- Pattern persistence across sessions
- Inter-agent communication storage
- Project context maintenance
- Knowledge accumulation

**Key Patterns:**

```yaml
storage_patterns:
  hierarchical_keys: "category:subcategory:specific:id"
  atomic_updates: true
  batch_operations: true

retrieval_patterns:
  wildcard_search: "project:patterns:*"
  specific_fetch: "exact:key:path"
  related_fetch: ["key1", "key2", "key3"]

performance:
  batch_size: 10
  compression: true
  token_reduction: 40%
```

**Cross-Agent Memory Keys:**

```text
project:patterns:*        # Shared architectural patterns
implementation:patterns:* # Code patterns for reuse
test:patterns:*          # Testing patterns and utilities
security:patterns:*      # Security configurations
design:patterns:*        # UI/UX patterns
docs:templates:*         # Documentation templates
```

### Tree-Sitter Server

**Primary Use Cases:**

- Code structure analysis
- Pattern detection and validation
- AST-based searching
- Syntax error detection

**Optimization Patterns:**

```yaml
analysis_patterns:
  search_specificity:
    exact: "function:specific_name"
    fuzzy: "pattern:approximate_match"
    type: "filter:by:element:type"

  batch_analysis:
    files: ["file1", "file2", "file3"]
    patterns: ["pattern1", "pattern2"]
    combine_results: true

performance:
  cache_ast: true
  incremental_parsing: true
  token_reduction: 35%
```

**Agent Usage Matrix:**

| Agent | Primary Use | Secondary Use |
|-------|------------|---------------|
| Architect | Pattern analysis | Dependency mapping |
| Coder | Pattern templates | Error checking |
| Designer | Component analysis | Prop extraction |
| Security | Vulnerability scanning | Data flow analysis |
| Test-Engineer | Test structure | Coverage analysis |
| Tech-Writer | API extraction | Example mining |

### Puppeteer Server

**Primary Use Cases:**

- Visual validation and testing
- Screenshot generation
- E2E testing automation
- Cross-browser verification

**Optimization Strategies:**

```yaml
browser_management:
  headless: true
  reuse_instance: true
  parallel_limit: 3

screenshot_optimization:
  compress: true
  selective_capture: true
  viewport_presets: [320, 768, 1440, 1920]

performance:
  cache_screenshots: true
  batch_operations: true
  resource_pooling: true
```

**Agent-Specific Patterns:**

- **Designer**: Visual regression, responsive testing
- **Test-Engineer**: E2E scenarios, interaction testing
- **Tech-Writer**: Documentation screenshots, UI examples
- **Security**: XSS testing, authentication flows

### Sequential-Thinking Server

**Primary Use Cases:**

- Complex problem decomposition
- Multi-step planning
- Decision tree analysis
- Cost-benefit evaluation

**Usage Patterns:**

```yaml
thinking_patterns:
  initial_thoughts: 3-5
  max_thoughts: 10
  allow_revision: true
  branch_on_uncertainty: true

optimization:
  cache_reasoning: true
  reuse_patterns: true
  compress_output: true

triggers:
  complexity_threshold: high
  uncertainty_level: >0.3
  multi_dependency: true
```

### IDE Server

**Primary Use Cases:**

- Language diagnostics
- Code execution (Jupyter)
- Error detection
- Intellisense data

**Optimization Patterns:**

```yaml
diagnostic_patterns:
  batch_files: true
  incremental_check: true
  severity_filter: ["error", "warning"]

execution_patterns:
  stateful_kernel: true
  result_caching: true
  output_limit: 1000_lines
```

## Cross-Server Optimization

### Parallel Operations

```yaml
parallel_patterns:
  discovery:
    - tree-sitter: analyze_structure
    - memory: retrieve_patterns
    - context7: fetch_best_practices

  validation:
    - tree-sitter: syntax_check
    - puppeteer: visual_test
    - ide: diagnostic_check
```

### Sequential Operations

```yaml
sequential_patterns:
  documentation_flow:
    1: tree-sitter → extract_api
    2: context7 → enhance_with_examples
    3: memory → store_templates
    4: puppeteer → capture_screenshots

  security_flow:
    1: tree-sitter → identify_patterns
    2: memory → compare_known_vulnerabilities
    3: context7 → fetch_remediation
    4: sequential → analyze_complexity
```

## Performance Metrics

### Baseline vs Optimized

```yaml
metrics:
  token_usage:
    baseline: 15000
    optimized: 9000
    reduction: 40%

  response_time:
    baseline: 5s
    optimized: 2s
    improvement: 60%

  accuracy:
    baseline: 85%
    optimized: 95%
    improvement: 10%

  cache_effectiveness:
    memory_hit_rate: 70%
    context7_reuse: 65%
    ast_cache: 80%
```

## Batch Operation Templates

### Memory Batch Store

```
mcp__memory__create_entities([
  {name: "pattern1", entityType: "pattern", observations: []},
  {name: "pattern2", entityType: "pattern", observations: []},
  {name: "pattern3", entityType: "pattern", observations: []}
])
```

### Tree-Sitter Batch Search

```
mcp__tree-sitter__search_code({
  query: "function",
  types: ["function", "method", "arrow_function"],
  maxResults: 50,
  pathPattern: "src"
})
```

### Context7 Batch Query

```
// Query once, use multiple times
mcp__context7__resolve-library-id("react")
// Then specific feature queries
mcp__context7__get-library-docs({
  context7CompatibleLibraryID: "/facebook/react",
  topic: "hooks"
})
```

## Error Handling Patterns

### Fallback Strategies

```yaml
fallback_chain:
  primary: mcp_server_call
  secondary: native_tool_call
  tertiary: manual_implementation

retry_logic:
  max_attempts: 3
  backoff: exponential
  timeout: 30s

degradation:
  full_feature → reduced_feature → basic_feature
```

### Cache Invalidation

```yaml
cache_rules:
  memory_ttl: session_persistent
  context7_ttl: 24_hours
  tree-sitter_ttl: file_change_based
  puppeteer_ttl: 1_hour

invalidation_triggers:
  - file_modification
  - dependency_update
  - explicit_refresh
  - error_threshold_exceeded
```

## Agent Coordination Patterns

### Wave Orchestration MCP Usage

```yaml
wave_1_architect:
  - tree-sitter: analyze_all
  - memory: store_patterns
  - sequential: plan_approach

wave_2_security:
  - tree-sitter: vulnerability_scan
  - context7: security_standards
  - memory: store_findings

wave_3_parallel:
  coder:
    - memory: retrieve_patterns
    - context7: implementation_docs
    - tree-sitter: generate_templates
  designer:
    - context7: ui_patterns
    - puppeteer: visual_validation
    - memory: store_components

wave_4_test:
  - tree-sitter: test_analysis
  - puppeteer: e2e_testing
  - memory: coverage_metrics

wave_5_doc:
  - memory: retrieve_all
  - context7: doc_standards
  - tree-sitter: extract_apis
```

## Optimization Checklist

### Before MCP Call

- [ ] Check Memory cache first
- [ ] Batch related operations
- [ ] Use specific queries over general
- [ ] Set appropriate timeout
- [ ] Prepare fallback strategy

### During MCP Call

- [ ] Monitor response time
- [ ] Validate returned data
- [ ] Handle partial results
- [ ] Track token usage

### After MCP Call

- [ ] Store results in Memory
- [ ] Update cache metrics
- [ ] Log performance data
- [ ] Clean up resources

## Best Practices

1. **Cache Aggressively**: Use Memory server for cross-session persistence
2. **Batch Operations**: Combine related calls into single operations
3. **Specific Queries**: Use exact names/paths over wildcards when possible
4. **Progressive Enhancement**: Start with cached, enhance with live data
5. **Fail Gracefully**: Always have fallback for MCP failures
6. **Monitor Usage**: Track token consumption and optimize heavy operations
7. **Share Patterns**: Store discovered patterns for other agents
8. **Validate Early**: Check data structure before processing

## Version

Pattern Version: 1.0.0
Framework: HyperClaude Nano
Last Updated: 2024

All agents should follow these patterns for consistent MCP usage and optimal performance.
