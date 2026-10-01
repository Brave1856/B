const $ = (s) => document.querySelector(s);

const overlay = $("#overlay");
const panels = {
  ai: $("#aiPanel"),
  games: $("#gamesPanel"),
  settings: $("#settingsPanel")
};

function openPanel(name){
  Object.values(panels).forEach(p => { p.classList.remove("open"); p.setAttribute("aria-hidden","true"); });
  panels[name].classList.add("open");
  panels[name].setAttribute("aria-hidden","false");
  overlay.hidden = false;
}
function closePanels(){
  Object.values(panels).forEach(p => { p.classList.remove("open"); p.setAttribute("aria-hidden","true"); });
  overlay.hidden = true;
}

$("#aiBtn").addEventListener("click", () => openPanel("ai"));
$("#gamesBtn").addEventListener("click", () => openPanel("games"));
$("#settingsBtn").addEventListener("click", () => openPanel("settings"));
overlay.addEventListener("click", closePanels);
document.querySelectorAll(".close").forEach(b => b.addEventListener("click", closePanels));

document.querySelectorAll(".shortcut").forEach(btn => {
  btn.addEventListener("click", () => {
    const url = btn.dataset.url;
    const newTab = $("#newTab").checked;
    window.open(url, newTab ? "_blank" : "_self");
  });
});

$("#searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const raw = $("#urlInput").value.trim();
  if (!raw) return;
  let destination;
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(raw)) {
    destination = raw;
  } else if (/^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(raw)) {
    destination = "https://" + raw;
  } else {
    destination = "https://www.google.com/search?q=" + encodeURIComponent(raw);
  }
  const newTab = $("#newTab").checked;
  window.open(destination, newTab ? "_blank" : "_self");
});

$("#aiForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = $("#aiInput");
  const text = input.value.trim();
  if (!text) return;
  const messages = $("#aiMessages");
  const user = document.createElement("div");
  user.className = "message user";
  user.textContent = text;
  messages.appendChild(user);
  input.value = "";
  setTimeout(() => {
    const bot = document.createElement("div");
    bot.className = "message bot";
    bot.textContent = "Demo mode: connect your AI API in the backend to get real responses.";
    messages.appendChild(bot);
    messages.scrollTop = messages.scrollHeight;
  }, 350);
  messages.scrollTop = messages.scrollHeight;
});

$("#animations").addEventListener("change", (e) => {
  document.body.classList.toggle("no-animations", !e.target.checked);
});
