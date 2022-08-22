import type { Options } from 'function-timeout'

export interface Match {
  match: string
  index: number
  groups: string[]
  namedGroups: Record<string, string>
  input: string
}

export interface MatchesOptions extends Options {
  /**
	The time in milliseconds to wait before timing out when searching for each match.
	*/
  readonly matchTimeout?: number
}

