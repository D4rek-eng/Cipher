// Lógica de interacción con la interfaz de transmisión codificada

const offsetInput = document.getElementById("offset");
const inputTextArea = document.getElementById("input-text");
const outputTextArea = document.getElementById("output-text");
const morseOutput = document.getElementById("morse-output");
const encodeBtn = document.getElementById("encode-btn");
const decodeBtn = document.getElementById("decode-btn");
const clearBtn = document.getElementById("clear-btn");

function getOffsetValue() {
  const raw = offsetInput.value.trim();
  const parsed = Number(raw);

  if (!raw || Number.isNaN(parsed) || !Number.isInteger(parsed) || parsed <= 0) {
    alert("Indica un desplazamiento (offset) válido: número entero positivo.");
    throw new Error("Offset inválido");
  }

  return parsed;
}

function normalizeText(text) {
  // El cifrado oficial se hace sobre mayúsculas según el enunciado
  return text.toUpperCase();
}

const MORSE_MAP = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  " ": "/"
};

function updateMorseFromOutput() {
  const text = outputTextArea.value.toUpperCase();
  if (!text) {
    morseOutput.value = "";
    return;
  }

  const parts = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (MORSE_MAP[ch]) {
      parts.push(MORSE_MAP[ch]);
    } else {
      // Cualquier símbolo que no esté en el mapa se muestra tal cual
      parts.push(ch);
    }
  }

  morseOutput.value = parts.join(" ");
}

encodeBtn.addEventListener("click", () => {
  try {
    const offset = getOffsetValue();
    const text = normalizeText(inputTextArea.value);

    if (!text) {
      alert("Escribe un mensaje para iniciar la transmisión codificada.");
      return;
    }

    const encoded = window.cipher.encode(offset, text);
    outputTextArea.value = encoded;
    updateMorseFromOutput();
  } catch (error) {
    // En caso de error de validación, no hacemos nada más.
  }
});

decodeBtn.addEventListener("click", () => {
  try {
    const offset = getOffsetValue();
    const text = normalizeText(inputTextArea.value);

    if (!text) {
      alert("Escribe el mensaje cifrado que deseas descifrar.");
      return;
    }

    const decoded = window.cipher.decode(offset, text);
    outputTextArea.value = decoded;
    updateMorseFromOutput();
  } catch (error) {
    // Error ya comunicado al usuario mediante alert.
  }
});

clearBtn.addEventListener("click", () => {
  inputTextArea.value = "";
  outputTextArea.value = "";
  morseOutput.value = "";
  inputTextArea.focus();
});
