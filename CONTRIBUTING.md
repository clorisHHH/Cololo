# Contributing to COLOLO

Thanks for helping improve COLOLO.

## Before opening an issue

- Search existing issues first.
- Include your operating system and COLOLO version.
- For model failures, include the local model name and the relevant error message. Do not upload private images or API keys.

## Pull requests

1. Keep changes focused and explain the user-facing result.
2. Run the relevant local checks before opening a pull request.
3. Update documentation when behavior or setup changes.
4. Do not commit model weights, private images, secrets, or generated installer archives to the source tree.

## Development commands

```bash
pnpm install
pnpm dev
pnpm dist
pnpm dist:win
```
