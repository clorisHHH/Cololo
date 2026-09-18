<div align="center">
  <img src="https://raw.githubusercontent.com/clorisHHH/Cololo/main/assets/cololo-logo.png" alt="COLOLO" width="520" />

  <h1>COLOLO</h1>
  <p>理解一张图，重建提示词，把创作控制权留在自己手里。</p>

  <p><strong>中文</strong> · <a href="README.md">English</a></p>
</div>

COLOLO 是一个免费、开源的桌面工具，通过调用视觉模型 API 拆分图片中的不同视觉元素，并整理成结构化 Prompt。它并不是为了百分之百还原图片，而是帮助使用者理解主体、风格、构图、材质、光影、字体等要素，方便根据自身需求重构图片。

## 下载

| 平台 | 下载 |
| --- | --- |
| Windows x64 | [下载 Windows x64 安装包](https://github.com/clorisHHH/Cololo/releases/latest) |
| Windows ARM64 | [下载 Windows ARM64 安装包](https://github.com/clorisHHH/Cololo/releases/latest) |
| macOS Apple Silicon | [下载 DMG / ZIP](https://github.com/clorisHHH/Cololo/releases/latest) |

所有安装包都发布在 [Releases 页面](https://github.com/clorisHHH/Cololo/releases)。

## 功能

- 将参考图片转换成可编辑的结构化 Prompt。
- 拆分主体、风格、色彩、构图、元素、材质、镜头、光影和字体。
- 支持拖拽、导入本地图片和粘贴截图。
- 支持豆包、DeepSeek、通义千问、Kimi、OpenAI、Gemini、OpenRouter、Groq、Mistral、xAI、Together AI、SiliconFlow 以及自定义 OpenAI-compatible 服务。
- 可以自由切换生成中文 Prompt 或英文 Prompt。
- 可选本地生成引擎，串联 SD 1.5、ControlNet Canny 和 IP-Adapter。

## 模型 API 配置

打开 COLOLO 设置，选择服务商，填写 API Base URL、模型名称和 API Key，然后测试连接。服务商配置和 API Key 只保存在本机。

Ollama 作为可选的本地服务商提供，但核心工作流不要求安装 Ollama。

启动可选的图片生成引擎：

```bash
./run-engine.sh
```

## 开发

```bash
pnpm install
pnpm dev
```

使用 `pnpm dist` 构建 macOS 安装包，使用 `pnpm dist:win` 构建 Windows NSIS 安装包。

## 文档

- [贡献指南](CONTRIBUTING.md)
- [行为准则](CODE_OF_CONDUCT.md)
- [安全政策](SECURITY.md)
- [MIT License](LICENSE)

## 致谢与许可边界

COLOLO 是一个由模型 API 驱动的创作工具。各模型服务商、Stable Diffusion、ControlNet、IP-Adapter 以及模型权重仍分别受各自的许可证、计费方式和使用条款约束。
