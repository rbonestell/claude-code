# MCP.md - SuperClaude MCP Server Reference

MCP (Model Context Protocol) server integration and orchestration system for Claude Code SuperClaude framework.

## Server Selection Algorithm

**Priority Matrix**:
1. Task-Server Affinity: Match tasks to optimal servers based on capability matrix
2. Performance Metrics: Server response time, success rate, resource utilization
3. Context Awareness: Current persona, command depth, session state
4. Load Distribution: Prevent server overload through intelligent queuing
5. Fallback Readiness: Maintain backup servers for critical operations

**Selection Process**: Task Analysis → Server Capability Match → Performance Check → Load Assessment → Final Selection

### Important: MCP Server Naming Conventions

**Documentation vs. Tool Invocation**:
- **In Documentation**: We use shorthand names (Context7, Sequential, Puppeteer, Tree-Sitter) for readability
- **In Tool Calls**: You MUST use full function names with `mcp__` prefix

**Actual MCP Tool Functions Available in Claude Code**:
```
Context7 Functions:
- mcp__context7__resolve-library-id
- mcp__context7__get-library-docs

Sequential Functions:
- mcp__sequential-thinking__sequentialthinking

Tree-Sitter Functions:
- mcp__tree-sitter__search_code
- mcp__tree-sitter__find_usage
- mcp__tree-sitter__analyze_code
- mcp__tree-sitter__check_errors

Puppeteer Functions:
- mcp__puppeteer__puppeteer_navigate
- mcp__puppeteer__puppeteer_screenshot
- mcp__puppeteer__puppeteer_click
- mcp__puppeteer__puppeteer_fill
- mcp__puppeteer__puppeteer_select
- mcp__puppeteer__puppeteer_hover
- mcp__puppeteer__puppeteer_evaluate

Memory Functions:
- mcp__memory__create_entities
- mcp__memory__create_relations
- mcp__memory__add_observations
- mcp__memory__delete_entities
- mcp__memory__delete_observations
- mcp__memory__delete_relations
- mcp__memory__read_graph
- mcp__memory__search_nodes
- mcp__memory__open_nodes

IDE Functions:
- mcp__ide__getDiagnostics
- mcp__ide__executeCode

AP Media Functions (News & Content):
- mcp__ap-media__search_content
- mcp__ap-media__get_content_item
- mcp__ap-media__get_content_feed
- (plus additional AP Media tools for accounts, feeds, monitors, etc.)
```

**Note**: Throughout this document, shorthand names are used for readability. Always use the full function names when actually invoking these tools.

## Task Tool Documentation

The Task tool is Claude Code's primary mechanism for complex file operations and multi-step implementations through sub-agents.

### Core Capabilities

**Primary Function**: Delegates complex operations to specialized sub-agents that can perform file creation, modification, analysis, and multi-step workflows.

**Parameters**:
- `subagent_type`: The type of specialized agent to use
- `description`: A short (3-5 word) description of the task  
- `prompt`: Detailed instructions for the sub-agent to perform

### Available Sub-Agent Types

1. **general-purpose**: General analysis, file operations, multi-step tasks
2. **coder**: Implementation specialist for code generation and modification
3. **designer**: UI/UX specialist for frontend components and interfaces
4. **test-engineer**: Testing specialist for test creation and validation
5. **tech-writer**: Documentation specialist for technical writing
6. **security-analyst**: Security review and vulnerability assessment
7. **architect**: System analysis and architectural design
8. **cloud-engineer**: Infrastructure and IaC operations

### Usage Patterns

**File Creation/Modification**:
```
Task(subagent_type="coder", 
     description="Implement auth system",
     prompt="Create a JWT authentication system with login/logout endpoints...")
```

**Documentation Generation**:
```
Task(subagent_type="tech-writer",
     description="Create API docs", 
     prompt="Generate comprehensive API documentation for all endpoints...")
```

**Complex Analysis**:
```
Task(subagent_type="general-purpose",
     description="Analyze codebase",
     prompt="Perform comprehensive analysis of the project structure...")
```

### Key Differences from Direct File Tools

Unlike the deprecated Write/Edit/MultiEdit tools, the Task tool:
- Handles complex multi-step operations atomically
- Provides intelligent context understanding
- Can coordinate multiple file changes
- Includes validation and error handling
- Leverages specialized agent expertise

