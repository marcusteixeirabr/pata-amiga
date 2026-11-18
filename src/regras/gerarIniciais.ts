export function gerarIniciais(nome: string): string {
  const palavras = nome.split(" ").filter((p) => comecaComLetra(p));
  if (palavras.length === 0) return "";

  const primeira = palavras[0];
  const ultima = palavras.length > 1 ? palavras[palavras.length - 1] : "";
  return (primeira.charAt(0) + ultima.charAt(0)).toUpperCase();
}

// Se for letra: "a" != "A". Se for símbolo: "#" == "#"
// Funciona tbm com letras acentuadas: "á" != "Á"
function comecaComLetra(palavra: string): boolean {
  const primeiraLetra = palavra.charAt(0);
  return primeiraLetra.toLowerCase() !== primeiraLetra.toUpperCase();
}
