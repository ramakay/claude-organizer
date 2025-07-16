# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within Claude Organize, please:

1. **DO NOT** open a public issue
2. Email the maintainer at [security@claude-organize.dev](mailto:security@claude-organize.dev) with details
3. Include steps to reproduce if possible

### What to expect:

- **Response Time**: We aim to respond within 48 hours
- **Updates**: We'll keep you informed about the progress
- **Disclosure**: We'll coordinate disclosure with you
- **Credit**: We'll acknowledge your contribution (unless you prefer to remain anonymous)

## Security Best Practices

When using Claude Organize:

1. **Environment Variables**: Never commit `.env` files containing sensitive data
2. **API Keys**: Store API keys securely, never in code
3. **File Permissions**: Ensure proper file permissions on configuration files
4. **Updates**: Keep Claude Organize updated to the latest version

## Security Features

Claude Organize includes several security features:

- Skips sensitive files by default (`.env`, `.pem`, `.key`, etc.)
- No network requests except to Claude AI API
- No file execution permissions
- Read-only analysis of file content
- Strict file path validation

## Dependencies

We regularly update dependencies to patch known vulnerabilities. Run `npm audit` to check for vulnerabilities in your installation.
