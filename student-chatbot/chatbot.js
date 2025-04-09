function talk() {
  const userInput = document.getElementById('userInput').value;
  const chatLog = document.getElementById('chatLog');

  if (userInput.trim() === '') return;

  const userMessage = document.createElement('div');
  userMessage.innerHTML = `<strong>👤 You:</strong> ${userInput}`;
  chatLog.appendChild(userMessage);

  let response = '';
  const lowerCaseInput = userInput.toLowerCase();

  if (lowerCaseInput.includes('light')) {
    response = '💡 Light travels in a straight line and reflects from surfaces.';
  } else if (lowerCaseInput.includes('ohm')) {
    response = '🔌 Ohm\'s Law: V = IR, where V is voltage, I is current, and R is resistance.';
  } else if (lowerCaseInput.includes('hi') || lowerCaseInput.includes('hello')) {
    response = '👋 Hello! I\'m EdFlare AI. Ask me anything about Class 10.';
  } else {
    response = '🤔 I\'m still learning! Try asking a Class 10 topic like "What is a verb?" or "Explain Ohm\'s law".';
  }

  const botMessage = document.createElement('div');
  botMessage.innerHTML = `<strong>🤖 EdFlare:</strong> ${response}`;
  chatLog.appendChild(botMessage);

  // Remove emojis from speech output
  const cleanResponse = response.replace(/[\u{1F300}-\u{1F6FF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}]/gu, '');
  const speech = new SpeechSynthesisUtterance(cleanResponse);
  window.speechSynthesis.speak(speech);

  document.getElementById('userInput').value = '';
  chatLog.scrollTop = chatLog.scrollHeight;
}
