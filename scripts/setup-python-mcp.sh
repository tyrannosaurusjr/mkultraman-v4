#!/usr/bin/env bash
# Idempotent setup for Python 3.14 + pipx + analytics-mcp on macOS (Homebrew).
# Run on a fresh machine to recreate the toolchain for the analytics-mcp server.

set -euo pipefail

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "This script targets macOS. Aborting." >&2
  exit 1
fi

if ! command -v brew >/dev/null 2>&1; then
  echo "Homebrew not found. Install it first: https://brew.sh" >&2
  exit 1
fi

echo "==> python@3.14"
if ! brew list --versions python@3.14 >/dev/null 2>&1; then
  brew install python@3.14
fi

echo "==> pyexpat sanity check"
if ! python3.14 -c "import pyexpat" >/dev/null 2>&1; then
  echo "    pyexpat broken on the bottle. Rebuilding python@3.14 from source (~10-20 min)."
  brew reinstall --build-from-source python@3.14
  python3.14 -c "import pyexpat" || { echo "pyexpat still broken after source build" >&2; exit 1; }
fi
echo "    pyexpat OK ($(python3.14 -c 'import pyexpat; print(pyexpat.EXPAT_VERSION)'))"

echo "==> pipx"
if ! command -v pipx >/dev/null 2>&1; then
  brew install pipx
  pipx ensurepath
fi

echo "==> analytics-mcp under python 3.14"
# Wipe shared venv in case it was built against an older Python that has since been replaced.
rm -rf "${HOME}/.local/pipx/shared"
if pipx list --short 2>/dev/null | grep -q '^analytics-mcp '; then
  PIPX_DEFAULT_PYTHON=python3.14 pipx reinstall analytics-mcp
else
  PIPX_DEFAULT_PYTHON=python3.14 pipx install analytics-mcp
fi

echo
echo "Done. Binaries:"
ls -1 "${HOME}/.local/bin/analytics-mcp" "${HOME}/.local/bin/google-analytics-mcp" 2>/dev/null || true
echo
echo "Next: register with Claude Code, e.g."
echo "  claude mcp add -s user analytics-mcp ${HOME}/.local/bin/analytics-mcp \\"
echo "    --env GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json"
