



function loadPage() {


    

    let intervalo = setInterval(function () {
        let fechaEstreno = new Date("oct 27, 2024 00:00:00").getTime();


        let now = new Date().getTime();


        let diferencia = fechaEstreno - now;

        let days = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diferencia % (1000 * 60)) / 1000);


        document.getElementById("estreno-js").innerHTML = + days + " dias " + hours + " hs "
            + minutes + " min " + seconds + " seg ";


        if (diferencia < 0) {
            clearInterval(intervalo);
            document.getElementById("estreno").innerHTML = "La pelicula ya fue estrenada!";
        }
    }, 1000);

    }
document.addEventListener("DOMContentLoaded", loadPage);
