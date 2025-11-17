// Mobile Sidebar Toggle
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");
const chatList = document.getElementById("chatList");

if (sidebarToggle) {
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}

// Mobile Back Button
const mobileBack = document.getElementById("mobileBack");
if (mobileBack) {
  mobileBack.addEventListener("click", () => {
    const chatWindow = document.getElementById("chatWindow");
    chatList.classList.add("active");
    chatWindow.style.display = "none";
  });
}

// Chat Item Selection
const chatItems = document.querySelectorAll(".chat-item");
const chatWindow = document.getElementById("chatWindow");

chatItems.forEach((item) => {
  item.addEventListener("click", function () {
    // Remove active class from all items
    chatItems.forEach((i) => i.classList.remove("active"));

    // Add active class to clicked item
    this.classList.add("active");

    // Remove unread badge if exists
    const unreadBadge = this.querySelector(".unread-count");
    if (unreadBadge) {
      unreadBadge.remove();
    }

    // On mobile, show chat window and hide chat list
    if (window.innerWidth <= 768) {
      chatList.classList.remove("active");
      chatWindow.style.display = "flex";
    }

    // Load chat messages (in real app, this would fetch from backend)
    const chatId = this.dataset.chatId;
    loadChatMessages(chatId);
  });
});

// Search Functionality
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();

    chatItems.forEach((item) => {
      const userName = item
        .querySelector(".chat-header h4")
        .textContent.toLowerCase();
      const preview = item
        .querySelector(".chat-preview p")
        .textContent.toLowerCase();

      if (userName.includes(searchTerm) || preview.includes(searchTerm)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });
}

// Message Form Submission
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");

if (messageForm) {
  messageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const message = messageInput.value.trim();
    if (message) {
      sendMessage(message);
      messageInput.value = "";
      messageInput.focus();
    }
  });
}

