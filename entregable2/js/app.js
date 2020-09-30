class app {


    constructor(ctx, col, fil) {
        this.matLogica = [];
        this.jugador2;
        this.jugadorActual;
        this.ctx = ctx;
        this.tablero;
        this.col = col;
        this.fil = fil;
        this.imgPartida;


    }


    crearPartida() {
        //cantidad de fichas cuando cree el jugador y ctx
        this.jugador2 = new Jugador(false, "amarilla", 1, 700, 850);
        this.jugadorActual = new Jugador(false, "roja", 2, 10, 160);
        this.jugadorActual.crearMisFichas(this.fil * this.col / 2, this.ctx);
        this.jugador2.crearMisFichas(this.fil * this.col / 2, this.ctx);
        this.tablero = new Tablero(this.ctx, this.col, this.fil);
        this.tablero.drawTablero(this.actualizarImgPartida.bind(this));
        this.crearMatLogica();
        this.actualizarImgPartida();
    }

    setAccionJugadorActual(accion) {
        this.jugadorActual.setjugando(accion);
    }

    getAccionjugadorActual() {
        return this.jugadorActual.getJugando();
    }

    crearMatLogica() {
        this.matLogica =[];
        for (let i = 0; i < this.fil; i++) {
            this.matLogica[i] = [];
            for (let j = 0; j < this.col; j++) {
                this.matLogica[i][j] = 0;
            }

        }
    }

   // axomodar el hardcode de 65
    // ejecuta cuando se suelta el click 
    jugar(x, y) {
        let posFicha = this.jugadorActual.getFichaActual();
        let num = (x - this.tablero.getDifPixelX()) / 65;
        let columnaTirada = Math.floor(num);
        this.jugadorActual.setjugando(false);
        if (this.insertarFicha(columnaTirada,posFicha, this.actualizarImgPartida.bind(this))) {
            
             // desaparecer fichas ya tiradas
            
            if (!this.checkGanador() && (!this.checkEmpate())) {
                this.alternarTurnos();
            }
        }

    }

    alternarTurnos() {
        let aux = this.jugadorActual;
        this.jugadorActual = this.jugador2;
        this.jugador2 = aux;
    }

    

    actualizarImgPartida() {
        console.log("ejecturo");
        this.imgPartida = this.ctx.getImageData(0, 0, 900, 600);
    }
    
    insertarFicha(columna,posFicha, h) {


        for (let i = this.fil - 1; i >= 0; i--) {

            if (this.matLogica[i][columna] == 0) {
                this.matLogica[i][columna] = this.jugadorActual.getValueJugador();
                let x = this.tablero.getDifPixelX() + columna * this.tablero.imagenCelda.width;
                let y = this.tablero.getDifPixely() + i * this.tablero.imagenCelda.height;
                
                this.jugadorActual.insertarFicha(x, y,this.ctx,posFicha,h)
                   
              
                
                
                return true;
            }
        }
        return false;
    }

    checkEmpate() {
        return ((this.jugadorActual.getCantFichas() == 0) && (this.jugador2.getCantFichas() == 0));
    }

    checkGanador() {
        for (let y = 0; y < this.fil; y++) { //horizontal
            for (let x = 0; x < this.col - 3; x++) {
                if (this.matLogica[y][x] == this.jugadorActual.getValueJugador() &&
                    this.matLogica[y][x + 1] == this.jugadorActual.getValueJugador() &&
                    this.matLogica[y][x + 2] == this.jugadorActual.getValueJugador() &&
                    this.matLogica[y][x + 3] == this.jugadorActual.getValueJugador()) {
                    return true;
                }
            }
        }
        for (let y = 0; y < this.fil - 3; y++) { //vertical
            for (let x = 0; x < this.col; x++) {
                if (this.matLogica[y][x] == this.jugadorActual.getValueJugador() &&
                    this.matLogica[y + 1][x] == this.jugadorActual.getValueJugador() &&
                    this.matLogica[y + 2][x] == this.jugadorActual.getValueJugador() &&
                    this.matLogica[y + 3][x] == this.jugadorActual.getValueJugador()) {
                    return true;
                }
            }
        }
        for (let y = 0; y < this.fil - 3; y++) { //diagonal1
            for (let x = 0; x < this.col - 3; x++) {
                if (this.matLogica[y][x] == this.jugadorActual.getValueJugador() &&
                    this.matLogica[y + 1][x + 1] == this.jugadorActual.getValueJugador() &&
                    this.matLogica[y + 2][x + 2] == this.jugadorActual.getValueJugador() &&
                    this.matLogica[y + 3][x + 3] == this.jugadorActual.getValueJugador()) {
                    return true;
                }

            }
        }
        for (let y = 3; y < this.fil; y++) { //diagonal2
            for (let x = 0; x < this.col - 3; x++) {
                if (this.matLogica[y][x] == this.jugadorActual.getValueJugador() &&
                    this.matLogica[y - 1][x + 1] == this.jugadorActual.getValueJugador() &&
                    this.matLogica[y - 2][x + 2] == this.jugadorActual.getValueJugador() &&
                    this.matLogica[y - 3][x + 3] == this.jugadorActual.getValueJugador()) {
                    return true;
                }
            }
        }
        return false
    }

    insertoPrimeraFila(x, y) {

        this.ctx.putImageData(this.imgPartida, 0, 0);
        return this.tablero.esMiPrimerFila(x, y);

    }

    // consulta en el main  cuando se hace click en un monton de fichas si da true
    // le cambio setAccionJugador a true para decir q esta jugando
    JugadorAgarroFichas(x, y) {
        let posFichaActual = this.jugadorActual.agarreFicha(x, y);
        if ( posFichaActual== -1) {
            return false;
        } else {
            this.jugadorActual.setFichaActual(posFichaActual);
            
            return true;
        }
       

    }

    dragFicha(x, y) {

        this.ctx.putImageData(this.imgPartida, 0, 0);
        this.jugadorActual.dragFicha(x, y);

    }

}