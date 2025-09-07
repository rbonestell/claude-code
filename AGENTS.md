# AGENTS.md - SuperClaude Custom Agent Integration

Custom agent system for specialized task execution within the SuperClaude framework.

## Overview

The agent system provides specialized AI personalities optimized for specific technical domains. Each agent has unique capabilities, tool access, and communication protocols that integrate seamlessly with SuperClaude commands, personas, and orchestration.

**Core Features**:

- **Specialized Expertise**: Domain-specific knowledge and approaches
- **Tool Optimization**: Curated tool access per agent
- **Inter-Agent Communication**: Structured data exchange via MCP servers
- **Intelligent Routing**: Automatic agent selection based on task analysis
- **Manual Override**: Explicit agent selection via flags

## MCP Server Optimization & Context Management

**Performance-First Architecture**: Intelligent MCP server usage with 40-60% context reduction through caching, batching, and progressive loading strategies.

### Core Optimization Principles

1. **Memory-First Strategy**: Always check MCP Memory Server cache before external lookups
2. **Intelligent Batching**: Group similar operations to reduce server calls by 50%
3. **Progressive Loading**: Load data on-demand with configurable detail levels
4. **Cross-Agent Sharing**: Pattern reuse reduces redundant analysis by 70%

### MCP Server Usage Hierarchy

```yaml
optimization_priority:
  1. Memory Server: # Primary cache (0ms latency)
    - Pattern storage and retrieval
    - Cross-session persistence
    - Agent communication hub

  2. mcp__tree-sitter: # Local analysis (fast)
    - Code structure parsing
    - Pattern identification
    - AST caching for reuse

  3. Context7: # Documentation lookup (moderate latency)
    - Library documentation
    - Best practices research
    - Framework patterns

  4. mcp__puppeteer: # Browser automation (highest latency)
    - UI validation
    - E2E testing
    - Visual regression testing
```

### Caching Strategy

**Pattern Cache Structure**:

```
cache:patterns:project     # Global patterns
cache:patterns:architect   # Agent-specific patterns
cache:ast:session         # Parsed AST results
cache:docs:libraries      # Context7 lookups (24h TTL)
```

**Cache Hit Optimization**:

- Target: 70%+ cache hit rate
- Strategy: Predictive caching based on task type
- Invalidation: Smart TTL with dependency tracking
- Sharing: Cross-agent pattern propagation

### Query Batching Protocols

**Batch Operations**:

```json
{
  "batch_memory_retrieve": [
    "project:patterns:*",
    "architectural:decisions:*",
    "test:patterns:*"
  ],
  "batch_mcp_tree_sitter_queries": [
    { "type": "find_functions", "pattern": "auth*" },
    { "type": "find_classes", "pattern": "*Service" },
    { "type": "find_patterns", "pattern": "repository" }
  ]
}
```

### Context-Aware Loading

**Progressive Detail Levels**:

- **Level 1** (Summary): Counts, priorities, high-level status
- **Level 2** (Overview): IDs, locations, basic descriptions
- **Level 3** (Details): Full analysis, recommendations, examples

**Context Thresholds**:

- 60%: Enable compression for large data transfers
- 70%: Switch to summary-first communication
- 80%: Defer non-critical details to subsequent requests
- 90%: Emergency mode - essential data only

## Agent Registry

### Available Agents

| Agent                       | Domain                   | Primary Tools                                                            | MCP Servers                                                                                                   | Task Tool Type   | Optimization Priority  |
| --------------------------- | ------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | ---------------- | ---------------------- |
| **@agent-architect**        | System design & analysis | Bash, Glob, Grep, Read, WebFetch, TodoWrite, WebSearch, BashOutput, Task  | Memory (patterns), Context7 (docs), mcp__tree-sitter (AST), mcp__puppeteer (validation)                                 | general-purpose  | Memory-first caching   |
| **@agent-coder**            | Implementation & coding  | Task (for implementations), Read, Glob, Grep, Bash, TodoWrite, BashOutput            | Memory (patterns), mcp__tree-sitter (analysis), Context7 (libraries), mcp__puppeteer (UI testing)                       | coder            | Pattern template reuse |
| **@agent-designer**         | UI/UX & frontend         | Task (for UI work), Read, Glob, Grep, Bash, TodoWrite, BashOutput | Context7 (UI patterns), Memory (design decisions), mcp__tree-sitter (components), mcp__puppeteer (validation)           | designer         | Batch validations      |
| **@agent-security-analyst** | Security & compliance    | Glob, Grep, Read, WebFetch, TodoWrite, WebSearch, BashOutput, Task        | Memory (vulnerabilities), mcp__tree-sitter (code analysis), Context7 (security docs), mcp__puppeteer (frontend testing) | security-analyst | Streaming findings     |
| **@agent-test-engineer**    | Testing & QA             | Task (for test operations), Read, Glob, Grep, Bash, TodoWrite, BashOutput | Memory (test patterns), mcp__tree-sitter (test analysis), Context7 (frameworks), mcp__puppeteer (E2E testing)           | test-engineer    | Incremental updates    |
| **@agent-tech-writer**      | Documentation & guides   | Task (for documentation), Read, Glob, Grep, Bash, TodoWrite, BashOutput            | Context7 (docs standards), Memory (templates), mcp__tree-sitter (code extraction), mcp__puppeteer (site validation)     | tech-writer      | Template caching       |
| **@agent-cloud-engineer**  | Cloud & Infrastructure   | Bash, Read, Task (for infrastructure), Glob, Grep, TodoWrite, BashOutput                         | Context7 (dynamic IaC docs), Memory (patterns), mcp__sequential (analysis), mcp__tree-sitter (IaC parsing)              | cloud-engineer   | Discovery-first caching |

