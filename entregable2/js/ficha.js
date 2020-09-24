class Ficha {

    constructor(color, ctx, value) {
        this.color = color;
        this.imagenFicha = new Image();
        this.imagenFicha.src = "./css/imagenes/ficha-" + color + ".jpeg";
        this.ctx = ctx;
        this.value= value;

    }


    
    getValue() {
        return this.value;
    }


    getcolor() {
        return this.color;
    }

    dibujarEnTablero(x,y){
     
        this.ctx.drawImage(this.imagenFicha, x+11, y+11,40,35);
    
    }

    crearFichasJugador(xmin, xmax, ymin, ymax) {
        let x;
        let y;
        this.imagenFicha.onload = () => {
            for (let i = 0; i < 15; i++) {
                x = Math.floor(Math.random() * (xmax - xmin + 1)) + xmin;
                y = Math.floor(Math.random() * (ymax - ymin + 1)) + ymin;
                this.ctx.drawImage(this.imagenFicha, x, y,45,35);
            }
        }
    }




}