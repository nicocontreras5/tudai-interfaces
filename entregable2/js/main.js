function onloand() {

    let canvas = document.querySelector('#entregable2');
    let ctx = canvas.getContext('2d');
    let partida;


    //no anda el case
    function crearPartida() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let eleccion = document.getElementById("dimencion-tablero").value;
        switch (eleccion) {
            case 1:

                fil = 7;
                col = 8;


                break;
            case 2:
                fil = 8;
                col = 9;
                break;
            case 3:
                fil = 9;
                col = 10;
                break;


            default:
                fil = 6;
                col = 7;
                break;
        }

        partida = new app(ctx, col, fil);
        partida.crearPartida();
    }

    crearPartida();

    function reiniciar() {
    
        crearPartida();


    } document.getElementById("reiniciar").addEventListener("click", reiniciar);

    function mouseDown(e) {

        partida.actualizarImgPartida();
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
                imgJugadorActual.src = "../css/imagenes/ficha-" + partida.jugadorActual.getColor() + ".png";
            } else if (partida.checkEmpate()) {
                divAviso.innerHTML = "Empate";
                imgJugadorActual.classList.add("d-none");

            } else {

                imgJugadorActual.src = "../css/imagenes/ficha-" + partida.jugadorActual.getColor() + ".png";
            }
        } else {
            partida.setAccionJugadorActual(false);
        }
    }
    document.getElementById("entregable2").addEventListener("mouseup", mouseUp);



} document.addEventListener("DOMContentLoaded", onloand);
