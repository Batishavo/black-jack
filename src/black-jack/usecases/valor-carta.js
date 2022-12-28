import _ from "underscore";
//Pedir carts
/**
 * 
 * @param {String} carta  la carta que se obtendra
 * @returns {Number} el valor de la carta
 */
export const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return !isNaN(valor) ? valor * 1 : valor === "A" ? 10 : 11;
  };