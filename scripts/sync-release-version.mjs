#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";

const SEMVER =
  /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(-((0|[1-9][0-9]*|[0-9A-Za-z-]*[A-Za-z-][0-9A-Za-z-]*)(\.(0|[1-9][0-9]*|[0-9A-Za-z-]*[A-Za-z-][0-9A-Za-z-]*))*))?$/;
const EXTENSION_VERSION_PATTERN = /^version = "([^"]+)"$/m;

const args = process.argv.slice(2);
const checkOnly = args.includes("--check");
const version = args.find((arg) => arg !== "--check");

const packageJsonPath = "package.json";
const extensionTomlPath = "extension.toml";

const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
const extensionToml = readFileSync(extensionTomlPath, "utf8");
const extensionVersionMatch = extensionToml.match(EXTENSION_VERSION_PATTERN);

if (!extensionVersionMatch) {
  throw new Error("extension.toml does not contain a version field");
}

const extensionVersion = extensionVersionMatch[1];

if (checkOnly) {
  if (packageJson.version !== extensionVersion) {
    throw new Error(
      `package.json version (${packageJson.version}) does not match extension.toml version (${extensionVersion})`,
    );
  }

  if (version && packageJson.version !== version) {
    throw new Error(`version files contain ${packageJson.version}, expected ${version}`);
  }

  process.exit(0);
}

if (!version) {
  throw new Error("Usage: sync-release-version.mjs [--check] <version>");
}

if (!SEMVER.test(version)) {
  throw new Error(`Invalid release version: ${version}`);
}

packageJson.version = version;
writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);

const updatedExtensionToml = extensionToml.replace(
  EXTENSION_VERSION_PATTERN,
  `version = "${version}"`,
);
writeFileSync(extensionTomlPath, updatedExtensionToml);
