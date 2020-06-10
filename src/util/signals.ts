
/**
 * Class used for event-based code execution.
 * Similar to JS's `EventTarget`, but more customizable.
 */
export class Signaler {
  private listeners: {[name:string]: ((...args: any[]) => any)[]} = {}

  /**
   * Emit a signal.
   * @param name The name of the signal to emit.
   * @param args Any additional args to be passed along with the signal.
   */
  emit(name: string, ...args: any[]) {
    let out = this.listeners[name]?.map(f => f(...args)) ?? []
    if(!name.startsWith('__'))
      out.concat(this.listeners['any']?.map(f => f(...args, name)) ?? [])

    return Promise.all(out)
  }

  /**
   * Connect a handler to a signal, to be called when the signal is emitted.
   * `any` handlers will recieve an additional parameter at the end of the list corresponding to the name of the signal.
   * Signals beginning with `__` are considered internal and will not be passed to `any` handlers.
   * 
   * @param name The name of the signal to connect to, or `any` to recieve all signals.
   * @param handler The function to be called when the signal is emitted. 
   */
  connect(name: string, handler: (...args: any[]) => void) {
    this.listeners[name] ?? (this.listeners[name] = [])
    this.listeners[name].push(handler)
  }

  /**
   * Disconnect all handlers from a given signal.
   * @param name The name of the signal to disconnect all handlers from.
   */
  clear(name: string) {
    delete this.listeners[name]
  }
}
