import { clampLevel, type ContributionDay, formatDayAriaLabel, groupIntoWeeks, parseContributionsResponse, selectTrailingYear, sumContributions } from './github-activity.data'

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

describe('groupIntoWeeks', () => {
  it('returns an empty array for empty input', () => {
    expect(groupIntoWeeks([])).toEqual([])
  })

  it('left-pads the first week to align on day-of-week', () => {
    const days = [day('2026-01-01', 1), day('2026-01-02', 1), day('2026-01-03', 1)]
    const weeks = groupIntoWeeks(days)
    expect(weeks).toHaveLength(1)
    expect(weeks[0].days).toEqual([null, null, null, null, days[0], days[1], days[2]])
  })

  it('right-pads the last week to fill out the row', () => {
    const days = [
      day('2026-01-04', 1),
      day('2026-01-05', 1),
      day('2026-01-06', 1),
      day('2026-01-07', 1),
    ]
    const weeks = groupIntoWeeks(days)
    expect(weeks).toHaveLength(1)
    expect(weeks[0].days).toEqual([days[0], days[1], days[2], days[3], null, null, null])
  })

  it('does not pad when input is already Sunday-to-Saturday aligned', () => {
    const days = [
      day('2026-01-04', 1),
      day('2026-01-05', 1),
      day('2026-01-06', 1),
      day('2026-01-07', 1),
      day('2026-01-08', 1),
      day('2026-01-09', 1),
      day('2026-01-10', 1),
    ]
    const weeks = groupIntoWeeks(days)
    expect(weeks).toHaveLength(1)
    expect(weeks[0].days).toEqual(days)
  })

  it('gives every week exactly 7 slots', () => {
    const days = [day('2026-01-01', 1), day('2026-01-02', 1), day('2026-01-03', 1)]
    const weeks = groupIntoWeeks(days)
    for (const week of weeks) {
      expect(week.days).toHaveLength(7)
    }
  })

  it('preserves every input day as a non-null slot somewhere in the output', () => {
    const days = [day('2026-01-01', 1), day('2026-01-02', 1), day('2026-01-03', 1)]
    const weeks = groupIntoWeeks(days)
    const nonNullCount = weeks.flatMap((w: typeof weeks[0]) => w.days).filter((d: ContributionDay | null): d is ContributionDay => d !== null).length
    expect(nonNullCount).toBe(days.length)
  })

  it('sorts out-of-order input before grouping', () => {
    const days = [
      day('2026-01-04', 1),
      day('2026-01-05', 1),
      day('2026-01-06', 1),
      day('2026-01-07', 1),
    ]
    const shuffled = [days[3], days[0], days[2], days[1]]
    expect(groupIntoWeeks(shuffled)).toEqual(groupIntoWeeks(days))
  })
})

describe('sumContributions', () => {
  it('sums the count field across all days', () => {
    expect(sumContributions([day('2026-01-01', 2), day('2026-01-02', 3)])).toBe(5)
  })

  it('returns 0 for an empty array', () => {
    expect(sumContributions([])).toBe(0)
  })
})

describe('formatDayAriaLabel', () => {
  it('uses singular wording for exactly 1 contribution', () => {
    expect(formatDayAriaLabel(day('2026-07-17', 1))).toBe('1 contribution on July 17, 2026')
  })

  it('uses plural wording for more than 1 contribution', () => {
    expect(formatDayAriaLabel(day('2026-07-17', 5))).toBe('5 contributions on July 17, 2026')
  })

  it('reports "No contributions" for a zero-count day', () => {
    expect(formatDayAriaLabel(day('2026-07-17', 0))).toBe('No contributions on July 17, 2026')
  })

  it('formats the UTC calendar date regardless of the local test-runner timezone', async () => {
    // No @types/node is installed in this project, so `process` is accessed via a typed
    // globalThis cast rather than the (untyped) bare identifier.
    const nodeProcess = (
      globalThis as unknown as { process: { env: Record<string, string | undefined> } }
    ).process
    const originalTz = nodeProcess.env['TZ']
    nodeProcess.env['TZ'] = 'America/Los_Angeles'
    // ARIA_LABEL_DATE_FORMAT is a module-level Intl.DateTimeFormat singleton built once at
    // import time, so mutating TZ alone wouldn't reconstruct it — reset the module registry
    // and re-import fresh so the singleton is rebuilt under the overridden TZ.
    vi.resetModules()
    try {
      const fresh = await import('./github-activity.data')
      expect(fresh.formatDayAriaLabel(day('2026-01-01', 1))).toBe('1 contribution on January 1, 2026')
    } finally {
      if (originalTz === undefined) {
        delete nodeProcess.env['TZ']
      } else {
        nodeProcess.env['TZ'] = originalTz
      }
      vi.resetModules()
    }
  })
})
