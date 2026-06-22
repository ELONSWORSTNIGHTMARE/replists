let files = {};
let current = "index.html";

async function generate() {
    const prompt = document.getElementById("prompt").value;
    const status = document.getElementById("aiStatus");

    status.innerText = "Generating with Groq AI...";

    const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
    });

    const data = await res.json();

    files = {};
    data.files.forEach(f => files[f.path] = f.content);

    renderFiles();
    openFile("index.html");

    status.innerText = "Done ✔";

    updatePreview();
}

/* FILE SYSTEM */
function renderFiles() {
    const box = document.getElementById("files");
    box.innerHTML = "";

    Object.keys(files).forEach(name => {
        const div = document.createElement("div");
        div.innerText = name;
        div.onclick = () => openFile(name);
        box.appendChild(div);
    });
}

function openFile(name) {
    current = name;
    document.getElementById("code").value = files[name];
}

function save() {
    files[current] = document.getElementById("code").value;
    updatePreview();
}

/* LIVE PREVIEW */
function updatePreview() {
    const frame = document.getElementById("frame");

    const html = files["index.html"] || "";
    const css = `<style>${files["style.css"] || ""}</style>`;
    const js = `<script>${files["script.js"] || ""}<\/script>`;

    frame.srcdoc = html + css + js;
}