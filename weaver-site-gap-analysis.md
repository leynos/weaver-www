# Weaver Site Gap Analysis

## Scope

This analysis focuses on features that are prominent in the supplied design
docs, ADRs, reference docs, and roadmap, but are missing or materially
under-covered in the public site under `weaver/`.

The question here is not "what does the site get wrong?" That is covered in the
benchmark and inconsistency reports. This document isolates feature areas that a
reader of the site would still not learn about, despite those features being
prominent in the source references.

## High-Priority Gaps in Current and Near-Term Operator Features

- `weaver --capabilities` is effectively absent from the site.
  Source evidence: `users-guide.md:276-296`, `weaver-design.md:410-414`,
  `weaver-design.md:2086-2109`, `adr-001...md:47-63`.
  Why this matters: capability discovery and graceful degradation are central to
  the documented agent-planning model, especially for LSP variability and
  provider routing. The site talks about open interfaces and composability but
  never teaches the main introspection tool.

- Configuration layering, precedence, and fail-fast behaviour are missing.
  Source evidence: `users-guide.md:8-84`, `weaver-design.md:923-968`,
  `rust-extricate-actuator-plugin-technical-design.md:66-85`.
  Why this matters: the shared config contract is one of the most concrete,
  operator-facing parts of the current system. The site shows a made-up config
  snippet instead of documenting the actual precedence rules, environment
  variables, and fatal parse behaviour.

- Runtime artefacts and daemon lifecycle semantics are under-covered.
  Source evidence: `users-guide.md:104-217`, `weaver-design.md:416-449`,
  `weaver-design.md:972-1012`.
  Why this matters: the official docs emphasize `weaverd.lock`, `weaverd.pid`,
  `weaverd.health`, duplicate-start handling, foreground mode, and auto-start
  on first domain command. The site reduces lifecycle to "start the daemon" and
  a status check.

- Operation-level command surfaces are largely absent.
  Source evidence: `users-guide.md:322-567`.
  Missing from the site:
  `observe get-definition`, `observe find-references`,
  `observe call-hierarchy`, `observe grep`, `verify diagnostics`,
  `act apply-patch`, `act apply-rewrite`, and `act refactor` as the actual
  documented domain-and-operation interface.
  Why this matters: the site presents the product as easy to use, but it does
  not expose the actual CLI shape an operator needs.

- Human-readable output and JSON/human dual-mode rendering are missing.
  Source evidence: `users-guide.md:245-275`, `roadmap.md:108-115`.
  Why this matters: the official references care about both machine-readable
  JSONL and line-numbered human context output. The site mostly displays mock
  terminal frames and invented payloads instead of documenting the actual output
  contract.

## Plugin and Capability Platform Gaps

- The plugin system is materially under-documented on the site.
  Source evidence: `users-guide.md:658-813`, `weaver-design.md:1255-1384`,
  `roadmap.md:488-707`, `adr-001...md:47-68`.
  Missing from the site:
  sensor vs actuator plugin categories, plugin manifests, JSONL-over-stdio
  plugin IPC, in-band file payloads, plugin registry lookups, and capability
  declarations.
  Why this matters: the design sources treat plugins as a core architectural
  pillar, not an edge feature.

- Capability IDs and routing rules are absent.
  Source evidence: `adr-001...md:56-65`, `users-guide.md:727-804`.
  Missing from the site:
  `rename-symbol`, `extricate-symbol`, `extract-method`, `replace-body`,
  `extract-predicate`, contract versioning, and refusal reason codes.
  Why this matters: the user-facing stability story in the ADRs depends on
  capability IDs, not on provider-specific subcommands.

- Plugin discoverability work from the roadmap is absent.
  Source evidence: `roadmap.md:635-687`.
  Missing from the site:
  `weaver list-plugins`, provider inventory, discoverability guidance for
  `act refactor`, and clarified `--capabilities` semantics.
  Why this matters: the roadmap treats discoverability as a first-class UX
  requirement. The site does not surface it at all.

## `act extricate` and Specialist Refactoring Gaps

- `act extricate` is missing from the site.
  Source evidence: `adr-001...md:23-27`, `adr-001...md:104-131`,
  `rust-extricate-actuator-plugin-technical-design.md:95-122`.
  Why this matters: ADR 001 elevates `act extricate` into the capability model,
  and the Rust technical design specifies a detailed contract. The site never
  mentions it, despite it being a flagship capability-first example.

- The Rust extrication execution model is missing.
  Source evidence: `rust-extricate-actuator-plugin-technical-design.md:161-336`,
  `roadmap.md:573-613`.
  Missing from the site:
  payload completeness requirements, RA orchestration, overlay transactions,
  import repair, semantic invariants, refusal cases, and deterministic rollback.
  Why this matters: this is one of the most prominent specialist designs in the
  supplied references and is completely invisible in the public site.

- The site also omits the documented rope and rust-analyzer actuator split.
  Source evidence: `weaver-design.md:1279-1289`, `weaver-design.md:1332-1384`,
  `users-guide.md:707-719`.
  Why this matters: the plugin story is not abstract in the references; named
  providers are already part of the documented operator model.

