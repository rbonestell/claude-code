# ORCHESTRATOR.md - SuperClaude Intelligent Routing System

Intelligent routing system for Claude Code SuperClaude framework.

## 🧠 Detection Engine

Analyzes requests to understand intent, complexity, and requirements.

### Pre-Operation Validation Checks

**TodoWrite Validation** (MANDATORY):
- Multi-step operation detection (3+ steps require TodoWrite)
- TodoWrite initialization status verification
- Agent handoff todo status validation
- Todo completion gates before task closure

**Resource Validation**:
- Token usage prediction based on operation complexity and scope
- Memory and processing requirements estimation
- File system permissions and available space verification
- MCP server availability and response time checks

**Compatibility Validation**:
- Flag combination conflict detection (e.g., `--no-mcp` with `--seq`)
- Persona + command compatibility verification
- Tool availability for requested operations
- Project structure requirements validation

**Risk Assessment**:
- Operation complexity scoring (0.0-1.0 scale)
- Failure probability based on historical patterns
- Resource exhaustion likelihood prediction
- Cascading failure potential analysis

**Validation Logic**: Resource availability, flag compatibility, risk assessment, outcome prediction, and safety recommendations. Operations with risk scores >0.8 trigger safe mode suggestions.

**Resource Management Thresholds with Dynamic Compression**:
- **Green Zone** (0-60%): Full operations, predictive monitoring active
- **Yellow Zone** (60-75%): Auto-enable --uc + reference protocols, aggressive caching
- **Orange Zone** (75-85%): Force progressive disclosure, max protocol level 2, batch operations
- **Red Zone** (85-95%): Emergency compression, protocol level 1 only, batch all operations
- **Critical Zone** (95%+): Ultra-compression mode, essential operations only, error codes only

### Pattern Recognition Rules

#### Complexity Detection
```yaml
simple:
  indicators:
    - single file operations
    - basic CRUD tasks
    - straightforward queries
    - < 3 step workflows
  token_budget: 5K
  time_estimate: < 5 min

moderate:
  indicators:
    - multi-file operations
    - analysis tasks
    - refactoring requests
    - 3-10 step workflows
  token_budget: 15K
  time_estimate: 5-30 min

complex:
  indicators:
    - system-wide changes
    - architectural decisions
    - performance optimization
    - > 10 step workflows
  token_budget: 30K+
  time_estimate: > 30 min
```

#### Domain Identification
```yaml
frontend:
  keywords: [UI, component, React, Vue, CSS, responsive, accessibility, implement component, build UI]
  file_patterns: ["*.jsx", "*.tsx", "*.vue", "*.css", "*.scss"]
  typical_operations: [create, implement, style, optimize, test]

backend:
  keywords: [API, database, server, endpoint, authentication, performance, implement API, build service]
  file_patterns: ["*.js", "*.ts", "*.py", "*.go", "controllers/*", "models/*"]
  typical_operations: [implement, optimize, secure, scale]

infrastructure:
  keywords: [deploy, Docker, CI/CD, monitoring, scaling, configuration]
  file_patterns: ["Dockerfile", "*.yml", "*.yaml", ".github/*", "terraform/*"]
  typical_operations: [setup, configure, automate, monitor]

security:
  keywords: [vulnerability, authentication, encryption, audit, compliance]
  file_patterns: ["*auth*", "*security*", "*.pem", "*.key"]
  typical_operations: [scan, harden, audit, fix]

documentation:
  keywords: [document, README, wiki, guide, manual, instructions, commit, release, changelog, API docs, user guide, reference, specification]
  file_patterns: ["*.md", "*.rst", "*.txt", "docs/*", "README*", "CHANGELOG*", "*.adoc", "openapi.yml", "swagger.yml"]
  typical_operations: [write, document, explain, translate, localize, create, update]
  auto_activates: tech-writer agent, scribe persona

iterative:
  keywords: [improve, refine, enhance, correct, polish, fix, iterate, loop, repeatedly]
  file_patterns: ["*.*"]  # Can apply to any file type
  typical_operations: [improve, refine, enhance, correct, polish, fix, iterate]

wave_eligible:
  keywords: [comprehensive, systematically, thoroughly, enterprise, large-scale, multi-stage, progressive, iterative, campaign, audit]
  complexity_indicators: [system-wide, architecture, performance, security, quality, scalability]
  operation_indicators: [improve, optimize, refactor, modernize, enhance, audit, transform]
  scale_indicators: [entire, complete, full, comprehensive, enterprise, large, massive]
  typical_operations: [comprehensive_improvement, systematic_optimization, enterprise_transformation, progressive_enhancement]
```

