export type ContributionLevel = 0 | 1 | 2 | 3 | 4

export interface ContributionDay {
  date: string
  count: number
  level: ContributionLevel
}

export interface ContributionsApiResponse {
  contributions: ContributionDay[]
}

export interface ContributionWeek {
  days: ReadonlyArray<ContributionDay | null>
}

export const GITHUB_USERNAME = 'neves350'
export const GITHUB_CONTRIBUTIONS_API_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`

export function clampLevel(level: number): ContributionLevel {
  const rounded = Math.round(level)
  return Math.min(4, Math.max(0, rounded)) as ContributionLevel
}

function isContributionDay(value: unknown): value is ContributionDay {
  if (typeof value !== 'object' || value === null) return false
  const day = value as Record<string, unknown>
  return (
    typeof day['date'] === 'string' &&
    typeof day['count'] === 'number' &&
    typeof day['level'] === 'number'
  )
}

export function parseContributionsResponse(value: unknown): ContributionsApiResponse {
  if (typeof value !== 'object' || value === null) {
    throw new Error('Contributions response must be an object')
  }
  const contributions = (value as Record<string, unknown>)['contributions']
  if (!Array.isArray(contributions) || !contributions.every(isContributionDay)) {
    throw new Error(
      'Contributions response must contain a "contributions" array of ContributionDay',
    )
  }
  return {
    contributions: contributions.map((day) => ({
      date: day.date,
      count: day.count,
      level: clampLevel(day.level),
    })),
  }
}
