export interface Category {
  dir: string
  keywords: string[]
  patterns: string[]
  description: string
}

export const categories: Record<string, Category> = {
  testing: {
    dir: 'docs/testing',
    keywords: [
      'test', 'qa', 'validation', 'assertion', 'expect', 'describe', 
      'coverage', 'unit test', 'integration test', 'e2e', 'passed', 'failed'
    ],
    patterns: ['results', 'report', 'output', 'execution'],
    description: 'Test results, QA reports, validation outputs'
  },
  analysis: {
    dir: 'docs/analysis',
    keywords: [
      'analysis', 'metrics', 'performance', 'benchmark', 'statistics', 
      'data', 'findings', 'investigation'
    ],
    patterns: ['analysis', 'report', 'metrics', 'performance'],
    description: 'Data analysis, performance reports, investigations'
  },
  architecture: {
    dir: 'docs/architecture',
    keywords: [
      'architecture', 'design', 'pattern', 'structure', 'component', 
      'module', 'system', 'diagram', 'flow'
    ],
    patterns: ['architecture', 'design', 'pattern', 'structure'],
    description: 'System design, technical architecture, patterns'
  },
  operations: {
    dir: 'docs/operations',
    keywords: [
      'deploy', 'deployment', 'production', 'staging', 'release', 
      'runbook', 'operations', 'devops', 'ci/cd'
    ],
    patterns: ['deploy', 'release', 'runbook', 'ops'],
    description: 'Deployment guides, runbooks, operational docs'
  },
  development: {
    dir: 'docs/development',
    keywords: [
      'implementation', 'code', 'api', 'function', 'class', 
      'method', 'development', 'programming', 'coding'
    ],
    patterns: ['implementation', 'guide', 'tutorial', 'howto'],
    description: 'Implementation details, code documentation'
  },
  planning: {
    dir: 'docs/planning',
    keywords: [
      'plan', 'roadmap', 'specification', 'requirements', 'proposal', 
      'strategy', 'milestone', 'timeline'
    ],
    patterns: ['plan', 'roadmap', 'spec', 'proposal'],
    description: 'Project plans, roadmaps, specifications'
  },
  troubleshooting: {
    dir: 'docs/troubleshooting',
    keywords: [
      'debug', 'error', 'fix', 'issue', 'problem', 
      'solution', 'troubleshoot', 'bug', 'resolution'
    ],
    patterns: ['debug', 'fix', 'error', 'issue'],
    description: 'Debug logs, issue investigations, fixes'
  },
  scripts: {
    dir: 'scripts',
    keywords: [
      'script', 'bash', 'shell', 'automation', 'command', 'executable',
      '#!/bin/bash', '#!/bin/sh', 'function', 'variable'
    ],
    patterns: ['script', 'automation', 'command', 'exec'],
    description: 'Shell scripts and automation files'
  },
  general: {
    dir: 'docs/general',
    keywords: [],
    patterns: [],
    description: 'Miscellaneous documentation'
  }
}