#### Operation Type Classification
```yaml
analysis:
  verbs: [analyze, review, explain, understand, investigate, troubleshoot]
  outputs: [insights, recommendations, reports]
  typical_tools: [Grep, Read, mcp__sequential-thinking__sequentialthinking]

creation:
  verbs: [create, build, implement, generate, design]
  outputs: [new files, features, components]
  typical_tools: [Task, Context7]

implementation:
  verbs: [implement, develop, code, construct, realize]
  outputs: [working features, functional code, integrated components]
  typical_tools: [Task, Context7, mcp__sequential-thinking__sequentialthinking]

modification:
  verbs: [update, refactor, improve, optimize, fix]
  outputs: [edited files, improvements]
  typical_tools: [Task, mcp__sequential-thinking__sequentialthinking]

debugging:
  verbs: [debug, fix, troubleshoot, resolve, investigate]
  outputs: [fixes, root causes, solutions]
  typical_tools: [Grep, mcp__sequential-thinking__sequentialthinking, Puppeteer]

iterative:
  verbs: [improve, refine, enhance, correct, polish, fix, iterate, loop]
  outputs: [progressive improvements, refined results, enhanced quality]
  typical_tools: [mcp__sequential-thinking__sequentialthinking, Read, Task, TodoWrite]

wave_operations:
  verbs: [comprehensively, systematically, thoroughly, progressively, iteratively]
  modifiers: [improve, optimize, refactor, modernize, enhance, audit, transform]
  outputs: [comprehensive improvements, systematic enhancements, progressive transformations]
  typical_tools: [mcp__sequential-thinking__sequentialthinking, Task, Read, Context7]
  wave_patterns: [review-plan-implement-validate, assess-design-execute-verify, analyze-strategize-transform-optimize]
```

### Intent Extraction Algorithm
```
1. Parse user request for keywords and patterns
2. Match against domain/operation matrices
3. Score complexity based on scope and steps
4. Evaluate wave opportunity scoring
5. Estimate resource requirements
6. Generate routing recommendation (traditional vs wave mode)
7. Apply auto-detection triggers for wave activation
```

**Enhanced Wave Detection Algorithm**:
- **Flag Overrides**: `--single-wave` disables, `--force-waves`/`--wave-mode` enables
- **Scoring Factors**: Complexity (0.2-0.4), scale (0.2-0.3), operations (0.2), domains (0.1), flag modifiers (0.05-0.1)
- **Thresholds**: Default 0.7, customizable via `--wave-threshold`, enterprise strategy lowers file thresholds
- **Decision Logic**: Sum all indicators, trigger waves when total ≥ threshold

## 🚦 Routing Intelligence

Dynamic decision trees that map detected patterns to optimal tool combinations, persona activation, and orchestration strategies.

### Wave Orchestration Engine
Multi-stage command execution with compound intelligence and compression optimization. Automatic complexity assessment or explicit flag control.

**Wave Control Matrix**:
```yaml
wave-activation:
  automatic: "complexity >= 0.7"
  explicit: "--wave-mode, --force-waves"
  override: "--single-wave, --wave-dry-run"
  
wave-strategies:
  progressive: "Incremental enhancement"
  systematic: "Methodical analysis"
  adaptive: "Dynamic configuration"

wave-optimization:
  use_reference_protocol: true    # Use T1-T5 templates for handoffs
  progressive_handoff: true       # Level 1 → 2 → 3 as needed
  batch_memory_operations: true   # Batch memory reads/writes
  cache_wave_results: true        # Cache intermediate results
  compression_aware: true         # Auto-enable --uc based on context
```

