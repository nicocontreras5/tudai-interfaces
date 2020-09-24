class Jugador{

    constructor(nombre,jugando,fichas,xmin,xmax){
        this.nombre= nombre;
        this.jugando= jugando;
        this.xMin = xmin;
        this.xMax= xmax;
        this.yMin = 380;
        this.yMax =510;
        this.fichas= fichas;

    }

    jugar(x, y){
       this.fichas.insertar(x, y);
    
    }
    
    getX() {
        return {
            x: this.xMin,
            y: this.xMax
        };  
    }

    gety() {
        return {
            x: this.yMin,
            y: this.yMax
        };  
    }

    getNombre() {
        return this.nombre;
    }

    getJugando() {
        return this.jugando;
    }

    setjugando(juega){
        this.jugando = juega;
    }

    crearMisFichas(){
        this.fichas.crearFichasJugador( this.xMin,this.xMax,this.yMin,this.yMax);
    }

    getValueFichasJugador(){
        return this.fichas.getValue();
    }

    agarreFicha(x, y){

        return ((x > this.xMin )&&(x< this.xMax)&& (y> this.yMin)&&(y< this.yMax));
           
    }

    insertarFicha(x, y){
        this.fichas.dibujarEnTablero(x,y);
    
    }

}