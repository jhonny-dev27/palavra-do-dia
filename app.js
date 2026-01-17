/* =========================================
   ELEMENTOS DA INTERFACE
========================================= */
const statusEl = document.getElementById("status");
const wordEl = document.getElementById("word");
const meaningEl = document.getElementById("meaning");
const etymologyEl = document.getElementById("etymology");
const translationEl = document.getElementById("translation");
const nextBtn = document.getElementById("next");

/* =========================================
   STATUS ONLINE / OFFLINE
========================================= */
function updateConnectionStatus() {
  if (navigator.onLine) {
    statusEl.textContent = "Online";
    statusEl.style.backgroundColor = "#2e7d32";
    statusEl.style.color = "#ffffff";
  } else {
    statusEl.textContent = "Offline";
    statusEl.style.backgroundColor = "#333333";
    statusEl.style.color = "#cccccc";
  }
}

window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);
updateConnectionStatus();

/* =========================================
   RENDERIZAÇÃO
========================================= */
function renderWord(data) {
  if (!data) {
    wordEl.textContent = "---";
    meaningEl.textContent = "Nenhuma palavra salva ainda.";
    etymologyEl.textContent = "---";
    translationEl.textContent = "---";
    return;
  }

  wordEl.textContent = data.word;
  meaningEl.textContent = data.meaning;
  etymologyEl.textContent = data.etymology;
  translationEl.textContent = data.translation;
}

/* =========================================
   DADOS DE EXEMPLO (placeholder)
   Depois pode ser substituído por API real
========================================= */
function generateOnlineWord() {
  return {
    word: "Exemplo",
    meaning: "Algo que serve como modelo ou referência.",
    etymology: "Do latim exemplum.",
    translation: "Example"
  };
}

/* =========================================
   AÇÃO DO BOTÃO
========================================= */
nextBtn.addEventListener("click", async () => {
  if (navigator.onLine) {
    const wordData = generateOnlineWord();
    saveWord(wordData);
    renderWord(wordData);
  } else {
    const savedWord = await getRandomWord();
    renderWord(savedWord);
  }
});

/* =========================================
   INICIALIZAÇÃO
========================================= */
(async function init() {
  const savedWord = await getRandomWord();
  if (savedWord) {
    renderWord(savedWord);
  }
})();
