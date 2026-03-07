# Weaver Site Claim Benchmark

## Scope

This benchmark compares the public site under `weaver/`, starting from
`weaver/index.html`, against the supplied design documents, ADRs, references,
and roadmap in `../weaver/docs/`.

Assessment labels used below:

- `Aligned`: the site claim is supported by the referenced source material.
- `Partially aligned`: the site captures the direction, but drops important
  qualifiers or collapses planned and implemented behaviour.
- `Overstated`: the claim goes beyond what the design material currently
  supports.
- `Contradicted`: the site describes a different mechanism or interface from the
  source documents.
- `Unverifiable`: the supplied references do not substantiate the claim either
  way.

## Product Positioning

- Claim: Weaver is "a CLI-based toolchain for integrating AI agents with your
  codebase" and is built around a CLI plus daemon split.
  Site evidence: `weaver/index.html:124-126`,
  `weaver/how-it-works/index.html:138-140`,
  `weaver/how-it-works/index.html:261-264`.
  Benchmark: `weaver-design.md:333-374`, `users-guide.md:218-243`.
  Verdict: `Aligned`.
  Notes: The design docs consistently describe a thin CLI client plus long-lived
  daemon architecture.

- Claim: Weaver is "safe, semantic" and combines Tree-sitter and LSP into a
  fusion layer.
  Site evidence: `weaver/index.html:124-126`,
  `weaver/how-it-works/index.html:185-206`,
  `weaver/commands/observe/index.html:137-160`.
  Benchmark: `weaver-design.md:552-568`, `weaver-design.md:1071-1126`,
  `weaver-design.md:1131-1183`, `jacquard-card-first-symbol-graph-design.md:10-23`.
  Verdict: `Aligned`.

- Claim: Weaver "plugs into any LSP-compatible editor or CI pipeline
  seamlessly."
  Site evidence: `weaver/index.html:181-184`.
  Benchmark: `weaver-design.md:343-374`, `weaver-design.md:1071-1126`,
  `users-guide.md:816-855`, `roadmap.md:742-771`.
  Verdict: `Overstated`.
  Notes: The sources support integration with language servers and automation,
  but not a current editor-facing integration surface. Editor plugins are still
  a concept in the site roadmap and a long-term idea in the broader design
  direction, not a documented implemented interface.

## Transport, Runtime, and Configuration

- Claim: Weaver uses JSONL streaming and a client-daemon model over Unix domain
  sockets, with TCP on non-Unix targets.
  Site evidence: `weaver/index.html:219-223`,
  `weaver/how-it-works/index.html:257-295`,
  `weaver/install/index.html:247-264`,
  `weaver/docs/index.html:249-253`.
  Benchmark: `weaver-design.md:376-408`, `weaver-design.md:944-952`,
  `users-guide.md:24-37`, `users-guide.md:88-102`,
  `users-guide.md:168-217`.
  Verdict: `Partially aligned`.
  Notes: The transport defaults are supported. The site is weaker on the actual
  CLI contract, which uses explicit `--daemon-socket`, runtime files, and
  auto-start semantics rather than the simplified examples shown on the site.

- Claim: The daemon maintains an "in-memory graph" or "knowledge graph" of the
  codebase.
  Site evidence: `weaver/how-it-works/index.html:185-188`,
  `weaver/how-it-works/index.html:280-289`,
  `weaver/docs/index.html:300-314`.
  Benchmark: `weaver-design.md:918-920`, `weaver-design.md:1214-1247`,
  `jacquard-card-first-symbol-graph-design.md:94-119`.
  Verdict: `Partially aligned`.
  Notes: The sources do describe semantic fusion, graph generation, and
  relational layers, but they do not define the current operator-facing product
  as an "in-memory graph database." The site turns an internal architectural
  direction into a stronger product claim.

- Claim: The site docs page shows the current configuration contract.
  Site evidence: `weaver/docs/index.html:214-241`.
  Benchmark: `users-guide.md:8-65`, `weaver-design.md:923-968`.
  Verdict: `Contradicted`.
  Notes: The site invents a nested `[daemon]` and `[lsp]` schema with
  `socket_type`, `socket_path`, and `max_memory_mb`, while the user's guide
  documents top-level `daemon_socket`, `log_filter`, `log_format`, and repeated
  `[[capability_overrides]]`.

- Claim: The site docs page shows the current JSONL protocol schema.
  Site evidence: `weaver/docs/index.html:249-287`.
  Benchmark: `users-guide.md:245-275`, `weaver-design.md:376-408`.
  Verdict: `Contradicted`.
  Notes: The site presents `event_id`, `timestamp`, and `payload.type` frames.
  The user's guide documents a `kind`-based envelope with `stream`, `data`, and
  terminal `exit` messages.