## Sempai Coverage Gaps

- The Sempai page is strong conceptually, but it omits a large part of the
  operator contract.
  Source evidence: `sempai-query-language-design.md:103-178`,
  `sempai-query-language-design.md:420-460`,
  `sempai-query-language-design.md:861-951`,
  `sempai-query-language-design.md:983-1153`,
  `roadmap.md:335-481`.
  Missing from the site:
  explicit unsupported execution modes by name,
  `ts-query` and `ts-focus` extension keys,
  raw Tree-sitter escape-hatch command equivalence,
  output field schema details,
  diagnostic code stability,
  match/capture truncation limits,
  and phased implementation status.
  Why this matters: the design treats Sempai as a real query engine contract,
  not just a white-paper idea.

- The site also does not explain how Sempai fits the broader `observe` command
  family alongside classic operations like `get-definition` and `grep`.
  Source evidence: `users-guide.md:333-468`,
  `sempai-query-language-design.md:861-875`.
  Why this matters: without that connection, the site makes Sempai look like a
  standalone conceptual product rather than an addition to Weaver's `observe`
  surface.

## Jacquard Coverage Gaps

- Jacquard's white-paper page is closer to the source than most of the site, but
  it still omits important contract details.
  Source evidence: `jacquard-card-first-symbol-graph-design.md:195-220`,
  `jacquard-card-first-symbol-graph-design.md:492-560`,
  `jacquard-card-first-symbol-graph-design.md:584-712`,
  `jacquard-card-first-symbol-graph-design.md:818-838`,
  `jacquard-card-first-symbol-graph-design.md:982-1024`,
  `roadmap.md:782-963`.
  Missing from the site:
  explicit response-shape fields such as `spillover`, `resolution_scope`,
  `quality.fallbacks`, `best_match`, `alternates`, `features`, and debug
  matching controls.
  Why this matters: the core Jacquard promise is not just cards and slices, but
  honest representation of partiality, ambiguity, and fallback quality.

- The official roadmap status for Jacquard is missing.
  Source evidence: `roadmap.md:782-963`.
  Why this matters: the roadmap shows Jacquard as a substantial future phase,
  while the public site makes it easy to read as a currently available operator
  surface.

## Advanced Agent Workflow Gaps

- `onboard-project` and `PROJECT.dna` are absent.
  Source evidence: `weaver-design.md:2113-2159`, `roadmap.md:742-763`.
  Why this matters: the design treats onboarding and RAG-style summarization as
  a major agent-support feature. The site never mentions it.

- Hybrid interactive mode (`--interactive`) is absent.
  Source evidence: `weaver-design.md:2260-2263`, `roadmap.md:757-763`.
  Why this matters: this is the actual source-backed place where human approval
  enters the system, yet the site instead documents a different proposal-cycle
  model.

- Dynamic analysis ingestion is absent.
  Source evidence: `weaver-design.md:2265`, `roadmap.md:765-771`.
  Why this matters: the references position Weaver as eventually fusing more
  than syntax and LSP, but the site roadmap swaps this for a different set of
  future-product narratives.

## CLI Discoverability and Help-Surface Gaps

- The site does not cover the roadmap's command discoverability work.
  Source evidence: `roadmap.md:142-237`, `roadmap.md:278-334`.
  Missing from the site:
  top-level help improvements, operation-level help, visible global config
  flags, `weaver help <topic>`, and actionable startup/routing errors.
  Why this matters: the roadmap treats these as explicit UX deliverables for the
  CLI, but the site mostly bypasses the issue with stylized examples.

## Documentation and Site-Level Gaps

- The site does not actually expose the supplied design docs as navigable
  primary sources.
  Source evidence: the supplied `../weaver/docs/*` files themselves,
  compared with `weaver/docs/index.html:176-205`.
  Why this matters: the docs hub advertises "Design Documents" but does not link
  to the real ADRs, roadmap, technical design, or user's guide.

- The site omits several strong operator details already present in the user's
  guide:
  `WEAVERD_BIN`, `WEAVER_FOREGROUND`, socket defaults, health snapshots, plugin
  binary requirements, and missing-language-server diagnostics.
  Source evidence: `users-guide.md:175-217`, `users-guide.md:830-855`.
  Why this matters: those are the kinds of details a real operator reaches for
  first.

## Priority Recommendations

1. Replace invented command narratives with the real domain-and-operation
   surfaces from `users-guide.md`, then layer white-paper language on top.
2. Add first-class pages or sections for `--capabilities`, configuration
   layering, plugin capabilities, and daemon lifecycle artefacts.
3. Surface `act extricate`, plugin routing, and current provider boundaries,
   because they are prominent in ADR 001 and the Rust technical design.
4. Turn the docs hub into a real index of the actual source documents instead of
   a placeholder marketing gateway.
5. Make planned status explicit when a page is primarily based on future design
   work, especially for Jacquard and advanced agent workflows.
