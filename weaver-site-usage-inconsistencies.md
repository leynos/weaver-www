# Weaver Site Usage Inconsistencies

## Scope

This document compares the user interface and usage model presented by the site
under `weaver/` with the interface and workflows documented in the supplied
design docs, ADRs, roadmap, and user's guide under `../weaver/docs/`.

The focus is on inconsistencies in:

- CLI shape and example commands.
- Configuration and protocol UI.
- Safety and workflow semantics.
- Documentation/navigation behaviour that implies a different operator model.

## 1. CLI Shape Mismatches

- Site UI: `observe` is presented as `weaver observe [OPTIONS] <PATH>...`, with
  examples such as `weaver observe src/lib.rs`, `weaver observe .`, and
  `weaver observe . --symbol "connect_db"`.
  Site evidence: `weaver/commands/observe/index.html:163-173`,
  `weaver/commands/observe/index.html:248-323`,
  `weaver/install/index.html:293-296`.
  Source UI: the user's guide documents `weaver <domain> <operation> [ARG ...]`
  with concrete `observe` operations such as `get-definition`,
  `find-references`, `call-hierarchy`, and `grep`.
  Source evidence: `users-guide.md:322-468`.
  Impact: the site teaches a path-oriented monolithic `observe` command, while
  the documented interface is an operation-oriented command family.

- Site UI: `act` is presented as a proposal workflow with `propose`, `apply`,
  `--id`, `--sandbox-level`, and `--timeout`.
  Site evidence: `weaver/commands/act/index.html:174-223`,
  `weaver/commands/act/index.html:275-360`.
  Source UI: the supplied docs describe `act apply-patch`, `act apply-rewrite`,
  `act refactor`, and the design surface `act extricate`.
  Source evidence: `users-guide.md:494-567`,
  `adr-001...md:108-131`,
  `rust-extricate-actuator-plugin-technical-design.md:99-122`.
  Impact: the site documents a command family that the supplied references do
  not define.

- Site UI: patch application examples use `weaver act --patch diff.patch` or
  `weaver act --patch refactor.diff`.
  Site evidence: `weaver/commands/index.html:231-235`,
  `weaver/commands/index.html:335-348`.
  Source UI: the user's guide and design docs specify
  `weaver act apply-patch < patch.diff`.
  Source evidence: `users-guide.md:494-518`,
  `weaver-design.md:1557-1579`,
  `roadmap.md:719-740`.
  Impact: the site points users at the wrong syntax for one of the most
  concrete write operations in the system.

- Site UI: free-form actuation examples such as `weaver act "Fix typo in
  lib.rs"` and `weaver act --dry-run "Refactor error handling"`.
  Site evidence: `weaver/install/index.html:305-308`,
  `weaver/index.html:279-288`.
  Source UI: the references document explicit operations and arguments, not a
  natural-language `act` command surface.
  Source evidence: `users-guide.md:494-567`,
  `rust-extricate-actuator-plugin-technical-design.md:102-121`.
  Impact: the site makes Weaver look like a prompt-driven executor instead of a
  structured domain/operation CLI.

