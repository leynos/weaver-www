import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const outputRoot = process.env.WEAVER_OUTPUT_DIR ?? "weaver";

function normalizeBasePath(value) {
  if (!value || value === "/") {
    return "";
  }

  const trimmed = value.replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}` : "";
}

const basePath = normalizeBasePath(process.env.WEAVER_BASE_PATH ?? "/weaver/");

const sourcePages = [
  {
    source: "example_html/12-Command by - Home.html",
    route: "",
  },
  {
    source: "example_html/1-Command by - Philosophy.html",
    route: "why-weaver",
  },
  {
    source: "example_html/2-Command by - Architecture.html",
    route: "how-it-works",
  },
  {
    source: "example_html/3-Command by - Command Reference.html",
    route: "commands",
  },
  {
    source: "example_html/4-Command by - Double-Lock & San.html",
    route: "safety",
  },
  {
    source: "example_html/5-Command by - Jacquard Symbol C.html",
    route: "jacquard",
  },
  {
    source: "example_html/6-Command by - Installation & Qu.html",
    route: "install",
  },
  {
    source: "example_html/7-Command by - Documentation.html",
    route: "docs",
  },
  {
    source: "example_html/8-Command by - Command: observe.html",
    route: "commands/observe",
  },
  {
    source: "example_html/9-Command by - Command: act.html",
    route: "commands/act",
  },
  {
    source: "example_html/10-Command by - Roadmap.html",
    route: "roadmap",
  },
  {
    source: "example_html/11-Command by - Command: verify.html",
    route: "commands/verify",
  },
  {
    source: "example_html/13-Command by - Sempai White Paper.html",
    route: "sempai",
  },
  {
    source: "Weaver Design Language 2.html",
    route: "design-language",
  },
];

const routeMap = new Map([
  ["/", `${basePath}/` || "/"],
  ["/why-weaver", `${basePath}/why-weaver/`],
  ["/how-it-works", `${basePath}/how-it-works/`],
  ["/commands", `${basePath}/commands/`],
  ["/commands/observe", `${basePath}/commands/observe/`],
  ["/commands/act", `${basePath}/commands/act/`],
  ["/commands/verify", `${basePath}/commands/verify/`],
  ["/safety", `${basePath}/safety/`],
  ["/sempai", `${basePath}/sempai/`],
  ["/jacquard", `${basePath}/jacquard/`],
  ["/install", `${basePath}/install/`],
  ["/docs", `${basePath}/docs/`],
  ["/roadmap", `${basePath}/roadmap/`],
  ["/design-language", `${basePath}/design-language/`],
]);

const assetCopies = [
  {
    source: "styles/weaver-site.css",
    destination: path.join(outputRoot, "assets/styles/weaver-site.css"),
  },
  {
    source: "image_out/sempai-whitepaper-pipeline.png",
    destination: path.join(outputRoot, "assets/sempai/sempai-whitepaper-pipeline.png"),
  },
  {
    source: "image_out/sempai-whitepaper-pattern-compilation.png",
    destination: path.join(outputRoot, "assets/sempai/sempai-whitepaper-pattern-compilation.png"),
  },
  {
    source: "image_out/sempai-whitepaper-evaluation.png",
    destination: path.join(outputRoot, "assets/sempai/sempai-whitepaper-evaluation.png"),
  },
  {
    source: "image_out/jacquard-whitepaper-card-slice.png",
    destination: path.join(outputRoot, "assets/jacquard/jacquard-whitepaper-card-slice.png"),
  },
  {
    source: "image_out/jacquard-whitepaper-entity-interstitial.png",
    destination: path.join(outputRoot, "assets/jacquard/jacquard-whitepaper-entity-interstitial.png"),
  },
  {
    source: "image_out/jacquard-whitepaper-history-matching.png",
    destination: path.join(outputRoot, "assets/jacquard/jacquard-whitepaper-history-matching.png"),
  },
  {
    source: "image_out/home-hero-loom-architecture.png",
    destination: path.join(outputRoot, "assets/home/home-hero-loom-architecture.png"),
  },
  {
    source: "image_out/home-sempai-query-pipeline.png",
    destination: path.join(outputRoot, "assets/home/home-sempai-query-pipeline.png"),
  },
  {
    source: "image_out/image_out/why-weaver-open-interfaces.png",
    destination: path.join(outputRoot, "assets/why-weaver/why-weaver-open-interfaces.png"),
  },
  {
    source: "image_out/image_out/how-it-works-system-topology.png",
    destination: path.join(outputRoot, "assets/how-it-works/how-it-works-system-topology.png"),
  },
  {
    source: "image_out/image_out/commands-end-to-end-pipeline.png",
    destination: path.join(outputRoot, "assets/commands/commands-end-to-end-pipeline.png"),
  },
  {
    source: "image_out/image_out/observe-data-fusion.png",
    destination: path.join(outputRoot, "assets/observe/observe-data-fusion.png"),
  },
  {
    source: "image_out/image_out/act-birdcage-sandbox.png",
    destination: path.join(outputRoot, "assets/act/act-birdcage-sandbox.png"),
  },
  {
    source: "image_out/image_out/verify-verification-stack.png",
    destination: path.join(outputRoot, "assets/verify/verify-verification-stack.png"),
  },
  {
    source: "image_out/imported/safety-double-lock-architecture.png",
    destination: path.join(outputRoot, "assets/safety/safety-double-lock-architecture.png"),
  },
  {
    source: "image_out/imported/observe-hero-outline.png",
    destination: path.join(outputRoot, "assets/observe/observe-hero-outline.png"),
  },
  {
    source: "image_out/imported/act-hero-outline.png",
    destination: path.join(outputRoot, "assets/act/act-hero-outline.png"),
  },
  {
    source: "image_out/imported/verify-hero-outline.png",
    destination: path.join(outputRoot, "assets/verify/verify-hero-outline.png"),
  },
];

await rm(outputRoot, { force: true, recursive: true });

function rewriteInternalHref(value) {
  if (!value.startsWith("/") || value.startsWith("//")) {
    return value;
  }

  if (value === "/weaver" || value.startsWith("/weaver/")) {
    const suffix = value.slice("/weaver".length);
    return `${basePath}${suffix || "/"}` || "/";
  }

  const suffixIndex = value.search(/[?#]/);
  const pathname = suffixIndex === -1 ? value : value.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? "" : value.slice(suffixIndex);

  return `${routeMap.get(pathname) ?? value}${suffix}`;
}

function injectSharedStylesheet(html) {
  const stylesheetHref = `${basePath || ""}/assets/styles/weaver-site.css` || "/assets/styles/weaver-site.css";
  const stylesheetLink = `<link rel="stylesheet" href="${stylesheetHref}">`;

  if (html.includes(stylesheetLink)) {
    return html;
  }

  return html.replace("</head>", `    ${stylesheetLink}\n</head>`);
}

const sharedSelectors = [
  "::-webkit-scrollbar",
  "::-webkit-scrollbar-track",
  "::-webkit-scrollbar-thumb",
  "body",
  ".grid-bg",
  ".stamp-rotate",
  ".texture-overlay",
  ".writing-vertical-rl",
  ".paper-panel",
  ".figure-frame",
  ".spec-table td, .spec-table th",
  "pre code",
  "code",
];

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripSharedInlineCss(html) {
  let stripped = html;

  for (const selector of [...sharedSelectors].sort((left, right) => right.length - left.length)) {
    const pattern = new RegExp(`${escapeRegex(selector)}\\s*\\{[\\s\\S]*?\\}\\s*`, "g");
    stripped = stripped.replace(pattern, "");
  }

  stripped = stripped.replace(/<style>(\s*)<\/style>/g, "");

  return stripped;
}

function rewritePage(html) {
  const rewrittenLinks = html
    .replace(/href=(["'])([^"'<>]+)\1/g, (match, quote, href) => {
      return `href=${quote}${rewriteInternalHref(href)}${quote}`;
    })
    .replace(/src=(["'])([^"'<>]+)\1/g, (match, quote, src) => {
      return `src=${quote}${rewriteInternalHref(src)}${quote}`;
    });

  return injectSharedStylesheet(stripSharedInlineCss(rewrittenLinks));
}

for (const page of sourcePages) {
  const pageDir = page.route ? path.join(outputRoot, page.route) : outputRoot;
  const outputPath = path.join(pageDir, "index.html");
  const sourceHtml = await readFile(page.source, "utf8");
  const rewrittenHtml = rewritePage(sourceHtml);

  await mkdir(pageDir, { recursive: true });
  await writeFile(outputPath, rewrittenHtml);
}

await writeFile(path.join(outputRoot, ".nojekyll"), "");

for (const asset of assetCopies) {
  await mkdir(path.dirname(asset.destination), { recursive: true });
  await copyFile(asset.source, asset.destination);
}
