


/* jugador.js:80 Uncaught TypeError: h is not a function
    at Image.imgFicha.onload (jugador.js:80)
    no pude solucionar ese error aunque el codigo funciona perfectamente. Es contradictorio por que dice que h 
    no es reconocida como funcion pero si esta realizando su ejecucuion y el fin apra el que se tipeo;
    */
    pero

function onload() {

    let canvas = document.querySelector('#entregable2');
    let ctx = canvas.getContext('2d');
    let partida;


    
    function crearPartida() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        partida = new app(ctx, 7, 6);
        partida.crearPartida();
    }

    crearPartida();

    function reiniciar() {
    
        crearPartida();


    } document.getElementById("reiniciar").addEventListener("click", reiniciar);

    function mouseDown(e) {

        
        if ((partida.JugadorAgarroFichas(e.offsetX, e.offsetY)) && (!partida.checkGanador()) && (!partida.checkEmpate())) {

            partida.setAccionJugadorActual(true);

        }

    }
    document.getElementById("entregable2").addEventListener("mousedown", mouseDown);

    function mosueMove(e) {
        if (partida.getAccionjugadorActual()) {

            partida.dragFicha(e.offsetX, e.offsetY);

        }

    }
    document.getElementById("entregable2").addEventListener("mousemove", mosueMove);

    //alerts
    function mouseUp(e) {

        if ((partida.insertoPrimeraFila(e.offsetX, e.offsetY)) && (partida.getAccionjugadorActual())) {

            partida.jugar(e.offsetX, e.offsetY);
            let divAviso = document.getElementById("turnos");
            let imgJugadorActual = document.getElementById("imgJugadorActual");
            if (partida.checkGanador()) {

                divAviso.innerHTML = "GANO EL JUGADOR :";
                imgJugadorActual.src = "css/imagenes/ficha-"+partida.jugadorActual.getColor()+".png";
            } else if (partida.checkEmpate()) {
                divAviso.innerHTML = "Empate";
                imgJugadorActual.classList.add("d-none");

            } else {

                imgJugadorActual.src = "css/imagenes/ficha-"+partida.jugadorActual.getColor()+".png";
            }
        } else {
            partida.setAccionJugadorActual(false);
        }
    }
    document.getElementById("entregable2").addEventListener("mouseup", mouseUp);



} document.addEventListener("DOMContentLoaded", onload);
