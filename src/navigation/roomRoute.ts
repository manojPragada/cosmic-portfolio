const roomPrefix = '#room/'

export function roomHash(projectId: string) {
  return `${roomPrefix}${encodeURIComponent(projectId)}`
}

export function projectIdFromHash(hash: string, validIds: readonly string[]) {
  if (!hash.startsWith(roomPrefix)) return null
  try {
    const projectId = decodeURIComponent(hash.slice(roomPrefix.length))
    return validIds.includes(projectId) ? projectId : null
  } catch {
    return null
  }
}
