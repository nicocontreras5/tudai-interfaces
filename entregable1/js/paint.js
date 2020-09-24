function loadPage() {

    //ENTREGABLE 1
    let canvas = document.getElementById("entregable1");
    let ctx = canvas.getContext("2d");
    let versiones= [];
    let dibujando = false;
    
    function crearCanvas() {
        
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        let version = {
            "pixeles":ctx.getImageData(0, 0, canvas.width , canvas.height ),
            "filtro":document.getElementById("filtros-select").value,
            "width": canvas.width,
            "height": canvas.height
            };
            versiones.push(version);
           
    }
    crearCanvas();

    function volverUnPaso() {
        if (versiones.length !=1) {
            document.getElementById("select-saturado").classList.add("d-none");
            document.getElementById("select-brillo").classList.add("d-none");
            document.getElementById("select-blur").classList.add("d-none");
            versiones.pop();
            filtro= versiones[versiones.length-1].filtro;
            document.getElementById("filtros-select").value = filtro;
            if (filtro == "blur") {
                document.getElementById("select-blur").classList.remove("d-none");
            }else if(filtro== "brillo"){
                document.getElementById("select-brillo").classList.remove("d-none");

            }else if(filtro== "saturado"){
                document.getElementById("select-saturado").classList.remove("d-none");
            }

            let imgData= versiones[versiones.length-1].pixeles;

            ctx.putImageData(imgData, 0, 0);
        }
    }    
    document.getElementById("volver").addEventListener("click", volverUnPaso);


    function descartarFoto() {

        document.getElementById("foto-input").value = "";
        document.getElementById("select-saturado").classList.add("d-none");
        document.getElementById("select-brillo").classList.add("d-none");
        document.getElementById("alert").classList.add("d-none");
        document.getElementById("filtros-select").classList.add("d-none");
        document.getElementById("filtros-select").value="default";
        crearCanvas();
        versiones = [];
    }
    document.getElementById("descartar").addEventListener("click", descartarFoto);
    

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

        let version = {
            "pixeles":ctx.getImageData(0, 0, canvas.width , canvas.height ),
            "filtro":document.getElementById("filtros-select").value,
            "width": canvas.width,
            "height": canvas.height
            };
        versiones.push(version);
        
       
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
            document.getElementById("alert").classList.remove("d-none");
            document.getElementById("filtros-select").classList.remove("d-none");
            let file = e.target.files[0];

           crearCanvas();
            let reader = new FileReader();
            reader.readAsDataURL(file); 

            reader.onload = readerEvent => {
                let content = readerEvent.target.result; 

                let image = new Image();

                image.src = content;

                image.onload = function () {
            
                        //achica el canvas bien
                        //canvas.width= Math.min(canvas.width / this.width, canvas.height / this.height) *this.width;
                    width=Math.min(canvas.width / this.width, canvas.height / this.height) *this.width;
                    height= Math.min(canvas.width / this.width, canvas.height / this.height) *this.height;
                    ctx.drawImage(this, 0, 0, width, height);
                    versiones= [];
                    let version = {
                        "pixeles":ctx.getImageData(0, 0, canvas.width , canvas.height ),
                        "filtro":document.getElementById("filtros-select").value,
                        "widht": width,
                        "height": height
                        };
                    versiones.push(version);
                   
                }
            }

            document.getElementById("foto-input").value = "";
        }
        document.getElementById("filtros-select").value = "default";


    }
    document.getElementById("foto-input").addEventListener("change", cargarFoto);


    function filtroNegativo() {
        
        let imageData = ctx.getImageData(0, 0, versiones[0].widht, versiones[0].height);
        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                let index = (x + imageData.width * y) * 4;
                imageData.data[index + 0] = 255 - imageData.data[index + 0];
                imageData.data[index + 1] = 255 - imageData.data[index + 1];
                imageData.data[index + 2] = 255 - imageData.data[index + 2];
            }
        }
        ctx.putImageData(imageData, 0, 0);
        let version = {
            "pixeles":ctx.getImageData(0, 0, canvas.width , canvas.height ),
            "filtro":document.getElementById("filtros-select").value,
            "widht": canvas.widht,
            "height": canvas.height
            };
        versiones.push(version);
    }

    function filtroGrises() {
        let imageData = ctx.getImageData(0, 0, versiones[0].widht, versiones[0].height);

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
        let version = {
            "pixeles":ctx.getImageData(0, 0, canvas.width , canvas.height ),
            "filtro":document.getElementById("filtros-select").value,
            "widht": canvas.widht,
            "height": canvas.height
            };
        versiones.push(version);
    }

    function filtroSepia() {

        let imageData = ctx.getImageData(0, 0, versiones[0].widht, versiones[0].height);


        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                let index = (x + imageData.width * y) * 4;
                let luminosidadPixel = .3 *imageData.data[index + 0] + .6 * imageData.data[index + 0] + .1 *imageData.data[index + 0];
                imageData.data[index + 0] =  Math.min(luminosidadPixel + 40, 255);
                imageData.data[index + 1] = Math.min(luminosidadPixel + 15, 255);
                imageData.data[index + 2] = luminosidadPixel;
            }
        }
        ctx.putImageData(imageData, 0, 0);
        let version = {
            "pixeles":ctx.getImageData(0, 0, canvas.width , canvas.height ),
            "filtro":document.getElementById("filtros-select").value,
            "widht": canvas.widht,
            "height": canvas.height
            };
        versiones.push(version);
    }
    

    function filtroBrillo() {

            let brillo = document.getElementById("cant-brillo").value;
           
            document.getElementById("select-brillo").classList.remove("d-none");
            if (brillo>0) {
                let imageData = ctx.getImageData(0, 0, versiones[0].widht, versiones[0].height);
                for (let y = 0; y < imageData.height; y++) {
                    for (let x = 0; x < imageData.width; x++) {
                        let index = (x + imageData.width * y) * 4;
    
                        imageData.data[index + 0] = brillo * imageData.data[index + 0];
                        imageData.data[index + 1] = brillo * imageData.data[index + 1];
                        imageData.data[index + 2] = brillo * imageData.data[index + 2];
                    }
                }
                ctx.putImageData(imageData, 0, 0);
                let version = {
                    "pixeles":ctx.getImageData(0, 0, canvas.width , canvas.height ),
                    "filtro":document.getElementById("filtros-select").value,
                    "widht": canvas.widht,
                    "height": canvas.height
                    };
                versiones.push(version);
            }
    }
    document.getElementById("cant-brillo").addEventListener("change", filtroBrillo);

    function filtroBinario() {

        let imageData = ctx.getImageData(0, 0, versiones[0].widht, versiones[0].height);
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
        let version = {
            "pixeles":ctx.getImageData(0, 0, canvas.width , canvas.height ),
            "filtro":document.getElementById("filtros-select").value,
            "widht": canvas.widht,
            "height": canvas.height
            };
        versiones.push(version);

    }

    function filtroSaturado() {
    
        document.getElementById("select-saturado").classList.remove("d-none");
        let saturado = document.getElementById("cant-saturado").value;

            if (saturado>1) {
                let imageData = ctx.getImageData(0, 0, versiones[0].widht, versiones[0].height);
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
                let version = {
                    "pixeles":ctx.getImageData(0, 0, canvas.width , canvas.height ),
                    "filtro":document.getElementById("filtros-select").value,
                    "widht": canvas.widht,
                    "height": canvas.height
                    };
                versiones.push(version);
            }
    }
    document.getElementById("cant-saturado").addEventListener("change", filtroSaturado);

    function filtroBlur() {
        document.getElementById("select-blur").classList.remove("d-none");
        let imageData = ctx.getImageData(0, 0, versiones[0].widht, versiones[0].height);
        let cant_saturado = document.getElementById("cant-blur").value;
        cant_saturado= parseInt(cant_saturado, 10);
        let matriz = [[1, 2, 1],
        [2, 4, 2],
        [1, 2, 1]];
        let w = imageData.width;
        let h = imageData.height;
        
        for (let i = 0; i < cant_saturado; i++) {
          
            for (let x = 0; x < w; x++) {
                for (let y = 0; y < h; y++) {
                    let ul = ((x - 1 + w) % w + w * ((y - 1 + h) % h)) * 4; // location of the UPPER LEFT
                    let uc = ((x - 0 + w) % w + w * ((y - 1 + h) % h)) * 4; // location of the UPPER CENTER
                    let ur = ((x + 1 + w) % w + w * ((y - 1 + h) % h)) * 4; // location of the UPPER RIGHT
                    let ml = ((x - 1 + w) % w + w * ((y + 0 + h) % h)) * 4; // location of the LEFT
                    let mc = ((x - 0 + w) % w + w * ((y + 0 + h) % h)) * 4; // location of the CENTER PIXEL
                    let mr = ((x + 1 + w) % w + w * ((y + 0 + h) % h)) * 4; // location of the RIGHT
                    let ll = ((x - 1 + w) % w + w * ((y + 1 + h) % h)) * 4; // location of the LOWER LEFT
                    let lc = ((x - 0 + w) % w + w * ((y + 1 + h) % h)) * 4; // location of the LOWER CENTER
                    let lr = ((x + 1 + w) % w + w * ((y + 1 + h) % h)) * 4; // location of the LOWER RIGHT
    
                    p0 = imageData.data[ul] * matriz[0][0]; // upper left
                    p1 = imageData.data[uc] * matriz[0][1]; // upper mid
                    p2 = imageData.data[ur] * matriz[0][2]; // upper right
                    p3 = imageData.data[ml] * matriz[1][0]; // left
                    p4 = imageData.data[mc] * matriz[1][1]; // center pixel
                    p5 = imageData.data[mr] * matriz[1][2]; // right
                    p6 = imageData.data[ll] * matriz[2][0]; // lower left
                    p7 = imageData.data[lc] * matriz[2][1]; // lower mid
                    p8 = imageData.data[lr] * matriz[2][2]; // lower right
                    let red = (p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8) / 16;
    
                    p0 = imageData.data[ul + 1] * matriz[0][0]; // upper left
                    p1 = imageData.data[uc + 1] * matriz[0][1]; // upper mid
                    p2 = imageData.data[ur + 1] * matriz[0][2]; // upper right
                    p3 = imageData.data[ml + 1] * matriz[1][0]; // left
                    p4 = imageData.data[mc + 1] * matriz[1][1]; // center pixel
                    p5 = imageData.data[mr + 1] * matriz[1][2]; // right
                    p6 = imageData.data[ll + 1] * matriz[2][0]; // lower left
                    p7 = imageData.data[lc + 1] * matriz[2][1]; // lower mid
                    p8 = imageData.data[lr + 1] * matriz[2][2]; // lower right
                    let green = (p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8) / 16;
    
                    p0 = imageData.data[ul + 2] * matriz[0][0]; // upper left
                    p1 = imageData.data[uc + 2] * matriz[0][1]; // upper mid
                    p2 = imageData.data[ur + 2] * matriz[0][2]; // upper right
                    p3 = imageData.data[ml + 2] * matriz[1][0]; // left
                    p4 = imageData.data[mc + 2] * matriz[1][1]; // center pixel
                    p5 = imageData.data[mr + 2] * matriz[1][2]; // right
                    p6 = imageData.data[ll + 2] * matriz[2][0]; // lower left
                    p7 = imageData.data[lc + 2] * matriz[2][1]; // lower mid
                    p8 = imageData.data[lr + 2] * matriz[2][2]; // lower right
                    let blue = (p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8) / 16;
    
                    imageData.data[mc] = red;
                    imageData.data[mc + 1] = green;
                    imageData.data[mc + 2] = blue;
                    imageData.data[mc + 3] = imageData.data[lc + 3];
                }
            }
        }
        ctx.putImageData(imageData, 0, 0);
        let version = {
            "pixeles":ctx.getImageData(0, 0, canvas.width , canvas.height ),
            "filtro":document.getElementById("filtros-select").value,
            "widht": canvas.widht,
            "height": canvas.height
            };
        versiones.push(version);
    }
    document.getElementById("cant-blur").addEventListener("change", filtroBlur);

    function clickInput() {
        
        document.querySelector('#foto-input').click();

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
            s = delta / max;       
        else {
            
            s = 0;
            h = -1;
            return [h, s, undefined];
        }
        if (r === max)
            h = (g - b) / delta;     
        else if (g === max)
            h = 2 + (b - r) / delta;  
        else
            h = 4 + (r - g) / delta;  
        h *= 60;                
        if (h < 0)
            h += 360;
        if (isNaN(h))
            h = 0;
        return [h, s, v];
    }

    HSVtoRGB = function (color) {
        var i;
        var h, s, v, r, g, b;
        h = color[0];
        s = color[1];
        v = color[2];
        if (s === 0) {
            
            r = g = b = v;
            return [r, g, b];
        }
        h /= 60;           
        i = Math.floor(h);
        f = h - i;          
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
            default:     
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
            document.getElementById("select-blur").classList.add("d-none");
            if (filtro == "negativo") {
                filtroNegativo();
            } else if (filtro == "binarizacion") {
                filtroBinario();
                
            } else if (filtro == "sepia") {
                filtroSepia();
            } else if (filtro == "grises") {
                filtroGrises();
            } else if (filtro == "brillo") {
                let min= document.getElementById("cant-brillo").min;
                document.getElementById("cant-brillo").value= min;
                filtroBrillo();
            } else if (filtro == "saturado") {
                let min= document.getElementById("cant-saturado").min;
                document.getElementById("cant-saturado").value= min;
                filtroSaturado();

            }else if (filtro == "blur") {
                let min= document.getElementById("cant-blur").min;
                document.getElementById("cant-blur").value= min;
                filtroBlur();
            }
          
           
    }
    document.getElementById("filtros-select").addEventListener("change", filtros);

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
        
        let canvasURL = canvas.toDataURL();
        let a = document.createElement('a');
        a.href = canvasURL;
        a.download = "paint-image"; 
        a.click();
        
    }
    document.getElementById("guardar").addEventListener("click", guardarFoto);

    function closeAlert() {

        document.getElementById("alert").classList.add("d-none");
    }
    document.getElementById("close-alert").addEventListener("click", closeAlert);

    


}
document.addEventListener("DOMContentLoaded", loadPage);