### Best Practices

1. **Choose the right sub-agent**: Match the sub-agent type to your task domain
2. **Provide clear prompts**: Be specific about desired outcomes
3. **Batch related operations**: Group related changes in a single Task call
4. **Use for complex operations**: Simple reads should use Read tool directly
5. **Leverage agent expertise**: Let specialized agents handle domain-specific tasks

## Context7 Integration (Documentation & Research)

**Purpose**: Official library documentation, code examples, best practices, localization standards

**Activation Patterns**: 
- Automatic: External library imports detected, framework-specific questions, scribe persona active
- Manual: `--c7`, `--context7` flags
- Smart: Commands detect need for official documentation patterns

**Workflow Process**:
1. Library Detection: Scan imports, dependencies, package.json for library references
2. ID Resolution: Use `resolve-library-id` to find Context7-compatible library ID
3. Documentation Retrieval: Call `get-library-docs` with specific topic focus
4. Pattern Extraction: Extract relevant code patterns and implementation examples
5. Implementation: Apply patterns with proper attribution and version compatibility
6. Validation: Verify implementation against official documentation
7. Caching: Store successful patterns for session reuse

**Integration Commands**: `/build`, `/analyze`, `/improve`, `/design`, `/document`, `/explain`, `/git`

**Error Recovery**:
- Library not found → WebSearch for alternatives → Manual implementation
- Documentation timeout → Use cached knowledge → Note limitations
- Invalid library ID → Retry with broader search terms → Fallback to WebSearch
- Version mismatch → Find compatible version → Suggest upgrade path
- Server unavailable → Activate backup Context7 instances → Graceful degradation

## Sequential Integration (Complex Analysis & Thinking)

**Purpose**: Multi-step problem solving, architectural analysis, systematic debugging

**Activation Patterns**:
- Automatic: Complex debugging scenarios, system design questions, `--think` flags
- Manual: `--seq`, `--sequential` flags
- Smart: Multi-step problems requiring systematic analysis

**Workflow Process**:
1. Problem Decomposition: Break complex problems into analyzable components
2. Server Coordination: Coordinate with Context7 for documentation and UI patterns, Puppeteer for testing
3. Systematic Analysis: Apply structured thinking to each component
4. Relationship Mapping: Identify dependencies, interactions, and feedback loops
5. Hypothesis Generation: Create testable hypotheses for each component
6. Evidence Gathering: Collect supporting evidence through tool usage
7. Multi-Server Synthesis: Combine findings from multiple servers
8. Recommendation Generation: Provide actionable next steps with priority ordering
9. Validation: Check reasoning for logical consistency

**Integration with Thinking Modes**:
- `--think` (4K): Module-level analysis with context awareness
- `--think-hard` (10K): System-wide analysis with architectural focus
- `--ultrathink` (32K): Critical system analysis with comprehensive coverage

**Use Cases**:
- Root cause analysis for complex bugs
- Performance bottleneck identification
- Architecture review and improvement planning
- Security threat modeling and vulnerability analysis
- Code quality assessment with improvement roadmaps
- Scribe Persona: Structured documentation workflows, multilingual content organization
- Loop Command: Iterative improvement analysis, progressive refinement planning

## Designer Agent Integration (UI/UX via Context7)

**Purpose**: UI component patterns, design system integration, responsive design using Context7

**Activation Patterns**:
- Automatic: UI component requests, design system queries, @agent-designer activation
- Manual: `--agent-designer` with Context7 auto-enabled
- Smart: Frontend persona active, component-related queries

**Workflow Process**:
1. Requirement Parsing: Designer agent extracts component specifications
2. Pattern Search: Use Context7 to find UI patterns and best practices
3. Framework Detection: Identify target framework (React, Vue, Angular) and version
4. Server Coordination: Context7 for framework patterns, Sequential for complex logic
5. Design Specification: Designer agent creates component specifications
6. Design System Integration: Apply existing themes, styles, tokens via Context7
7. Accessibility Compliance: Ensure WCAG compliance, semantic markup
8. Responsive Design: Implement mobile-first responsive patterns
9. Optimization: Apply performance optimizations
10. Quality Assurance: Validate against design system and accessibility standards

