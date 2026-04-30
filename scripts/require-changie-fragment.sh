#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat >&2 <<'EOF'
Usage:
  scripts/require-changie-fragment.sh
  scripts/require-changie-fragment.sh --range <base>...<head>

Checks that repository changes include a .changes/unreleased/*.yaml fragment.
Without --range, checks staged files for use from the pre-commit hook.
EOF
}

range=""
if [ "${1:-}" = "--range" ]; then
  if [ -z "${2:-}" ]; then
    usage
    exit 2
  fi
  range="$2"
elif [ "$#" -gt 0 ]; then
  usage
  exit 2
fi

is_fragment() {
  case "$1" in
    .changes/unreleased/*.yaml|.changes/unreleased/*.yml) return 0 ;;
    *) return 1 ;;
  esac
}

is_ignored_change() {
  case "$1" in
    .changes/*|CHANGELOG.md) return 0 ;;
    *) return 1 ;;
  esac
}

has_relevant_change=false
has_fragment=false

check_path() {
  local path="$1"

  if is_fragment "$path"; then
    has_fragment=true
  fi

  if ! is_ignored_change "$path"; then
    has_relevant_change=true
  fi
}

if [ -n "$range" ]; then
  while IFS= read -r path; do
    [ -n "$path" ] && check_path "$path"
  done < <(git diff --name-only --diff-filter=ACMRD "$range" --)
else
  while IFS= read -r path; do
    [ -n "$path" ] && check_path "$path"
  done < <(git diff --cached --name-only --diff-filter=ACMRD --)

  base=""
  if git rev-parse --verify origin/main >/dev/null 2>&1; then
    base="$(git merge-base HEAD origin/main)"
  elif git rev-parse --verify main >/dev/null 2>&1; then
    base="$(git merge-base HEAD main)"
  fi

  if [ -n "$base" ]; then
    while IFS= read -r path; do
      if [ -n "$path" ] && is_fragment "$path"; then
        has_fragment=true
      fi
    done < <(git diff --name-only --diff-filter=ACMRD "$base...HEAD" --)
  fi
fi

if [ "$has_relevant_change" = false ]; then
  exit 0
fi

if [ "$has_fragment" = true ]; then
  exit 0
fi

cat >&2 <<'EOF'
Missing changie fragment.

Add a changelog fragment before committing:
  changie new

Fragments live in .changes/unreleased/*.yaml and are required for PRs that
change files outside .changes/ and CHANGELOG.md.
EOF
exit 1
