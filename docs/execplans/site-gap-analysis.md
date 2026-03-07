# Tighten Weaver homepage tone and voice

This ExecPlan (execution plan) is a living document. The sections
`Constraints`, `Tolerances`, `Risks`, `Progress`, `Surprises &
Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept
up to date as work proceeds.

Status: DRAFT

## Purpose / big picture

The current homepage in `weaver/index.html` does not write like the
`compressed-authority` skill. It uses metaphor before meaning, piles up
abstract nouns, and makes several claims without enough evidence. After
this plan is executed, the Weaver homepage will open with a concrete
product claim, support each major promise with an observable detail, and
cut ornamental copy that does not help an operator decide whether to
install or read further.

Success is easy to observe. A reader should be able to skim the homepage
and answer four questions without guessing: what Weaver is, what it does
today, why it is safe, and where to go next. The rewritten copy must sound
direct, exact, and slightly hard-edged without becoming robotic or
marketing-generic.

This plan covers the audit and the copy-overhaul strategy for the homepage
surface reached from `weaver/index.html`. The initial execution pass should
rewrite the homepage and any shared nav or footer strings that appear on
that page. Broader site-wide propagation stays a follow-on step unless the
approved implementation reveals that linked pages must be adjusted to keep
the homepage truthful.

## Audit of current homepage copy

The headline misses the point. `weaver/index.html:119-126` opens with
"The Loom for Intelligent Code" and only then explains that Weaver is a
CLI toolchain. The skill requires the answer first. The current order gives
the reader a metaphor before a product definition.

The hero body is soft and generic. `weaver/index.html:124-126` says Weaver
is "safe, semantic, and built for the craft of software engineering." That
is broad positioning language, not evidence. It names virtues without
showing mechanism or scope.

The feature cards overuse compressed jargon in the wrong way. The skill
wants compression, but this copy compresses into noun piles rather than
clarity. `weaver/index.html:181-184` uses "Modular architecture driven by
the Semantic Fusion Engine." `weaver/index.html:201-203` stacks
"Double-Lock validation" with a parenthetical and "Birdcage sandbox."
`weaver/index.html:220-222` uses "bare-metal performance" without a number,
benchmark, or concrete result. These lines are dense, but not precise.

The page sometimes sounds ceremonial when it should sound operational.
`weaver/index.html:329-333` says, "To act, the agent must first discern
structure." That is a stage line. The skill wants a mechanism or claim
first. The same block ends with "surgical precision," which is prestige
language doing the work that evidence should do.

The supporting cards are filler-heavy. `weaver/index.html:365-397` uses
generic summaries such as "Comprehensive guides and API references,"
"See what's coming in v0.2 and v0.3," and "Join the community of
weavers." None of that is wrong, but none of it earns the click with a
specific promise.

The footer closes on brand mood instead of product posture.
`weaver/index.html:415-416` ends with "Serious tools, playful worlds."
That line may be acceptable as house style, but it is not aligned with the
homepage's main job. If it stays, it should stay as a small brand note, not
as the emotional summary of the page.

The command preview is the strongest section because it leads with concrete
commands and observable output. `weaver/index.html:268-294` already does
what the skill wants: direct action, direct evidence, no runway. The
rewrite should use this block as the voice benchmark for the rest of the
page.

## Rewrite target

The homepage voice should follow five rules.

- Lead with the product category and current capability in the first line.
- Replace adjectives with mechanisms, commands, or supported scope.
- Keep one claim per paragraph, then prove it in the same paragraph or the
  next line.
- Use metaphor only as seasoning. Do not let metaphor carry the argument.
- Label future work as future work. Do not let roadmap language masquerade
  as present capability.

The working voice reference is simple: short sentences, plain words,
operator-facing claims, and no decorative throat-clearing. The copy should
sound like someone who has read the design docs and does not need to
perform certainty.

## Proposed copy architecture

The hero should become a three-part block. First sentence: what Weaver is.
Second sentence: what it does today. Third sentence or supporting line: why
an operator should trust it, with one concrete mechanism. The install
command remains the primary call to action.

The value cards should stop being abstract labels and start being outcomes.
"Composable", "Safe", and "Fast" can remain as visual anchors, but each
body should open with a user-facing result, then name the underlying
mechanism. Example pattern: "Query code through one CLI surface. Sempai,
LSP, and the daemon share the same contract."

The Sempai teaser should be rewritten as an operational bridge, not a
mini-manifesto. It should explain what Sempai adds to `observe`, what
languages it covers now, and what stays on the roadmap. "Read the
whitepaper" is too ceremonial for the skill; a more direct CTA such as
"Read the query design" is closer to the target voice if that destination
remains accurate.

The utility cards should earn the click with specifics. Documentation
should mention command reference or design docs. Roadmap should name that it
covers planned phases. GitHub should describe contribution or issue flow.
Discord should not imply an active community if the destination is still a
placeholder.

The footer should become quieter. Keep the legal line. Keep only one short
brand line if it adds texture without diluting the product stance.

## Constraints

- Do not begin implementation until the user explicitly approves this plan.
- Keep the first execution pass scoped to `weaver/index.html` plus any
  shared strings required on that page, unless a constraint violation or
  truthfulness issue forces escalation.
- Preserve the current information architecture, page routes, and major
  layout blocks during the first copy pass. This is a language overhaul, not
  a layout redesign.
- Do not introduce new product claims that are unsupported by the source
  references or contradicted by `weaver-claims-benchmark.md` and
  `weaver-site-usage-inconsistencies.md`.
- Keep British English and the repo documentation style guide from
  `docs/documentation-style-guide.md`.
- Prefer deleting weak copy to replacing it with new fluff.

## Tolerances (exception triggers)

- Scope: if truthful rewrite of the homepage requires coordinated edits to
  more than four additional pages, stop after the homepage pass and ask
  whether to expand scope.
- Structure: if the copy overhaul only works with major layout changes or new
  sections, stop and get approval before changing page structure.
- Evidence: if a desired claim cannot be tied to a current source-backed
  detail, cut the claim rather than inventing support. Escalate only if the
  user explicitly wants that claim preserved.
- Brand voice: if tightening the prose removes distinctive brand texture from
  every section, keep one restrained brand line per major block and document
  the trade-off in the `Decision Log`.
- Validation: if the available markdown gate fails for reasons unrelated to
  this plan file, record the failure and keep the task in partial status
  rather than claiming clean completion.

## Risks

- Risk: Over-correction could flatten the site's personality into generic
  "B2B software" prose.
  Severity: medium
  Likelihood: medium
  Mitigation: keep the page visually distinctive and allow one brief, sharp
  metaphor per section only when the main claim is already clear.

- Risk: Existing source mismatches may force copy cuts that make the homepage
  feel thinner before linked pages are repaired.
  Severity: high
  Likelihood: medium
  Mitigation: use the command preview and source-backed mechanisms as proof
  points, then queue broader page rewrites only where homepage truthfulness
  depends on them.

- Risk: The current footer and CTA language may be shared elsewhere, creating
  consistency debt after a homepage-only pass.
  Severity: medium
  Likelihood: medium
  Mitigation: note any shared strings during implementation and escalate only
  when inconsistency becomes user-visible on the homepage path.

## Execution phases

### Phase 1: Establish the voice brief

Create a short rewrite brief inside this ExecPlan before editing the page.
The brief should map each homepage block to a required job:

- Hero: define the product and give one proof.
- Value cards: state outcome, then mechanism.
- Command preview: keep concrete commands as the tone benchmark.
- Sempai teaser: explain scope and present status.
- Utility cards and footer: remove filler and vague community language.

Completion signal: the brief is concise enough that another agent could
rewrite the homepage without re-reading the skill prompt.

### Phase 2: Rewrite the homepage copy

Edit `weaver/index.html` section by section. Start with the hero, then the
value cards, then the Sempai teaser, then the utility cards and footer. Use
the existing command preview as the anchor for tone. Do not rewrite the
terminal examples unless accuracy issues are found.

Completion signal: every prose block on the homepage leads with a claim or
instruction, and no paragraph depends on metaphor or prestige adjectives to
carry meaning.

### Phase 3: Truthfulness pass

After the rewrite, compare each changed claim against the existing benchmark
documents:

- `weaver-claims-benchmark.md`
- `weaver-site-usage-inconsistencies.md`
- `weaver-site-gap-analysis.md`

Completion signal: no rewritten line introduces a claim that those documents
would classify as overstated, contradicted, or unverifiable without a fresh
source citation.

### Phase 4: Consistency and polish

Check button labels, nav labels, card blurbs, and footer language for voice
drift. The aim is not to make every line sound identical. The aim is to
remove tonal whiplash between blunt technical copy and decorative brand copy.

Completion signal: the homepage reads as one voice instead of a collage of
marketing, whitepaper, and placeholder documentation language.

## Validation

Use a docs-only gate for this plan file now, then repeat appropriate site
checks during implementation.

Draft-plan validation command:

```bash
set -o pipefail
markdownlint-cli2 docs/execplans/site-gap-analysis.md | tee /tmp/markdownlint-weaver-www-site-gap-analysis.out
```

Implementation-phase validation commands, to be confirmed before execution:

```plaintext
- Re-run markdownlint-cli2 on docs/execplans/site-gap-analysis.md after plan updates.
- Run an HTML or site-specific validation command if the repo exposes one.
- If no site validation command exists, perform a manual diff review focused on
  truthfulness, brevity, and CTA accuracy.