**Wave-Enabled Commands**:
- **Tier 1**: `/analyze`, `/build`, `/implement`, `/improve`
- **Tier 2**: `/design`, `/task`

### Master Routing Table

| Pattern | Complexity | Domain | Auto-Activates | Agent | Confidence |
|---------|------------|---------|----------------|-------|------------|
| "analyze architecture" | complex | infrastructure | architect persona, --ultrathink, mcp__sequential-thinking__sequentialthinking | architect | 95% |
| "create component" | simple | frontend | frontend persona, Context7, --uc | designer | 90% |
| "implement feature" | moderate | any | domain-specific persona, Context7, mcp__sequential-thinking__sequentialthinking | coder | 88% |
| "implement API" | moderate | backend | backend persona, --seq, Context7 | coder | 92% |
| "implement UI component" | simple | frontend | frontend persona, --c7 | designer | 94% |
| "implement authentication" | complex | security | security persona, backend persona, --validate | coder + security-analyst | 90% |
| "fix bug" | moderate | any | analyzer persona, --think, mcp__sequential-thinking__sequentialthinking | coder | 85% |
| "optimize performance" | complex | backend | performance persona, --think-hard, Puppeteer | coder | 90% |
| "security audit" | complex | security | security persona, --ultrathink, mcp__sequential-thinking__sequentialthinking | security-analyst | 95% |
| "write documentation" | moderate | documentation | scribe persona, --persona-scribe=en, Context7 | tech-writer | 95% |
| "improve iteratively" | moderate | iterative | intelligent persona, --seq, loop creation | architect → coder | 90% |
| "analyze large codebase" | complex | any | --delegate --parallel-dirs, domain specialists | architect | 95% |
| "comprehensive audit" | complex | multi | --multi-agent --parallel-focus, specialized agents | architect + security-analyst | 95% |
| "improve large system" | complex | any | --wave-mode --adaptive-waves | architect → coder/designer | 90% |
| "security audit enterprise" | complex | security | --wave-mode --wave-validation | security-analyst | 95% |
| "modernize legacy system" | complex | legacy | --wave-mode --enterprise-waves --wave-checkpoint | architect → coder | 92% |
| "comprehensive code review" | complex | quality | --wave-mode --wave-validation --systematic-waves | architect → test-engineer | 94% |
| "design system creation" | complex | frontend | designer persona, Context7 | designer | 93% |
| "test suite development" | moderate | testing | qa persona, Puppeteer, mcp__sequential-thinking__sequentialthinking | test-engineer | 91% |
| "create README" | simple | documentation | scribe persona, Context7 | tech-writer | 92% |
| "update documentation" | simple | documentation | scribe persona, Context7 | tech-writer | 88% |
| "API documentation" | moderate | documentation | scribe persona, Context7, mcp__sequential-thinking__sequentialthinking | tech-writer | 90% |
| "user guide" | moderate | documentation | scribe persona, mentor persona, Context7 | tech-writer | 87% |

### Decision Trees

#### Tool Selection Logic

**Base Tool Selection**:
- **Search**: Grep (specific patterns) or Agent (open-ended)
- **Understanding**: mcp__sequential-thinking__sequentialthinking (complexity >0.7) or Read (simple)  
- **Documentation**: Context7
- **UI**: Context7 (via designer agent)
- **Testing**: Puppeteer

**Delegation & Wave Evaluation**:
- **Delegation Score >0.6**: Add Task tool, auto-enable delegation flags based on scope
- **Wave Score >0.7**: Add mcp__sequential-thinking__sequentialthinking for coordination, auto-enable wave strategies based on requirements

**Auto-Flag Assignment**:
- Directory count >7 → `--delegate --parallel-dirs`
- Focus areas >2 → `--multi-agent --parallel-focus`  
- High complexity + critical quality → `--wave-mode --wave-validation`
- Multiple operation types → `--wave-mode --adaptive-waves`

