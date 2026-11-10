export type Project = {
  id: string
  name: string
  eyebrow: string
  summary: string
  stack: readonly string[]
  href: string
  accent: string
}

// Descriptions are limited to capabilities visible in each public repository.
export const projects: readonly Project[] = [
  {
    id: 'pufferfish',
    name: 'pufferFish',
    eyebrow: 'API OBSERVATORY',
    summary: 'Local HTTP capture, replay, response diffs and credential-safe inspection.',
    stack: ['Python', 'HTTP', 'Local-first'],
    href: 'https://github.com/manojPragada/pufferFish',
    accent: '#6fffe9',
  },
  {
    id: 'flight-recorder',
    name: 'Agent Flight Recorder',
    eyebrow: 'TRACE TELEMETRY',
    summary: 'A local viewer for agent traces, tool calls, failures, latency and token usage.',
    stack: ['Python', 'Tracing', 'Offline UI'],
    href: 'https://github.com/manojPragada/agent-flight-recorder',
    accent: '#a98bff',
  },
  {
    id: 'queue-lab',
    name: 'Queue Lab',
    eyebrow: 'WORKER CONTROL',
    summary: 'A SQLite-backed job queue with retries, leases, dead letters and monitoring.',
    stack: ['Python', 'SQLite', 'Dashboard'],
    href: 'https://github.com/manojPragada/queue-lab',
    accent: '#ffb86b',
  },
]
