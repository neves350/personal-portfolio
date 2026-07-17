import { httpResource } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, computed, effect } from '@angular/core'
import {
  type ContributionLevel,
  formatDayAriaLabel,
  GITHUB_CONTRIBUTIONS_API_URL,
  groupIntoWeeks,
  parseContributionsResponse,
  selectTrailingYear,
  sumContributions,
} from './github-activity.data'

@Component({
  selector: 'app-github-activity',
  imports: [],
  templateUrl: './github-activity.html',
  styleUrl: './github-activity.css',
  host: { class: 'section-anchor border-t border-border/60 py-12 sm:py-14' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubActivity {
  private readonly activity = httpResource(() => GITHUB_CONTRIBUTIONS_API_URL, {
    parse: parseContributionsResponse,
  })

  protected readonly isLoading = this.activity.isLoading
  protected readonly hasError = computed(() => !!this.activity.error())

  private readonly trailingContributions = computed(() =>
    this.activity.hasValue() ? selectTrailingYear(this.activity.value().contributions) : [],
  )

  protected readonly weeks = computed(() => groupIntoWeeks(this.trailingContributions()))
  protected readonly totalContributions = computed(() =>
    sumContributions(this.trailingContributions()),
  )
  protected readonly formatDayAriaLabel = formatDayAriaLabel

  protected readonly levelClass: Record<ContributionLevel, string> = {
    0: 'bg-border',
    1: 'bg-primary/20',
    2: 'bg-primary/45',
    3: 'bg-primary/70',
    4: 'bg-primary/100',
  }
  protected readonly legendLevels: ContributionLevel[] = [0, 1, 2, 3, 4]
  protected readonly skeletonWeeks = Array.from({ length: 53 })
  protected readonly skeletonDays = Array.from({ length: 7 })

  constructor() {
    effect(() => {
      const error = this.activity.error()
      if (error) console.warn('[GithubActivity] Failed to load GitHub contributions', error)
    })
  }
}