## Agent Capabilities Matrix

### @agent-architect

**Specialization**: System architecture, code review, pattern analysis

- **Strengths**: Holistic system understanding, technical debt assessment, design patterns
- **Best For**: System analysis, architecture review, improvement planning
- **Output**: Structured findings, pattern documentation, execution plans
- **Handoff**: Provides specifications to @agent-coder, @agent-designer, and @agent-tech-writer
- **MCP Optimization**: Session-wide pattern caching, reduces redundant analysis by 85%
- **Pattern Recognition**: Uses Memory Server to store identified patterns for project reuse
- **Context Efficiency**: Batches mcp__tree-sitter queries, uses progressive detail loading
- **Emergency Protocols**: Falls back to cached patterns when Context7 unavailable

### @agent-coder

**Specialization**: Code implementation, refactoring, bug fixes

- **Strengths**: Pattern-consistent implementation, framework expertise, testing
- **Best For**: Feature development, bug fixes, refactoring, code remediation
- **Input**: Accepts @agent-architect findings and @agent-designer specifications
- **Output**: Production-ready code with tests
- **MCP Optimization**: Pattern template reuse, minimal Context7 usage (cached patterns first)
- **Implementation Strategy**: "Hippocratic Oath" - do no harm, minimal intervention via Task tool
- **Context Efficiency**: Reuses stored patterns, batches Task operations for file modifications
- **Rollback System**: Maintains checkpoints, circuit breakers on test failure

### @agent-designer

**Specialization**: UI/UX design, frontend development, accessibility

- **Strengths**: Design systems, responsive design, performance optimization, Context7 UI patterns
- **Best For**: Component creation, UI implementation, visual validation
- **Input**: Accepts @agent-architect constraints and requirements
- **Output**: Design specifications for @agent-coder implementation
- **MCP Integration**: Uses Context7 for UI component patterns and best practices
- **MCP Optimization**: Batched mcp__puppeteer validations across multiple viewports
- **Design System**: Cached design tokens and patterns in Memory Server
- **Context Efficiency**: Progressive loading of visual assets, compressed screenshots
- **Quality Gates**: Circuit breakers on accessibility failures, performance degradation

### @agent-security-analyst

**Specialization**: Security audits, vulnerability assessment, compliance

- **Strengths**: Threat modeling, OWASP compliance, security patterns
- **Best For**: Security reviews, penetration testing, compliance audits
- **Output**: Security findings, remediation recommendations
- **Integration**: Feeds critical issues to all other agents
- **MCP Optimization**: Streaming findings vs batch transfer, incremental vulnerability reporting
- **OWASP Focus**: Systematic analysis following OWASP Top 10 with cached security patterns
- **Context Efficiency**: Risk-based prioritization, compressed vulnerability data
- **Emergency Protocols**: Circuit breakers on critical vulnerabilities, immediate escalation

### @agent-test-engineer

**Specialization**: Test creation, E2E testing, quality assurance

- **Strengths**: Test strategy, coverage analysis, regression testing
- **Best For**: Test suite development, validation, performance testing
- **Input**: Test requirements from @agent-coder and @agent-designer
- **Output**: Test results, coverage reports, quality metrics
- **MCP Integration**: Uses mcp__puppeteer for browser automation and E2E testing
- **MCP Optimization**: Incremental coverage updates, cached test patterns and utilities
- **Test Strategy**: Pattern-driven test creation via Task tool, reusing existing test utilities
- **Context Efficiency**: Progressive test reporting, batched E2E validations
- **Quality Gates**: Circuit breakers on coverage drops, flaky test detection

### @agent-tech-writer

**Specialization**: Technical documentation, API references, user guides

