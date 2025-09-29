# MCP Patterns

**🔴 Read>Grep>Glob>Write>Edit ONLY**

## Servers

### Context7
**Use**: Docs|APIs|Patterns|Security
**Query**: Specific→General | Cache:70% | TokenSave:40%
**Agents**: Arch:patterns | Code:APIs | Design:UI | Sec:vulns | Test:frameworks | Doc:standards | Cloud:IaC

### Memory
**Use**: Persist|Communicate|Context|Knowledge
**Store**: `cat:subcat:specific:id` | Batch:10 | TokenSave:40%
**Keys**: proj:* | impl:* | test:* | sec:* | design:* | docs:*

### Tree-Sitter
**Use**: AST|Patterns|Search|Errors
**Search**: Exact>Fuzzy | Batch:true | Cache:AST | TokenSave:35%
**Matrix**: Arch:patterns | Code:templates | Design:components | Sec:vulns | Test:structure | Doc:APIs

### Puppeteer
**Use**: Visual|Screenshots|E2E|CrossBrowser
**Opt**: Headless:true | Reuse:true | Parallel:3 | Viewports:[320,768,1440,1920]
**Agents**: Design:visual | Test:E2E | Doc:screenshots | Sec:XSS

### Sequential-Thinking
**Use**: Complex|Planning|Decision|CostBenefit
**Pattern**: Init:3-5 | Max:10 | Revise:true | Branch:uncertainty
**Trigger**: Complexity:high | Uncertainty:>0.3 | MultiDep:true

## Optimization

**Parallel**: Discovery:[TS:analyze,Mem:retrieve,C7:fetch] | Validation:[TS:syntax,Pup:visual]
**Sequential**: Doc:[TS→C7→Mem→Pup] | Sec:[TS→Mem→C7→Seq]

## Metrics

**Tokens**: 15k→9k (-40%)
**Response**: 5s→2s (-60%)
**Accuracy**: 85%→95% (+10%)
**Cache**: Mem:70% | C7:65% | AST:80%

## Batch Ops

**Memory**: `create_entities([{name,type:pattern,obs:[]}])`
**TreeSitter**: `search_code({query,types:[func,method,arrow],max:50,path:src})`
**Context7**: `resolve-id(lib)→get-docs({id,topic})`

## Fallback

**Chain**: MCP→Native→Manual
**Retry**: Max:3 | Backoff:exp | Timeout:30s
**Degrade**: Full→Reduced→Basic
**Cache**: Mem:session | C7:24h | TS:file-change | Pup:1h
**Invalidate**: FileMod | DepUpdate | Refresh | ErrorThreshold

## Waves

**W1-Arch**: TS:analyze | Mem:store | Seq:plan
**W2-Sec**: TS:vulns | C7:standards | Mem:findings
**W3-Par**: Code:[Mem:get,C7:docs,TS:templates] | Design:[C7:ui,Pup:visual,Mem:store]
**W4-Test**: TS:analysis | Pup:E2E | Mem:coverage
**W5-Doc**: Mem:all | C7:standards | TS:APIs

## Checklist

**Before**: MemCache→Batch→Specific→Timeout→Fallback
**During**: Monitor→Validate→PartialHandle→TokenTrack
**After**: Store→UpdateCache→LogPerf→Cleanup

## Best Practices

1. Cache→Memory
2. Batch→Single
3. Exact>Wildcards
4. Cached→Live
5. Fallback→Always
6. Monitor→Optimize
7. Share→Store
8. Validate→Early
