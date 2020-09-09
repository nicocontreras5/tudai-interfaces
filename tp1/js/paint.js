function loadPage() {

    //ENTREGABLE 1
    let dibujando = false;
    let canvas = document.getElementById("entregable1");
    let ctx = canvas.getContext("2d");
    let imagenOriginal;


    function crearCanvas() {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    crearCanvas();

    function descartarFoto() {

        document.getElementById("cargarFoto").value = "";
        document.getElementById("select-saturado").classList.add("d-none");
        document.getElementById("select-brillo").classList.add("d-none");

        document.getElementById("filtros").classList.add("d-none");
        document.getElementById("filtros-select").value="default";
        limpiarcanvas();
        imagenOriginal= "";
    }
    document.getElementById("descartar").addEventListener("click", descartarFoto);
    
    function limpiarcanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    }

    function startDraw(e) {
        if (document.getElementById("pintar-canvas").checked) {
            return;
        } else {
            dibujando = true;
            ctx.beginPath();
            draw(e);
        }
    }
    canvas.addEventListener("mousedown", startDraw);

    function finishDraw() {
        dibujando = false;

    }
    canvas.addEventListener("mouseup", finishDraw);

    function draw(e) {
        if (dibujando) {
            let goma = document.getElementById("goma").checked;
            if (goma) {
                ctx.strokeStyle = "white";
            } else {
                let color = document.getElementById("color").value;
                ctx.strokeStyle = color;
            }
            let grosor = document.getElementById("grosor").value;
            rect = canvas.getBoundingClientRect();
            ctx.lineWidth = grosor;
            ctx.lineCap = "round";

            ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);

        } else {
            return;
        }
    }
    canvas.addEventListener("mousemove", draw);

    function cargarFoto(e) {

      
        if (document.getElementById("foto-input").value != "") {
            document.getElementById("filtros-select").value="default";
            document.getElementById("select-saturado").classList.add("d-none");
            document.getElementById("select-brillo").classList.add("d-none");

            document.getElementById("filtros").classList.remove("d-none");
            let file = e.target.files[0];

            limpiarcanvas();
            let reader = new FileReader();
            reader.readAsDataURL(file); // this is reading as data url

            // here we tell the reader what to do when it's done reading...
            reader.onload = readerEvent => {
                let content = readerEvent.target.result; // this is the content!

                let image = new Image();

                image.src = content;

                image.onload = function () {

                    let scaleImage = Math.min(canvas.width / this.width, canvas.height / this.height);
                    ctx.drawImage(this, 0, 0, this.width * scaleImage, this.height * scaleImage);
                    imagenOriginal = this;
                }
            }

        }
        document.getElementById("filtros").value = "default";

    }
    document.getElementById("foto-input").addEventListener("change", cargarFoto);

    function fotoSinFiltro() {
        limpiarcanvas();
        let scaleImage = Math.min(canvas.width / imagenOriginal.width, canvas.height / imagenOriginal.height);
        ctx.drawImage(imagenOriginal, 0, 0, imagenOriginal.width * scaleImage, imagenOriginal.height * scaleImage);

    }

    function filtroNegativo() {
        fotoSinFiltro();
        let scaleImage = Math.min(canvas.width / imagenOriginal.width, canvas.height / imagenOriginal.height);
        let imageData = ctx.getImageData(0, 0, imagenOriginal.width * scaleImage, imagenOriginal.height * scaleImage);
        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                let index = (x + imageData.width * y) * 4;
                imageData.data[index + 0] = 255 - imageData.data[index + 0];
                imageData.data[index + 1] = 255 - imageData.data[index + 1];
                imageData.data[index + 2] = 255 - imageData.data[index + 2];
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function filtroGrises() {
        fotoSinFiltro();
        let scaleImage = Math.min(canvas.width / imagenOriginal.width, canvas.height / imagenOriginal.height);
        let imageData = ctx.getImageData(0, 0, imagenOriginal.width * scaleImage, imagenOriginal.height * scaleImage);

        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                let index = (x + imageData.width * y) * 4;
                let color = (imageData.data[index + 0] + imageData.data[index + 1] + imageData.data[index + 2]) / 3;
                imageData.data[index + 0] = color;
                imageData.data[index + 1] = color;
                imageData.data[index + 2] = color;
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function filtroSepia() {
        fotoSinFiltro();

        let scaleImage = Math.min(canvas.width / imagenOriginal.width, canvas.height / imagenOriginal.height);
        let imageData = ctx.getImageData(0, 0, imagenOriginal.width * scaleImage, imagenOriginal.height * scaleImage);

        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                let index = (x + imageData.width * y) * 4;
                imageData.data[index + 0] = (imageData.data[index + 0] * .393) + (imageData.data[index + 1] * .769) + (imageData.data[index + 2] * .189);
                imageData.data[index + 1] = (imageData.data[index + 0] * .349) + (imageData.data[index + 1] * .686) + (imageData.data[index + 2] * .168);
                imageData.data[index + 2] = (imageData.data[index + 0] * .272) + (imageData.data[index + 1] * .534) + (imageData.data[index + 2] * .131);
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function filtroBrillo() {

            let contraste = document.getElementById("cant-brillo").value;
            document.getElementById("select-brillo").classList.remove("d-none");
            contraste=  parseInt(contraste, 10);
            fotoSinFiltro();
            console.log(contraste);
            if (contraste>0) {
                let scaleImage = Math.min(canvas.width / imagenOriginal.width, canvas.height / imagenOriginal.height);
                let imageData = ctx.getImageData(0, 0, imagenOriginal.width * scaleImage, imagenOriginal.height * scaleImage);
                let factor = (259 * (contraste + 255)) / (255 * (259 - contraste));
                for (let y = 0; y < imageData.height; y++) {
                    for (let x = 0; x < imageData.width; x++) {
                        let index = (x + imageData.width * y) * 4;
    
                        imageData.data[index + 0] = factor * (imageData.data[index + 0] - 128) + 128;
                        imageData.data[index + 1] = factor * (imageData.data[index + 1] - 128) + 128;
                        imageData.data[index + 2] = factor * (imageData.data[index + 2] - 128) + 128;
                    }
                }
                ctx.putImageData(imageData, 0, 0);
            }
    }
    document.getElementById("cant-brillo").addEventListener("change", filtroBrillo);


    function filtroBinario() {
        fotoSinFiltro();

        let scaleImage = Math.min(canvas.width / imagenOriginal.width, canvas.height / imagenOriginal.height);

        let imageData = ctx.getImageData(0, 0, imagenOriginal.width * scaleImage, imagenOriginal.height * scaleImage);

        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                let index = (x + imageData.width * y) * 4;
                let color = (imageData.data[index + 0] + imageData.data[index + 1] + imageData.data[index + 2]) / 3;

                if (color > 126) {
                    imageData.data[index + 0] = 255;
                    imageData.data[index + 1] = 255;
                    imageData.data[index + 2] = 255;
                } else {
                    imageData.data[index + 0] = 0;
                    imageData.data[index + 1] = 0;
                    imageData.data[index + 2] = 0;
                }
            }
        }
        ctx.putImageData(imageData, 0, 0);


    }

    function filtroSaturado() {
       
            fotoSinFiltro();
            let saturado = document.getElementById("cant-saturado").value;
            saturado= parseInt(saturado, 10);
            document.getElementById("select-saturado").classList.remove("d-none");
            
            if (saturado>0) {
                let scaleImage = Math.min(canvas.width / imagenOriginal.width, canvas.height / imagenOriginal.height);
                let imageData = ctx.getImageData(0, 0, imagenOriginal.width * scaleImage, imagenOriginal.height * scaleImage);
    
                for (let y = 0; y < imageData.height; y++) {
                    for (let x = 0; x < imageData.width; x++) {
                        let index = (x + imageData.width * y) * 4;
                        let colorRgb = [imageData.data[index + 0], imageData.data[index + 1], imageData.data[index + 2]]
                        let colorHsv = RGBtoHSV(colorRgb);
                        colorHsv[1] *= saturado;
                        let colorfinal = HSVtoRGB(colorHsv);
                        imageData.data[index + 0] = colorfinal[0];
                        imageData.data[index + 1] = colorfinal[1];
                        imageData.data[index + 2] = colorfinal[2];
                    }
                }
                ctx.putImageData(imageData, 0, 0);
                
            }
    }
    document.getElementById("cant-saturado").addEventListener("change", filtroSaturado);


    function clickInput() {
        
        let confir= confirm("Bienvenido! Las imagenes que superen la reoslucion 1000 X 400 solo descargara la imagen con filtro, sin los trazos de dibujo!!");
        if (confir) {
            
            document.querySelector('#foto-input').click();
        }
    }
    document.querySelector('#btn-cargar-foto').addEventListener("click", clickInput);


    RGBtoHSV = function (color) {
        var r, g, b, h, s, v;
        r = color[0];
        g = color[1];
        b = color[2];
        min = Math.min(r, g, b);
        max = Math.max(r, g, b);


        v = max;
        delta = max - min;
        if (max != 0)
            s = delta / max;        // s
        else {
            // r = g = b = 0        // s = 0, v is undefined
            s = 0;
            h = -1;
            return [h, s, undefined];
        }
        if (r === max)
            h = (g - b) / delta;      // between yellow & magenta
        else if (g === max)
            h = 2 + (b - r) / delta;  // between cyan & yellow
        else
            h = 4 + (r - g) / delta;  // between magenta & cyan
        h *= 60;                // degrees
        if (h < 0)
            h += 360;
        if (isNaN(h))
            h = 0;
        return [h, s, v];
    };

    HSVtoRGB = function (color) {
        var i;
        var h, s, v, r, g, b;
        h = color[0];
        s = color[1];
        v = color[2];
        if (s === 0) {
            // achromatic (grey)
            r = g = b = v;
            return [r, g, b];
        }
        h /= 60;            // sector 0 to 5
        i = Math.floor(h);
        f = h - i;          // factorial part of h
        p = v * (1 - s);
        q = v * (1 - s * f);
        t = v * (1 - s * (1 - f));
        switch (i) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            default:        // case 5:
                r = v;
                g = p;
                b = q;
                break;
        }
        return [r, g, b];
    }

    function filtros() {
        let filtro = document.getElementById("filtros-select").value;
        document.getElementById("select-saturado").classList.add("d-none");
        document.getElementById("select-brillo").classList.add("d-none");
        if (filtro == "negativo") {
            filtroNegativo();
        } else if (filtro == "binarizacion") {
            filtroBinario();

        } else if (filtro == "sepia") {
            filtroSepia();
        } else if (filtro == "grises") {
            filtroGrises();
        } else if (filtro == "brillo") {
            filtroBrillo();
        } else if (filtro == "saturado") {
            filtroSaturado();
        } else if (filtro == "default") {
            fotoSinFiltro();
        }

    }
    document.getElementById("filtros").addEventListener("change", filtros);

    function pintarCanvas() {
        if (document.getElementById("pintar-canvas").checked) {
            let color = document.getElementById("color").value;
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

        } else {
            return;
        }
    }
    document.getElementById("entregable1").addEventListener("click", pintarCanvas);

    function guardarFoto() {
        let nombreImagen = prompt('nombre del archivo');
        if (nombreImagen.toLowerCase() != "") {
            let canvasURL = canvas.toDataURL();
            let a = document.createElement('a');
            a.href = canvasURL;
            a.download = nombreImagen;
            a.click();
        }
        else {
            alert("nombre el archivo para descargar");
        }

    }
    document.getElementById("guardar").addEventListener("click", guardarFoto);

}
document.addEventListener("DOMContentLoaded", loadPage);