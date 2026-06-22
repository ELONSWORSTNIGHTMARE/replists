const chat = document.getElementById("chat");
const input = document.getElementById("input");

// 🔐 Put your API key here (NOT safe for production)
const API_KEY = "hades_sk_216afdebe30a5eb0e0f66a9015a3a742c16a69e349fb6cd7d00392bdd7de87b2";

const messages = [];

function addMessage(text, type) {
  const div = document.createElement("div");
  div.classList.add("msg", type);
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  // show user message
  addMessage(text, "user");
  messages.push({ role: "user", content: text });

  input.value = "";

  // loading message
  const loadingId = document.createElement("div");
  loadingId.classList.add("msg", "bot");
  loadingId.innerText = "Thinking...";
  chat.appendChild(loadingId);
  chat.scrollTop = chat.scrollHeight;

  try {
    const res = await fetch("https://api.hades.dev/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: messages
      })
    });

    const data = await res.json();

    // remove loading
    loadingId.remove();

    const reply = data?.choices?.[0]?.message?.content || "No response";

    messages.push({ role: "assistant", content: reply });

    addMessage(reply, "bot");

  } catch (err) {
    loadingId.remove();
    addMessage("Error connecting to API.", "bot");
    console.error(err);
  }
}

// Enter key support
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") sendMessage();
});