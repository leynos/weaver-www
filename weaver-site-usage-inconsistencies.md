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

- The major CLI-shape drift recorded in earlier revisions is largely resolved.
  The command pages, install guide, and homepage preview now use the documented
  `weaver <domain> <operation> [ARG ...]` model for current operations such as
  `observe get-definition`, `act apply-patch`, and `verify diagnostics`.
  Site evidence: `weaver/commands/observe/index.html:178-221`,
  `weaver/commands/act/index.html:166-219`,
  `weaver/commands/verify/index.html:167-215`,
  `weaver/install/index.html:261-337`, `weaver/index.html:262-292`.
  Source evidence: `../weaver/docs/users-guide.md:322-567`.
  Impact: readers now see the correct domain-and-operation structure first. The
  remaining command-shape risk is confined to directional roadmap copy and other
  planned surfaces, not the current operator path.

## 2. Global Flags and Config UI Mismatches

- The earlier flag and configuration drift is largely resolved.
  Site evidence: `weaver/commands/index.html:388-430`,
  `weaver/docs/index.html:264-476`, `weaver/install/index.html:225-272`.
  Source evidence: `../weaver/docs/users-guide.md:8-84`,
  `../weaver/docs/users-guide.md:168-217`,
  `../weaver/docs/users-guide.md:245-259`,
  `../weaver/docs/weaver-design.md:923-968`.
  Impact: the site now teaches the same flag vocabulary, top-level TOML shape,
  XDG discovery, and auto-start path described in the source references. The
  remaining risk is maintenance drift if those shared config details are copied
  back out onto other pages instead of staying centralized in the docs hub.

## 3. Protocol and Output UI Mismatches

- The public JSONL envelope is now aligned on `kind`, `stream`, `data`, and
  terminal `exit` messages.
  Site evidence: `weaver/docs/index.html:487-534`,
  `weaver/commands/act/index.html:297-300`,
  `weaver/commands/verify/index.html:385-396`.
  Source evidence: `../weaver/docs/users-guide.md:245-275`.
  Impact: the docs hub and command pages now teach the same outer transport
  contract as the user's guide. Any nested payload examples should be read as
  operation-specific data inside that envelope, not as a second public protocol.

- Site UI: the client card says the CLI handles user authentication.
  Site evidence: `weaver/how-it-works/index.html:307-319`.
  Source UI: nothing in the supplied references documents user authentication as
  part of the CLI/daemon contract.
  Source evidence: `weaver-design.md:343-414`, `users-guide.md:218-275`.
  Impact: this is an unexplained extra UI concept with no support in the source
  material.

## 4. Safety and Approval Model Mismatches

- The largest safety-model mismatches are also resolved. The safety page now
  defines Double-Lock as syntactic plus semantic validation, the sandbox as a
  separate boundary, and the act page explicitly rejects a proposal-review gate
  for current write operations.
  Site evidence: `weaver/safety/index.html:137-224`,
  `weaver/commands/act/index.html:145-180`,
  `weaver/why-weaver/index.html:225-243`.
  Source evidence: `../weaver/docs/users-guide.md:857-924`,
  `../weaver/docs/weaver-design.md:1387-1459`,
  `../weaver/docs/weaver-design.md:1725-1803`,
  `../weaver/docs/roadmap.md:757-763`.
  Impact: readers now get the right safety contract first. The remaining nuance
  is scope: syntactic and semantic locks apply where Weaver has the relevant
  parser and language-server path, while unsupported file types pass through the
  transaction without full lock coverage.

## 5. Binary Names and Runtime Naming

- No current binary-name drift was found in the public pages reviewed here.
  Site evidence: `weaver/docs/index.html:549-652`,
  `weaver/how-it-works/index.html:269-299`.
  Source evidence: `../weaver/docs/weaver-design.md:335-360`,
  `../weaver/docs/weaver-design.md:915-916`,
  `../weaver/docs/users-guide.md:104-153`.
  Impact: the older `weaver-d` mismatch no longer reproduces on this branch.

## 6. Docs Hub and Navigation Inconsistencies

- Site UI: the docs hub now mixes two behaviours under filename-level card
  labels. Some cards link straight to the raw source docs, while others route to
  summary pages inside the site.
  Site evidence: `weaver/docs/index.html:193-259`.
  Source UI: the supplied references are ADRs, technical designs, the user's
  guide, and the roadmap under `../weaver/docs/`.
  Source evidence: `../weaver/docs/weaver-design.md`,
  `../weaver/docs/adr-001-plugin-capability-model-and-act-extricate.md`,
  `../weaver/docs/sempai-query-language-design.md`,
  `../weaver/docs/jacquard-card-first-symbol-graph-design.md`,
  `../weaver/docs/users-guide.md`, `../weaver/docs/roadmap.md`.
  Impact: readers can now reach more of the real source material, but the docs
  hub still blurs the difference between "raw source document" and "site summary
  of that document."

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

The biggest inconsistencies recorded in earlier revisions are no longer live on
this branch. The public site now matches the source docs much more closely on
CLI shape, config layering, JSONL transport, and the Double-Lock definition.

The remaining mismatches are narrower and more structural: some docs-hub cards
still present summary pages under source-document filenames, the roadmap still
uses a more cinematic planning surface than the official phased execution plan,
and several advanced/plugin-heavy features are still easier to understand from
the source docs than from the site. That is now a documentation-depth problem
more than a fundamental contract mismatch.