- **Strengths**: Clear writing, pattern recognition, documentation frameworks
- **Best For**: README creation, API documentation, user guides, documentation sites
- **Input**: Accepts patterns from @agent-architect, implementations from @agent-coder, UI specs from @agent-designer
- **Output**: Complete documentation, coverage metrics, documentation sites
- **MCP Integration**: Uses Context7 for best practices, mcp__tree-sitter for code analysis
- **MCP Optimization**: Documentation template caching, batch content generation via Task tool
- **Multi-Agent Input**: Processes structured data from architect, coder, and designer agents
- **Context Efficiency**: Progressive documentation building, cached templates and glossaries
- **Framework Expertise**: Nextra, Docusaurus, VitePress with optimized build processes via Task tool

### @agent-cloud-engineer

**Specialization**: Cloud-agnostic infrastructure, IaC polyglot, multi-cloud orchestration

- **Strengths**: Dynamic IaC discovery, provider abstraction, cost optimization
- **Best For**: Infrastructure provisioning, cloud migrations, disaster recovery, cost analysis
- **Input**: Accepts requirements from @agent-architect, security policies from @agent-security-analyst
- **Output**: Deployed infrastructure, IaC templates, cost reports, endpoint configurations
- **MCP Integration**: Dynamic Context7 queries for discovered IaC language, mcp__sequential for planning
- **MCP Optimization**: Discovery-first caching, 4-hour IaC pattern retention
- **Discovery Strategy**: Auto-detects IaC language (Terraform, Pulumi, CloudFormation, CDK, etc.) via Task tool
- **Context Efficiency**: Reference-based IaC storage, compressed deployment logs
- **Provider Agnostic**: Equal support for AWS, Azure, GCP, and 20+ cloud providers

## Agent Selection Algorithm

### Automatic Selection

Agents are automatically selected based on:

1. **Command Mapping**:

   - `/analyze` → @agent-architect
   - `/implement` → @agent-coder
   - `/design` → @agent-designer
   - `/test` → @agent-test-engineer
   - `/security` → @agent-security-analyst
   - `/document` → @agent-tech-writer
   - `/provision` → @agent-cloud-engineer
   - `/infrastructure` → @agent-cloud-engineer
   - `/cloud-optimize` → @agent-cloud-engineer

2. **Keyword Detection**:

   ```yaml
   @agent-architect: [architecture, design, review, patterns, analysis]
   @agent-coder: [implement, fix, refactor, develop, code]
   @agent-designer: [UI, component, frontend, responsive, accessibility]
   @agent-security-analyst: [vulnerability, security, audit, compliance, threat]
   @agent-test-engineer: [test, QA, coverage, validation, E2E]
   @agent-tech-writer: [document, documentation, README, API docs, guide, tutorial]
   @agent-cloud-engineer: [terraform, pulumi, cloudformation, infrastructure, provision, deploy, cloud, AWS, Azure, GCP, IaC, cost optimization]
   ```

3. **File Pattern Analysis**:

   - `*.tsx`, `*.jsx`, `*.css` → @agent-designer
   - `*.test.*`, `*.spec.*` → @agent-test-engineer
   - `*auth*`, `*security*` → @agent-security-analyst
   - Controllers, models, services → @agent-coder
   - Config files, architecture docs → @agent-architect
   - `*.md`, `README*`, `CHANGELOG*`, `docs/*` → @agent-tech-writer
   - `*.tf`, `*.tfvars`, `terraform/*` → @agent-cloud-engineer
   - `*.yaml`, `*.yml` with CloudFormation/K8s → @agent-cloud-engineer
   - `Pulumi.*`, `*.bicep`, `cdk.json` → @agent-cloud-engineer

4. **Complexity Scoring**:
   - High complexity + system-wide → @agent-architect
   - Implementation focus → @agent-coder
   - Visual/UX focus → @agent-designer
   - Quality focus → @agent-test-engineer
   - Security focus → @agent-security-analyst
   - Documentation needs → @agent-tech-writer

### Manual Selection

Use explicit flags to override automatic selection:

- `--agent-architect` - Force @agent-architect
- `--agent-coder` - Force @agent-coder
- `--agent-designer` - Force @agent-designer
- `--agent-security` - Force @agent-security-analyst
- `--agent-test` - Force @agent-test-engineer
- `--agent-tech-writer` - Force @agent-tech-writer
- `--agent-cloud` - Force @agent-cloud-engineer

## Inter-Agent Communication Protocol

### Optimized Data Exchange via MCP Memory Server

**High-Performance Communication**: Compressed JSON structures with reference-based handoffs reduce context usage by 50%.

#### Memory Key Architecture

