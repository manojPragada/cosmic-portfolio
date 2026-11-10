import { describe, expect, it } from 'vitest'
import { projects } from './projects'

describe('public project manifest', () => {
  it('keeps unique IDs and verified owner links', () => {
    expect(new Set(projects.map((project) => project.id)).size).toBe(projects.length)
    for (const project of projects) {
      expect(project.href).toMatch(/^https:\/\/github\.com\/manojPragada\//)
      expect(project.summary.length).toBeLessThan(120)
    }
  })
})
