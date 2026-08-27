# Lighthouse Three-Run Median Summary — R2B2R

Production build (`next build && next start`), 3 runs per route/device, `throttlingMethod: "simulate"` (Lighthouse defaults; `cpuSlowdownMultiplier: 1`, i.e. no artificial CPU/network throttle applied during trace collection — only downstream timing metrics are simulated, CLS is measured directly). Raw JSON for all 18 runs under `lighthouse/`.

| Route | Device | Performance (3 runs) | **Median perf** | CLS (3 runs) | **Median CLS** | Target | Met? |
|---|---|---|---:|---|---:|---|---|
| Homepage | Desktop | 78, 78, 100 | **78** | 0.528, 0.528, 0 | **0.528** | ≥90 perf / ≤0.10 CLS | ✗ |
| Homepage | Mobile | 78, 78, 78 | **78** | 0.470, 0.470, 0.470 | **0.470** | ≥80 perf / ≤0.10 CLS | ✗ |
| PLP | Desktop | 78, 78, 78 | **78** | 0.528, 0.528, 0.528 | **0.528** | ≥90 perf / ≤0.10 CLS | ✗ |
| PLP | Mobile | 79, 79, 79 | **79** | 0.470, 0.470, 0.470 | **0.470** | ≥80 perf / ≤0.10 CLS | ✗ |
| PDP | Desktop | 78, 78, 100 | **78** | 0.528, 0.528, 0 | **0.528** | ≥90 perf / ≤0.10 CLS | ✗ |
| PDP | Mobile | 79, 79, 78 | **79** | 0.470, 0.470, 0.470 | **0.470** | ≥80 perf / ≤0.10 CLS | ✗ |

**Note the 100/0 outlier runs** (home-desktop run 3, pdp-desktop run 3): these are not noise or a different code path — they are the same intermittent race documented in `CLS_Attribution_Table.md`, caught landing on its "good" outcome in this particular sample. A larger (10-run) sample on home-desktop alone found this happens on very close to 50% of loads. The three-run median is not the full picture, but reporting the median as instructed still correctly shows every route/device missing target, since the "bad" outcome is at least as common as the "good" one.

## Sub-metric breakdown (representative — home-desktop run 1)

| Metric | Score | Value |
|---|---:|---|
| First Contentful Paint | 1.0 | 0.3s |
| Largest Contentful Paint | 0.98 | 0.8s |
| Total Blocking Time | 1.0 | 0ms |
| Speed Index | 1.0 | 0.4s |
| Cumulative Layout Shift | 0.14 | 0.528 |

CLS is the entire gap between the current ~78 score and a ~95+ score — every other Core Web Vital is already at or near perfect. This has been true and unchanged since R2B2F-POLISH (D-048).

## Comparison to prior phases (unchanged — not a regression)

| Phase | Home-desktop perf | Home-desktop CLS |
|---|---:|---|
| R2B2F (pre-polish) | 79 | 0.524 |
| R2B2F-POLISH | 78 | 0.528 |
| R2B2R (this phase, median of 3) | 78 | 0.528 |

No regression introduced by this phase; the reading is statistically the same intermittent condition across all three measurement points.
