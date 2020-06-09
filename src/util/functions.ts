
/**
 * Polyfill replacement for `Object.entries`.
 * @param obj The object to process.
 */
export function objectEntries<T>(obj: {[k: string]: T}): [string, T][] {
  return Object.keys(obj).map(k => [k, obj[k]])
}

/**
 * Converts a path to be relative to the current script file.
 * @param path The path to convert.
 * @param from The value of `import.meta.url` from the calling script.
 */
export function localizePath(path: string, from: string) {
  return new URL(path, from).pathname.slice(+(Deno.build.os === 'windows'))
}
