import _ from "underscore";

//Esta funcion cre un nuevo deck

/**
 *
 * @param {Array<String>} tiposDeCarta Ejemplo : ["C", "D", "H", "S"]
 * @param {Array<String>} tiposEspeciales Ejemplo: ["A", "J", "Q", "K"]
 * @returns {Array<String>} retorna un nuevo deck de cartas
 */
export const crearDeck = (tiposDeCarta, tiposEspeciales) => {
  if (!tiposDeCarta && tiposDeCarta.length === 0) throw new Error("tiposDeCarta es obligatorio");
  let deck = [];
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tiposDeCarta) {
      deck.push(i + tipo);
    }
  }
  for (let tipo of tiposDeCarta) {
    for (let especial of tiposEspeciales) {
      deck.push(especial + tipo);
    }
  }
  //console.log(deck);
  return _.shuffle(deck);
};

export default crearDeck;
