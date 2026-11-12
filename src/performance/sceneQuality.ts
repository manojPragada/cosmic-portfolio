export type SceneQuality = 'full' | 'lite'

export const qualityForFrameBudget = (
  current: SceneQuality,
  averageFrameMs: number,
  sampleCount: number,
): SceneQuality => {
  if (!Number.isFinite(averageFrameMs) || sampleCount < 90) return current
  if (current === 'full' && averageFrameMs > 24) return 'lite'
  if (current === 'lite' && averageFrameMs < 18) return 'full'
  return current
}
