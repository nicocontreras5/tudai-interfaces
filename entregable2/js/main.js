function onloand() {
    
    let canvas = document.querySelector('#entregable2');
    let ctx = canvas.getContext('2d');
    let fil = 6;
    let col= 7;
    
    let partida = new app(ctx,col,fil);
    
    partida.crearPartida();

    function mouseDown(e) {
        
        if (partida.JugadorAgarroFichas(e.offsetX, e.offsetY)&& (!partida.checkGanador())){
        
            partida.setAccionJugadorActual(true);
            
        }
        
    } 
    document.getElementById("entregable2").addEventListener("mousedown", mouseDown);

    //alerts
   function mouseUp(e) {
        if (partida.insertoPrimeraFila(e.offsetX, e.offsetY)) {
            if(partida.getAccionjugadorActual()){
                partida.tirarFicha(e.offsetX, e.offsetY);
                if(partida.checkGanador()){
                    alert("gano el jugador: " + partida.jugadorActual.getNombre());
                }
            }//msotrar en un alert que agarre ficha primero
        }
        //mostrar alert de que tire en la primer fila
    }    
    document.getElementById("entregable2").addEventListener("mouseup", mouseUp);
     
    




    
}document.addEventListener("DOMContentLoaded", onloand);
