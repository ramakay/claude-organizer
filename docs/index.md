---
layout: default
title: Claude Organize Architecture
description: Visual architecture documentation for the claude-organize project
---

# Claude Organize Architecture

Claude Organize is an intelligent document organization system for Claude Code that automatically categorizes and moves files based on their content using AI-powered analysis.

## System Overview

The following diagram shows how Claude Organize integrates with Claude Code through PostToolUse hooks to automatically organize files:

```mermaid
graph TB
    subgraph "Claude Code Environment"
        CC[Claude Code Editor]
        Hook[PostToolUse Hook]
        Settings[.claude/settings.json]
    end

    subgraph "claude-organize Package"
        CLI[claude-organize CLI]
        PHD[processHookData]
        DO[documentOrganizer]
        Config[Configuration Manager]

        subgraph "AI Content Analysis"
            MC[ModelClient Provider]
            CA[Content Analyzer]
            Claude[Claude API]
        end

        subgraph "File Categorization"
            MD[Markdown Documents]
            SC[Script Categories]
            JS[JavaScript/MJS Files]
        end
    end

    subgraph "File System"
        Source[Original File Location]
        OrgDirs[Organized Directories]
        Log[organization-log.json]
    end

    CC -->|"Write/Edit/MultiEdit"| Hook
    Settings -->|Configure| Hook
    Hook -->|JSON Hook Data| CLI
    CLI --> PHD
    PHD -->|Validate & Parse| DO
    DO -->|Load Config| Config
    DO -->|Analyze Content| CA
    CA -->|API Request| MC
    MC -->|Claude Analysis| Claude
    Claude -->|Category Result| CA
    CA -->|Category Decision| DO
    DO -->|Categorize| MD
    DO -->|Categorize| SC
    DO -->|Categorize| JS
    MD -->|Move Files| OrgDirs
    SC -->|Move Files| OrgDirs
    JS -->|Move Files| OrgDirs
    Source -.->|File Movement| OrgDirs
    DO -->|Log Activity| Log

    style CC fill:#e1f5fe
    style Hook fill:#fff3e0
    style CLI fill:#f3e5f5
    style DO fill:#e8f5e9
    style Claude fill:#fff9c4
    style OrgDirs fill:#c8e6c9
```

## Component Architecture

The system is built with a modular architecture that separates concerns and allows for easy extension:

```mermaid
classDiagram
    class DocumentOrganizer {
        -config: Config
        -modelProvider: ModelClientProvider
        +organizeFile(operation, config): Promise~OrganizationResult~
        +analyzeContent(content): Promise~CategoryAnalysis~
        +determineCategory(analysis): Category
        +moveFile(source, destination): Promise~void~
        -shouldOrganizeFile(path): boolean
        -logOrganization(entry): Promise~void~
    }

    class Config {
        -configPath: string
        -config: ConfigData
        +bypassMode: boolean
        +enableJSOrganization: boolean
        +additionalPatterns: string[]
        +loadFromFile(): void
        +saveToFile(): void
        +toggleBypass(): void
        +enableJS(): void
        +addPattern(pattern): void
    }

    class ModelClientProvider {
        -modelClient: ModelClient
        +getModelClient(): ModelClient
        +createClaudeClient(): ClaudeModelClient
    }

    class ProcessHookData {
        +processHookData(input, deps): Promise~OrganizationResult~
        +extractToolOperation(hook): ToolOperation
        +validateFileType(path): boolean
        -supportedExtensions: string[]
    }

    class Categories {
        +documentCategories: Map
        +scriptCategories: Map
        +getDocumentCategory(name): CategoryInfo
        +getScriptCategory(name): CategoryInfo
        +getAllCategories(): Category[]
    }

    DocumentOrganizer --> Config : uses
    DocumentOrganizer --> ModelClientProvider : uses
    DocumentOrganizer --> Categories : uses
    ProcessHookData --> DocumentOrganizer : invokes
    ModelClientProvider --> ModelClient : creates
```

## Data Flow Sequence

This sequence diagram shows the complete flow from file creation to organization:

```mermaid
sequenceDiagram
    participant User
    participant CC as Claude Code
    participant Hook as PostToolUse Hook
    participant CLI as claude-organize
    participant PHD as processHookData
    participant DO as documentOrganizer
    participant Config
    participant AI as AI Analyzer
    participant FS as File System

    User->>CC: Create/Edit File
    CC->>Hook: Trigger PostToolUse
    Hook->>CLI: Execute with JSON data
    CLI->>PHD: Parse hook data

    PHD->>PHD: Validate file type
    Note over PHD: Check .md, .sh, .js, .mjs

    PHD->>Config: Load configuration
    Config-->>PHD: Return config

    alt Bypass Mode Enabled
        PHD-->>CLI: Skip organization
    else Normal Mode
        PHD->>DO: Process file
        DO->>AI: Analyze content with Claude
        AI->>AI: Determine category
        AI-->>DO: Return category

        DO->>FS: Check destination
        alt Directory exists
            DO->>FS: Move file
            FS-->>DO: Confirm move
        else Directory missing
            DO->>FS: Create directory
            DO->>FS: Move file
            FS-->>DO: Confirm move
        end

        DO->>FS: Update organization log
        DO-->>PHD: Return result
    end

    PHD-->>CLI: Return result
    CLI-->>Hook: Complete
    Hook-->>CC: Resume operation
```

## File Organization Categories

### Document Categories

The system intelligently categorizes markdown documents based on their content:

```mermaid
graph LR
    subgraph "Document Analysis"
        Content[File Content]
        AI[Claude Analysis]
        Cat[Category Decision]
    end

    subgraph "Document Categories"
        Testing[docs/testing/]
        Analysis[docs/analysis/]
        Arch[docs/architecture/]
        Ops[docs/operations/]
        Dev[docs/development/]
        Plan[docs/planning/]
        Trouble[docs/troubleshooting/]
        General[docs/general/]
    end

    Content -->|Send to| AI
    AI -->|Analyze| Cat
    Cat -->|Test Results| Testing
    Cat -->|Data Analysis| Analysis
    Cat -->|System Design| Arch
    Cat -->|Deployment| Ops
    Cat -->|Code Docs| Dev
    Cat -->|Roadmaps| Plan
    Cat -->|Debug Info| Trouble
    Cat -->|Other| General
```

### Script Subcategories

Scripts are organized into purpose-based subcategories:

```mermaid
mindmap
  root((Scripts))
    Validation
      checks/
      testing/
      verification/
    Operations
      deployment/
      monitoring/
      setup/
    Development
      utilities/
      debug/
      generation/
    Maintenance
      fixes/
      migration/
```

## Configuration System

The configuration system supports multiple levels of customization:

```mermaid
graph TB
    subgraph "Configuration Sources"
        Default[Default Config]
        User[.claude-organize.json]
        Env[Environment Variables]
        CLI[CLI Arguments]
    end

    subgraph "Configuration Options"
        Bypass[Bypass Mode]
        JS[JS Organization]
        Patterns[Additional Patterns]
        Ignore[Ignore Patterns]
    end

    Default -->|Base| Config[Merged Configuration]
    User -->|Override| Config
    Env -->|Override| Config
    CLI -->|Override| Config

    Config --> Bypass
    Config --> JS
    Config --> Patterns
    Config --> Ignore

    style Default fill:#e3f2fd
    style User fill:#f3e5f5
    style Env fill:#fff3e0
    style CLI fill:#e8f5e9
```

## Integration with Claude Code

### Hook Configuration

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "claude-organize"
          }
        ]
      }
    ]
  }
}
```

### Slash Commands

The system provides several slash commands for user control:

- `/claude-organize-bypass` - Toggle bypass mode
- `/claude-organize-add <pattern>` - Add file patterns
- `/claude-organize-js` - Enable JavaScript organization
- `/enhance` - Transform requests into structured prompts

## Safety Features

```mermaid
graph LR
    subgraph "Safety Checks"
        A[File Validation]
        B[Path Safety]
        C[Git Integration]
        D[Rollback Support]
    end

    subgraph "Protected Files"
        E[README.md]
        F[package.json]
        G[Configuration Files]
        H[Git Files]
    end

    A -->|Validates| E
    A -->|Validates| F
    B -->|Protects| G
    C -->|Respects| H
    D -->|Logs to| I[organization-log.json]
```

## Performance Considerations

- **Async Operations**: All file operations are asynchronous
- **Caching**: Environment configurations are cached
- **AI Throttling**: Claude API calls are managed efficiently
- **Logging**: Comprehensive logging without performance impact

## Future Architecture Enhancements

1. **Plugin System**: Allow custom categorizers
2. **Multi-Model Support**: Integration with other AI providers
3. **Real-time Monitoring**: WebSocket-based file watching
4. **Cloud Sync**: Synchronize organization rules across teams

---

<small>This architecture documentation is automatically generated and kept in sync with the codebase. Last updated: {{ 'now' | date: '%Y-%m-%d' }}</small>
