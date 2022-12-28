import _ from "underscore";
//Esta funcion me permite tomar una carta
/**
 * 
 * @param {Array<String>} deck  es un arreglo de string
 * @returns {String} la ultima carta del array 
 */
export const pedirCarta = (deck) => {
  if (deck.length === 0) {
    throw "No hay cartas el el deck";
  }
  return deck.pop();
};
