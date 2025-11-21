const app = document.getElementById("chatRoomApp");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");
const mobileBack = document.getElementById("mobileBack");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");
const typingIndicator = document.getElementById("typingIndicator");

if (sidebarToggle) {
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}

if (mobileBack) {
  mobileBack.addEventListener("click", () => {
    document.getElementById("chatList")?.classList.add("active");
    document.getElementById("chatWindow").style.display = "none";
  });
}

const copyButtons = document.querySelectorAll(".copy-btn");

copyButtons.forEach((button) => {
  const original = button.dataset.label || button.textContent;
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      button.textContent = "Copied!";
      setTimeout(() => (button.textContent = original), 2000);
    } catch (error) {
      console.error("Copy failed", error);
      button.textContent = "Copy failed";
      setTimeout(() => (button.textContent = original), 2000);
    }
  });
});

if (app) {
  const roomCode = app.dataset.roomCode;
  const userName = app.dataset.userName;
  const userHandle = app.dataset.userHandle;
  const scheme = window.location.protocol === "https:" ? "wss" : "ws";
  const socketUrl = `${scheme}://${window.location.host}/ws/chat/${roomCode}/`;
  const chatSocket = new WebSocket(socketUrl);

  chatSocket.onopen = () => {
    app.dataset.connection = "connected";
  };

  chatSocket.onclose = () => {
    app.dataset.connection = "disconnected";
  };

  chatSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    addMessage({
      content: data.message,
      sender: data.sender,
      timestamp: data.timestamp,
      isSelf: data.sender === userName || data.sender === userHandle,
    });
  };

  messageForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (!message) return;
    chatSocket.send(JSON.stringify({ message }));
    messageInput.value = "";
  });
}

function addMessage({ content, sender, timestamp, isSelf }) {
  if (typingIndicator) {
    typingIndicator.style.display = "none";
  }

  const messageWrapper = document.createElement("div");
  messageWrapper.className = `message ${isSelf ? "sent" : "received"}`;

  if (!isSelf) {
    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.innerHTML = `<img src="/static/images/default-avatar.svg" alt="${sender}">`;
    messageWrapper.appendChild(avatar);
  }

  const contentWrapper = document.createElement("div");
  contentWrapper.className = "message-content";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.innerHTML = `<p><strong>${sender}:</strong> ${escapeHtml(content)}</p>`;

  const time = document.createElement("span");
  time.className = "message-time";
  time.textContent = timestamp;

  contentWrapper.appendChild(bubble);
  contentWrapper.appendChild(time);
  messageWrapper.appendChild(contentWrapper);
  chatMessages.appendChild(messageWrapper);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

