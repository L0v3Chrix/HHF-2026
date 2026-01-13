# MCP Configuration — HFF New Site

This folder contains Model Context Protocol (MCP) server configuration for development with Claude Code.

## Available MCP Servers

| Server | Purpose |
|--------|---------|
| filesystem | Local file system access |
| playwright | E2E testing + visual regression |
| supabase | Database operations (Phase 2) |
| context7 | Documentation lookup |
| brave-search | Web search for research |

## Setup Instructions

1. Ensure MCP is configured in your Claude Code environment
2. Copy `config.example.json` to your MCP config location
3. Update paths and credentials as needed

## Configuration

The `config.example.json` file provides a template for MCP server configuration. Actual credentials and paths should be configured in your local environment, not committed to the repository.

## Usage

MCP servers are automatically available when working in Claude Code. Use them for:

- **filesystem:** Reading/writing project files
- **playwright:** Running E2E tests and capturing screenshots
- **supabase:** Database queries and migrations (when configured)
- **context7:** Looking up library documentation
- **brave-search:** Researching design patterns or solutions

## Notes

- MCP server config formats vary by environment
- This folder contains documentation and examples only
- Actual config lives in your Claude Code settings