## Safety Model

- Claim: Weaver uses `seccomp-bpf`, namespaces, and sandboxing to isolate
  untrusted tooling.
  Site evidence: `weaver/index.html:200-203`,
  `weaver/safety/index.html:157-160`,
  `weaver/safety/index.html:272-309`.
  Benchmark: `weaver-design.md:919`, `weaver-design.md:1897-1932`,
  `users-guide.md:155-166`.
  Verdict: `Aligned`.

- Claim: "Double-Lock" means Birdcage sandbox plus policy verification.
  Site evidence: `weaver/safety/index.html:137-139`,
  `weaver/safety/index.html:157-160`,
  `weaver/safety/index.html:217-223`.
  Benchmark: `weaver-design.md:1387-1459`, `users-guide.md:857-924`.
  Verdict: `Contradicted`.
  Notes: The design docs define Double-Lock as syntactic lock plus semantic lock
  around in-memory edits. Sandboxing is a separate zero-trust execution layer,
  not one of the two locks.

- Claim: Every action is proposed, analyzed, and requires approval or policy
  match before execution.
  Site evidence: `weaver/why-weaver/index.html:237-243`,
  `weaver/commands/act/index.html:167-210`,
  `weaver/commands/act/index.html:275-360`.
  Benchmark: `weaver-design.md:1555-1853`, `users-guide.md:494-567`,
  `roadmap.md:757-763`, `weaver-design.md:2260-2263`.
  Verdict: `Overstated`.
  Notes: Human approval appears only as a planned hybrid interactive mode.
  Current documented actuation is lock-guarded, transactional, and plugin- or
  patch-driven; it is not a proposal-review-apply workflow.

- Claim: Rollback is a first-class behaviour.
  Site evidence: `weaver/why-weaver/index.html:241-243`.
  Benchmark: `weaver-design.md:1505-1515`,
  `rust-extricate-actuator-plugin-technical-design.md:248-249`,
  `roadmap.md:599-603`.
  Verdict: `Aligned`.
  Notes: The sources repeatedly describe rollback and unchanged working trees on
  failure as explicit requirements.

## Command Model

- Claim: Weaver's interface is fundamentally three verbs: `observe`, `act`,
  `verify`.
  Site evidence: `weaver/commands/index.html:125-127`.
  Benchmark: `users-guide.md:220-243`, `users-guide.md:322-341`.
  Verdict: `Partially aligned`.
  Notes: The high-level domain split is correct, but the documented CLI contract
  is `weaver <domain> <operation> [ARG ...]`, not the simpler path-oriented
  syntax shown by the site.

- Claim: `observe` reads files or directories directly and streams structured
  context to stdout.
  Site evidence: `weaver/commands/observe/index.html:159-173`,
  `weaver/commands/observe/index.html:232-323`.
  Benchmark: `users-guide.md:343-468`, `weaver-design.md:1144-1169`.
  Verdict: `Overstated`.
  Notes: The supplied references describe `observe get-definition`,
  `find-references`, `call-hierarchy`, and `grep`, plus planned `query`,
  `get-card`, `graph-slice`, and `graph-history`. The site presents a more
  monolithic `observe <path>` interface than the docs support.

- Claim: `act` exposes proposal-cycle subcommands such as `propose` and
  `apply`.
  Site evidence: `weaver/commands/act/index.html:174-223`,
  `weaver/commands/act/index.html:275-360`.
  Benchmark: `users-guide.md:494-567`,
  `adr-001-plugin-capability-model-and-act-extricate.md:47-63`,
  `rust-extricate-actuator-plugin-technical-design.md:99-122`.
  Verdict: `Contradicted`.
  Notes: The source documents describe `act apply-patch`, `act apply-rewrite`,
  `act refactor`, and `act extricate` as the meaningful command surfaces. The
  proposal-cycle UI is a site invention.

- Claim: `verify` runs tests, linters, policy checks, and provenance validation.
  Site evidence: `weaver/commands/index.html:185-193`,
  `weaver/commands/verify/index.html:145-170`,
  `weaver/commands/verify/index.html:233-303`.
  Benchmark: `users-guide.md:470-492`, `users-guide.md:857-924`.
  Verdict: `Overstated`.
  Notes: The current user's guide documents `verify diagnostics`. The design
  direction absolutely cares about validation, but the site presents a richer,
  more CI-like command surface than the current operator docs do.