#### Task Delegation Intelligence

**Agent Selection Decision Matrix**:

**Agent Scoring Factors**:
- **Domain Match**: +0.4 for keyword/pattern match
- **Complexity Alignment**: +0.3 for appropriate complexity level
- **Tool Requirements**: +0.2 for needed tool availability
- **Previous Success**: +0.1 for high success rate in similar tasks

**Available Specialized Agents**:
- **architect**: System analysis, pattern identification, code review
- **coder**: Implementation, refactoring, bug fixes
- **designer**: UI/UX, frontend components, accessibility
- **security-analyst**: Vulnerability assessment, compliance audits
- **test-engineer**: Test creation, validation, QA

**Sub-Agent Delegation Decision Matrix**:

**Delegation Scoring Factors**:
- **Complexity >0.6**: +0.3 score
- **Parallelizable Operations**: +0.4 (scaled by opportunities/5, max 1.0)
- **High Token Requirements >15K**: +0.2 score  
- **Multi-domain Operations >2**: +0.1 per domain
- **Agent Specialization Match**: +0.3 for exact agent fit

**Wave Opportunity Scoring**:
- **High Complexity >0.8**: +0.4 score
- **Multiple Operation Types >2**: +0.3 score
- **Critical Quality Requirements**: +0.2 score
- **Large File Count >50**: +0.1 score
- **Iterative Indicators**: +0.2 (scaled by indicators/3)
- **Enterprise Scale**: +0.15 score

**Strategy Recommendations**:
- **Wave Score >0.7**: Use wave strategies
- **Directories >7**: `parallel_dirs`
- **Focus Areas >2**: `parallel_focus`  
- **High Complexity**: `adaptive_delegation`
- **Default**: `single_agent`

**Wave Strategy Selection**:
- **Security Focus**: `wave_validation`
- **Performance Focus**: `progressive_waves`
- **Critical Operations**: `wave_validation`
- **Multiple Operations**: `adaptive_waves`
- **Enterprise Scale**: `enterprise_waves`
- **Default**: `systematic_waves`

**Auto-Delegation Triggers**:
```yaml
directory_threshold:
  condition: directory_count > 7
  action: auto_enable --delegate --parallel-dirs
  confidence: 95%

file_threshold:
  condition: file_count > 50 AND complexity > 0.6
  action: auto_enable --delegate --sub-agents [calculated]
  confidence: 90%

multi_domain:
  condition: domains.length > 3
  action: auto_enable --delegate --parallel-focus
  confidence: 85%

complex_analysis:
  condition: complexity > 0.8 AND scope = comprehensive
  action: auto_enable --delegate --focus-agents
  confidence: 90%

token_optimization:
  condition: estimated_tokens > 20000
  action: auto_enable --delegate --aggregate-results
  confidence: 80%
```

**Wave Auto-Delegation Triggers**:
- Complex improvement: complexity > 0.8 AND files > 20 AND operation_types > 2 → --wave-count 5 (95%)
- Multi-domain analysis: domains > 3 AND tokens > 15K → --adaptive-waves (90%)
- Critical operations: production_deploy OR security_audit → --wave-validation (95%)
- Enterprise scale: files > 100 AND complexity > 0.7 AND domains > 2 → --enterprise-waves (85%)
- Large refactoring: large_scope AND structural_changes AND complexity > 0.8 → --systematic-waves --wave-validation (93%)

**Agent Routing Table**:

| Operation | Complexity | Primary Agent | Supporting Agents | Performance Gain |
|-----------|------------|---------------|-------------------|------------------|
| `/analyze @system/` | high | architect | security-analyst | 70% |
| `/implement feature` | moderate | coder | designer (UI parts) | 65% |
| `/design components` | moderate | designer | coder (implementation) | 60% |
| `/test --comprehensive` | high | test-engineer | security-analyst | 75% |
| `/security audit` | high | security-analyst | architect | 85% |

**Delegation Routing Table**:

