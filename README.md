# houston-zed

A port of [Astro's Houston theme](https://github.com/withastro/houston-vscode) to [Zed](https://zed.dev/).

> Cool blues, minty greens, and soft purples — now in Zed.

The shipped artifact is a single file: `themes/houston.json`. Everything else in this repo is the build pipeline that produces it from a small, named palette.

---

## Install

### Quick (drop-in, no extension)
```bash
bun run build
cp themes/houston.json ~/.config/zed/themes/
```
Open Zed → command palette → `theme selector: toggle` → pick **Houston**.

### Dev extension (full path)
1. `bun run build`
2. In Zed: command palette → `zed: install dev extension` → select this repo's directory.
3. The Extensions page will say "Overridden by dev extension".

This repository is already laid out as a theme-only Zed extension:

* `extension.toml` contains the required manifest fields. The extension ID is `houston-theme`, which follows Zed's theme naming guidance.
* `themes/houston.json` follows Zed's theme schema v0.2.0.
* `LICENSE` is MIT, which is accepted by Zed's extension license requirements.

This project is intended for local dev-extension installation from this repository. It does not include the `zed-industries/extensions` submodule publishing workflow.

---

## Develop

```bash
bun install         # one-time
bun run build       # regenerate themes/houston.json
bun test            # run unit tests
bun run validate    # build + test in one shot (used by pre-commit)
bun run check       # biome lint + format check
bun run format      # biome auto-format
```

### Structure
```
.
├── biome.json
├── bun.lock
├── extension.toml
├── .github
│   └── workflows
│       ├── ci.yml
│       └── release.yml
├── LICENSE
├── package.json
├── README.md
├── scripts
│   └── require-changie-fragment.sh
├── src
│   ├── build.ts
│   ├── judgment-calls.ts
│   ├── map-syntax.ts
│   ├── map-ui.ts
│   ├── palette.ts
│   └── types.ts
├── tests
│   ├── build.test.ts
│   └── palette.test.ts
├── themes
│   └── houston.json
└── tsconfig.json
```

---

## How it works

1. `palette.ts` exports named hex constants (e.g. `mint = "#4bf3c8"`). No file outside `palette.ts` holds a raw hex literal — every other file imports from it.
2. `map-ui.ts` returns a `style` object covering every Zed workspace/editor/terminal/diagnostic key, all wired to palette names.
3. `map-syntax.ts` returns a `syntax` object — Zed's semantic syntax categories mapped to palette names. `judgment-calls.ts` overrides on top.
4. `build.ts` composes them into the schema-v0.2.0 family JSON and writes it.
5. Tests assert: every value is a valid hex, every required UI key is present, accents are distinct, syntax colors all come from the palette (no orphan literals).
6. The pre-commit hook requires a changie fragment for repository changes, then runs `bun run validate` (= `build && test`). To catch drift between the source and the committed JSON, run `bun run build && git diff --exit-code themes/`.

## Release

Releases are tag-driven. Push a version tag that points at a commit already on `main`:

```bash
git tag v0.1.0
git push origin v0.1.0
```

The release workflow uses the installed release GitHub App (`RELEASE_APP_ID` repository variable and `RELEASE_APP_PRIVATE_KEY` repository secret) to batch and merge changie fragments, update `package.json` and `extension.toml` to the tag version, move the tag to the release commit, then create or update the GitHub release from the matching `CHANGELOG.md` section. Bot-triggered tag pushes are skipped so moving the tag does not retrigger the release job.

---

## Credits & attribution

This is a port of **[Houston](https://github.com/withastro/houston-vscode)**, the official VS Code theme by **[The Astro Technology Company](https://astro.build/)**. The original palette, signature mint / lavender / cyan accents, and per-language colour decisions are all Astro's creative work, released under the MIT License (Copyright © 2022 The Astro Technology Company). This repository adapts that work to Zed's theme schema; the upstream copyright is preserved in [LICENSE](./LICENSE) as MIT requires.

**This port:** [@rudolfjs](https://github.com/rudolfjs), MIT licensed (Copyright © 2026).
