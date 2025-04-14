const apiKey = "sk-89674c0828754c6d9d0bb96721042a4a"; // Replace with your actual key
const apiUrl = "https://api.deepseek.com/openai/v1/chat/completions";

async function sendMessage() {
  const userInput = document.getElementById("userInput").value;
  if (!userInput) return;

  appendMessage("user", userInput);
  document.getElementById("userInput").value = "";

  appendMessage("bot", "Typing...");

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: userInput }]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "❌ Could not get a reply.";
    
    updateLastBotMessage(reply);
  } catch (error) {
    updateLastBotMessage("❌ Error: " + error.message);
  }
}

function appendMessage(sender, text) {
  const messagesDiv = document.getElementById("messages");
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.textContent = `${sender === "user" ? "👤 You" : "🤖 EdFlare"}: ${text}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function updateLastBotMessage(newText) {
  const messages = document.querySelectorAll(".bot");
  const last = messages[messages.length - 1];
  if (last) last.textContent = "🤖 EdFlare: " + newText;
}
