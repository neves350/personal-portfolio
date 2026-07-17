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

export function selectTrailingYear(
  contributions: readonly ContributionDay[],
  asOf: Date = new Date(),
): ContributionDay[] {
  const end = formatUtcDate(asOf)
  const start = formatUtcDate(addUtcDays(asOf, -364))
  return contributions.filter((day) => day.date >= start && day.date <= end)
}

function formatUtcDate(date: Date): string {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`
}

function addUtcDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setUTCDate(result.getUTCDate() + days)
  return result
}

function pad(value: number): string {
  return value.toString().padStart(2, '0')
}

export function groupIntoWeeks(contributions: readonly ContributionDay[]): ContributionWeek[] {
  if (contributions.length === 0) return []

  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date))
  const firstDayOfWeek = parseUtcDate(sorted[0].date).getUTCDay()
  const lastDayOfWeek = parseUtcDate(sorted[sorted.length - 1].date).getUTCDay()

  const leadingPadding: null[] = Array.from({ length: firstDayOfWeek }, () => null)
  const trailingPadding: null[] = Array.from({ length: 6 - lastDayOfWeek }, () => null)
  const padded: (ContributionDay | null)[] = [...leadingPadding, ...sorted, ...trailingPadding]

  const weeks: ContributionWeek[] = []
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push({ days: padded.slice(i, i + 7) })
  }
  return weeks
}

function parseUtcDate(date: string): Date {
  return new Date(`${date}T00:00:00Z`)
}

export function sumContributions(contributions: readonly ContributionDay[]): number {
  return contributions.reduce((total, day) => total + day.count, 0)
}

const ARIA_LABEL_DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  timeZone: 'UTC',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

export function formatDayAriaLabel(day: ContributionDay): string {
  const formattedDate = ARIA_LABEL_DATE_FORMAT.format(parseUtcDate(day.date))
  if (day.count === 0) return `No contributions on ${formattedDate}`
  if (day.count === 1) return `1 contribution on ${formattedDate}`
  return `${day.count} contributions on ${formattedDate}`
}