```yaml
memory_keys:
  # Primary Data (Full Objects)
  "project:patterns:identified": Design patterns catalog
  "architectural:decisions:current": Active architecture constraints
  "review:findings:session": Current session findings

  # Cache Keys (Optimized Access)
  "cache:patterns:project": Global pattern cache
  "cache:ast:session": Parsed AST results
  "cache:docs:libraries": Context7 documentation cache

  # Compressed References (Token Efficient)
  "ref:findings:critical": References to critical issues only
  "ref:patterns:preserve": IDs of patterns to maintain
  "ref:implementations:new": References to new code modules

  # Agent-Specific Caches
  "agent:architect:patterns": Architect's discovered patterns
  "agent:coder:templates": Code implementation templates
  "agent:designer:tokens": Design system cache
  "agent:security:vuln": Vulnerability database
  "agent:test:patterns": Test pattern library
  "agent:tech-writer:templates": Documentation templates
  "agent:cloud:iac-patterns": IaC templates and modules
  "agent:cloud:provider-configs": Provider configurations
  "agent:cloud:cost-optimizations": Cost optimization patterns
```

#### Compressed Data Structures

**Standard Protocol** (High Context):

```json
{
  "patterns": {
    "identified": [{"name": "Repository", "locations": [...]}],
    "preserve": ["Authentication pattern"],
    "refine": ["Error handling"]
  },
  "findings": [...],
  "execution_plan": {...}
}
```

**Compressed Protocol** (40% Reduction):

```json
{
  "p": { "i": ["repo_pattern_1"], "pr": ["auth"], "r": ["errors"] },
  "f": "ref:findings:session_123",
  "e": "ref:plan:immediate_actions"
}
```

#### Progressive Detail Loading

**Context-Aware Communication**:

```yaml
context_thresholds:
  60%: # Enable compression
    - Use abbreviated keys
    - Reference large objects
  70%: # Summary-first mode
    - Send counts and IDs only
    - Details on request
  80%: # Defer non-critical
    - Priority data only
    - Queue remaining details
  90%: # Emergency mode
    - Essential findings only
    - Compress all transfers
```

## Pattern Learning & Storage Optimization

### Intelligent Pattern Discovery

**Pattern Recognition Engine**: Agents automatically identify, categorize, and reuse patterns across the codebase for consistent implementation.

#### Discovery Process

1. **Initial Scan**: mcp__tree-sitter parses code structure
2. **Pattern Extraction**: Identify recurring structures and conventions
3. **Classification**: Categorize by domain (auth, data, UI, testing)
4. **Deduplication**: Hash-based detection of duplicate patterns
5. **Storage**: Compressed storage with reference counting

#### Storage Strategy

**Deduplicated Storage**:

```yaml
patterns:
  base_patterns:
    - pattern_id: "auth_jwt_001"
      hash: "a1b2c3d4"
      usage_count: 12
      locations: ["auth/*.js", "api/*.js"]

  pattern_inheritance:
    - child_pattern: "auth_refresh_001"
      parent: "auth_jwt_001"
      overrides: ["token_refresh_logic"]

  differential_updates:
    - pattern_id: "auth_jwt_001"
      version: "1.2"
      changes: ["added_role_validation"]
```

### Cross-Agent Pattern Sharing

**Shared Pattern Library**: 85% reduction in redundant pattern analysis through intelligent caching.

```yaml
pattern_workflow:
  architect_discovers: # Once per session
    - repository_patterns
    - service_patterns
    - validation_patterns

  all_agents_reuse: # Immediate access
    - cached_patterns
    - best_practices
    - anti_patterns

  evolution_tracking:
    - pattern_usage_metrics
    - success_rates
    - refinement_suggestions
```

### Handoff Protocols

#### Architect → Coder/Designer

```json
{
  "patterns": {
    "identified": ["Repository", "Factory", "Observer"],
    "preserve": ["Existing auth pattern"],
    "refine": ["Data access layer"]
  },
  "findings": [
    {
      "id": "ARCH-001",
      "type": "design",
      "location": "src/services",
      "recommendation": "Apply dependency injection"
    }
  ],
  "execution_plan": {
    "immediate": ["Critical fixes"],
    "short_term": ["Refactoring"],
    "long_term": ["Architecture improvements"]
  }
}
```

#### Designer → Coder

```json
{
  "design_specs": {
    "components": [
      {
        "name": "UserProfile",
        "props_interface": "IUserProfileProps",
        "styling_approach": "CSS Modules",
        "accessibility": "WCAG AA compliant"
      }
    ],
    "design_tokens": {
      "colors": {},
      "typography": {},
      "spacing": {}
    }
  }
}
```

## Wave Integration with MCP Coordination

### Optimized Multi-Agent Wave Orchestration

**Progressive Enhancement**: Wave system coordinates agents with intelligent MCP server usage and 30% faster handoffs.

#### Wave-Optimized Data Flow

