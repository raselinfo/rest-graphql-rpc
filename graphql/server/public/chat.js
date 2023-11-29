const socket = io("ws://localhost:4000");

// Chat page html elements
const messageArea = document.querySelector("#message_area");
const inputBox = document.querySelector("#input_box");
const form = document.querySelector("#form");
const title = document.querySelector("#heading");
const activity = document.querySelector("#activity");

let userName;

(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name");
  if (!name) {
    window.location.href = "http://localhost:4000";
  }
  userName = name;
  title.innerHTML = `🥰Welcome << ${userName} >> to the socket room.`;
})();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = inputBox.value;
  if (!message.trim()) {
    return alert("Enter Message first!");
  }
  sendMessage({ name: userName, message });
  inputBox.value = "";
});

// append Message
const appendMessage = ({ name, message }, type) => {
  const messageElement = document.createElement("div");

  messageElement.classList.add(type, "message");

  let html = `
  <h3>${name.toLowerCase()===userName.toLowerCase() ? 'you': name}</h3>
  <p>${message}</p>
  `;

  messageElement.innerHTML = html;
  messageArea.append(messageElement);
};

const scrollToBottom = () => {
  messageArea.scrollTop = messageArea.scrollHeight;
};

const sendMessage = ({ name, message }) => {
  // Append message to message area
  appendMessage({ name, message }, "sending");

  scrollToBottom();

  socket.emit("message", { name, message });
};

// Activity of typing
inputBox.addEventListener("keypress", () => {
  socket.emit("activity", userName);
});

// Activity Receive
let activityTimer;
socket.on("activity", (name) => {
  clearTimeout(activityTimer);
  activity.innerHTML = `${name} is typing...`;
  activityTimer = setTimeout(() => {
    activity.innerHTML = "";
  }, 500);
});


// Listen for Message
socket.on("send-message", (message) => {
  appendMessage(message, "receiving");
  scrollToBottom();
});
