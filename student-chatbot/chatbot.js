async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  // Show user message
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML += `<div class="message user">👤 You: ${message}</div>`;
  input.value = "";

  // Call DeepSeek API
  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer sk-89674c0828754c6d9d0bb96721042a4a" // Replace this line below
    },
    body: JSON.stringify({
      model: "deepseek-chat", // or another model name if required
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await response.json();

  if (data.choices && data.choices.length > 0) {
    const reply = data.choices[0].message.content;
    messagesDiv.innerHTML += `<div class="message bot">🤖 EdFlare: ${reply}</div>`;
  } else {
    messagesDiv.innerHTML += `<div class="message bot">❌ Error: Could not get a reply.</div>`;
  }

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
