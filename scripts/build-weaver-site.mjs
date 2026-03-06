import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const sourcePages = [
  {
    source: "example_html/12-Command by - Home.html",
    outputDir: "weaver",
  },
  {
    source: "example_html/1-Command by - Philosophy.html",
    outputDir: "weaver/why-weaver",
  },
  {
    source: "example_html/2-Command by - Architecture.html",
    outputDir: "weaver/how-it-works",
  },
  {
    source: "example_html/3-Command by - Command Reference.html",
    outputDir: "weaver/commands",
  },
  {
    source: "example_html/4-Command by - Double-Lock & San.html",
    outputDir: "weaver/safety",
  },
  {
    source: "example_html/5-Command by - Jacquard Symbol C.html",
    outputDir: "weaver/jacquard",
  },
  {
    source: "example_html/6-Command by - Installation & Qu.html",
    outputDir: "weaver/install",
  },
  {
    source: "example_html/7-Command by - Documentation.html",
    outputDir: "weaver/docs",
  },
  {
    source: "example_html/8-Command by - Command: observe.html",
    outputDir: "weaver/commands/observe",
  },
  {
    source: "example_html/9-Command by - Command: act.html",
    outputDir: "weaver/commands/act",
  },
  {
    source: "example_html/10-Command by - Roadmap.html",
    outputDir: "weaver/roadmap",
  },
  {
    source: "example_html/11-Command by - Command: verify.html",
    outputDir: "weaver/commands/verify",
  },
  {
    source: "Weaver Design Language 2.html",
    outputDir: "weaver/design-language",
  },
];

const routeMap = new Map([
  ["/", "/weaver/"],
  ["/why-weaver", "/weaver/why-weaver/"],
  ["/how-it-works", "/weaver/how-it-works/"],
  ["/commands", "/weaver/commands/"],
  ["/commands/observe", "/weaver/commands/observe/"],
  ["/commands/act", "/weaver/commands/act/"],
  ["/commands/verify", "/weaver/commands/verify/"],
  ["/safety", "/weaver/safety/"],
  ["/sempai", "/weaver/sempai/"],
  ["/jacquard", "/weaver/jacquard/"],
  ["/install", "/weaver/install/"],
  ["/docs", "/weaver/docs/"],
  ["/roadmap", "/weaver/roadmap/"],
  ["/design-language", "/weaver/design-language/"],
]);

const generatedAliases = [
  {
    outputDir: "weaver/sempai",
    destination: "/weaver/docs/#semgrep-patterns",
    title: "Sempai Engine - Weaver AI Codebase Tooling",
  },
];

await rm("weaver", { force: true, recursive: true });

function rewriteInternalHref(value) {
  if (!value.startsWith("/") || value.startsWith("//")) {
    return value;
  }

  const suffixIndex = value.search(/[?#]/);
  const pathname = suffixIndex === -1 ? value : value.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? "" : value.slice(suffixIndex);

  return `${routeMap.get(pathname) ?? value}${suffix}`;
}

function rewritePage(html) {
  return html.replace(/href=(["'])([^"'<>]+)\1/g, (match, quote, href) => {
    return `href=${quote}${rewriteInternalHref(href)}${quote}`;
  });
}

for (const page of sourcePages) {
  const outputPath = path.join(page.outputDir, "index.html");
  const sourceHtml = await readFile(page.source, "utf8");
  const rewrittenHtml = rewritePage(sourceHtml);

  await mkdir(page.outputDir, { recursive: true });
  await writeFile(outputPath, rewrittenHtml);
}

for (const alias of generatedAliases) {
  const outputPath = path.join(alias.outputDir, "index.html");
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${alias.title}</title>
  <meta http-equiv="refresh" content="0; url=${alias.destination}">
  <link rel="canonical" href="${alias.destination}">
</head>
<body>
  <p>Redirecting to <a href="${alias.destination}">${alias.destination}</a>.</p>
</body>
</html>
`;

  await mkdir(alias.outputDir, { recursive: true });
  await writeFile(outputPath, html);
}