- Site UI: `verify` is presented as `weaver verify [OPTIONS] <TARGET>`, with
  examples like `weaver verify --test unit` and `weaver verify --strict`.
  Site evidence: `weaver/commands/verify/index.html:172-217`,
  `weaver/commands/index.html:246-253`,
  `weaver/install/index.html:317-320`.
  Source UI: the current user's guide documents `weaver verify diagnostics
  --uri <URI>`.
  Source evidence: `users-guide.md:470-492`.
  Impact: the site teaches a build/test/policy runner that is not the documented
  current verify interface.

## 2. Global Flags and Config UI Mismatches

- Site UI: global flags are shown as `--json`, `--verbose`, `--config`, and
  `--socket`.
  Site evidence: `weaver/commands/index.html:393-413`.
  Source UI: the user's guide documents `--output`, `--config-path`,
  `--daemon-socket`, `--log-filter`, `--log-format`, and
  `--capability-overrides`.
  Source evidence: `users-guide.md:22-37`, `users-guide.md:254-259`.
  Impact: operators reading the site will learn a different flag vocabulary from
  the one documented in the source references.

- Site UI: install flow tells users to run `weaver init --default`.
  Site evidence: `weaver/install/index.html:225-239`.
  Source UI: no such command is documented in the supplied user's guide or
  design docs; configuration is described through file discovery, flags, env
  vars, and explicit config files.
  Source evidence: `users-guide.md:8-84`, `weaver-design.md:923-968`.
  Impact: this is a concrete onboarding instruction with no support in the
  supplied references.

- Site UI: daemon start examples use `--detach` and `--background`.
  Site evidence: `weaver/install/index.html:247-264`,
  `weaver/how-it-works/index.html:293-295`.
  Source UI: the user's guide documents `weaver daemon start`, with foreground
  behaviour controlled by environment rather than advertised `--detach` or
  `--background` flags.
  Source evidence: `users-guide.md:168-217`,
  `weaver-design.md:418-449`.
  Impact: the site again teaches a command syntax that does not match the source
  docs.

- Site UI: the docs page shows a nested config file shape with `[daemon]`,
  `[lsp]`, and `[sandbox]`.
  Site evidence: `weaver/docs/index.html:214-241`.
  Source UI: the user's guide documents top-level `daemon_socket`, `log_filter`,
  `log_format`, and repeated `[[capability_overrides]]`.
  Source evidence: `users-guide.md:50-65`.
  Impact: the site's configuration UI is not just simplified; it is a different
  schema.

## 3. Protocol and Output UI Mismatches

- Site UI: the docs page presents a JSONL protocol schema built around
  `event_id`, `timestamp`, `payload.type`, and `provenance`.
  Site evidence: `weaver/docs/index.html:249-287`.
  Source UI: the user's guide documents daemon responses with `kind`, `stream`,
  `data`, and terminal `exit` frames.
  Source evidence: `users-guide.md:245-275`.
  Impact: the site shows users and integrators the wrong wire-format model.

- Site UI: `observe` examples stream ad hoc event types like `file`, `symbol`,
  and `match`, while `verify` examples stream `start`, `check`, and `summary`.
  Site evidence: `weaver/commands/observe/index.html:256-323`,
  `weaver/commands/verify/index.html:393-404`.
  Source UI: the supplied references describe domain operations and example
  payloads differently, and do not standardize on the event types the site
  invents.
  Source evidence: `users-guide.md:266-271`, `users-guide.md:366-467`,
  `sempai-query-language-design.md:897-929`,
  `jacquard-card-first-symbol-graph-design.md:794-830`.
  Impact: the site mock payloads imply a public output contract that is not the
  documented one.

- Site UI: the client card says the CLI handles user authentication.
  Site evidence: `weaver/how-it-works/index.html:307-319`.
  Source UI: nothing in the supplied references documents user authentication as
  part of the CLI/daemon contract.
  Source evidence: `weaver-design.md:343-414`, `users-guide.md:218-275`.
  Impact: this is an unexplained extra UI concept with no support in the source
  material.

## 4. Safety and Approval Model Mismatches

- Site UI: the safety page defines Double-Lock as Birdcage plus Policy
  Verification.
  Site evidence: `weaver/safety/index.html:137-139`,
  `weaver/safety/index.html:157-223`.
  Source UI: the user's guide and design docs define Double-Lock as Syntactic
  Lock plus Semantic Lock, with the sandbox as a separate execution boundary.
  Source evidence: `users-guide.md:857-924`,
  `weaver-design.md:1387-1459`.
  Impact: this is the biggest conceptual UI mismatch on the site because it
  changes what the product claims to verify.

- Site UI: actions are always staged, proposed, reviewed, and then applied.
  Site evidence: `weaver/commands/act/index.html:167-210`,
  `weaver/commands/act/index.html:275-360`,
  `weaver/why-weaver/index.html:237-243`.
  Source UI: the supplied references describe lock-guarded actuation and only
  plan human approval as a future interactive mode.
  Source evidence: `weaver-design.md:1725-1803`,
  `weaver-design.md:2260-2263`, `roadmap.md:757-763`.
  Impact: the site substitutes a proposal-review UI for the documented safety
  harness.

- Site UI: the verify page makes provenance validation a first-class verify
  layer.
  Site evidence: `weaver/commands/verify/index.html:233-303`.
  Source UI: the current user's guide documents `verify diagnostics` and
  Double-Lock verification. Provenance-heavy validation belongs more to design
  direction and Jacquard history than to a current `verify` command contract.
  Source evidence: `users-guide.md:470-492`,
  `users-guide.md:857-924`,
  `jacquard-card-first-symbol-graph-design.md:522-560`.
  Impact: the site front-loads a richer verify UX than the documented interface
  supports.

## 5. Binary Names and Runtime Naming

- Site UI: the daemon binary is labeled `weaver-d`.
  Site evidence: `weaver/how-it-works/index.html:274-289`.
  Source UI: the design docs and user's guide consistently use `weaverd`.
  Source evidence: `weaver-design.md:335-360`,
  `weaver-design.md:915-916`,
  `users-guide.md:104-153`.
  Impact: even small naming drift like this creates friction when readers move
  from the site to the real docs or terminal.

## 6. Docs Hub and Navigation Inconsistencies

- Site UI: the docs hub advertises "RFC-001: Semantic Fusion" and
  "RFC-004: Double-Lock Sandbox" cards as if they are browsable documents.
  Site evidence: `weaver/docs/index.html:176-205`.
  Source UI: the supplied references are ADRs, technical designs, the user's
  guide, and the roadmap under `../weaver/docs/`; the site cards are placeholders
  with `href="#"`.
  Source evidence: the supplied doc list itself and `weaver/docs/index.html:183-194`.
  Impact: the documentation UI implies navigable primary sources but does not
  expose the actual ones.

- Site UI: the docs hub includes a search field and TOC-like secondary nav.
  Site evidence: `weaver/docs/index.html:114-159`.
  Source UI: the supplied references do not describe a site-search or docs-app
  interface. This would be fine if it worked as a site feature, but the local
  tree contains no corresponding docs-search behaviour.
  Source evidence: site inspection plus `weaver/assets/js/mobile-nav.js`.
  Impact: the docs UI implies a richer documentation application than the site
  currently implements.

- Site UI: `weaver/design-language/index.html` exists, but the visible IA does
  not link to it.
  Site evidence: reachable file tree under `weaver/` and no inbound links from
  the main site pages.
  Source UI: the Sempai page cites the design language as a basis for the page
  treatment.
  Source evidence: `weaver/sempai/index.html:468-470`.
  Impact: a referenced piece of documentation is effectively outside the site's
  usable navigation model.

## 7. Roadmap UI Mismatches

- Site UI: the public roadmap is a product-marketing timeline with versions,
  quarters, and cards such as `weaver status --watch`, macOS menu bar
  indicator, multi-repo fusion, Jacquard as a visual debugger, and native IDE
  plugins.
  Site evidence: `weaver/roadmap/index.html:139-349`.
  Source UI: the official roadmap is a numbered execution plan organized by
  foundation, syntax/graph work, Sempai, plugin platform, advanced workflows,
  and Jacquard phases.
  Source evidence: `roadmap.md:21-963`.
  Impact: the site roadmap is not just abbreviated; it teaches a different
  planning surface and different milestone vocabulary.

## Summary

The site consistently documents a more cinematic, prompt-oriented, proposal-
driven UI than the one described in the design sources. The official references
describe a structured domain/operation CLI, capability-aware routing, explicit
transport/config contracts, and a Double-Lock model built from syntactic plus
semantic verification. The site instead presents a friendlier but materially
different command grammar, safety story, config surface, and docs application.

If the site is meant to be authoritative, it needs to converge on the real
command and protocol contracts. If it is meant to be aspirational, it needs much
clearer "planned" labeling so readers do not mistake design fiction for the
current operator interface.