- Claim: `act apply-patch`-style behaviour is central to the write path.
  Site evidence: `weaver/commands/index.html:230-238`,
  `weaver/commands/index.html:333-348`.
  Benchmark: `users-guide.md:494-518`, `weaver-design.md:1555-1853`,
  `roadmap.md:713-740`.
  Verdict: `Aligned`.
  Notes: The site gets the importance of patch application right, even though it
  documents the wrong command shape.

## Sempai

- Claim: Sempai is a Semgrep-compatible query engine with a Tree-sitter
  backend, YAML and DSL front doors, limited MVP parity, and Rust/Python/
  TypeScript/Go coverage with optional HCL.
  Site evidence: `weaver/sempai/index.html:146-167`,
  `weaver/sempai/index.html:176-182`,
  `weaver/sempai/index.html:337-345`,
  `weaver/sempai/index.html:375-389`.
  Benchmark: `adr-002...md:99-105`, `adr-003...md:100-133`,
  `sempai-query-language-design.md:17-30`,
  `sempai-query-language-design.md:103-178`,
  `sempai-query-language-design.md:859-951`.
  Verdict: `Aligned`.

- Claim: The Sempai CLI surface is `weaver observe query` with rule-file, inline
  rule, or DSL options.
  Site evidence: `weaver/sempai/index.html:335-345`.
  Benchmark: `sempai-query-language-design.md:861-875`,
  `sempai-query-language-design.md:1146-1153`.
  Verdict: `Aligned`.

## Jacquard

- Claim: Jacquard centers on symbol cards, bounded slices, graph history, and
  probabilistic matching with explicit ambiguity and budgets.
  Site evidence: `weaver/jacquard/index.html:120-126`,
  `weaver/jacquard/index.html:143-168`,
  `weaver/jacquard/index.html:257-271`,
  `weaver/jacquard/index.html:281-294`,
  `weaver/jacquard/index.html:351-386`,
  `weaver/jacquard/index.html:397-419`.
  Benchmark: `jacquard-card-first-symbol-graph-design.md:5-23`,
  `jacquard-card-first-symbol-graph-design.md:50-67`,
  `jacquard-card-first-symbol-graph-design.md:424-438`,
  `jacquard-card-first-symbol-graph-design.md:522-560`,
  `jacquard-card-first-symbol-graph-design.md:584-605`,
  `jacquard-card-first-symbol-graph-design.md:783-838`,
  `jacquard-card-first-symbol-graph-design.md:1003-1035`.
  Verdict: `Aligned`.

- Claim: Jacquard is already the "Preview Concept" of a visual debugging
  interface for agent cognition.
  Site evidence: `weaver/roadmap/index.html:279-299`.
  Benchmark: `jacquard-card-first-symbol-graph-design.md:45-46`,
  `roadmap.md:773-963`.
  Verdict: `Overstated`.
  Notes: The reference docs describe Jacquard as a family of `observe`
  operations and structured JSONL payloads. A visual debugger is site-level
  framing, not the actual documented product surface.

## Documentation and Roadmap Framing

- Claim: The docs hub accurately fronts the available design material.
  Site evidence: `weaver/docs/index.html:176-205`.
  Benchmark: the supplied docs list itself.
  Verdict: `Partially aligned`.
  Notes: The categories are directionally reasonable, but the design-doc cards
  are placeholders (`href="#"`) and use invented RFC names rather than linking
  to the actual ADRs and design docs under `../weaver/docs/`.

- Claim: The site roadmap reflects the product roadmap.
  Site evidence: `weaver/roadmap/index.html:139-349`.
  Benchmark: `roadmap.md:21-963`, `weaver-design.md:2161-2265`.
  Verdict: `Partially aligned`.
  Notes: Both roadmaps point toward richer daemon UX, plugin ecosystems,
  Jacquard, and advanced agent support. The site version, however, replaces the
  official phased plan with a marketing roadmap that introduces different
  milestones, versioning, and UI concepts.

## Overall Conclusion

The site is strongest when it summarizes architectural direction: CLI plus
daemon, JSONL transport, Tree-sitter plus LSP fusion, sandboxing with
`seccomp-bpf`, Semgrep-compatible Sempai, and Jacquard's cards/slices/history
model all have real support in the supplied references.

The weakest areas are the command surface and the meaning of "Double-Lock". The
site repeatedly turns planned, abstract, or speculative behaviour into a
current-looking user interface: proposal-cycle `act` commands, generic
path-oriented `observe`, build-and-test `verify`, policy-engine-as-second-lock,
and a configuration/protocol schema that does not match the user's guide. Those
areas should be treated as documentation debt, not just copy drift.
