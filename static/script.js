document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const userInput = document.getElementById('user-input').value;
    sendMessage(userInput);
    document.getElementById('user-input').value = '';
});

function sendMessage(message) {
    const chatBox = document.getElementById('chat-box');
    const userMessage = `
        <div class="chat-message user-message">
            <span class="message-content">${message}</span>
        </div>`;
    chatBox.innerHTML += userMessage;

    fetch('/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `message=${encodeURIComponent(message)}`
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = `
            <div class="chat-message bot-message">
                <span class="message-content">${data.message}</span>
            </div>`;
        chatBox.innerHTML += botMessage;
    });
}