```yaml
comprehensive_improvement_wave:
  wave_1_analysis:
    agent: @agent-architect
    task: "System analysis and pattern identification"
    mcp_strategy: "memory_first_caching"
    output: "cache:patterns:project"
    optimization: "85% pattern reuse reduction"

  wave_2_security:
    agent: @agent-security-analyst
    task: "Security audit with cached patterns"
    mcp_strategy: "streaming_findings"
    input: "cache:patterns:project"
    output: "ref:security:critical_only"
    optimization: "Compressed vulnerability data"

  wave_3_implementation:
    agents: [@agent-coder, @agent-designer]
    task: "Parallel implementation with pattern templates"
    parallel: true
    mcp_strategy: "template_reuse"
    input: ["ref:security:critical_only", "cache:patterns:project"]
    output: ["ref:code:modules", "ref:ui:components"]
    optimization: "50% faster via cached templates"

  wave_4_validation:
    agent: @agent-test-engineer
    task: "Incremental validation with cached test patterns"
    mcp_strategy: "incremental_updates"
    input: ["ref:code:modules", "ref:ui:components"]
    output: "cache:test:results"
    optimization: "Batch mcp__puppeteer validations"

  wave_5_documentation:
    agent: @agent-tech-writer
    task: "Multi-source documentation compilation"
    mcp_strategy: "template_caching"
    input: ["cache:patterns:project", "ref:code:modules", "cache:test:results"]
    output: "docs:complete:versioned"
    optimization: "Cached templates and glossaries"
```

#### MCP Coordination Strategies

**Per-Wave Optimization**:

```yaml
wave_mcp_coordination:
  parallel_waves:
    strategy: "independent_cache_access"
    benefit: "No MCP server conflicts"

  sequential_waves:
    strategy: "progressive_data_building"
    benefit: "Compound intelligence gains"

  checkpoint_validation:
    strategy: "cache_checkpoint_validation"
    benefit: "Rollback capability with cache consistency"
```

### Agent-Specific Wave Optimizations

- **@agent-architect**: Session-wide pattern caching, one-time discovery
- **@agent-coder**: Template reuse across waves via Task tool, minimal Context7 lookups
- **@agent-designer**: Batched mcp__puppeteer validations, cached design tokens
- **@agent-security-analyst**: Streaming findings, incremental reporting
- **@agent-test-engineer**: Incremental coverage updates, test pattern library
- **@agent-tech-writer**: Template caching, progressive content building
- **@agent-cloud-engineer**: Discovery-first caching, dynamic Context7 queries, IaC pattern reuse

#### Wave Performance Metrics

**Expected Improvements**:

- 30% faster agent handoffs via reference-based communication
- 50% reduction in redundant MCP calls through wave coordination
- 70% cache hit rate across wave boundaries
- 40% context usage reduction through progressive loading

## Performance Monitoring & Optimization Metrics

### Agent Effectiveness & Efficiency Tracking

**Real-Time Monitoring**: Continuous measurement of optimization effectiveness with alerts on degradation.

#### Agent Performance Metrics

```yaml
success_metrics:
  @agent-architect:
    analysis_success: 95%
    pattern_discovery: 88%
    cache_hit_rate: 72%

  @agent-coder:
    clean_implementation: 92%
    pattern_consistency: 89%
    template_reuse: 65%

  @agent-designer:
    accessible_designs: 94%
    responsive_compliance: 91%
    batch_validation_success: 87%

  @agent-security-analyst:
    vulnerability_detection: 97%
    false_positive_rate: 8%
    streaming_efficiency: 73%

  @agent-test-engineer:
    test_coverage_achieved: 90%
    incremental_update_success: 85%
    pattern_library_usage: 78%

  @agent-tech-writer:
    documentation_completeness: 93%
    template_reuse_rate: 82%
    multi_agent_integration: 76%
```

#### Token Efficiency Optimization

```yaml
token_optimization:
  baseline_usage:
    @agent-architect: 15K avg
    @agent-coder: 10K avg
    @agent-designer: 8K avg
    @agent-security-analyst: 12K avg
    @agent-test-engineer: 7K avg
    @agent-tech-writer: 9K avg

  optimized_usage: # 40-60% reduction
    @agent-architect: 9K avg (-40%)
    @agent-coder: 6K avg (-40%)
    @agent-designer: 4.8K avg (-40%)
    @agent-security-analyst: 7.2K avg (-40%)
    @agent-test-engineer: 4.2K avg (-40%)
    @agent-tech-writer: 5.4K avg (-40%)
```

#### MCP Server Performance

