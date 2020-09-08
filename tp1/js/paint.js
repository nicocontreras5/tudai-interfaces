function loadPage() {

    //ENTREGABLE 1
    let dibujando = false;
    let canvas = document.getElementById("entregable1");
    let ctx = canvas.getContext("2d");
    let imagenOriginal;


    function descartarFoto() {
        document.getElementById("cargarFoto").value = "";
        crearCanvas();

    }

    document.getElementById("descartar").addEventListener("click", descartarFoto);

    function crearCanvas() {
        canvas.width = 1000;
        canvas.height = 600;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    crearCanvas();

    function startDraw(e) {
        dibujando = true;
        ctx.beginPath();
        draw(e);

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
        if (document.getElementById("cargarFoto").value != "") {
            let file = e.target.files[0];

            crearCanvas();
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
                    imagenOriginal= this;
                }
            }

        }
        document.getElementById("filtros").value = "default";

    }
    document.getElementById("cargarFoto").addEventListener("change", cargarFoto);

    function fotoSinFiltro() {
        let scaleImage = Math.min(canvas.width / imagenOriginal.width, canvas.height / imagenOriginal.height);
        ctx.drawImage(img, 0, 0, imagenOriginal.width * scaleImage, imagenOriginal.height * scaleImage);
        
    }
    document.getElementById("volver").addEventListener("click", fotoSinFiltro);
    

    function filtroNegativo() {
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

        let scaleImage = Math.min(canvas.width / imagenOriginal.width, canvas.height / imagenOriginal.height);
        let imageData = ctx.getImageData(0, 0, imagenOriginal.width * scaleImage, imagenOriginal.height * scaleImage);
        let contraste = prompt('ingrese el valor de brillo');
        contraste = parseInt(contraste, 10);
        if (contraste) {
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

    function filtroBinario() {

        let scaleImage = Math.min(canvas.width / imagenOriginal.width, canvas.height / imagenOriginal.height);

        let imageData = ctx.getImageData(0, 0, imagenOriginal.width * scaleImage, imagenOriginal.height * scaleImage);

        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                let index = (x + imageData.width * y) * 4;
                let color = (imageData.data[index + 0] + imageData.data[index + 1] + imageData.data[index + 2])/3;

                if (color > 126) {
                    imageData.data[index + 0] = 255;
                    imageData.data[index + 1] = 255;
                    imageData.data[index + 2] = 255;
                }else{
                    imageData.data[index + 0] = 0;
                    imageData.data[index + 1] = 0;
                    imageData.data[index + 2] = 0;
                }
            }
        }
        ctx.putImageData(imageData, 0, 0);


    }


    function filtros() {
        let filtro = document.getElementById("filtros").value;
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
        }

    }

    document.getElementById("filtros").addEventListener("change", filtros);

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