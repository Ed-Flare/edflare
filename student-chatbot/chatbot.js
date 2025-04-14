const apiKey = "sk-89674c0828754c6d9d0bb96721042a4a"; // Replace with your actual key
const messagesContainer = document.getElementById("messages");

async function sendMessage() {
  const userInput = document.getElementById("userInput");
  const message = userInput.value.trim();
  if (!message) return;

  // Show user message
  appendMessage("You", message, "user");
  userInput.value = "";

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are EdFlare, a helpful Class 10 assistant." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      const reply = data.choices[0].message.content;
      appendMessage("EdFlare", reply, "bot");
    } else {
      appendMessage("EdFlare", "❌ Error: Could not get a reply.", "bot");
    }
  } catch (error) {
    console.error(error);
    appendMessage("EdFlare", "❌ Error: Something went wrong.", "bot");
  }
}

function appendMessage(sender, text, className) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${className}`;
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  messagesContainer.appendChild(msgDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
