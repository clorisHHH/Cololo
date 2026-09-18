# COLOLO

COLOLO is a free, open-source desktop tool for understanding images and reconstructing structured prompts locally.

## Downloads

Download the latest installers from [GitHub Releases](https://github.com/clorisHHH/Cololo/releases):

- Windows x64: `COLOLO Setup 0.1.0-x64.exe`
- Windows ARM64: `COLOLO Setup 0.1.0-arm64.exe`
- macOS Apple Silicon: `COLOLO-0.1.0-arm64.dmg` or the `.zip` build

## Features

## 当前接入

- Frontend: `index.html` / `styles.css` / `app.js`
- Local vision interface: Ollama `qwen2.5vl:3b`
- Input: drag an image, import a local image, or paste a screenshot
- Output: structured prompt dimensions for subject, style, color, composition, elements, material, camera, lighting, and typography
- Optional local generation service: `server.py`, with SD 1.5 + ControlNet Canny + IP-Adapter

## Local model setup

```bash
ollama pull qwen2.5vl:3b
```

Keep Ollama running. The desktop app will use the local model when it is available; otherwise the interface will report that the local model is unavailable.

To start the optional image generation engine:

```bash
./run-engine.sh
```

The generation model and ControlNet weights are downloaded to the local cache on the first `/generate` request.

## Development

```bash
pnpm install
pnpm dev
```

Build macOS packages:

```bash
pnpm dist
```

Build a Windows NSIS installer:

```bash
pnpm dist:win
```

## License

COLOLO is released under the MIT License. See [LICENSE](LICENSE).
