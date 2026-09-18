<div align="center">
  <img src="https://raw.githubusercontent.com/clorisHHH/Cololo/main/assets/cololo-logo.png" alt="COLOLO" width="520" />

  <h1>COLOLO</h1>
  <p>Understand an image. Rebuild the prompt. Keep the creative control.</p>

  <p><a href="README.zh-CN.md">中文</a> · <strong>English</strong></p>
</div>

COLOLO is a free, open-source desktop tool that calls vision model APIs to break an image into its visual elements and turn them into a structured prompt. It is not designed to reproduce an image with 100% fidelity; it helps you understand the subject, style, composition, materials, lighting, typography, and other elements so you can reconstruct the image according to your own needs.

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
- Connects to vision model APIs from Doubao, DeepSeek, Qwen, Kimi, OpenAI, Gemini, OpenRouter, Groq, Mistral, xAI, Together AI, SiliconFlow, and custom OpenAI-compatible services.
- Lets you freely switch the generated prompt between Chinese and English.
- Includes an optional local generation engine using SD 1.5, ControlNet Canny, and IP-Adapter.

## Model API setup

Open Settings in COLOLO, choose a provider, enter its API Base URL, model name, and API Key, then test the connection. Provider settings and the API Key are stored locally on your computer.

Ollama is available as an optional local provider, but it is not required for the core workflow.

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

COLOLO is an API-powered creative tool. Each model provider, Stable Diffusion, ControlNet, IP-Adapter, and any model weights remain subject to their own licenses, pricing, and terms.
