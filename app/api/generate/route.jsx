//for old code go to old/route.txt
import { NextResponse } from "next/server";
import { Client } from "@gradio/client";
import { createCanvas } from "canvas";

async function createBlankImage(width = 256, height = 256) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ccc"; // light gray
  ctx.fillRect(0, 0, width, height);
  const buffer = canvas.toBuffer("image/png");
  return new Blob([buffer], { type: "image/png" });
}

export async function POST(req) {
  try {
    const { image } = await req.json();

    // Initialize Gradio Client
    const client = await Client.connect("abidlabs/EasyGhibli", {
      token: process.env.HUGGINGFACE_API_TOKEN,
    });

    let blob;
    if (image) {
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      blob = new Blob([buffer], { type: "image/png" });
    } else {
      blob = await createBlankImage();
    }

    // Call the model
    const result = await client.predict("/single_condition_generate_image", {
      spatial_img: blob,
    });

    if (!result || !result.data || !result.data[0]) {
      throw new Error("No image returned from model.");
    }

    return NextResponse.json({ image: result.data[0].url });
  } catch (err) {
    console.error("API Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