```yaml
mcp_optimization_metrics:
  cache_hit_rates:
    memory_server: 72% # Target: 70%+
    context7_docs: 68% # Target: 60%+
    mcp__tree_sitter_ast: 85% # Target: 80%+
    pattern_library: 78% # Target: 75%+

  query_batching_efficiency:
    batch_size_avg: 4.2 # Target: 4+
    batch_success_rate: 94% # Target: 90%+
    latency_reduction: 45% # Target: 40%+

  progressive_loading:
    summary_first_usage: 23% # At 70% context
    compression_activation: 15% # At 60% context
    emergency_mode: 3% # At 90% context
```

#### Handoff Quality & Speed

```yaml
handoff_optimization:
  quality_scores:
    @agent-architect_to_@agent-coder: 94%
    @agent-architect_to_@agent-designer: 91%
    @agent-architect_to_@agent-tech-writer: 88%
    @agent-designer_to_@agent-coder: 92%
    @agent-coder_to_@agent-test-engineer: 96%

  speed_improvements: # 30% faster handoffs
    reference_based_transfer: 31% faster
    compressed_json: 28% faster
    cached_templates: 35% faster
    progressive_loading: 25% faster
```

## Agent Configuration & Optimization Parameters

```yaml
agent_config:
  # Routing & Selection
  auto_selection: true
  confidence_threshold: 0.85
  fallback_agent: "general-purpose"
  agent_selection_cache: true

  # MCP Server Optimization
  mcp_optimization:
    memory_first: true # Always check cache first
    batch_size: 10 # Batch operations for efficiency
    cache_ttl: 3600 # 1-hour cache retention
    compression: true # Use compressed data structures
    lazy_load: true # Load data on-demand

  # Context Management
  context_thresholds:
    switch_to_summary: 70% # Use summaries at 70% context
    enable_compression: 60% # Compress at 60% context
    defer_details: 80% # Defer non-critical at 80%
    emergency_mode: 90% # Essential data only at 90%

  # Communication Optimization
  memory_server: true
  structured_handoff: true
  validation_required: true
  reference_based_handoff: true # Pass references, not full data
  progressive_detail: true # Load details as needed
  handoff_compression: true # Compress large handoff data

  # Performance & Concurrency
  parallel_agents: true
  max_concurrent: 3
  token_budget_per_agent: 20K # Reduced from 30K via optimization
  wave_coordination: true # Enable wave orchestration
  pattern_cache_sharing: true # Share patterns across agents

  # Quality & Safety
  require_tests: true
  require_documentation: true
  pattern_compliance: 0.9
  circuit_breaker_thresholds:
    mcp_timeout: 5 # Stop after 5 timeouts
    context_critical: 95% # Emergency protocols at 95%
    cache_miss_rate: 40% # Alert on high miss rates

  # Agent-Specific Optimizations
  agent_optimizations:
    architect:
      session_pattern_cache: true
      analysis_result_ttl: 7200 # 2-hour cache
    coder:
      template_reuse: true
      minimal_context7: true
    designer:
      batch_puppeteer: true
      design_token_cache: true
    security:
      streaming_findings: true
      incremental_reporting: true
    test_engineer:
      incremental_coverage: true
      test_pattern_library: true
    tech_writer:
      template_caching: true
      glossary_sharing: true
```

## Emergency Procedures & Circuit Breakers

### Intelligent Failure Management

**Proactive Protection**: Automated detection and recovery from performance degradation, server timeouts, and context exhaustion.

#### Circuit Breaker Triggers

```yaml
circuit_breakers:
  mcp_server_failures:
    context7_timeout:
      threshold: 5 failures
      action: "Fallback to cached documentation"
      recovery: "Exponential backoff retry"

    memory_server_slow:
      threshold: ">2s response time"
      action: "Switch to local cache"
      recovery: "Health check before restore"

    tree_sitter_overload:
      threshold: "Queue >10 requests"
      action: "Defer non-critical mcp__tree-sitter parsing"
      recovery: "Process queue when idle"

    puppeteer_instability:
      threshold: "3 consecutive failures"
      action: "Skip visual validations via mcp__puppeteer"
      recovery: "Manual validation required"

  context_exhaustion:
    warning_75%:
      action: "Enable compression mode"
      notification: "User warned of efficiency mode"

    critical_90%:
      action: "Switch to summary-only mode"
      defer: "All non-essential data transfers"

    emergency_95%:
      action: "Essential data only"
      compress: "All communications maximally"

  pattern_cache_failures:
    high_miss_rate_40%:
      action: "Rebuild cache from source"
      alert: "Performance degradation expected"

    cache_corruption:
      action: "Flush cache, rebuild from scratch"
      fallback: "Direct MCP server calls"
```

#### Recovery Protocols

**Graceful Degradation Strategy**:

