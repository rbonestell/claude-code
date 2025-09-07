# SHARED_PATTERNS.md - Common Patterns for Agent Optimization

**MCP Server Naming**: References to Context7, Sequential, Tree-Sitter, and Puppeteer in this document are shorthand. See MCP.md for actual tool function names.

Shared patterns and optimizations used across all SuperClaude agents to reduce duplication and ensure consistency.

## MCP Server Optimization Matrix

| Server | Primary Usage | Cache Strategy | Performance Gain |
|--------|---------------|----------------|------------------|
| **Memory** | Pattern storage, cross-agent sharing | Persistent, 2h TTL | 40% context reduction |
| **Tree-Sitter** | Code analysis, AST parsing | Session cache, batch queries | 35% faster analysis |
| **Context7** | Documentation, framework patterns | Version-aware, 1h TTL | 50% lookup reduction |
| **Puppeteer** | Testing, visual validation | Result cache, baseline storage | Automated validation |
| **Sequential** | Complex analysis, multi-step reasoning | Pattern cache, 4h TTL | 30% faster reasoning |

### Usage Strategy (All Agents)

**Memory first** → **Context7 research** → **Tree-Sitter analysis** → **Puppeteer validation**

## Agent Registry & Keys

### Agent Compressed Keys

| Agent | Standard Keys | Compressed Keys | Cache TTL | Compression |
|-------|--------------|-----------------|-----------|-------------|
| **architect** | `review:*`, `execution:*`, `arch:*` | `r:*`, `e:*`, `a:*` | 1h | 70% |
| **coder** | `impl:*`, `code:*`, `test-req:*` | `i:*`, `c:*`, `tr:*` | 30m | 65% |
| **designer** | `design:*`, `ui:*`, `a11y:*` | `d:*`, `u:*`, `ax:*` | 45m | 60% |
| **security** | `sec:*`, `vuln:*`, `threat:*` | `s:*`, `v:*`, `th:*` | 2h | 75% |
| **test** | `test:*`, `coverage:*`, `regression:*` | `t:*`, `cov:*`, `reg:*` | 30m | 55% |
| **tech-writer** | `docs:*`, `templates:*`, `coverage:*` | `do:*`, `tmp:*`, `dcov:*` | 1h | 50% |
| **cloud-engineer** | `cloud:*`, `iac:*`, `provider:*` | `c:*`, `iac:*`, `prov:*` | 4h | 60% |
| **ALL AGENTS** | `todo:*`, `todo-status:*`, `todo-validation:*` | `td:*`, `tds:*`, `tdv:*` | 15m | 60% |

## Communication Protocol Templates

### Reference-Based Handoffs (T1-T6)

```yaml
T1: # Basic handoff (80% cases)
  format: "{ver, ts, from, to, ref_id, todo_ref}"
  
T2: # Priority handoff  
  format: "{ver, ts, from, to, data_ref, priority, todo_ref}"
  
T3: # Batch operations
  format: "{ver, ts, from, to, batch_refs[], todo_ref}"
  
T4: # Change notifications
  format: "{ver, ts, from, to, delta_ref, todo_ref}"
  
T5: # Multi-agent alerts
  format: "{ver, ts, broadcast, severity, ref_ids[], todo_ref}"
  
T6: # TodoWrite validation (NEW)
  format: "{ver, ts, from, to, todo_validation_ref}"
```

### Protocol Levels (Progressive Disclosure)

```yaml
protocol_levels:
  level_1: # Summary (10% detail)
    content: "Protocol type, agent pair, priority, reference ID"
    size: "~100 bytes"
    
  level_2: # Standard (40% detail)
    content: "Core data structure with compressed fields"
    size: "~500 bytes"
    
  level_3: # Full (100% detail)
    content: "Complete specification (on-demand only)"
    size: "~2KB+"
```

### Memory Key Structure (Compressed)

```yaml
# Standard Format: {domain}:{type}:{identifier}
project:patterns:arch-001     → p:pat:arch-001    # 60% shorter
security:vulnerabilities:001  → s:vul:001         # 65% shorter  
test:results:run-001         → t:res:run-001     # 55% shorter
docs:completed:tech-001      → d:com:tech-001    # 60% shorter
todo:status:agent-001        → td:stat:ag-001    # 65% shorter
todo:validation:task-001     → td:val:t-001      # 70% shorter
architectural:decisions:*    → a:dec:*           # 65% shorter
implementation:status:*       → i:stat:*          # 60% shorter
design:updates:*             → d:upd:*           # 55% shorter
wave:phases:*                → w:ph:*            # 60% shorter
wave:checkpoints:*           → w:cp:*            # 65% shorter

# Key Mapping Table (stored in memory)
key_mappings:
  "p": "project", "s": "security", "t": "test", "d": "docs", "td": "todo", "c": "cloud"
  "a": "architectural", "i": "implementation", "w": "wave"
  "pat": "patterns", "vul": "vulnerabilities", "res": "results", "com": "completed"
  "stat": "status", "val": "validation", "ag": "agent", "iac": "infrastructure"
  "opt": "optimization", "cost": "cost", "prov": "provider", "dec": "decisions"
  "upd": "updates", "ph": "phases", "cp": "checkpoints"
```