**Component Categories** (handled by @agent-designer with Context7 patterns):
- Interactive: Buttons, forms, modals, dropdowns, navigation
- Layout: Grids, containers, cards, panels, sidebars
- Display: Typography, images, icons, charts, tables
- Feedback: Alerts, notifications, progress indicators
- Input: Text fields, selectors, date pickers
- Navigation: Menus, breadcrumbs, pagination, tabs
- Data: Tables, grids, lists, cards, virtualization

**Framework Support** (via Context7 documentation):
- React: Hooks, TypeScript, modern patterns, Context API
- Vue: Composition API, TypeScript, reactive patterns
- Angular: Component architecture, TypeScript, reactive forms
- Vanilla: Web Components, modern JavaScript, CSS custom properties

## Puppeteer Integration (Browser Automation & Testing)

**Purpose**: Cross-browser E2E testing, performance monitoring, automation, visual testing

**Activation Patterns**:
- Automatic: Testing workflows, performance monitoring requests, E2E test generation
- Manual: `--puppeteer` flag
- Smart: QA persona active, browser interaction needed

**Workflow Process**:
1. Browser Connection: Connect to Chrome, Firefox, Safari, or Edge instances
2. Environment Setup: Configure viewport, user agent, network conditions, device emulation
3. Navigation: Navigate to target URLs with proper waiting and error handling
4. Server Coordination: Sync with Sequential for test planning, Context7 for UI validation
5. Interaction: Perform user actions (clicks, form fills, navigation) across browsers
6. Data Collection: Capture screenshots, videos, performance metrics, console logs
7. Validation: Verify expected behaviors, visual states, and performance thresholds
8. Multi-Server Analysis: Coordinate with other servers for comprehensive test analysis
9. Reporting: Generate test reports with evidence, metrics, and actionable insights
10. Cleanup: Properly close browser connections and clean up resources

**Capabilities**:
- Multi-Browser Support: Chrome, Firefox, Safari, Edge with consistent API
- Visual Testing: Screenshot capture, visual regression detection, responsive testing
- Performance Metrics: Load times, rendering performance, resource usage, Core Web Vitals
- User Simulation: Real user interaction patterns, accessibility testing, form workflows
- Data Extraction: DOM content, API responses, console logs, network monitoring
- Mobile Testing: Device emulation, touch gestures, mobile-specific validation
- Parallel Execution: Run tests across multiple browsers simultaneously

**Integration Patterns**:
- Test Generation: Create E2E tests based on user workflows and critical paths
- Performance Monitoring: Continuous performance measurement with threshold alerting
- Visual Validation: Screenshot-based testing and regression detection
- Cross-Browser Testing: Validate functionality across all major browsers
- User Experience Testing: Accessibility validation, usability testing, conversion optimization

## Cloud Engineer Integration (Infrastructure via Context7 & Sequential)

**Purpose**: IaC patterns, provider documentation, infrastructure best practices, cost optimization

**Activation Patterns**:
- Automatic: IaC file detection (*.tf, *.tfvars, Pulumi.*, *.bicep, cdk.json), cloud keywords
- Manual: `--agent-cloud` flag
- Smart: Infrastructure commands, deployment operations

**Workflow Process**:
1. IaC Discovery: Detect infrastructure language (Terraform, Pulumi, CloudFormation, CDK, Bicep)
2. Provider Detection: Identify cloud providers (AWS, Azure, GCP, etc.)
3. Pattern Search: Use Context7 for IaC patterns and provider documentation
4. Cost Analysis: Sequential for complex cost optimization strategies
5. Resource Planning: Create resource specifications using discovered patterns
6. Security Integration: Apply cloud security best practices from Context7
7. Deployment Planning: Sequential for multi-step deployment orchestration
8. Validation: Verify infrastructure specifications against provider limits
9. Documentation: Generate infrastructure documentation
10. Cost Optimization: Apply cost-saving patterns and recommendations

**IaC Support** (via Context7 documentation):
- Terraform: Modules, providers, state management, HCL patterns
- Pulumi: TypeScript/Python/Go SDKs, state management, component patterns
- CloudFormation: YAML/JSON templates, stack patterns, drift detection
- CDK: TypeScript/Python patterns, construct libraries, synthesis
- Bicep: ARM template patterns, module composition, deployment scopes