| Operation | Complexity | Auto-Delegates | Agent Used | Performance Gain |
|-----------|------------|----------------|------------|------------------|
| `/load @monorepo/` | moderate | --delegate --parallel-dirs | architect | 65% |
| `/analyze --comprehensive` | high | --multi-agent --parallel-focus | architect + security-analyst | 70% |
| Comprehensive system improvement | high | --wave-mode --progressive-waves | architect → coder/designer | 80% |
| Enterprise security audit | high | --wave-mode --wave-validation | security-analyst | 85% |
| Large-scale refactoring | high | --wave-mode --systematic-waves | architect → coder | 75% |
| UI system overhaul | high | --wave-mode --adaptive-waves | designer → coder | 70% |
| Test suite creation | moderate | --delegate --parallel-files | test-engineer | 60% |

**Sub-Agent Specialization Matrix**:
- **Quality**: qa persona, complexity/maintainability focus, Read/Grep/mcp__sequential-thinking__sequentialthinking tools
- **Security**: security persona, vulnerabilities/compliance focus, Grep/mcp__sequential-thinking__sequentialthinking/Context7 tools
- **Performance**: performance persona, bottlenecks/optimization focus, Read/mcp__sequential-thinking__sequentialthinking/Puppeteer tools
- **Architecture**: architect persona, patterns/structure focus, Read/mcp__sequential-thinking__sequentialthinking/Context7 tools
- **API**: backend persona, endpoints/contracts focus, Grep/Context7/mcp__sequential-thinking__sequentialthinking tools

**Wave-Specific Specialization Matrix**:
- **Review**: architect agent, current_state/quality_assessment focus, Read/Grep/mcp__sequential-thinking__sequentialthinking tools
- **Planning**: architect agent, strategy/design focus, mcp__sequential-thinking__sequentialthinking/Context7/Task tools
- **Implementation**: coder/designer agents, code_modification/feature_creation focus, Task tools
- **Validation**: test-engineer agent, testing/validation focus, mcp__sequential-thinking__sequentialthinking/Puppeteer/Context7 tools
- **Optimization**: coder agent with performance persona, performance_tuning/resource_optimization focus, Read/mcp__sequential-thinking__sequentialthinking/Grep tools
- **Security**: security-analyst agent, vulnerability/compliance focus, Grep/mcp__sequential-thinking__sequentialthinking/Memory tools
- **Documentation**: tech-writer agent, technical_writing/api_documentation focus, Context7/mcp__sequential-thinking__sequentialthinking/TreeSitter tools

#### Persona Auto-Activation System

**Multi-Factor Activation Scoring**:
- **Keyword Matching**: Base score from domain-specific terms (30%)
- **Context Analysis**: Project phase, urgency, complexity assessment (40%)
- **User History**: Past preferences and successful outcomes (20%)
- **Performance Metrics**: Current system state and bottlenecks (10%)

**Intelligent Activation Rules**:

**Performance Issues** → `--persona-performance` + `--focus performance`
- **Trigger Conditions**: Response time >500ms, error rate >1%, high resource usage
- **Confidence Threshold**: 85% for automatic activation

**Security Concerns** → `--persona-security` + `--focus security`
- **Trigger Conditions**: Vulnerability detection, auth failures, compliance gaps
- **Confidence Threshold**: 90% for automatic activation

**UI/UX Tasks** → `--persona-frontend` + `--c7`
- **Trigger Conditions**: Component creation, responsive design, accessibility
- **Confidence Threshold**: 80% for automatic activation

**Complex Debugging** → `--persona-analyzer` + `--think` + `--seq`
- **Trigger Conditions**: Multi-component failures, root cause investigation
- **Confidence Threshold**: 75% for automatic activation

**Documentation Tasks** → `--persona-scribe=en`
- **Trigger Conditions**: README, wiki, guides, commit messages, API docs
- **Confidence Threshold**: 70% for automatic activation

#### Flag Auto-Activation Patterns

