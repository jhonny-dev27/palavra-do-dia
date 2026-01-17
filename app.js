const wordEl = document.getElementById('word');
const meaningEl = document.getElementById('meaning');
const etymologyEl = document.getElementById('etymology');
const translationEl = document.getElementById('translation');
const nextBtn = document.getElementById('next');

async function mostrarNovaPalavra() {
  const palavras = await obterPalavras();

  if (palavras.length === 0) {
    wordEl.textContent = 'Nenhuma palavra';
    meaningEl.textContent = '';
    etymologyEl.textContent = '';
    translationEl.textContent = '';
    return;
  }

  const index = Math.floor(Math.random() * palavras.length);
  const palavra = palavras[index];

  wordEl.textContent = palavra.palavra;
  meaningEl.textContent = palavra.significado;
  etymologyEl.textContent = palavra.etimologia;
  translationEl.textContent = palavra.ingles;
}

nextBtn.addEventListener('click', mostrarNovaPalavra);

mostrarNovaPalavra();