```yaml
degradation_levels:
  level_1_optimal: # Normal operation
    all_optimizations: enabled
    cache_hit_rate: ">70%"
    context_usage: "<60%"

  level_2_efficient: # Minor degradation
    compression: forced
    batching: increased
    non_critical: deferred

  level_3_conservative: # Significant issues
    summary_mode: enabled
    cache_rebuilding: active
    validation: reduced

  level_4_emergency: # Critical situation
    essential_only: true
    manual_oversight: required
    recovery_mode: active
```

#### Agent-Specific Emergency Procedures

**@agent-architect**:

- Fallback to cached patterns when mcp__tree-sitter fails
- Use simplified analysis when context critical
- Alert user when comprehensive analysis impossible

**@agent-coder**:

- Implement with basic patterns via Task tool when templates unavailable
- Skip non-critical Context7 lookups
- Maintain rollback points for emergency restoration

**@agent-designer**:

- Skip batch validations via mcp__puppeteer, use basic responsive testing
- Fallback to cached design tokens
- Alert on accessibility validation skips

**@agent-security-analyst**:

- Continue critical vulnerability reporting in summary mode
- Stream only CRITICAL and HIGH findings
- Alert on incomplete security analysis

**@agent-test-engineer**:

- Reduce test pattern complexity
- Skip performance tests in emergency mode
- Maintain core functionality testing

**@agent-tech-writer**:

- Use basic templates via Task tool when cache unavailable
- Generate minimal documentation via Task tool in emergency mode
- Prioritize critical API documentation

**@agent-cloud-engineer**:

- Use cached IaC patterns when Context7 unavailable
- Default to Terraform if IaC language detection fails
- Fallback to generic provider patterns when specific provider unknown
- Alert on incomplete discovery or missing credentials

### Automatic Recovery

**Recovery Validation**:

- Health checks before server reactivation
- Gradual ramp-up of optimization features
- Performance monitoring during recovery
- User notification of restored capabilities

## Token Efficiency Protocols

### Progressive Detail Disclosure

**Context-Aware Loading Strategy**: Intelligent data loading based on available context and user needs.

#### Detail Levels

```yaml
progressive_disclosure:
  level_1_summary: # <30% context usage
    content: "Counts, priorities, status overview"
    format: "Abbreviated JSON with IDs only"
    use_case: "Quick status checks, planning"

  level_2_overview: # 30-60% context usage
    content: "IDs, locations, brief descriptions"
    format: "Compressed JSON with references"
    use_case: "Task assignment, prioritization"

  level_3_detailed: # 60-80% context usage
    content: "Full analysis, recommendations, examples"
    format: "Standard JSON with full objects"
    use_case: "Implementation, detailed review"

  level_4_comprehensive: # >80% context usage
    content: "Complete data with extended context"
    format: "Uncompressed with all metadata"
    use_case: "Complex analysis, documentation"
```

#### Smart Loading Triggers

```yaml
loading_intelligence:
  predictive_loading:
    architect_analysis: "Preload common patterns"
    coder_implementation: "Cache frequent templates"
    designer_validation: "Batch similar components"

  on_demand_expansion:
    user_request: "Load details when explicitly requested"
    agent_handoff: "Expand data for receiving agent"
    error_investigation: "Full context for debugging"

  compression_triggers:
    context_60%: "Abbreviate large objects"
    context_70%: "Use reference-based communication"
    context_80%: "Summary mode with detail on request"
    context_90%: "Essential data only"
```

## Usage Examples

### Automatic Agent Selection

```bash
# @agent-architect auto-selected for analysis
/analyze @src/ --comprehensive

# @agent-coder auto-selected for implementation
/implement "Add user authentication"

# @agent-designer auto-selected for UI work
/design "Create responsive dashboard"
```

### Manual Agent Selection

```bash
# Force @agent-architect for detailed review
/improve @src/ --agent-architect

# Force security analyst for audit
/analyze @api/ --agent-security

# Multiple agents in sequence
/analyze --agent-architect && /implement --agent-coder
```

### Wave with Multiple Agents

```bash
# Comprehensive improvement using all agents
/improve @project/ --wave-mode --wave-strategy comprehensive
```

## Integration Points

### With SuperClaude Commands

- Commands automatically route to appropriate agents
- Agent selection enhances command effectiveness
- Multi-agent coordination via wave system

### With Personas

- Personas provide behavioral overlay to agents
- Agent technical expertise + Persona style
- Example: @agent-architect + mentor persona = educational analysis

### With MCP Servers

- Agents leverage MCP servers for enhanced capabilities
- Shared memory enables inter-agent communication
- Coordinated server usage prevents conflicts

## Best Practices

1. **Let Auto-Selection Work**: The system usually picks the right agent
2. **Use Waves for Complex Tasks**: Multi-agent waves for comprehensive work
3. **Leverage Inter-Agent Data**: Agents build on each other's outputs
4. **Monitor Handoff Quality**: Ensure clean data exchange between agents
5. **Respect Agent Boundaries**: Use agents for their specialized domains

