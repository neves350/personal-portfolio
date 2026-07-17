import { clampLevel, type ContributionDay, parseContributionsResponse, selectTrailingYear } from './github-activity.data'

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

function day(date: string, count: number): ContributionDay {
  return { date, count, level: clampLevel(count) }
}

describe('selectTrailingYear', () => {
  const asOf = new Date('2026-07-17')

  it('drops days older than 365 days before asOf', () => {
    const days = [day('2025-07-17', 1)]
    expect(selectTrailingYear(days, asOf)).toEqual([])
  })

  it('drops days after asOf', () => {
    const days = [day('2026-07-18', 1)]
    expect(selectTrailingYear(days, asOf)).toEqual([])
  })

  it('keeps the trailing-365-day boundary inclusive on both ends', () => {
    const days = [day('2025-07-18', 1), day('2026-07-17', 2)]
    expect(selectTrailingYear(days, asOf)).toEqual(days)
  })

  it('spans a real year boundary correctly', () => {
    const asOfJan = new Date('2026-01-10')
    const days = [day('2025-12-31', 1), day('2025-01-10', 1)]
    expect(selectTrailingYear(days, asOfJan)).toEqual([day('2025-12-31', 1)])
  })
})
