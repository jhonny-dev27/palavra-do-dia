import { salvarPalavra, obterPalavras } from './db.js';

const palavraEl = document.getElementById('palavra');
const significadoEl = document.getElementById('significado');
const etimologiaEl = document.getElementById('etimologia');
const inglesEl = document.getElementById('ingles');
const btnNovaPalavra = document.getElementById('nova-palavra');

function escolherPalavraAleatoria(palavras) {
  if (palavras.length === 0) return null;
  const index = Math.floor(Math.random() * palavras.length);
  return palavras[index];
}

async function mostrarNovaPalavra() {
  const palavras = await obterPalavras();

  if (palavras.length === 0) {
    palavraEl.textContent = 'Nenhuma palavra salva';
    significadoEl.textContent = '';
    etimologiaEl.textContent = '';
    inglesEl.textContent = '';
    return;
  }

  const palavra = escolherPalavraAleatoria(palavras);

  palavraEl.textContent = palavra.palavra;
  significadoEl.textContent = palavra.significado;
  etimologiaEl.textContent = palavra.etimologia;
  inglesEl.textContent = palavra.ingles;
}

// EVENTO DO BOTÃO (IMPORTANTE)
btnNovaPalavra.addEventListener('click', () => {
  mostrarNovaPalavra();
});

// PRIMEIRA PALAVRA AO ABRIR
mostrarNovaPalavra();
