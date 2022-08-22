import { describe, expect, it } from 'vitest'
import { firstMatch, isMatch, matches } from '../src/index'
const fixtureRegex = () => /(?<=^v?|\sv?)(?:(?:0|[1-9]\d*)\.){2}(?:0|[1-9]\d*)(?:-(?:0|[1-9]\d*|[\da-z-]*[a-z-][\da-z-]*)(?:\.(?:0|[1-9]\d*|[\da-z-]*[a-z-][\da-z-]*))*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*)?(?=$|\s)/gi
const fixtureString = 'v1.1.3-0aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa$'

describe('test match', () => {
  it('test isMatch', () => {
    expect(isMatch(fixtureRegex(), fixtureString, { timeout: 10 })).toBe(false)
    expect(isMatch(fixtureRegex(), 'v1.1.3', { timeout: 10 })).toBe(true)
    expect(isMatch(/^v\d+/, fixtureString, { timeout: 1000 })).toBe(true)
    expect(isMatch(/^v\d+/, fixtureString)).toBe(true)
  })
  it('firstMatch', () => {
    expect(firstMatch(fixtureRegex(), fixtureString, {timeout: 10})?.match).toBe(undefined)
    expect(firstMatch(/^v\d+/g, fixtureString, {timeout: 1000})?.match).toBe('v1')
    expect(firstMatch(fixtureRegex(), 'v1.1.3', {timeout: 10})?.match).toBe('1.1.3')
    expect(firstMatch(/^v\d+/g, fixtureString)?.match).toBe('v1')
  })

  it('matches',()=>{
    expect([...matches(fixtureRegex(), fixtureString, {timeout: 10})]).toStrictEqual([])
    expect([...matches(fixtureRegex(), 'v1.1.3', {timeout: 10})][0].match).toStrictEqual('1.1.3')
    expect([...matches(/^v\d+/g, fixtureString, {timeout: 1000})][0].match).toStrictEqual('v1')
    expect([...matches(/^v\d+/g, fixtureString, {timeout: 1000, matchTimeout: 1000})][0].match).toStrictEqual('v1')
    expect([...matches(/^v\d+/g, fixtureString)][0].match).toStrictEqual('v1')
  })
})
