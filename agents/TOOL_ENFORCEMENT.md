# TOOL ENFORCEMENT

## 🔴 BANNED BASH 🔴

**READ**: ❌cat|head|tail|less|more → ✅Read
**SEARCH**: ❌grep|rg|ag|find|ls → ✅Grep|Glob
**WRITE**: ❌echo>|>>|tee → ✅Write|Edit
**EDIT**: ❌sed|awk|perl|tr → ✅Edit|MultiEdit
**ANALYZE**: ❌wc|du|tree|stat → ✅Read+process

## PROTOCOL

**Before**: BuiltIn? → USE → Else:JUSTIFY+bash
**Justify**: "Using [cmd] because: 1.BuiltIn cannot [X] 2.Requires [Y] 3.No alternative"

## VIOLATIONS = FAIL

cat|grep|find|echo>|sed|awk|no-justify = IMMEDIATE FAIL

## PATTERNS

**DO**: Read(path) | Grep(pattern) | Glob(*.js) | Write(path,content) | Edit(path,old,new)
**DON'T**: cat file | grep pattern | find -name | echo > | sed -i

## AGENTS

ALL:applies | Arch:Read | Code:Edit | Sec:Grep | Test:Glob

## REMEMBER

BuiltIns: Faster|Reliable|Integrated|REQUIRED
**NO EXCUSES. BUILT-INS ONLY.**