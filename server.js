import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs-extra";
import axios from "axios";
import { v4 as uuid } from "uuid";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("projects"));

const API_KEY = process.env.GROQ_API_KEY;

/* ---------------- AI GENERATION ---------------- */

app.post("/api/generate", async (req, res) => {
    const { prompt } = req.body;
    const id = uuid();
    const folder = `projects/${id}`;

    await fs.ensureDir(folder);

    const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `
You are a senior full-stack web developer.

Return ONLY valid JSON:

{
  "files": [
    {
      "path": "index.html",
      "content": "..."
    },
    {
      "path": "style.css",
      "content": "..."
    },
    {
      "path": "script.js",
      "content": "..."
    }
  ]
}

Rules:
- Fully working website
- Include animations
- Include modern UI (dark SaaS style)
- Must be production-quality
- No markdown, only JSON
`
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        },
        {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            }
        }
    );

    let data = response.data.choices[0].message.content;

    let project = JSON.parse(data);

    project.files.forEach(file => {
        fs.outputFileSync(`${folder}/${file.path}`, file.content);
    });

    res.json({
        id,
        preview: `/projects/${id}/index.html`,
        files: project.files
    });
});

app.listen(3000, () => {
    console.log("Hades AI running on http://localhost:3000");
});