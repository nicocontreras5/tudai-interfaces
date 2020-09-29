class Tablero {

    constructor(ctx, col, fil) {
        this.imagenCelda = new Image();
        this.imagenCelda.src = "./css/imagenes/celda-tablero.jpeg";
        this.imagenCelda.width= 65;
        this.imagenCelda.height= 55;
        this.ctx = ctx;
        this.col = col;
        this.fil = fil;
        this.difPixelTableroX = 220;
        this.difPixelTableroy = 150;
      

    }




    drawTablero() {

        let x = this.difPixelTableroX;
        let y = this.difPixelTableroy;
        this.imagenCelda.onload = () => {
            for (let i = 0; i < this.fil; i++) {
                for (let j = 0; j < this.col; j++) {

                    this.ctx.drawImage(this.imagenCelda, x, y, this.imagenCelda.width, this.imagenCelda.height);
                    x += this.imagenCelda.width;
                }
                x = this.difPixelTableroX;
                y += this.imagenCelda.height;

            }
            this.imgPartida= this.ctx.getImageData(0, 0, 900, 600);
           
        }

    }

    getDifPixelX(){
        return this.difPixelTableroX;
    }

    
    getDifPixely(){
        return this.difPixelTableroy;
    }

    esMiPrimerFila(x,y){
        
        return ((x > this.difPixelTableroX)&&(x< this.imagenCelda.width*this.col + this.difPixelTableroX)&& (y > this.difPixelTableroy )&&(y <  this.difPixelTableroy + this.imagenCelda.height));
        
    }

}