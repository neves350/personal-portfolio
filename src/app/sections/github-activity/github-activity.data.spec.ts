import { clampLevel, parseContributionsResponse } from './github-activity.data'

describe('clampLevel', () => {
  it('passes through valid levels unchanged', () => {
    expect(clampLevel(0)).toBe(0)
    expect(clampLevel(2)).toBe(2)
    expect(clampLevel(4)).toBe(4)
  })

  it('clamps values below 0 up to 0', () => {
    expect(clampLevel(-3)).toBe(0)
  })

  it('clamps values above 4 down to 4', () => {
    expect(clampLevel(10)).toBe(4)
  })
})

describe('parseContributionsResponse', () => {
  it('returns a validated response for well-formed input', () => {
    const input = {
      contributions: [{ date: '2026-01-01', count: 3, level: 2 }],
    }
    expect(parseContributionsResponse(input)).toEqual({
      contributions: [{ date: '2026-01-01', count: 3, level: 2 }],
    })
  })

  it('throws when the top-level value is not an object', () => {
    expect(() => parseContributionsResponse(null)).toThrow()
    expect(() => parseContributionsResponse('nope')).toThrow()
  })

  it('throws when "contributions" is missing or not an array', () => {
    expect(() => parseContributionsResponse({})).toThrow()
    expect(() => parseContributionsResponse({ contributions: 'nope' })).toThrow()
  })

  it('throws when a contribution day is missing required fields', () => {
    expect(() =>
      parseContributionsResponse({ contributions: [{ date: '2026-01-01', count: 3 }] }),
    ).toThrow()
  })
})
