"""Draw local image recreation service."""
import base64, io, os
import torch
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, ImageFilter, ImageOps
from pydantic import BaseModel

app=FastAPI(title="Draw local engine")
app.add_middleware(CORSMiddleware,allow_origins=["http://127.0.0.1:4181","http://localhost:4181"],allow_methods=["*"],allow_headers=["*"])
MODEL_ID=os.getenv("DRAW_MODEL","stable-diffusion-v1-5/stable-diffusion-v1-5")
CONTROLNET_ID=os.getenv("DRAW_CONTROLNET","lllyasviel/control_v11p_sd15_canny")
device="mps" if torch.backends.mps.is_available() else "cpu"
pipe=None

class GenerateRequest(BaseModel):
    image:str
    prompt:str
    mode:str="recreate"
    strength:float=.22
    steps:int=12

def decode_image(value): return Image.open(io.BytesIO(base64.b64decode(value.split(",",1)[-1]))).convert("RGB")
def image_data(image):
    buf=io.BytesIO(); image.save(buf,format="PNG")
    return "data:image/png;base64,"+base64.b64encode(buf.getvalue()).decode()

def load_pipeline():
    global pipe
    if pipe is not None:return pipe
    from diffusers import ControlNetModel,StableDiffusionControlNetImg2ImgPipeline
    dtype=torch.float16 if device=="mps" else torch.float32
    controlnet=ControlNetModel.from_pretrained(CONTROLNET_ID,torch_dtype=dtype)
    pipe=StableDiffusionControlNetImg2ImgPipeline.from_pretrained(MODEL_ID,controlnet=controlnet,torch_dtype=dtype,safety_checker=None)
    pipe.load_ip_adapter("h94/IP-Adapter",subfolder="models",weight_name="ip-adapter_sd15.bin")
    pipe.set_ip_adapter_scale(.78); pipe=pipe.to(device); pipe.enable_attention_slicing()
    return pipe

@app.get("/health")
def health(): return {"ok":True,"device":device,"loaded":pipe is not None,"model":MODEL_ID}

@app.post("/generate")
def generate(request:GenerateRequest):
    try:
        source=decode_image(request.image); source.thumbnail((768,768),Image.Resampling.LANCZOS); source=ImageOps.fit(source,(512,512),method=Image.Resampling.LANCZOS)
        engine=load_pipeline(); result=engine(prompt=request.prompt,negative_prompt="文字错误、变形、杂乱背景、低清晰度、主体缺失",image=source,control_image=source.filter(ImageFilter.FIND_EDGES),strength=max(.12,min(.45,request.strength)),guidance_scale=5.5,num_inference_steps=max(4,min(20,request.steps))).images[0]
        return {"image":image_data(result),"mode":request.mode,"device":device}
    except Exception as exc: raise HTTPException(status_code=500,detail=str(exc))