**Context-Based Auto-Activation**:
- Performance issues → --persona-performance + --focus performance + --think
- Security concerns → --persona-security + --focus security + --validate
- UI/UX tasks → --persona-frontend + --c7
- Complex debugging → --think + --seq + --persona-analyzer
- Large codebase → --uc when context >75% + --delegate auto
- Testing operations → --persona-qa + --puppeteer + --validate
- DevOps operations → --persona-devops + --safe-mode + --validate
- Refactoring → --persona-refactorer + --wave-strategy systematic + --validate
- Iterative improvement → --loop for polish, refine, enhance keywords

**Wave Auto-Activation**:
- Complex multi-domain → --wave-mode auto when complexity >0.8 AND files >20 AND types >2
- Enterprise scale → --wave-strategy enterprise when files >100 AND complexity >0.7 AND domains >2
- Critical operations → Wave validation enabled by default for production deployments
- Legacy modernization → --wave-strategy enterprise --wave-delegation tasks
- Performance optimization → --wave-strategy progressive --wave-delegation files
- Large refactoring → --wave-strategy systematic --wave-delegation folders

**Sub-Agent Auto-Activation**:
- File analysis → --delegate files when >50 files detected
- Directory analysis → --delegate folders when >7 directories detected
- Mixed scope → --delegate auto for complex project structures
- High concurrency → --concurrency auto-adjusted based on system resources

**Loop Auto-Activation**:
- Quality improvement → --loop for polish, refine, enhance, improve keywords
- Iterative requests → --loop when "iteratively", "step by step", "incrementally" detected
- Refinement operations → --loop for cleanup, fix, correct operations on existing code

#### Flag Precedence Rules
1. Safety flags (--safe-mode) > optimization flags
2. Explicit flags > auto-activation
3. Thinking depth: --ultrathink > --think-hard > --think
4. --no-mcp overrides all individual MCP flags
5. Scope: system > project > module > file
6. Last specified persona takes precedence
7. Wave mode: --wave-mode off > --wave-mode force > --wave-mode auto
8. Sub-Agent delegation: explicit --delegate > auto-detection
9. Loop mode: explicit --loop > auto-detection based on refinement keywords
10. --uc auto-activation overrides verbose flags

### Confidence Scoring
Based on pattern match strength (40%), historical success rate (30%), context completeness (20%), resource availability (10%).

## Quality Gates & Validation Framework

### 9-Step Validation Cycle with TodoWrite Integration
```yaml
quality_gates:
  step_0_todo: "MANDATORY TodoWrite initialization and status validation"
  step_1_syntax: "language parsers, Context7 validation, intelligent suggestions"
  step_2_type: "mcp__sequential-thinking__sequentialthinking analysis, type compatibility, context-aware suggestions"
  step_3_lint: "Context7 rules, quality analysis, refactoring suggestions"
  step_4_security: "mcp__sequential-thinking__sequentialthinking analysis, vulnerability assessment, OWASP compliance"
  step_5_test: "Puppeteer E2E, coverage analysis (≥80% unit, ≥70% integration)"
  step_6_performance: "mcp__sequential-thinking__sequentialthinking analysis, benchmarking, optimization suggestions"
  step_7_documentation: "Context7 patterns, completeness validation, accuracy verification"
  step_8_integration: "Puppeteer testing, deployment validation, compatibility verification"
  step_9_todo_completion: "MANDATORY TodoWrite completion validation before task closure"

validation_automation:
  continuous_integration: "CI/CD pipeline integration, progressive validation, early failure detection"
  intelligent_monitoring: "success rate monitoring, ML prediction, adaptive validation"
  evidence_generation: "comprehensive evidence, validation metrics, improvement recommendations"
  todo_enforcement: "MANDATORY TodoWrite validation at steps 0 and 9, blocking execution on failure"

wave_integration:
  validation_across_waves: "wave boundary gates, progressive validation, rollback capability"
  compound_validation: "AI orchestration, domain-specific patterns, intelligent aggregation"
  todo_wave_tracking: "TodoWrite status maintained across wave boundaries with handoff validation"
```