**Provider Support** (via Context7 documentation):
- AWS: EC2, Lambda, S3, RDS, VPC, IAM, CloudFormation
- Azure: VMs, Functions, Storage, SQL, VNet, RBAC, ARM
- GCP: Compute, Cloud Functions, Storage, SQL, VPC, IAM
- Multi-cloud: Provider-agnostic patterns, migration strategies

## MCP Server Use Cases by Command Category

**Development Commands**:
- Context7: Framework patterns, library documentation, UI components
- Sequential: Complex setup workflows
- Designer Agent: UI/UX implementation with Context7

**Infrastructure Commands**:
- Context7: IaC patterns, provider documentation, best practices
- Sequential: Infrastructure analysis, cost optimization, migration planning
- Cloud Engineer Agent: Infrastructure provisioning with Context7 & Sequential

**Analysis Commands**:
- Context7: Best practices, patterns
- Sequential: Deep analysis, systematic review
- Puppeteer: Issue reproduction, visual testing

**Quality Commands**:
- Context7: Security patterns, improvement patterns
- Sequential: Code analysis, cleanup strategies

**Testing Commands**:
- Sequential: Test strategy development
- Puppeteer: E2E test execution, visual regression

**Documentation Commands**:
- Context7: Documentation patterns, style guides, localization standards
- Sequential: Content analysis, structured writing, multilingual documentation workflows
- Scribe Persona: Professional writing with cultural adaptation and language-specific conventions

**Planning Commands**:
- Context7: Benchmarks and patterns
- Sequential: Complex planning and estimation

**Deployment Commands**:
- Context7: IaC deployment patterns, provider-specific deployment strategies
- Sequential: Deployment planning, rollback strategies
- Puppeteer: Deployment validation

**Meta Commands**:
- Sequential: Search intelligence, task orchestration, iterative improvement analysis
- All MCP: Comprehensive analysis and orchestration
- Loop Command: Iterative workflows with Sequential (primary) and Context7 (patterns)

## Server Orchestration Patterns

**Multi-Server Coordination**:
- Task Distribution: Intelligent task splitting across servers based on capabilities
- Dependency Management: Handle inter-server dependencies and data flow
- Synchronization: Coordinate server responses for unified solutions
- Load Balancing: Distribute workload based on server performance and capacity
- Failover Management: Automatic failover to backup servers during outages

**Caching Strategies**:
- Context7 Cache: Documentation lookups with version-aware caching
- Sequential Cache: Analysis results with pattern matching
- Context7 Cache: Component patterns with design system versioning
- Puppeteer Cache: Test results and screenshots with environment-specific caching
- Cross-Server Cache: Shared cache for multi-server operations
- Loop Optimization: Cache iterative analysis results, reuse improvement patterns
- Cloud Engineer Cache: IaC patterns per language/provider (4-hour TTL), provider configurations

**Error Handling and Recovery**:
- Context7 unavailable → WebSearch for documentation → Manual implementation
- Sequential timeout → Use native Claude Code analysis → Note limitations
- Designer agent failure → Use Context7 patterns → Suggest manual enhancement
- Puppeteer connection lost → Suggest manual testing → Provide test cases
- Cloud Engineer IaC detection failure → Default to Terraform → Note assumptions
- Provider documentation missing → Use generic patterns → Suggest verification

**Recovery Strategies**:
- Exponential Backoff: Automatic retry with exponential backoff and jitter
- Circuit Breaker: Prevent cascading failures with circuit breaker pattern
- Graceful Degradation: Maintain core functionality when servers are unavailable
- Alternative Routing: Route requests to backup servers automatically
- Partial Result Handling: Process and utilize partial results from failed operations

**Integration Patterns**:
- Minimal Start: Start with minimal MCP usage and expand based on needs
- Progressive Enhancement: Progressively enhance with additional servers
- Result Combination: Combine MCP results for comprehensive solutions
- Graceful Fallback: Fallback gracefully when servers unavailable
- Loop Integration: Sequential for iterative analysis, Context7 for improvement patterns
- Dependency Orchestration: Manage inter-server dependencies and data flow

