
export function objectEntries<T>(obj: {[k: string]: T}): [string, T][] {
  return Object.keys(obj).map(k => [k, obj[k]])
}