## Quality Gates Framework

### 8-Step Validation Cycle

```yaml
validation_steps:
  step_1_syntax: "Language parsers, Context7 validation"
  step_2_type: "Sequential analysis, type compatibility" 
  step_3_lint: "Context7 rules, quality analysis"
  step_4_security: "Tree-Sitter + Sequential vulnerability assessment"
  step_5_test: "Puppeteer E2E, coverage ≥80% unit, ≥70% integration"
  step_6_performance: "Sequential benchmarking, optimization"
  step_7_documentation: "Context7 patterns, completeness validation" 
  step_8_integration: "Puppeteer testing, deployment validation"
```

### Success Metrics (All Agents)

- **Technical Excellence**: Pattern consistency >90%, Quality gates pass
- **Performance**: Response time <200ms, Token efficiency 40-60% reduction
- **Integration**: MCP coordination >95% success, Agent handoff <150ms
- **User Value**: Task completion >95%, Context retention >90%

## Error Handling (E1-E8)

```yaml
error_codes:
  E1: "Handoff failure → Retry with exponential backoff (3x)"
  E2: "Validation error → Request regeneration"  
  E3: "Timeout → Circuit breaker activation"
  E4: "Memory reference not found → Fallback to general agent"
  E5: "Compression error → Use uncompressed protocol"
  E6: "TodoWrite not initialized → Block execution, require initialization"
  E7: "Todo validation failed → Reject handoff, request todo completion"
  E8: "Critical todos incomplete → Escalate to user, block progress"
```

## Progressive Disclosure Levels

```yaml
disclosure_levels:
  level_1: # Summary (10% detail)
    content: "Protocol type, agent pair, priority, reference ID"
    usage: "Context >85% or emergency mode"
    
  level_2: # Standard (40% detail) 
    content: "Core structure, compressed fields, key references"
    usage: "Context 60-85% or standard operations"
    
  level_3: # Full (100% detail)
    content: "Complete specification, full context"
    usage: "Context <60% or complex analysis required"
```

## TodoWrite Validation Utilities (NEW)

### Mandatory TodoWrite Enforcement

**Initialization Validation**:

```yaml
todo_validation:
  step_detection:
    triggers: [multi_step_operation, agent_handoff, complexity >= 0.5]
    min_steps: 3
    auto_suggest: true
    
  initialization_check:
    required_within: 3  # operations
    validation_key: "td:init:{agent-session-id}"
    blocking: true      # block execution if not initialized
    
  status_validation:
    required_states: ["pending", "in_progress", "completed"]
    transition_logging: true
    completion_evidence: required
```

**Handoff Integration**:

```yaml
handoff_validation:
  template: "T6"  # TodoWrite validation handoff
  required_fields: ["todo_validation_ref", "required_todos", "completed_todos"]
  blocking_conditions: ["critical_todos_incomplete"]
  validation_checksum: "CRC32"
```

**Quality Gate Integration**:

```yaml
quality_gates:
  step_0: "TodoWrite initialization validation (MANDATORY)"
  step_9: "TodoWrite completion validation (MANDATORY)"
  evidence: ["initialization_timestamp", "status_updates", "completion_validation"]
```

## Batch Operation Strategies

```yaml
batch_optimization:
  memory_operations:
    read_batch_size: 10   # Read 10 keys at once
    write_batch_size: 5   # Task operations batch size
    todo_batch_size: 3    # Batch todo status updates
    
  tree_sitter_queries:
    batch_ast_parsing: true
    cache_parsed_trees: true
    
  context7_lookups:
    batch_documentation: true
    version_aware_cache: true
    
  puppeteer_operations:
    batch_screenshots: true
    parallel_browser_instances: 3
```

## Wave Orchestration Patterns

### Wave Mode Activation

```yaml
wave_activation:
  auto_triggers:
    complexity: ">= 0.7"
    file_count: "> 20"
    operation_types: "> 2"
    multi_domain: true
  
  strategies:
    progressive: "Incremental enhancement"
    systematic: "Methodical analysis"
    adaptive: "Dynamic configuration"
    enterprise: "Large-scale orchestration"
  
  optimization:
    use_reference_protocol: true
    progressive_handoff: true
    batch_memory_operations: true
    cache_wave_results: true
```

### Loop Mode Integration

```yaml
loop_patterns:
  auto_triggers:
    - "polish", "refine", "enhance", "improve"
  default_iterations: 3
  max_iterations: 10
  validation_between: true
  progressive_improvement: true
```

## Agent-Command Integration Patterns

### Command-Agent Routing Matrix