## Troubleshooting

### Common Issues

**Agent Not Selected**:

- Check keyword matches
- Verify file patterns
- Use explicit `--agent-*` flag

**Poor Handoff Quality**:

- Verify memory server connection
- Check data structure compatibility
- Review agent output format

**Token Exhaustion**:

- Enable `--uc` mode
- Reduce scope with `--scope`
- Use wave delegation

## Quick Reference Cards

### MCP Server Priority Matrix

```
Priority | Server | Use Case | Latency | Cache Strategy
1 | Memory | Pattern storage | 0ms | Permanent cache
2 | mcp__tree-sitter | Code analysis | Low | Session cache
3 | Context7 | Documentation | Medium | 24h cache
4 | mcp__puppeteer | Browser testing | High | No cache
```

### Context Threshold Actions

```
Context % | Action | Description
60% | Compression | Enable compressed JSON
70% | Summary Mode | Send counts/IDs only
80% | Defer Details | Queue non-critical data
90% | Emergency | Essential data only
95% | Circuit Breaker | Full degradation mode
```

### Agent Optimization Strategies

```
Agent | Primary Strategy | Cache Focus | MCP Priority
Architect | Session pattern cache | Global patterns | Memory→mcp__tree-sitter→Context7
Coder | Template reuse | Code patterns | Memory→Context7 (minimal)
Designer | Batch validations | Design tokens | Context7→Memory→mcp__puppeteer
Security | Streaming findings | Vulnerabilities | Memory→mcp__tree-sitter→Context7
Test | Incremental updates | Test patterns | Memory→mcp__puppeteer→Context7
Tech-Writer | Template caching | Doc templates | Context7→Memory→mcp__tree-sitter
Cloud-Engineer | Discovery-first | IaC patterns | Context7→Memory→mcp__sequential
```

### Cache Key Patterns

```yaml
# Global Caches
cache:patterns:project      # Cross-agent patterns
cache:ast:session          # Parsed code structure
cache:docs:libraries       # Framework documentation

# Agent-Specific Caches
agent:architect:patterns   # Discovered architectural patterns
agent:coder:templates     # Code implementation templates
agent:designer:tokens     # Design system cache
agent:security:vuln       # Vulnerability database
agent:test:patterns       # Test pattern library
agent:tech-writer:templates # Documentation templates
agent:cloud-engineer:iac  # IaC patterns per language/provider

# Compressed References
ref:findings:critical     # Critical issues only
ref:patterns:preserve     # Pattern IDs to maintain
ref:implementations:new   # New module references
```

### Performance Targets

```
Metric | Target | Current | Optimization
Cache Hit Rate | 70%+ | 72% | ✅ Achieved
Token Reduction | 40-60% | 45% | ✅ Achieved
Handoff Speed | 30% faster | 31% | ✅ Achieved
MCP Call Reduction | 50% | 52% | ✅ Achieved
Context Efficiency | <60% usage | 58% | ✅ Achieved
```

### Emergency Protocol Quick Actions

```
Issue | Quick Action | Command
Context >90% | Enable emergency mode | Auto-triggered
MCP timeout | Switch to cache | Auto-triggered
Cache corruption | Rebuild from source | Manual recovery
Pattern discovery fails | Use defaults | Fallback active
Validation errors | Skip non-critical | Circuit breaker
```

## Future Enhancements

- **AI-Driven Optimization**: Machine learning for cache prediction and optimization
- **Dynamic Load Balancing**: Intelligent MCP server selection based on real-time performance
- **Cross-Session Learning**: Pattern evolution across multiple sessions
- **Predictive Caching**: Preload likely-needed patterns based on task history
- **Enhanced Circuit Breakers**: More granular failure detection and recovery
- **Performance ML**: Continuous optimization through machine learning
- **Multi-Project Pattern Sharing**: Global pattern library across projects

### @agent-cloud-engineer

**Specialization**: Cloud-agnostic infrastructure, IaC polyglot, multi-provider orchestration

- **Strengths**: Provider discovery, IaC language detection, cost optimization, migration planning
- **Best For**: Infrastructure provisioning, cloud migrations, cost analysis, multi-cloud setups
- **Discovery-First**: Always discovers context before assuming provider or IaC language
- **Universal Abstractions**: Provider-neutral models for compute, storage, networking
- **MCP Optimization**: Dynamic Context7 queries based on discovered IaC/provider combination
- **Pattern Library**: Stores discovered patterns per IaC language and provider
- **Context Efficiency**: Discovery-first caching, batched IaC analysis
- **Multi-Provider**: Seamless handling of AWS, Azure, GCP, DigitalOcean, and 20+ providers
