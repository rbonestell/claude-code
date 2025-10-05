# Agent Protocols

## ⛔ MANDATORY: Read [MANDATORY_TOOL_POLICY.md](MANDATORY_TOOL_POLICY.md) ⛔

**🔴 TOOLS: Read>Grep>Glob>Write>Edit ONLY. NO BASH FOR FILE OPS.**

## Templates

**T2-ArchCoder**: `{refs:[patterns,findings,plan,constraints], patterns:{}, findings:[{id,priority:C|H|M|L,type,loc,fix,tests,deps}], plan:{imm,short,long}}`

**T3-DesignCoder**: `{refs:[components,tokens,tests], components:[{name,type,props,states,a11y,perf}], tokens:{}, validation:{}}`

**T6-TodoStatus**: `{agent,todos:[{content,status:p|ip|c,activeForm,evidence,blockers}], next,context}`

## Memory Keys

**Proj**: patterns|config|context
**Review**: findings|metrics|coverage
**Arch**: decisions|constraints|patterns
**Impl**: patterns|modules|changes
**Design**: patterns|tokens|components
**Test**: patterns|requirements|coverage
**Docs**: templates|glossary|coverage
**Sec**: patterns|findings|policies

Format: `[domain]:[type]:*`

## Queries

**Pattern**: `{type:pattern,from,to,issue,context,options,need}`
**Dependency**: `{type:dep,from,to,issues,conflicts,impact,need:order|work|alt}`
**Status**: `{type:status,from,to,request:current|eta|blocks|progress}`

## Broadcasts

**SecAlert**: `{type:sec,from:security,severity:C|H,vuln,affected,action}`
**Complete**: `{type:done,from,tasks,deliverables,next}`

## Flows

**Seq**: Arch→Code→Test→Doc
**Par**: Arch→[Code,Design]→Test
**Cond**: if(sec)→SecAnalyst→Code else→Code→Test

**Response**: Pattern:imm | Dep:1-2ops | Status:imm | SecAlert:priority

## Errors

**Handoff**: `{error:handoff,from,to,reason:unavail|invalid|deps,fallback:retry|skip|manual}`
**Validate**: 1.RequiredFields 2.DataTypes 3.MemoryKeys 4.FilePaths

## Performance

**Batch**: `{batch:true,ops:[{type:mem_store|mem_get|pattern,data}]}`
**Cache**: FreqPatterns→Memory | RefKeys>FullData | IncrementalUpdates