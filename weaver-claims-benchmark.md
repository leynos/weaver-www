# Weaver Website Claims Benchmark

## Scope

This benchmark compares the claims made by the static website under
`weaver/`, starting from `weaver/index.html`, against the referenced
Weaver design documents in `../weaver/docs/`.

Verdict levels used here:

- `Supported`: the claim is materially backed by the design sources.
- `Partially supported`: the claim reflects the design direction, but the
  website overstates maturity, scope, or certainty.
- `Unsupported or conflicting`: the claim is not backed by the current
  design sources, or it contradicts the documented current interface and
  roadmap.

## Supported Claims

### 1. Weaver is a CLI and daemon toolchain built around JSONL

Verdict: `Supported`

The home page presents Weaver as a CLI-centred toolchain and says JSONL is
the transport for agent-facing output
([weaver/index.html](/data/leynos/Projects/weaver-www/weaver/index.html#L125),
[weaver/index.html](/data/leynos/Projects/weaver-www/weaver/index.html#L221)).
That matches the main design, which defines Weaver as composable
UNIX-style primitives using JSON Lines as the native protocol and a thin
CLI client over a daemon-backed transport
([../weaver/docs/weaver-design.md](/data/leynos/Projects/weaver/docs/weaver-design.md#L15),
[../weaver/docs/weaver-design.md](/data/leynos/Projects/weaver/docs/weaver-design.md#L333),
[../weaver/docs/users-guide.md](/data/leynos/Projects/weaver/docs/users-guide.md#L220),
[../weaver/docs/users-guide.md](/data/leynos/Projects/weaver/docs/users-guide.md#L247)).

### 2. Weaver fuses LSP, Tree-sitter, and a relational graph layer

Verdict: `Supported`

The architecture page and home page describe a "Semantic Fusion Engine"
that combines Tree-sitter and LSP signals
([weaver/index.html](/data/leynos/Projects/weaver-www/weaver/index.html#L183),
[weaver/how-it-works/index.html](/data/leynos/Projects/weaver-www/weaver/how-it-works/index.html#L185),
[weaver/how-it-works/index.html](/data/leynos/Projects/weaver-www/weaver/how-it-works/index.html#L197)).
The design sources describe the same three-layer model: LSP for semantic
inspection, Tree-sitter for syntactic structure, and a relational layer for
call-graph and graph-derived context
([../weaver/docs/weaver-design.md](/data/leynos/Projects/weaver/docs/weaver-design.md#L24),
[../weaver/docs/weaver-design.md](/data/leynos/Projects/weaver/docs/weaver-design.md#L565),
[../weaver/docs/jacquard-card-first-symbol-graph-design.md](/data/leynos/Projects/weaver/docs/jacquard-card-first-symbol-graph-design.md#L12)).

### 3. Safety model: sandbox plus Double-Lock

Verdict: `Supported`

The site repeatedly claims a Birdcage sandbox plus Double-Lock control
model, including seccomp-bpf-based confinement
([weaver/index.html](/data/leynos/Projects/weaver-www/weaver/index.html#L202),
[weaver/safety/index.html](/data/leynos/Projects/weaver-www/weaver/safety/index.html#L138),
[weaver/safety/index.html](/data/leynos/Projects/weaver-www/weaver/safety/index.html#L159)).
That is consistent with the design, which specifies a zero-trust sandbox
and a two-phase safety harness using Tree-sitter and LSP checks before
commit
([../weaver/docs/weaver-design.md](/data/leynos/Projects/weaver/docs/weaver-design.md#L32),
[../weaver/docs/weaver-design.md](/data/leynos/Projects/weaver/docs/weaver-design.md#L1387),
[../weaver/docs/users-guide.md](/data/leynos/Projects/weaver/docs/users-guide.md#L857)).

### 4. Sempai is intended as a Semgrep-compatible, Tree-sitter-backed query engine

Verdict: `Supported`

The Sempai page describes a Semgrep-shaped query language lowered into a
normalised model and executed against Tree-sitter
([weaver/sempai/index.html](/data/leynos/Projects/weaver-www/weaver/sempai/index.html#L103),
[weaver/sempai/index.html](/data/leynos/Projects/weaver-www/weaver/sempai/index.html#L146),
[weaver/index.html](/data/leynos/Projects/weaver-www/weaver/index.html#L334)).
That aligns with ADR 002, ADR 003, and the technical design, all of which
choose a Semgrep-compatible front-end with Tree-sitter-backed execution and
an escape hatch for raw Tree-sitter queries
([../weaver/docs/adr-002-query-language-for-feature-extraction-in-weaver.md](/data/leynos/Projects/weaver/docs/adr-002-query-language-for-feature-extraction-in-weaver.md#L101),
[../weaver/docs/adr-003-sempai-semgrep-compatible-query-engine.md](/data/leynos/Projects/weaver/docs/adr-003-sempai-semgrep-compatible-query-engine.md#L104),
[../weaver/docs/sempai-query-language-design.md](/data/leynos/Projects/weaver/docs/sempai-query-language-design.md#L3),
[../weaver/docs/sempai-query-language-design.md](/data/leynos/Projects/weaver/docs/sempai-query-language-design.md#L865)).

### 5. Jacquard: cards, slices, and history

Verdict: `Supported`

The Jacquard page says the system centres on deterministic symbol cards,
bounded graph slices, and recent-commit history matching
([weaver/jacquard/index.html](/data/leynos/Projects/weaver-www/weaver/jacquard/index.html#L103),
[weaver/jacquard/index.html](/data/leynos/Projects/weaver-www/weaver/jacquard/index.html#L147),
[weaver/jacquard/index.html](/data/leynos/Projects/weaver-www/weaver/jacquard/index.html#L283)).
That is faithful to the Jacquard design and roadmap phase 7
([../weaver/docs/jacquard-card-first-symbol-graph-design.md](/data/leynos/Projects/weaver/docs/jacquard-card-first-symbol-graph-design.md#L41),
[../weaver/docs/jacquard-card-first-symbol-graph-design.md](/data/leynos/Projects/weaver/docs/jacquard-card-first-symbol-graph-design.md#L776),
[../weaver/docs/roadmap.md](/data/leynos/Projects/weaver/docs/roadmap.md#L773)).

## Partially Supported Claims

### 6. "Plug into any LSP-compatible editor or CI pipeline seamlessly"

Verdict: `Partially supported`

The home page claims broad, seamless integration with any LSP-compatible
editor or CI pipeline
([weaver/index.html](/data/leynos/Projects/weaver-www/weaver/index.html#L183)).
The source docs do support CI-friendly CLI usage and process-based LSP
integration, but they describe capability negotiation, language-specific
workarounds, and explicit daemon orchestration rather than editor-agnostic
drop-in support
([../weaver/docs/weaver-design.md](/data/leynos/Projects/weaver/docs/weaver-design.md#L163),
[../weaver/docs/weaver-design.md](/data/leynos/Projects/weaver/docs/weaver-design.md#L917),
[../weaver/docs/users-guide.md](/data/leynos/Projects/weaver/docs/users-guide.md#L828)).
The claim captures the intent, but "any" and "seamlessly" are stronger than
the documented contract.

### 7. The installation model is a single Cargo-installed binary with daemon support

Verdict: `Partially supported`

The install page says Weaver is distributed as a single Cargo-installed
binary that includes both CLI and daemon behaviour
([weaver/install/index.html](/data/leynos/Projects/weaver-www/weaver/install/index.html#L134),
[weaver/install/index.html](/data/leynos/Projects/weaver-www/weaver/install/index.html#L208)).
The design does document a CLI executable plus daemon runtime, but it does
not establish this website language as a release or packaging guarantee; it
also documents platform-dependent socket handling and shared runtime paths
rather than a simplified "single binary" operational story
([../weaver/docs/weaver-design.md](/data/leynos/Projects/weaver/docs/weaver-design.md#L915),
[../weaver/docs/weaver-design.md](/data/leynos/Projects/weaver/docs/weaver-design.md#L944),
[../weaver/docs/users-guide.md](/data/leynos/Projects/weaver/docs/users-guide.md#L298)).

### 8. The roadmap page reflects the project's forward plan

Verdict: `Partially supported`

The roadmap page does point to future work on daemon UX, multi-repo context,
and Jacquard
([weaver/roadmap/index.html](/data/leynos/Projects/weaver-www/weaver/roadmap/index.html#L236),
[weaver/roadmap/index.html](/data/leynos/Projects/weaver-www/weaver/roadmap/index.html#L257),
[weaver/roadmap/index.html](/data/leynos/Projects/weaver-www/weaver/roadmap/index.html#L285)).
Those themes overlap with the design roadmap's focus on daemon UX, graph
enrichment, and advanced agent support, but the website converts the plan
into invented version numbers, quarters, and feature packaging that the
actual roadmap does not commit to
([../weaver/docs/roadmap.md](/data/leynos/Projects/weaver/docs/roadmap.md#L335),
[../weaver/docs/roadmap.md](/data/leynos/Projects/weaver/docs/roadmap.md#L699),
[../weaver/docs/roadmap.md](/data/leynos/Projects/weaver/docs/roadmap.md#L742)).

## Unsupported or Conflicting Claims

### 9. Site overstates the current `observe` surface

Verdict: `Unsupported or conflicting`

The `observe` page documents `weaver observe [OPTIONS] <PATH>...`,
directory-recursion flags, `--symbol`, `--with-lsp`, and format switches
([weaver/commands/observe/index.html](/data/leynos/Projects/weaver-www/weaver/commands/observe/index.html#L160),
[weaver/commands/observe/index.html](/data/leynos/Projects/weaver-www/weaver/commands/observe/index.html#L166),
[weaver/commands/observe/index.html](/data/leynos/Projects/weaver-www/weaver/commands/observe/index.html#L190)).
The user guide instead defines the current CLI around explicit operations
such as `observe get-definition`, `observe find-references`, and
`observe call-hierarchy`; even `observe grep` is described as illustrative
until fully wired into the daemon
([../weaver/docs/users-guide.md](/data/leynos/Projects/weaver/docs/users-guide.md#L322),
[../weaver/docs/users-guide.md](/data/leynos/Projects/weaver/docs/users-guide.md#L343),
[../weaver/docs/users-guide.md](/data/leynos/Projects/weaver/docs/users-guide.md#L338)).

### 10. Site invents a current `act propose` / `act apply` UX

Verdict: `Unsupported or conflicting`

The `act` page describes an explicit proposal cycle with `act propose`,
`act apply`, proposal IDs, staged plans, and required human confirmation for
high-impact changes
([weaver/commands/act/index.html](/data/leynos/Projects/weaver-www/weaver/commands/act/index.html#L145),
[weaver/commands/act/index.html](/data/leynos/Projects/weaver-www/weaver/commands/act/index.html#L168),
[weaver/commands/act/index.html](/data/leynos/Projects/weaver-www/weaver/commands/act/index.html#L198),
[weaver/commands/act/index.html](/data/leynos/Projects/weaver-www/weaver/commands/act/index.html#L297)).
The design documents the current `act` surface around `apply-patch`,
`apply-rewrite`, `refactor`, and the planned `act extricate`; an interactive
approval mode is a future roadmap item, not the default current interface
([../weaver/docs/weaver-design.md](/data/leynos/Projects/weaver/docs/weaver-design.md#L1555),
[../weaver/docs/users-guide.md](/data/leynos/Projects/weaver/docs/users-guide.md#L494),
[../weaver/docs/users-guide.md](/data/leynos/Projects/weaver/docs/users-guide.md#L540),
[../weaver/docs/roadmap.md](/data/leynos/Projects/weaver/docs/roadmap.md#L757),
[../weaver/docs/adr-001-plugin-capability-model-and-act-extricate.md](/data/leynos/Projects/weaver/docs/adr-001-plugin-capability-model-and-act-extricate.md#L108)).

### 11. Site overstates the current `verify` surface

Verdict: `Unsupported or conflicting`

The `verify` page says verification spans build and test, policy
enforcement, and provenance validation, with flags such as `--policy`,
`--provenance`, `--strict`, and `--format sarif`
([weaver/commands/verify/index.html](/data/leynos/Projects/weaver-www/weaver/commands/verify/index.html#L169),
[weaver/commands/verify/index.html](/data/leynos/Projects/weaver-www/weaver/commands/verify/index.html#L199),
[weaver/commands/verify/index.html](/data/leynos/Projects/weaver-www/weaver/commands/verify/index.html#L236)).
The user guide documents the current `verify` surface as
`weaver verify diagnostics --uri <URI>` and does not define the site's
broader CLI contract
([../weaver/docs/users-guide.md](/data/leynos/Projects/weaver/docs/users-guide.md#L470)).
The provenance and project-onboarding material exists in the high-level
design as advanced capabilities, not as the current `verify` command UX
([../weaver/docs/weaver-design.md](/data/leynos/Projects/weaver/docs/weaver-design.md#L2079),
[../weaver/docs/roadmap.md](/data/leynos/Projects/weaver/docs/roadmap.md#L749)).

### 12. Site reframes Jacquard as a visual debugger

Verdict: `Unsupported or conflicting`

The roadmap page frames Jacquard as "a visual debugging interface for agent
cognition" and tags it with "React Components"
([weaver/roadmap/index.html](/data/leynos/Projects/weaver-www/weaver/roadmap/index.html#L285),
[weaver/roadmap/index.html](/data/leynos/Projects/weaver-www/weaver/roadmap/index.html#L290),
[weaver/roadmap/index.html](/data/leynos/Projects/weaver-www/weaver/roadmap/index.html#L295)).
The actual Jacquard design is CLI-first and JSONL-first: it defines
`observe get-card`, `observe graph-slice`, and `observe graph-history`
payloads and rollout phases, not a React front end
([../weaver/docs/jacquard-card-first-symbol-graph-design.md](/data/leynos/Projects/weaver/docs/jacquard-card-first-symbol-graph-design.md#L776),
[../weaver/docs/jacquard-card-first-symbol-graph-design.md](/data/leynos/Projects/weaver/docs/jacquard-card-first-symbol-graph-design.md#L783),
[../weaver/docs/jacquard-card-first-symbol-graph-design.md](/data/leynos/Projects/weaver/docs/jacquard-card-first-symbol-graph-design.md#L832)).

### 13. Site roadmap adds unsupported headline features

Verdict: `Unsupported or conflicting`

The website roadmap introduces `weaver status --watch`, a macOS menu-bar
indicator, and native VS Code / IntelliJ plugins
([weaver/roadmap/index.html](/data/leynos/Projects/weaver-www/weaver/roadmap/index.html#L239),
[weaver/roadmap/index.html](/data/leynos/Projects/weaver-www/weaver/roadmap/index.html#L242),
[weaver/roadmap/index.html](/data/leynos/Projects/weaver-www/weaver/roadmap/index.html#L345)).
Those features are not present in the actual roadmap, which instead
prioritises capability discovery, `act extricate`, `apply-patch`,
`onboard-project`, interactive lock review, dynamic analysis ingestion, and
Jacquard's CLI surfaces
([../weaver/docs/roadmap.md](/data/leynos/Projects/weaver/docs/roadmap.md#L635),
[../weaver/docs/roadmap.md](/data/leynos/Projects/weaver/docs/roadmap.md#L713),
[../weaver/docs/roadmap.md](/data/leynos/Projects/weaver/docs/roadmap.md#L749),
[../weaver/docs/roadmap.md](/data/leynos/Projects/weaver/docs/roadmap.md#L782)).

### 14. "System Operational" overstates feature completeness

Verdict: `Unsupported or conflicting`

Multiple pages carry the same "System Operational" and `v0.1.0` footer
language while documenting command families and workflows as if they are all
current
([weaver/index.html](/data/leynos/Projects/weaver-www/weaver/index.html#L94),
[weaver/commands/observe/index.html](/data/leynos/Projects/weaver-www/weaver/commands/observe/index.html#L113),
[weaver/commands/act/index.html](/data/leynos/Projects/weaver-www/weaver/commands/act/index.html#L121),
[weaver/commands/verify/index.html](/data/leynos/Projects/weaver-www/weaver/commands/verify/index.html#L122)).
The design and roadmap still mark large parts of Sempai, plugin capability
discovery, `act extricate`, Jacquard, onboarding, and interactive approval
as planned or partially implemented
([../weaver/docs/roadmap.md](/data/leynos/Projects/weaver/docs/roadmap.md#L447),
[../weaver/docs/roadmap.md](/data/leynos/Projects/weaver/docs/roadmap.md#L538),
[../weaver/docs/roadmap.md](/data/leynos/Projects/weaver/docs/roadmap.md#L635),
[../weaver/docs/roadmap.md](/data/leynos/Projects/weaver/docs/roadmap.md#L749),
[../weaver/docs/roadmap.md](/data/leynos/Projects/weaver/docs/roadmap.md#L782)).

## Overall Assessment

The website is strongest when it describes Weaver's architectural thesis:
CLI plus daemon, JSONL transport, LSP plus Tree-sitter fusion, sandboxing,
Double-Lock verification, Sempai, and Jacquard's basic conceptual shape.

It becomes unreliable when it moves from architecture into current product
surface. The command pages, roadmap, and status framing often convert design
intent or future roadmap items into present-tense product claims. That makes
the site effective as a concept brochure, but materially weaker as a source
of truth for current Weaver behaviour.
