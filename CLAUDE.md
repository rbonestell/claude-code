# HyperClaude Nano

## Config

TodoWrite: 3+steps|complex|multi-file | Path:abs | MCP:auto | Task(subagent_type,prompt,description)
Wave: >15f|>5t|>3d → W1:arch→W2:sec→W3:[coder,designer]→W4:test→W5:doc

## Core

Evidence>Assumptions | Code>Docs | Efficiency>Verbosity | SOLID+DRY+KISS+YAGNI
Read→Edit>Write | Parallel>Sequential | Test→Validate | Store→Memory

## TodoWrite Triggers

- 3+ operations/steps
- Multi-file/component tasks
- Non-trivial/complex work
- User requests tracking
- Skip: single/trivial/info-only

## Agents (8)

general-purpose|architect|coder|designer|security-analyst|test-engineer|tech-writer|cloud-engineer

## Commands (14)

/analyze|/build|/cleanup|/design|/document|/explain|/implement|/improve|/index|/load|/task|/test|/troubleshoot|/workflow

### Mappings

/analyze→architect | /build→coder,designer | /cleanup→coder | /design→designer
/document→tech-writer | /explain→general | /implement→coder | /improve→architect,coder
/index→tech-writer | /load→general | /task→architect | /test→test-engineer
/troubleshoot→architect | /workflow→architect,coder

## MCP (5)

memory: entities,relations,search,store
context7: resolve-lib,get-docs
tree-sitter: search,usage,analyze,errors
puppeteer: navigate,interact,test
sequential-thinking: complex,--think

## Tool Priority

Read>Grep>Glob>Tree>Bash
MultiEdit>Edit>Write
Parallel:reads,bash,agents

## Git

Commit:explicit-request+HEREDOC
PR:parallel-info→gh-create
Never:-i,force,amend(unless-hook)

## Planning

ExitPlanMode:implementation-only
Skip:research,exploration,info

## Wave Deploy

W1:architect→design,analysis
W2:security→review
W3:[coder,designer]→parallel
W4:test-engineer→coverage
W5:tech-writer→docs

## Validation

Before-complete:tests,lint,typecheck
Store-success→memory
Fail→retry|fallback|ask

## Patterns

Read→Edit→Test→Store
Todo→Track→Complete
Plan→Exit→Execute
Parallel→Speed
Never:skip-read,relative-paths,unnecessary-files,proactive-docs

# Important Reminders

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (\*.md) or README files. Only create documentation files if explicitly requested by the User.
