import { describe, expect, it } from 'vitest'
import { projectIdFromHash, roomHash } from './roomRoute'

const ids = ['pufferfish', 'flight-recorder']

describe('project room routes', () => {
  it('creates and reads a known room hash', () => {
    expect(roomHash('flight-recorder')).toBe('#room/flight-recorder')
    expect(projectIdFromHash('#room/flight-recorder', ids)).toBe('flight-recorder')
  })

  it('rejects unknown and malformed routes', () => {
    expect(projectIdFromHash('#projects', ids)).toBeNull()
    expect(projectIdFromHash('#room/private-project', ids)).toBeNull()
    expect(projectIdFromHash('#room/%E0%A4%A', ids)).toBeNull()
  })
})
