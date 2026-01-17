/* =========================================
   BANCO DE DADOS LOCAL - INDEXEDDB
========================================= */

const DB_NAME = "palavraDoDiaDB";
const DB_VERSION = 1;
const STORE_NAME = "palavras";

let db = null;

/* =========================================
   ABRIR / CRIAR BANCO
========================================= */
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const database = event.target.result;

      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, {
          keyPath: "word"
        });
      }
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = () => {
      reject("Erro ao abrir IndexedDB");
    };
  });
}

/* =========================================
   SALVAR PALAVRA
========================================= */
function saveWord(wordData) {
  if (!db) return;

  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  store.put(wordData);
}

/* =========================================
   OBTER PALAVRA ALEATÓRIA
========================================= */
function getRandomWord() {
  return new Promise((resolve) => {
    if (!db) {
      resolve(null);
      return;
    }

    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const words = request.result;
      if (words.length === 0) {
        resolve(null);
      } else {
        const randomIndex = Math.floor(Math.random() * words.length);
        resolve(words[randomIndex]);
      }
    };

    request.onerror = () => resolve(null);
  });
}

/* =========================================
   INICIALIZAÇÃO AUTOMÁTICA
========================================= */
openDatabase().then(() => {
  console.log("IndexedDB pronto");
});
