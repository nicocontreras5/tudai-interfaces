class Tablero {

    constructor(ctx, col, fil) {
        this.imagenCelda = new Image();
        this.imagenCelda.src = "./css/imagenes/celda-tablero.jpeg";
        this.ctx = ctx;
        this.col = col;
        this.fil = fil;
        this.difPixelTableroX = 220;
        this.difPixelTableroy = 150;
        this.height = col*65;
    }

    drawTablero() {

        let x = this.difPixelTableroX;
        let y = this.difPixelTableroy;
        this.imagenCelda.onload = () => {
            for (let i = 0; i < this.fil; i++) {
                for (let j = 0; j < this.col; j++) {

                    this.ctx.drawImage(this.imagenCelda, x, y, 65, 60);
                    x += 65;
                }
                x = this.difPixelTableroX;
                y += 60;

            }
        }
    }

    getDifPixelX(){
        return this.difPixelTableroX;
    }

    
    getDifPixely(){
        return this.difPixelTableroy;
    }

    esMiPrimerFila(x,y){
        
        return ((x > this.difPixelTableroX)&&(x< this.height + this.difPixelTableroX)&& (y > this.difPixelTableroy )&&(y <  this.difPixelTableroy + 60));
        
    }

}