# Weaver CSS Consistency Catalog

This catalog records the CSS inconsistencies found across the generated pages in `weaver/` and the corresponding remediation applied in this change.

| ID | Inconsistency | Affected pages | Remediation |
| --- | --- | --- | --- |
| C1 | Shared site-chrome CSS was duplicated inline per page, which let the base layer drift instead of remaining authoritative. | All `weaver/*.html` pages | Moved the shared base layer into `styles/weaver-site.css`, inject it into every generated page during the build, and strip the shared selectors from generated inline style blocks. |
| C2 | Global chrome behavior diverged: `::selection` styling was not universal, `texture-overlay` positioning and z-index differed, and `writing-vertical-rl` was missing from the design-language page despite being used elsewhere. | Most visible on `weaver/design-language/`; also implicit drift across the rest of the site | Standardized these selectors in the shared stylesheet so every generated page uses the same overlay, selection colors, and vertical writing helper. |
| C3 | Sidebar component styling drifted between pages: active links were not consistently monospace, and inactive install links alternated between accent treatment and neutral styling. | Primary nav pages, roadmap/docs, and the Jacquard white paper | Normalized sidebar state styling in the shared stylesheet so active links render consistently and inactive install links use the same accent treatment. |
| C4 | White-paper component styling was local to individual white papers, with slight differences such as table cell vertical alignment and inline-code treatment. | `weaver/sempai/` and `weaver/jacquard/` | Promoted `paper-panel`, `figure-frame`, `spec-table`, `code`, and `pre code` to the shared stylesheet. |
| C5 | The design-language export carried a page-local overlay/sidebar model instead of inheriting the same site chrome as the rest of Weaver. | `weaver/design-language/` | The build now injects the shared site stylesheet into the design-language page too, which overrides the export drift without requiring a separate visual system. |
