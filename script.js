const chatBox = document.getElementById("chatBox");

function addMessage(text, className) {
  const msg = document.createElement("div");
  msg.classList.add("message", className);
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Simple “agent brain”
function getBotResponse(input) {
  input = input.toLowerCase();

  if (input.includes("hello")) return "Hello! I'm your mini agent 🤖";
  if (input.includes("how are you")) return "I'm just code, but I'm running fine ⚡";
  if (input.includes("your name")) return "I'm Mini Agent built with JS.";
  if (input.includes("time")) return "Current time is " + new Date().toLocaleTimeString();

  return "I didn't understand that. Try asking something else.";
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");

  const reply = getBotResponse(text);

  setTimeout(() => {
    addMessage(reply, "bot");
  }, 500);

  input.value = "";
}