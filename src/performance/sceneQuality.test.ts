import { describe, expect, it } from 'vitest'
import { qualityForFrameBudget } from './sceneQuality'

describe('scene quality classifier', () => {
  it('waits for a meaningful sample window', () => {
    expect(qualityForFrameBudget('full', 40, 89)).toBe('full')
  })

  it('reduces density after sustained slow frames', () => {
    expect(qualityForFrameBudget('full', 24.1, 90)).toBe('lite')
  })

  it('uses hysteresis before restoring full density', () => {
    expect(qualityForFrameBudget('lite', 20, 90)).toBe('lite')
    expect(qualityForFrameBudget('lite', 17.9, 90)).toBe('full')
  })

  it('ignores invalid timing data', () => {
    expect(qualityForFrameBudget('full', Number.NaN, 120)).toBe('full')
  })
})
