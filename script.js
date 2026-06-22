function generate() {
  const prompt = document.getElementById("prompt").value;
  const status = document.getElementById("status");
  const aiBox = document.getElementById("aiBox");

  if (!prompt) {
    status.innerText = "⚠ Enter a prompt first";
    return;
  }

  status.innerText = "Generating project...";
  aiBox.innerText = "Thinking...";

  let steps = [
    "Analyzing prompt...",
    "Creating UI layout...",
    "Building frontend...",
    "Adding animations...",
    "Finalizing project..."
  ];

  let i = 0;

  let interval = setInterval(() => {
    aiBox.innerText = steps[i];
    i++;

    if (i === steps.length) {
      clearInterval(interval);

      aiBox.innerText =
        "✔ Generated Website\n✔ index.html created\n✔ style.css created\n✔ script.js created";

      status.innerText = "Done ✔";

      loadPreview(prompt);
    }
  }, 800);
}

/* fake preview generator */
function loadPreview(prompt) {
  const iframe = document.getElementById("preview");

  iframe.srcdoc = `
  <html>
  <body style="font-family:Arial;text-align:center;padding:50px;">
    <h1>Generated Site</h1>
    <p>${prompt}</p>
    <button style="padding:10px;background:black;color:white;">
      Demo Button
    </button>
  </body>
  </html>
  `;
}

/* tabs */
function showTab(tab) {
  const preview = document.getElementById("preview");
  const files = document.getElementById("files");

  if (tab === "preview") {
    preview.style.display = "block";
    files.classList.add("hidden");
  } else {
    preview.style.display = "none";
    files.classList.remove("hidden");
  }
}