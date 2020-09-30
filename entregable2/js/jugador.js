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
        this.fichaActual = -1;
        

    }

    getFichaActual(){
        return this.fichaActual;
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
    crearMisFichas(cantidad, ctx) {

        for (let i = 0; i < cantidad; i++) {
            let x = Math.floor(Math.random() * ((this.xMax- 40 )- this.xMin + 1)) + this.xMin;
            let y = Math.floor(Math.random() * (this.yMax- 40 - this.yMin + 1)) + this.yMin;
            let ficha = new Ficha(this.color, ctx,x, y);
            this.fichas.push(ficha);
        }
        this.dibujarMontonFicha();
    }

    dibujarMontonFicha(h) {
        if (this.getCantFichas()){

            let imgFicha = new Image();
             imgFicha.src = this.fichas[0].getImgFicha(); 
            imgFicha.onload = () => {
                for (let i = 0; i < this.fichas.length; i++) {
                    this.fichas[i].dibujarFicha(this.fichas[i].getPosX(), this.fichas[i].getPosY());
    
                }
                
                h();
            }
        }
    }

    getValueFichasJugador() {
        return this.valueJugador;
    }

    setFichaActual(i){
        this.fichaActual = i;
    }

    agarreFicha(x, y) {
       
        for (let i = this.fichas.length-1; i >= 0; i--) {
            if (this.fichas[i].meClikeo(x,y)){
             
                return i;
            }
        }
        return -1;
    }

    //borrar la ficha q agarro
    insertarFicha(x, y, ctx, posFicha,h) {
        x = x + 11;
        y = y + 7;
        
        this.fichas[posFicha].dibujarFicha(x, y);
        this.fichas.splice(posFicha, 1);
        this.fichaActual = -1;
        ctx.clearRect(this.xMin, this.yMin, this.xMax, this.yMax);

        this.dibujarMontonFicha(h);
        
    }

    dragFicha(x,y){
        x = x-20;
        y = y-20;
        this.fichas[0].dibujarFicha(x,y);
        
        
    }

}