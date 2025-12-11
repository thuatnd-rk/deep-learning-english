# Cursor Configuration Guide

## ⏰ Time Context
**IMPORTANT**: The `.cursorrules` file is configured to always use the CURRENT DATE and LATEST documentation. Cursor will automatically use the current date when making recommendations, rather than hardcoded dates.

This directory contains configuration files to help Cursor AI understand and work effectively with the Deep Learning English project.

**Important**: Cursor chỉ đọc `.cursorrules` và `.cursorignore` từ **thư mục root** của project. Các file trong `.cursor/` chỉ để tổ chức và tài liệu.

## Files Overview

### `.cursorrules`
The main configuration file that provides Cursor AI with:
- Project architecture and structure
- Coding conventions and patterns
- Best practices for this specific codebase
- Common patterns and examples
- Development guidelines

### `.cursorignore`
Specifies files and directories that Cursor should exclude from context when analyzing the codebase. This helps:
- Reduce token usage
- Focus on relevant source code
- Exclude build artifacts, dependencies, and temporary files

## How Cursor Uses These Files

### `.cursorrules`
When you ask Cursor to:
- Write new code
- Refactor existing code
- Fix bugs
- Add features

Cursor will reference `.cursorrules` to:
- Follow your project's coding style
- Use the correct patterns (e.g., Express routes → controllers)
- Maintain consistency with existing code
- Understand the architecture (AWS, DynamoDB patterns, etc.)

### `.cursorignore`
Cursor automatically excludes files listed in `.cursorignore` when:
- Analyzing the codebase for context
- Searching for relevant code
- Understanding project structure

This ensures Cursor focuses on your source code, not dependencies or build artifacts.

## Customizing These Files

### Adding Project-Specific Rules
Edit `.cursorrules` to add:
- New patterns or conventions
- Domain-specific knowledge
- Team preferences
- Architecture decisions

### Excluding Additional Files
Edit `.cursorignore` to exclude:
- Generated files
- Test fixtures
- Documentation that shouldn't be indexed
- Large binary files

## Tips for Effective Use

1. **Be Specific**: The more detailed your `.cursorrules`, the better Cursor understands your project
2. **Keep Updated**: Update rules as your project evolves
3. **Use Examples**: Include code examples in `.cursorrules` for common patterns
4. **Review Regularly**: Periodically review and refine your rules
5. **Stay Current**: The rules are configured to automatically use current dates and latest documentation - no need to manually update dates

## Example Usage

When you ask Cursor:
- "Add a new API endpoint for user authentication"
  → Cursor will follow the Express route → controller pattern from `.cursorrules`

- "Create a new React component for the vocabulary list"
  → Cursor will use TypeScript, Tailwind CSS, and follow your component structure

- "Fix the DynamoDB query in lessons controller"
  → Cursor will use AWS SDK v3 patterns and your composite key structure

## Related Documentation

- Main project README: `README.md`
- Backend README: `backend/README.md`
- Frontend README: `frontend/README.md`
- Terraform README: `terraform/README.md`