```yaml
command_routing:
  /analyze: 
    primary: architect
    supporting: [security-analyst]
    mcp: [Sequential, Context7]
  
  /implement:
    primary: architect
    sequence: [architect, coder/designer, test-engineer]
    mcp: [Context7, Sequential]
  
  /build:
    primary: architect
    sequence: [architect, coder, test-engineer]
    mcp: [Context7]
  
  /design:
    primary: architect + designer
    supporting: [coder]
    mcp: [Context7]
  
  /document:
    primary: tech-writer
    supporting: [architect, designer]
    mcp: [Context7, Sequential, Memory]
  
  /security:
    primary: security-analyst
    supporting: [architect]
    mcp: [Tree-Sitter, Sequential, Context7, Memory]
```

### Agent Handoff Sequences

```yaml
standard_handoff_flows:
  analysis_flow:
    - "Architect → Coder/Designer"
    - "Designer → Coder"
    - "Coder → Test-Engineer"
  
  broadcast_flows:
    - "Security-Analyst → All"
    - "Test-Engineer → All"
  
  documentation_flows:
    - "Architect → Tech-Writer"
    - "Coder → Tech-Writer"
    - "Designer → Tech-Writer"
```

## Cloud Engineer Patterns (NEW)

### IaC Discovery Protocol

```yaml
iac_detection:
  file_patterns:
    terraform: ["*.tf", "*.tfvars", "terraform/*"]
    pulumi: ["Pulumi.*", "*.ts", "*.py", "*.go"]
    cloudformation: ["*.yaml", "*.yml", "Resources:"]
    cdk: ["cdk.json", "*.cdk.ts"]
    bicep: ["*.bicep"]
    ansible: ["playbook.yml", "tasks/"]
  
  cache_strategy:
    iac_patterns: "4h TTL per language"
    provider_configs: "2h TTL"
    cost_optimizations: "24h TTL"
```

### Multi-Cloud Abstraction

```yaml
cloud_providers:
  major: [AWS, Azure, GCP, Alibaba]
  alternative: [DigitalOcean, Linode, Vultr, Hetzner]
  specialized: [OCI, IBM Cloud, VMware]
  edge_hybrid: [AWS Outposts, Azure Stack, Google Anthos]
  
abstraction_layer:
  compute: "Universal VM/container/serverless model"
  storage: "Object/block/file system abstraction"
  networking: "VPC/subnet/firewall normalization"
  database: "Relational/NoSQL/cache patterns"
```

## Compression Techniques

### Symbol System (All Agents)

```yaml
logic_flow:
  "→": "leads to, implies"
  "⇒": "transforms to"  
  "←": "rollback, reverse"
  "⇄": "bidirectional"
  "∴": "therefore"
  "∵": "because"

status_progress:
  "✅": "completed, passed"
  "❌": "failed, error" 
  "⚠️": "warning"
  "🔄": "in progress"
  "⏳": "waiting, pending"
  "🚨": "critical, urgent"

technical_domains:
  "⚡": "Performance"
  "🔍": "Analysis"
  "🛡️": "Security"
  "🎨": "Design"
  "🧪": "Testing"
  "📚": "Documentation"
```

### Abbreviations (Standard)

```yaml
system: "cfg, impl, arch, perf, ops, env"
process: "req, deps, val, test, docs, std"  
quality: "qual, sec, err, rec, sev, opt"
```

## Circuit Breaker Patterns

```yaml
circuit_breakers:
  agent_handoff:
    failure_threshold: 3
    timeout: 30s
    fallback: "general-purpose agent"
    
  mcp_server:
    failure_threshold: 5  
    timeout: 60s
    fallback: "native tools + WebSearch"
    
  memory_operations:
    failure_threshold: 3
    timeout: 10s
    fallback: "local cache"
```

## Performance Monitoring

```yaml
performance_targets:
  context_usage: 40-50% reduction
  handoff_time: <150ms
  data_size: <8KB
  cache_hit_rate: >70%
  success_rate: >95%
  
monitoring_alerts:
  context_threshold: 75% # Alert when context usage exceeds
  performance_degradation: 20% # Alert on performance drop
  failure_rate: 5% # Alert on failure spike
```

## Integration Guidelines

### For Agent Files

1. **Reference this file**: `@SHARED_PATTERNS.md for optimization details`
2. **Use MCP table**: Reference standard MCP optimization table
3. **Apply compression**: Use shared symbol system and abbreviations
4. **Follow protocols**: Use T1-T6 templates for communication
5. **Monitor performance**: Apply shared success metrics

### For Command Integration

1. **MCP Selection**: Use optimized server combinations
2. **Batch Operations**: Apply shared batching strategies  
3. **Error Handling**: Use E1-E8 error codes (includes TodoWrite validation)
4. **Resource Management**: Apply compression at threshold levels
5. **Quality Gates**: Use 8-step validation cycle with TodoWrite gates

---

**Context Optimization Achieved**: **15-25% additional reduction** through pattern sharing and deduplication across all agents.
