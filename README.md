<div align="center">
  <img src="https://raw.githubusercontent.com/clorisHHH/Cololo/main/assets/cololo-logo.png" alt="COLOLO" width="520" />

  <h1>COLOLO</h1>
  <p>Understand an image. Rebuild the prompt. Keep the creative control.</p>

  <p><a href="README.zh-CN.md">中文</a> · <strong>English</strong></p>
</div>

COLOLO is a free, open-source desktop tool for understanding images and reconstructing structured prompts locally. It helps you study visual references without pretending that a final image can reveal an original model, LoRA, sampler, or seed.

## Download

| Platform | Download |
| --- | --- |
| Windows x64 | [COLOLO Setup 0.1.0-x64.exe](https://github.com/clorisHHH/Cololo/releases/latest) |
| Windows ARM64 | [COLOLO Setup 0.1.0-arm64.exe](https://github.com/clorisHHH/Cololo/releases/latest) |
| macOS Apple Silicon | [DMG / ZIP](https://github.com/clorisHHH/Cololo/releases/latest) |

All installers are published on the [Releases page](https://github.com/clorisHHH/Cololo/releases).

## What it does

- Turns a reference image into an editable, structured prompt.
- Separates subject, style, color, composition, elements, material, camera, lighting, and typography.
- Accepts drag-and-drop, local import, and pasted screenshots.
- Runs with a local Ollama vision model when available.
- Includes an optional local generation engine using SD 1.5, ControlNet Canny, and IP-Adapter.

## Local model setup

```bash
ollama pull qwen2.5vl:3b
```

Keep Ollama running. COLOLO uses the local model when it is available and reports clearly when it is not.

To start the optional image generation engine:

```bash
./run-engine.sh
```

## Development

```bash
pnpm install
pnpm dev
```

Build macOS packages with `pnpm dist` and a Windows NSIS installer with `pnpm dist:win`.

## Documentation

- [Contributing](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security](SECURITY.md)
- [MIT License](LICENSE)

## Acknowledgements

COLOLO is built as a local-first creative tool. Model weights, Ollama, Stable Diffusion, ControlNet, and IP-Adapter remain subject to their own licenses and terms.
