
# 🤖 My Claude Code Collection

[![Claude Code](https://img.shields.io/badge/Claude%20Code-Enhanced-blue)](https://docs.anthropic.com/en/docs/claude-code)
[![SuperClaude](https://img.shields.io/badge/SuperClaude-Framework-purple)](https://github.com/SuperClaude-Org/SuperClaude_Framework)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A curated collection of battle-tested Claude Code configurations, custom agents, and productivity enhancements that supercharge AI-assisted development

## ✨ Overview

This repository contains my personal collection of Claude Code configurations and custom agents that have proven effective across various programming languages and frameworks. These tools are designed to enhance productivity, improve code quality, and streamline development workflows when working with Claude Code.

## 🎯 Features

- **🤖 Custom Agents** - Specialized AI agents for specific development tasks
- **⚡ Optimized Commands** - Refined command patterns for maximum efficiency
- **🔧 Universal Configurations** - Language-agnostic settings that work across all tech stacks
- **🚀 SuperClaude Integration** - Enhanced with the SuperClaude Framework capabilities

## 📁 Repository Structure

**Note:** This repository mirrors the structure of your `~/.claude` directory, containing only the custom configurations while excluding SuperClaude Framework resources.

It doesn't make sense to share the root `~/.claude.json` file (since it mutates as CC is used), so I will call out any specific global configuration settings in this README.

## 🛠️ MCP Servers

I use the following _global_ MCP servers in my `~/.claude.json` configuration (defined at the configuration root):

```json
  "mcpServers": {
    "memory": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory@latest"],
      "env": {}
    },
    "puppeteer": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer@latest"],
      "env": {}
    },
    "context7": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"],
      "env": {}
    },
    "tree-sitter": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@nendo/tree-sitter-mcp@latest", "--mcp"],
      "env": {}
    }
  },
```

These MCP servers are referenced by the agent definitions as well as most of my individual project `CLAUDE.md` instructions.

## 🛠️ Setup

1. **Either: Download/Copy individual files or clone this entire repo to your Claude Code config directory:**

   ```bash
   git clone https://github.com/rbonestell/claude-code.git ~/.claude
   ```

2. **Install SuperClaude Framework (separately):**
   Follow the installation guide at [SuperClaude Framework](https://github.com/SuperClaude-Org/SuperClaude_Framework)

3. **Start using enhanced Claude Code:**
   Your custom agents and configurations will automatically be available in Claude Code sessions

## 🎨 Philosophy

These configurations follow a simple principle: **maximize developer productivity while maintaining code quality**. Each agent and configuration has been refined through real-world usage to provide:

- Clear, actionable responses
- Consistent behavior across projects
- Minimal configuration overhead
- Maximum flexibility

## 📝 License

MIT - Use and modify these configurations freely in your own development workflow
