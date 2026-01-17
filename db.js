const DB_NAME = 'PalavraDB';
const DB_VERSION = 1;
const STORE_NAME = 'palavras';

function abrirDB() {
  return new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
  });
}

async function salvarPalavra(palavra) {
  const db = await abrirDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  tx.objectStore(STORE_NAME).add(palavra);
}

async function obterPalavras() {
  const db = await abrirDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);

  return new Promise((resolve) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
  });
}

/* Palavra inicial (exemplo) */
window.addEventListener('load', async () => {
  const palavras = await obterPalavras();
  if (palavras.length === 0) {
    salvarPalavra({
      palavra: 'Resiliência',
      significado: 'Capacidade de se adaptar e superar adversidades.',
      etimologia: 'Do latim resiliens, "voltar atrás, recuperar-se".',
      ingles: 'Resilience'
    });
  }
});
