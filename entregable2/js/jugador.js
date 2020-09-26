class Jugador {

    constructor(jugando, color, value, xmin, xmax) {
        this.color = color;
        this.jugando = jugando;
        this.xMin = xmin;
        this.xMax = xmax;
        this.yMin = 380;
        this.yMax = 510;
        this.value = value;
        this.fichas = [];


    }
    getCantFichas() {
        return this.fichas.length;

    }

    getValueJugador() {
        return this.value;

    }

    getxMin() {
        return this.xMin;
    }

    getxMax() {
        return this.xMax;
    }

    getyMin() {
        return this.yMin;
    }

    getyMax() {
        return this.yMax;
    }

    getColor() {
        return this.color;
    }

    getJugando() {
        return this.jugando;
    }

    setjugando(juega) {
        this.jugando = juega;
    }
    // setear a cada ficha una posicion
    crearMisFichas(cantidad, ctx) {

        for (let i = 0; i < cantidad; i++) {
            let x = Math.floor(Math.random() * (this.xMax - this.xMin + 1)) + this.xMin;
            let y = Math.floor(Math.random() * (this.yMax - this.yMin + 1)) + this.yMin;
            let ficha = new Ficha(this.color, ctx,x, y);
            this.fichas.push(ficha);
        }
        this.dibujarMontonFicha();
    }

    dibujarMontonFicha() {
        let imgFicha = new Image();
         imgFicha.src = this.fichas[0].getImgFicha(); 
        imgFicha.onload = () => {
            for (let i = 0; i < this.fichas.length; i++) {
                this.fichas[i].dibujarFicha(this.fichas[i].getPosX(), this.fichas[i].getPosY());

            }
        }
    }

    getValueFichasJugador() {
        return this.valueJugador;
    }

    //arreglar desfazado
    agarreFicha(x, y) {
        for (let i = this.fichas.length-1; i >= 0; i--) {
            if (this.fichas[i].meClikeo(x,y)){
                return true;
            }
        }
        return false;
    }

    insertarFicha(x, y) {
        //la suma de 11 centra en la celda la ficha
        x = x + 11;
        y = y + 7;
        this.fichas[this.fichas.length -1].dibujarFicha(x, y);
        this.fichas.pop();

    }

    dragFicha(x,y){
        x = x-20;
        y = y-20;
        this.fichas[0].dibujarFicha(x,y);
    }

}