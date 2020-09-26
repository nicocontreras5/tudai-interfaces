class Ficha {

    constructor(color, ctx, posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.radio = 20;
        this.color = color;
        this.imagenFicha = new Image();
        this.imagenFicha.src = "./css/imagenes/ficha-" + color + ".png";
        this.imagenFicha.height = 40;
        this.imagenFicha.width = 40;
        this.ctx = ctx;


    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    getImgFicha(){
        return this.imagenFicha.src;
    }

    getcolor() {
        return this.color;
    }

    dibujarFicha(x, y) {
       
        this.ctx.drawImage(this.imagenFicha, x, y, this.imagenFicha.width, this.imagenFicha.height);
    
    }

    meClikeo(x, y) {
        let _x = this.posX +this.radio - x;
        let _y = this.posY+this.radio - y;
        
        return Math.sqrt(_x * _x + _y * _y) < this.radio;
    }

}