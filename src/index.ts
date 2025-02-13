import type { Options } from 'function-timeout'
import cloneRegexp from 'clone-regexp'
import functionTimeout, { isTimeoutError } from 'function-timeout'
import timeSpan from 'time-span'

function resultToMatch(result: any) {
  return {
    match: result[0],
    index: result.index,
    group: result.slice(1),
    namedGroups: result.groups ?? {},
    input: result.input,
  }
}

export function isMatch(regex: RegExp, string: string, options?: Options): boolean {
  try {
    return functionTimeout(() => cloneRegexp(regex).test(string), options!)()
  }
  catch (error) {
    if (isTimeoutError(error))
      return false

    throw error
  }
}

export function firstMatch(regex: RegExp, string: string, options?: Options) {
  try {
    const result = functionTimeout(() => cloneRegexp(regex).exec(string), options!)()

    if (result === null)
      return

    return resultToMatch(result)
  }
  catch (error) {
    if (isTimeoutError(error))
      return

    throw error
  }
}

export function matches(regex: RegExp, string: string, { timeout = Number.POSITIVE_INFINITY, matchTimeout = Number.POSITIVE_INFINITY } = {}) {
  if (!regex.global)
    throw new Error('The regex must have the global flag, otherwise, use `firstMatch()` instead')

  return {
    * [Symbol.iterator]() {
      try {
        const matches = string.matchAll(regex) // The regex is only executed when iterated over.

        while (true) {
          // `matches.next` must be called within an arrow function so that it doesn't loose its context.
          const nextMatch = functionTimeout(() => matches.next(), { timeout: (timeout !== Number.POSITIVE_INFINITY || matchTimeout !== Number.POSITIVE_INFINITY) ? Math.min(timeout, matchTimeout) : undefined })

          const end = timeSpan()
          const { value, done } = nextMatch()
          timeout -= Math.ceil(end())

          if (done)
            break

          yield resultToMatch(value)
        }
      }
      catch (error) {
        if (!isTimeoutError(error))
          throw error
      }
    },
  }
}
