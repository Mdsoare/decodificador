const encryptionKeys = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

function validateInput(inputText) {
  const regex = /^[a-zç\s]*$/;
  return regex.test(inputText);
}

function encrypt() {
  const inputText = document.querySelector(".inputText").value;
  if (!validateInput(inputText)) {
    alert("Por favor, digite apenas letras minúsculas e sem acento.");
    return;
  }

  let encryptedText = "";

  for (const char of inputText) {
    if (encryptionKeys[char]) {
      encryptedText += encryptionKeys[char];
    } else {
      encryptedText += char;
    }
  }

  displayOutput(encryptedText);
}

function decrypt() {
  const inputText = document.querySelector(".inputText").value;
  if (!validateInput(inputText)) {
    alert("Por favor, digite apenas letras minúsculas e sem acento.");
    return;
  }

  let decryptedText = inputText;

  for (const key in encryptionKeys) {
    const re = new RegExp(encryptionKeys[key], "g");
    decryptedText = decryptedText.replace(re, key);
  }

  displayOutput(decryptedText);
}

function displayOutput(outputText) {
  const outputSection = document.querySelector(".retorno");

  outputSection.replaceChildren();

  const textarea = document.createElement("textarea");
  textarea.value = outputText;
  textarea.readOnly = true;
  outputSection.appendChild(textarea);

  const copyButton = document.querySelector(".btn-copiar");
  copyButton.style.display = "block";

  copyButton.onclick = async function () {
    try {
      await navigator.clipboard.writeText(outputText);
      const originalText = copyButton.textContent;
      copyButton.textContent = "Copiado!";
      setTimeout(() => {
        copyButton.textContent = originalText;
      }, 2000);
    } catch (err) {
      console.error("Falha ao copiar o texto: ", err);
      textarea.select();
    }
  };
}