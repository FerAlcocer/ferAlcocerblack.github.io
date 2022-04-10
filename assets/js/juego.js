//
//  2C = Two of Clubs
//  2D = Two of Diamonds
//  2H = Two of Hearts
//  2S = Two of Spades


let deck = [];

const tipos      = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'K', 'Q'];

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias del HTML
const btnNuevo   = document.querySelector('#btnNuevo');
const btnPedir   = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const smalls     = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const crearDeck = () =>{
for( let i = 2; i <=10; i++){
    for(let tipo of tipos){
        deck.push(i + tipo);
    }
}

// deck =[];
// for( let tipo of tipos){
//     for(let i = 2; i < 10; i++){
//         deck.push(i + tipo);
//     }
// }
// console.log(deck);

for(let tipo of tipos){
    for( let especial of especiales){
    deck.push(especial + tipo);
    }
}
// console.log(deck);


deck = _.shuffle(deck);

// console.log(deck);

return deck;
}

crearDeck();

// Esta funcion me permite tomar una carta
const pedirCarta = () => {

    if ( deck.lenght === 0 ) {
        throw 'No hay mas cartas en el deck';
    }
    let carta = deck.shift();
    // console.log(carta);
    // console.log(deck);
    return carta;
}

// pedirCart a();
const valorCarta = (carta) => { 

    const valor = carta.substring(0, carta.length -1);
    return ( isNaN(valor) ) ?
            (valor === 'A' )? 11 : 10
            : valor * 1;
    // let puntos = 0;
    // if ( isNaN( valor ) ) {  //isNaN = is not a number, arroja valor truo o false
    //    puntos = ( valor === 'A' ) ? 11 : 10;
    
    // } else {
       
    //     puntos = valor * 1; // al multiplicar el valor numero en forma string por 1, se transforma en un numero
    
    // }
    // console.log({ valor });
    // console.log( puntos );
};

// Turno de la computadora

const turnoComputadora = ( puntosMinimos ) => {

   do{
        const carta = pedirCarta();
        
        puntosComputadora = puntosComputadora + valorCarta( carta );   
        smalls[1].innerText= puntosComputadora;
        console.log( puntosComputadora );

        // <!-- <img class="carta" src="assets/cartas/2C.png"> -->
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

            if( puntosMinimos > 21) {
                break;
            }

    }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21)){

        setTimeout(() => {
           if( puntosComputadora === puntosMinimos ) {
               alert('Empataron');
           } else if ( puntosMinimos > 21 ) {
               alert('Lo siento mucho, perdiste');
           } else if ( puntosComputadora > 21 ) {
               alert('Jugador Gana');
           } else {
               alert('La computadora gano');
           }
    }, 60 );
        
}};

// const valor = valorCarta( pedirCarta() );
// console.log( {valor} );

// Eventos

btnNuevo.addEventListener('click', () => {
    puntosJugador     = 0;
    puntosComputadora = 0;
    smalls[0].innerText= puntosJugador;
    smalls[1].innerText= puntosComputadora;
    
    divCartasJugador.innerHTML      = '';
    divCartasComputadora.innerHTML  = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

    deck = crearDeck();



})

btnPedir.addEventListener('click', () => {

   const carta = pedirCarta();
   
   puntosJugador = puntosJugador + valorCarta( carta );
   
   
   smalls[0].innerText= puntosJugador;
   console.log( puntosJugador );

   // <!-- <img class="carta" src="assets/cartas/2C.png"> -->
   const imgCarta = document.createElement('img');
   imgCarta.src = `assets/cartas/${ carta }.png`;
   imgCarta.classList.add('carta');
   divCartasJugador.append(imgCarta);

   if( puntosJugador > 21 ) {
       console.warn('Lo siento mucho, perdiste');
       btnPedir.disabled = true;
       btnDetener.disabled = true;
       turnoComputadora( puntosJugador );
      
   }else if( puntosJugador === 21 ){
       btnPedir.disabled = true;
       btnDetener.disabled = true;
       console.warn('21, Ganaste!');
       turnoComputadora( puntosJugador );
     
   }
});
btnDetener.addEventListener('click', () => {

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    
    turnoComputadora( puntosJugador );
});