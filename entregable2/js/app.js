class app{


    constructor (ctx,col,fil){
        this.matLogica= [];
        this.jugador2;
        this.jugadorActual;
        this.ctx= ctx;
        this.tablero;
        this.col=col;
        this.fil=fil;
    }

    crearPartida(){
        let fichasJugador1 = new Ficha("roja", this.ctx, 1);
        let fichasJugador2 = new Ficha("azul", this.ctx, 2);
        this.jugador2 = new Jugador("azul", false, fichasJugador2, 700, 850);
        this.jugadorActual = new Jugador("rojo", false, fichasJugador1, 10, 180);;
        this.jugadorActual.crearMisFichas();
        this.jugador2.crearMisFichas();
        this.tablero = new Tablero(this.ctx, this.col, this.fil);
        this.tablero.drawTablero();
        this.crearMatLogica();
    }

    setAccionJugadorActual(accion){
        this.jugadorActual.setjugando(accion);
    }


    getAccionjugadorActual(){
        return this.jugadorActual.getJugando();
    }

    crearMatLogica(){
        
        for (let i = 0; i < this.fil; i++) {
            this.matLogica[i] = [];
            for (let j = 0; j < this.col; j++) {
                this.matLogica[i][j] = 0;
            }
            
        }
    }

    // ejecuta cuando se suelta el click 
    tirarFicha(x , y){
        let num = (x -this.tablero.getDifPixelX())/65;
        let columnaTirada = Math.floor(num);
        if (this.insertarFicha(columnaTirada,x,y)){
            this.jugadorActual.setjugando(false);
            if (!this.checkGanador()){
                let aux = this.jugadorActual;
                this.jugadorActual= this.jugador2;
                this.jugador2 = aux;
            }

        }else{
            this.jugadorActual.setjugando(false);
        }
    

    }

    insertarFicha(columna,x,y){
        
        for (let i = this.fil-1; i >= 0; i--) {
          
           if (this.matLogica[i][columna] == 0){
               this.matLogica[i][columna] = this.jugadorActual.getValueFichasJugador();
               x= this.tablero.getDifPixelX() + columna*65; 
               y= this.tablero.getDifPixely() + i* 60;
               this.jugadorActual.insertarFicha(x,y);
               return true;
           }  
        }
        return false;
    }

    //implementar
    
    checkGanador() {
        for (let y = 0; y < this.fil; y++) { //horizontal
            for (let x = 0; x < this.col - 3; x++) {
                if (this.matLogica[y][x] == this.jugadorActual.getValueFichasJugador() &&
                this.matLogica[y][x + 1] == this.jugadorActual.getValueFichasJugador() &&
                this.matLogica[y][x + 2] == this.jugadorActual.getValueFichasJugador() && 
                this.matLogica[y][x + 3] == this.jugadorActual.getValueFichasJugador()){
                    return true;
                  } 
            }
        }
        for (let y = 0; y < this.fil - 3; y++) { //vertical
            for (let x = 0; x < this.col; x++) {
                if (this.matLogica[y][x] == this.jugadorActual.getValueFichasJugador() && this.matLogica[y + 1][x] == this.jugadorActual.getValueFichasJugador() && this.matLogica[y + 2][x] == this.jugadorActual.getValueFichasJugador() && this.matLogica[y + 3][x] == this.jugadorActual.getValueFichasJugador()) return true;
            }
        }
        for (let y = 0; y < this.fil - 3; y++) { //diagonal1
            for (let x = 0; x < this.col - 3; x++) {
                if (this.matLogica[y][x] == this.jugadorActual.getValueFichasJugador() && 
                this.matLogica[y + 1][x + 1] == this.jugadorActual.getValueFichasJugador()&& 
                this.matLogica[y + 2][x + 2] == this.jugadorActual.getValueFichasJugador()&& 
                this.matLogica[y + 3][x + 3] == this.jugadorActual.getValueFichasJugador()){
                    return true;  
                } 

            }
        }
        for (let y = 3; y < this.fil; y++) { //diagonal2
            for (let x = 0; x < this.col - 3; x++) {
                if (this.matLogica[y][x] == this.jugadorActual.getValueFichasJugador() && 
                this.matLogica[y - 1][x + 1] == this.jugadorActual.getValueFichasJugador() && 
                this.matLogica[y - 2][x + 2] == this.jugadorActual.getValueFichasJugador() && 
                this.matLogica[y - 3][x + 3] == this.jugadorActual.getValueFichasJugador()){
                    return true;
                } 
            }
        }
        return false
    }

    insertoPrimeraFila(x, y){
        
        return this.tablero.esMiPrimerFila(x,y);

    }

    // consulta en el main  cuando se hace click en un monton de fichas si da true
    // le cambio setAccionJugador a true para decir q esta jugando
    JugadorAgarroFichas(x, y){
       
        return this.jugadorActual.agarreFicha(x,y);

    }

}