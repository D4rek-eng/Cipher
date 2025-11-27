window.cipher = {
  // Función para cifrar mensaje usando códigos ASCII (A–Z: 65–90)
  encode: (offset, string) => {
    if (typeof offset !== "number" || !Number.isInteger(offset) || offset < 0) {
      throw new TypeError("El offset debe ser un número entero positivo.");
    }
    if (typeof string !== "string") {
      throw new TypeError("El texto a cifrar debe ser una cadena.");
    }

    const normalizedOffset = offset % 26;

    let result = "";
    for (let i = 0; i < string.length; i++) {
      const char = string[i];
      const code = char.charCodeAt(0);

      // Solo ciframos letras del alfabeto latino básico A–Z
      if (code >= 65 && code <= 90) {
        const shifted =
          ((code - 65 + normalizedOffset + 26) % 26) + 65;
        result += String.fromCharCode(shifted);
      } else {
        // Otros caracteres (espacios, signos, números, ñ, etc.) se mantienen
        result += char;
      }
    }

    return result;
  },
  // Función para descifrar mensaje
  decode: (offset, string) => {
    if (typeof offset !== "number" || !Number.isInteger(offset) || offset < 0) {
      throw new TypeError("El offset debe ser un número entero positivo.");
    }
    if (typeof string !== "string") {
      throw new TypeError("El texto a descifrar debe ser una cadena.");
    }

    const normalizedOffset = offset % 26;

    let result = "";
    for (let i = 0; i < string.length; i++) {
      const char = string[i];
      const code = char.charCodeAt(0);

      if (code >= 65 && code <= 90) {
        const shifted =
          ((code - 65 - normalizedOffset + 26 * 10) % 26) + 65;
        result += String.fromCharCode(shifted);
      } else {
        result += char;
      }
    }

    return result;
  }
};
