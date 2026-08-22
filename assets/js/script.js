const ENCRYPTION_KEYS = {
  e: 'enter',
  i: 'imes',
  a: 'ai',
  o: 'ober',
  u: 'ufat',
};

// Regex para mapeamento reverso de descriptografia
const DECRYPTION_REGEX = new RegExp(
  Object.values(ENCRYPTION_KEYS).join('|'),
  'g',
);

function validateInput(text) {
  return /^[a-zç\s]*$/.test(text);
}

function getInputValue() {
  const inputElement = document.querySelector('.input-text');
  const value = inputElement ? inputElement.value : '';

  if (!validateInput(value)) {
    displayOutput('Por favor, digite apenas letras minúsculas e sem acento.');
    return null;
  }

  return value;
}

function encrypt() {
  const inputText = getInputValue();
  if (inputText === null) return;

  const encryptedText = inputText
    .split('')
    .map((char) => ENCRYPTION_KEYS[char] || char)
    .join('');

  displayOutput(encryptedText);
}

function decrypt() {
  const inputText = getInputValue();
  if (inputText === null) return;

  const decryptedText = inputText.replace(
    DECRYPTION_REGEX,
    (matched) =>
      Object.keys(ENCRYPTION_KEYS).find(
        (key) => ENCRYPTION_KEYS[key] === matched,
      ) || matched,
  );

  displayOutput(decryptedText);
}

function displayOutput(outputText) {
  const outputSection = document.querySelector('.retorno');
  const copyButton = document.querySelector('.btn-copiar');

  if (!outputSection || !copyButton) return;

  outputSection.replaceChildren();

  const textarea = document.createElement('textarea');
  textarea.value = outputText;
  textarea.readOnly = true;
  outputSection.appendChild(textarea);

  copyButton.style.display = 'block';
  copyButton.addEventListener('click', () =>
    handleCopy(outputText, copyButton, textarea),
  );
}

async function handleCopy(text, button, fallbackTextarea) {
  try {
    await navigator.clipboard.writeText(text);
    const originalText = button.textContent;
    button.textContent = 'Copiado!';
    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  } catch {
    // Removido a escrita do objeto de erro no console para sanar o CWE-532
    fallbackTextarea.select();
  }
}

function clearAll() {
  const inputArea = document.querySelector('.input-text');
  const copyButton = document.querySelector('.btn-copiar');
  const outputSection = document.querySelector('.retorno');

  if (inputArea) inputArea.value = '';
  if (copyButton) copyButton.style.display = 'none';
  if (!outputSection) return;

  outputSection.replaceChildren();

  const fragment = document.createDocumentFragment();

  const img = document.createElement('img');
  img.className = 'mensagem';
  img.src = './assets/img/avatar.svg';
  img.alt = 'Imagem de um boneco com uma lupa sobre um diamante';
  img.title = 'Avatar';

  const h3 = document.createElement('h3');
  h3.className = 'mensagem';
  h3.textContent = 'Nenhuma mensagem encontrada';

  const p = document.createElement('p');
  p.className = 'mensagem';
  p.textContent =
    'Digite o texto que você deseja criptografar ou decriptografar.';

  fragment.append(img, h3, p);
  outputSection.appendChild(fragment);
}

// Registro dos Event Listeners no carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
  const btnEncrypt = document.querySelector('.btn-criptografar');
  const btnDecrypt = document.querySelector('.btn-decriptografar');
  const btnClear = document.querySelector('.btn-limpar');

  if (btnEncrypt) btnEncrypt.addEventListener('click', encrypt);
  if (btnDecrypt) btnDecrypt.addEventListener('click', decrypt);
  if (btnClear) btnClear.addEventListener('click', clearAll);
});