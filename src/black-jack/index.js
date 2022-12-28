import _ from "underscore";
// import {crearDeck as nuevoDeck}  from './usecases/crear-deck'
// import nuevoDeck  from './usecases/crear-deck'
// import  {pedirCarta} from './usecases/pedir-carta'
// import {valorCarta} from './usecases/valor-carta'
import{crearDeck as nuevoDeck,pedirCarta,valorCarta} from './usecases'
/**
 * 2C = twof clubs
 * 2D = twof Diaminds
 * 2H = twof Hearts
 * 2S = twof Spades
 */

const miModulo = (() => {
  "use strict";
  //Cosntantes de creacion
  const tipos  = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"],
    //Referencias del HTML
    btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevo = document.querySelector("#btnNuevo"),
    puntosHTML = document.querySelectorAll("small"),
    //Divs
    divCartasJugadores = document.querySelectorAll(".divCartas");
  //Variables
  let puntosJugadores = [],
    deck = [];

  //INICILIZAR EL JUEGEO
  const inicializarJuego = (numJugadores = 1) => {
    deck = nuevoDeck(tipos,especiales);
    puntosJugadores = [];
    for (let i = 0; i <= numJugadores; i++) {
      puntosJugadores.push(0);
    }

    puntosHTML.forEach(elem => (elem.innerText = 0));

    divCartasJugadores.forEach(elem => (elem.innerHTML = ""));

    btnPedir.disabled = false;
    btnDetener.disabled = false;

  };

  //Turno:0 = primer jugador y el último será la computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] += valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };
  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugadores[turno].append(imgCarta);
  };
  const determinarGanador = puntosComputadora => {
    setTimeout(() => {
      if (puntosJugadores[0] === puntosComputadora) {
        alert("empate");
      } else if (
        puntosJugadores[0] > 21 ||
        (puntosJugadores[0] < puntosComputadora && puntosComputadora <= 21)
      ) {
        alert("perdiste");
      } else {
        alert("ganaste");
      }
    }, 25);
  };
  //Turno de la computadora
  const turnoComputadora = puntosMinimos => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta(deck);
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);
      if (puntosMinimos > 21) {
        break;
      }
    } while (puntosComputadora < 21 && puntosJugadores[0] > puntosComputadora);
    determinarGanador(puntosComputadora);
  };

  //Eventos
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta(deck);
    const puntosJugador = acumularPuntos(carta, 0);
    //Agregar carta
    crearCarta(carta, 0);

    if (puntosJugador > 21) {
      //console.warn("Perdiste");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      //console.warn("21,genial!");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores);
  });

  btnNuevo.addEventListener("click", () => {
    inicializarJuego();
    console.clear();
  });
  return {
    nuevoJuego: inicializarJuego,
  };
})();