```

## Progress

- [x] 2026-03-07T20:59:35+00:00 Audited `weaver/index.html` against the
  `compressed-authority` skill and existing repo analysis docs.
- [x] 2026-03-07T20:59:35+00:00 Drafted this branch-scoped ExecPlan at
  `docs/execplans/site-gap-analysis.md`.
- [ ] Await user approval before beginning implementation.
- [ ] Rewrite homepage copy in `weaver/index.html`.
- [ ] Run post-rewrite validation and capture results in this plan.

## Surprises & Discoveries

- The repo-local `AGENTS.md` file exists but is empty, so the effective agent
  guidance for this task came from the user prompt and the shared system
  instructions.
- `grepai` is installed, but `weaver-www` is not indexed in the `Projects`
  workspace. Manual file inspection was required.
- The homepage's terminal command preview is already much closer to the target
  voice than the surrounding marketing copy.

## Decision Log

- 2026-03-07T20:59:35+00:00: Treated this task as plan-only work because the
  user asked for an audit and a plan, and the ExecPlan skill requires an
  approval gate before implementation.
- 2026-03-07T20:59:35+00:00: Scoped the plan to the homepage path beginning at
  `weaver/index.html` rather than the full site. That keeps the first pass
  bounded and matches the user request.
- 2026-03-07T20:59:35+00:00: Chose the command preview block as the tone
  benchmark because it already leads with concrete, observable behaviour.

## Outcomes & Retrospective

The audit is complete. The next step is not more analysis. The next step is
approval, then a rewrite that cuts metaphor-first copy, removes weak
adjectives, and makes the homepage sound like the product it is describing.

If this plan is approved and executed cleanly, it should also produce a
reusable voice pattern for the rest of the site: claim first, mechanism
second, roadmap caveats explicit, and filler deleted on sight.