### Task Completion Criteria
```yaml
completion_requirements:
  todo_validation: "MANDATORY TodoWrite completion before task closure, all todos marked complete"
  validation: "all 9 steps pass (including TodoWrite steps 0 & 9), evidence provided, metrics documented"
  ai_integration: "MCP coordination, persona integration, tool orchestration, ≥90% context retention"
  performance: "response time targets, resource limits, success thresholds, token efficiency"
  quality: "code quality standards, security compliance, performance assessment, integration testing"

evidence_requirements:
  todo_evidence: "TodoWrite initialization timestamps, status updates, completion validation"
  quantitative: "performance/quality/security metrics, coverage percentages, response times"
  qualitative: "code quality improvements, security enhancements, UX improvements"
  documentation: "change rationale, test results, performance benchmarks, security scans"
```

## ⚡ Performance Optimization with Dynamic Protocol Selection

Resource management, operation batching, and intelligent optimization for sub-100ms performance targets with context-aware compression.

**Dynamic Protocol Level Selection**:
```python
def select_protocol_level(context_usage, urgency, complexity):
    if context_usage > 85 or urgency == "critical":
        return 1  # Summary only (10% detail)
    elif context_usage > 70 or complexity < 0.3:
        return 2  # Standard compressed (40% detail)
    else:
        return 3  # Full detail when needed (100%)
```

**Token Management**: Intelligent resource allocation with automatic compression based on unified Resource Management Thresholds

**Operation Batching with Compression**:
- **Tool Coordination**: Parallel operations with reference protocols
- **Context Sharing**: Compressed analysis results across routing decisions  
- **Cache Strategy**: Store successful patterns with compressed keys
- **Task Delegation**: Intelligent sub-agent spawning with batch communication
- **Resource Distribution**: Dynamic allocation with progressive disclosure

**Resource Allocation (Optimized)**:
- **Detection Engine**: 1-2K tokens (compressed patterns)
- **Decision Trees**: 300-600 tokens (error codes, references)  
- **MCP Coordination**: Variable with batch operations and caching


## 🔗 Integration Intelligence

Smart MCP server selection and orchestration.

### MCP Server Selection Matrix
**Reference**: See MCP.md for detailed server capabilities, workflows, and integration patterns.

**Quick Selection Guide**:
- **Context7**: Library docs, framework patterns
- **mcp__sequential-thinking__sequentialthinking**: Complex analysis, multi-step reasoning
- **Context7**: UI components, design systems, framework patterns
- **Puppeteer**: E2E testing, performance metrics

### Intelligent Server Coordination
**Reference**: See MCP.md for complete server orchestration patterns and fallback strategies.

**Core Coordination Logic**: Multi-server operations, fallback chains, resource optimization

### Persona Integration
**Reference**: See PERSONAS.md for detailed persona specifications and MCP server preferences.

## 🚨 Emergency Protocols

Handling resource constraints and failures gracefully.

### Resource Management
Threshold-based resource management follows the unified Resource Management Thresholds (see Detection Engine section above).

### Graceful Degradation
- **Level 1**: Reduce verbosity, skip optional enhancements, use cached results
- **Level 2**: Disable advanced features, simplify operations, batch aggressively
- **Level 3**: Essential operations only, maximum compression, queue non-critical

### Error Recovery Patterns
- **MCP Timeout**: Use fallback server
- **Token Limit**: Activate compression
- **Tool Failure**: Try alternative tool
- **Parse Error**: Request clarification




## 🔧 Configuration

### Orchestrator Settings
```yaml
orchestrator_config:
  # Performance
  enable_caching: true
  cache_ttl: 3600
  parallel_operations: true
  max_parallel: 3
  
  # Intelligence
  learning_enabled: true
  confidence_threshold: 0.7
  pattern_detection: aggressive
  
  # Resource Management
  token_reserve: 10%
  emergency_threshold: 90%
  compression_threshold: 75%
  
  # Wave Mode Settings
  wave_mode:
    enable_auto_detection: true
    wave_score_threshold: 0.7
    max_waves_per_operation: 5
    adaptive_wave_sizing: true
    wave_validation_required: true
```

### Custom Routing Rules
Users can add custom routing patterns via YAML configuration files.
