#!/bin/zsh
cd "$(dirname "$0")"
source .venv/bin/activate
uvicorn server:app --host 127.0.0.1 --port 4182
