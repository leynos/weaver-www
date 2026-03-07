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

- `weaver --capabilities` is present, but still under-explained.
  Source evidence: `../weaver/docs/users-guide.md:276-296`,
  `../weaver/docs/weaver-design.md:410-414`,
  `../weaver/docs/weaver-design.md:2086-2109`,
  `../weaver/docs/adr-001-plugin-capability-model-and-act-extricate.md:47-63`.
  Why this matters: capability discovery and graceful degradation are central to
  the documented agent-planning model, especially for LSP variability and
  provider routing. The site now mentions the probe, but it still does not show
  representative output or explain how operators should use capability data to
  interpret refusals and provider limits.

- Operation-level command surfaces are present, but deeper discoverability is
  still thin.
  Source evidence: `users-guide.md:322-567`.
  Still under-covered on the site:
  command-specific help flows, startup/routing failure examples, and the richer
  capability-conditioned guidance described in the user's guide and roadmap.
  Why this matters: the site presents the product as easy to use, but it does
  not yet teach enough of the discovery and troubleshooting surface an operator
  needs after the first happy-path command.

- Human-readable output and JSON/human dual-mode rendering are now introduced,
  but their operator contract is still under-documented.
  Source evidence: `users-guide.md:245-275`, `roadmap.md:108-115`.
  Why this matters: the official references care about both machine-readable
  JSONL and line-numbered human context output. The site now documents the
  `kind` envelope and `--output` flag, but it still does not show enough
  concrete human-mode examples or operation-specific output shapes.

## Plugin and Capability Platform Gaps

- The plugin system is materially under-documented on the site.
  Source evidence: `../weaver/docs/users-guide.md:658-813`,
  `../weaver/docs/weaver-design.md:1255-1384`,
  `../weaver/docs/roadmap.md:488-707`,
  `../weaver/docs/adr-001-plugin-capability-model-and-act-extricate.md:47-68`.
  Missing from the site:
  sensor vs actuator plugin categories, plugin manifests, JSONL-over-stdio
  plugin IPC, in-band file payloads, plugin registry lookups, and capability
  declarations.
  Why this matters: the design sources treat plugins as a core architectural
  pillar, not an edge feature.

- Capability IDs and routing rules are absent.
  Source evidence:
  `../weaver/docs/adr-001-plugin-capability-model-and-act-extricate.md:56-65`,
  `../weaver/docs/users-guide.md:727-804`.
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

- `act extricate` is visible on the site, but only as a planned surface.
  Source evidence:
  `../weaver/docs/adr-001-plugin-capability-model-and-act-extricate.md:23-27`,
  `../weaver/docs/adr-001-plugin-capability-model-and-act-extricate.md:104-131`,
  `../weaver/docs/rust-extricate-actuator-plugin-technical-design.md:95-122`.
  Why this matters: ADR 001 elevates `act extricate` into the capability model,
  and the Rust technical design specifies a detailed contract. The public site
  now mentions the command, but it still under-documents provider boundaries,
  execution stages, and language-specific limits.

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

- The official roadmap status for Jacquard is now signaled on the site, but the
  linkage back to the source roadmap remains indirect.
  Source evidence: `roadmap.md:782-963`.
  Why this matters: the roadmap shows Jacquard as a substantial future phase.
  The site now marks Jacquard as planned, but it still does not connect that
  future status back to the raw roadmap/source document named in the docs hub.

## Advanced Agent Workflow Gaps

- `weaver project onboard` and `PROJECT.dna` are now mentioned on the roadmap,
  but the command contract is still skeletal.
  Source evidence: `weaver-design.md:2113-2159`, `roadmap.md:742-763`.
  Why this matters: the design treats onboarding and RAG-style summarization as
  a major agent-support feature. The site now names the future command and
  artefact, but it does not explain inputs, determinism constraints, or how the
  generated summary fits the wider operator model.

- Hybrid interactive mode (`--interactive`) is now present on the roadmap, but
  still lacks source-level detail on the public site.
  Source evidence: `weaver-design.md:2260-2263`, `roadmap.md:757-763`.
  Why this matters: this is the actual source-backed place where human approval
  enters the system. The site now acknowledges it as planned, but it does not
  explain its failure modes, timeout behaviour, or relationship to the current
  lock-guarded default.

- Dynamic analysis ingestion is absent.
  Source evidence: `weaver-design.md:2265`, `roadmap.md:765-771`.
  Why this matters: the references position Weaver as eventually fusing more
  than syntax and LSP, but the site roadmap swaps this for a different set of
  future-product narratives.

## CLI Discoverability and Help-Surface Gaps

- The site now covers the roadmap's command discoverability work as planned, not
  shipped.
  Source evidence: `roadmap.md:142-237`, `roadmap.md:278-334`.
  Documented on the site as planned:
  `weaver --help`, `weaver help <topic>`, operation-level `--help`, and
  actionable startup/routing errors.
  Why this matters: the roadmap treats these as explicit UX deliverables for the
  CLI. The remaining gap is implementation status and current availability, not
  documentation absence.

## Documentation and Site-Level Gaps

- The site does not yet expose every supplied design doc as a navigable primary
  source.
  Source evidence: `../weaver/docs/weaver-design.md`,
  `../weaver/docs/adr-001-plugin-capability-model-and-act-extricate.md`,
  `../weaver/docs/sempai-query-language-design.md`,
  `../weaver/docs/jacquard-card-first-symbol-graph-design.md`,
  `../weaver/docs/users-guide.md`, `../weaver/docs/roadmap.md`,
  compared with `weaver/docs/index.html:176-205`.
  Why this matters: the docs hub now links some cards directly to raw source
  files, but other cards still route to site summaries while presenting
  filename-level labels for the underlying source artefacts.

- The site omits several strong operator details already present in the user's
  guide:
  `WEAVERD_BIN`, `WEAVER_FOREGROUND`, socket defaults, health snapshots, plugin
  binary requirements, and missing-language-server diagnostics.
  Source evidence: `users-guide.md:175-217`, `users-guide.md:830-855`.
  Why this matters: those are the kinds of details a real operator reaches for
  first.

## Priority Recommendations

1. Keep the real domain-and-operation surfaces, then add the missing discovery
   and troubleshooting detail from `users-guide.md` on top.
2. Deepen the `--capabilities` story with real output, routing examples, and
   failure interpretation instead of mentioning the probe only in passing.
3. Surface `act extricate`, plugin routing, and current provider boundaries,
   because they are prominent in ADR 001 and the Rust technical design.
4. Turn the docs hub into a uniform index of actual source documents instead of
   mixing raw source links with summary pages under source-doc filenames.
5. Make planned status explicit when a page is primarily based on future design
   work, especially for Jacquard and advanced agent workflows.