// Send Message Function
function sendMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "message sent";
  messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-bubble">
                <p>${escapeHtml(message)}</p>
            </div>
            <span class="message-time">${getCurrentTime()}</span>
        </div>
    `;

  chatMessages.appendChild(messageDiv);
  scrollToBottom();

  // Simulate typing indicator
  showTypingIndicator();

  // Simulate response after 2 seconds
  setTimeout(() => {
    hideTypingIndicator();
    receiveMessage("Thanks for your message! This is a demo response.");
  }, 2000);
}

// Receive Message Function
function receiveMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "message received";
  messageDiv.innerHTML = `
        <div class="message-avatar">
            <img src="/static/images/default-avatar.png" alt="User">
        </div>
        <div class="message-content">
            <div class="message-bubble">
                <p>${escapeHtml(message)}</p>
            </div>
            <span class="message-time">${getCurrentTime()}</span>
        </div>
    `;

  chatMessages.appendChild(messageDiv);
  scrollToBottom();
}

// Typing Indicator
const typingIndicator = document.getElementById("typingIndicator");

function showTypingIndicator() {
  if (typingIndicator) {
    typingIndicator.style.display = "flex";
    scrollToBottom();
  }
}

function hideTypingIndicator() {
  if (typingIndicator) {
    typingIndicator.style.display = "none";
  }
}

// Scroll to Bottom
function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// User Info Panel
const actionButtons = document.querySelectorAll(".action-btn");
const userInfoPanel = document.getElementById("userInfoPanel");
const closePanel = document.getElementById("closePanel");

actionButtons.forEach((button) => {
  button.addEventListener("click", function () {
    if (this.title === "Info") {
      userInfoPanel.classList.toggle("active");
    }
  });
});

if (closePanel) {
  closePanel.addEventListener("click", () => {
    userInfoPanel.classList.remove("active");
  });
}

// New Chat Modal
const newChatBtn = document.getElementById("newChatBtn");
const newChatModal = document.getElementById("newChatModal");
const closeModal = document.getElementById("closeModal");

if (newChatBtn) {
  newChatBtn.addEventListener("click", () => {
    newChatModal.classList.add("active");
  });
}

if (closeModal) {
  closeModal.addEventListener("click", () => {
    newChatModal.classList.remove("active");
  });
}

// Close modal when clicking outside
if (newChatModal) {
  newChatModal.addEventListener("click", function (e) {
    if (e.target === this) {
      this.classList.remove("active");
    }
  });
}

// User Search in Modal
const userSearchInput = document.getElementById("userSearchInput");
if (userSearchInput) {
  userSearchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const userItems = document.querySelectorAll(".user-item");

    userItems.forEach((item) => {
      const userName = item.querySelector("h4").textContent.toLowerCase();
      const userHandle = item.querySelector("p").textContent.toLowerCase();

      if (userName.includes(searchTerm) || userHandle.includes(searchTerm)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });
}

// Start Chat Buttons
const startChatButtons = document.querySelectorAll(".btn-start-chat");
startChatButtons.forEach((button) => {
  button.addEventListener("click", function () {
    newChatModal.classList.remove("active");
    // In real app, this would create a new chat
    alert("Starting new chat... This is a demo.");
  });
});

// Load Chat Messages (Demo Function)
function loadChatMessages(chatId) {
  // In real app, this would fetch messages from backend
  console.log("Loading messages for chat:", chatId);

  // Update chat header
  const activeChatItem = document.querySelector(".chat-item.active");
  if (activeChatItem) {
    const userName =
      activeChatItem.querySelector(".chat-header h4").textContent;
    document.querySelector(".chat-user-details h3").textContent = userName;
  }
}

// Auto-scroll on new message
const observer = new MutationObserver(() => {
  scrollToBottom();
});

if (chatMessages) {
  observer.observe(chatMessages, { childList: true });
}

// Emoji Picker (Simple Implementation)
const emojiBtn = document.querySelector(".emoji-btn");
if (emojiBtn) {
  emojiBtn.addEventListener("click", function () {
    const emojis = ["😀", "😂", "😍", "🤔", "👍", "❤️", "🎉", "🔥", "✨", "👋"];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    messageInput.value += emoji;
    messageInput.focus();
  });
}

// File Attachment (Demo)
const attachBtn = document.querySelector(".attach-btn");
if (attachBtn) {
  attachBtn.addEventListener("click", function () {
    alert("File attachment feature coming soon! This is a demo.");
  });
}

// Info Action Buttons
const infoActionButtons = document.querySelectorAll(".info-action-btn");
infoActionButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const action = this.textContent.trim();

    if (action.includes("Delete")) {
      if (confirm("Are you sure you want to delete this chat?")) {
        alert("Chat deleted! (Demo)");
      }
    } else if (action.includes("Block")) {
      if (confirm("Are you sure you want to block this user?")) {
        alert("User blocked! (Demo)");
      }
    } else if (action.includes("Mute")) {
      alert("Chat muted! (Demo)");
    }
  });
});

// Helper Functions
function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return hours + ":" + minutes + " " + ampm;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Handle Enter Key for Sending Messages
if (messageInput) {
  messageInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      messageForm.dispatchEvent(new Event("submit"));
    }
  });
}

// Update Online Status
function updateOnlineStatus() {
  const statusIndicators = document.querySelectorAll(
    ".status-indicator, .status-dot"
  );
  statusIndicators.forEach((indicator) => {
    // Randomly set online/offline for demo
    if (Math.random() > 0.5) {
      indicator.classList.add("online");
    } else {
      indicator.classList.remove("online");
    }
  });
}

// Update status every 30 seconds (demo)
setInterval(updateOnlineStatus, 30000);

// Handle Window Resize
let resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    // Reset mobile view states
    if (window.innerWidth > 768) {
      sidebar.classList.remove("active");
      chatList.classList.remove("active");
      chatWindow.style.display = "flex";
    }
  }, 250);
});

// Navigation Item Click
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    // Remove active class from all items
    navItems.forEach((i) => i.classList.remove("active"));

    // Add active class to clicked item
    this.classList.add("active");

    // In real app, this would load different content
    const navText = this.querySelector(".nav-text").textContent;
    console.log("Navigating to:", navText);
  });
});

// Mark messages as read when scrolling
if (chatMessages) {
  chatMessages.addEventListener("scroll", function () {
    const messages = this.querySelectorAll(".message");
    messages.forEach((message) => {
      const rect = message.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        message.classList.add("read");
      }
    });
  });
}

// Initial scroll to bottom
scrollToBottom();

// Simulate receiving a message after page load
setTimeout(() => {
  showTypingIndicator();
  setTimeout(() => {
    hideTypingIndicator();
  }, 2000);
}, 1000);

console.log("ChatFlow Dashboard Loaded Successfully! 💬");
