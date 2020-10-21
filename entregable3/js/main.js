



function loadPage() {


    

    let intervalo = setInterval(function () {
        let fechaEstreno = new Date("oct 27, 2020 00:00:00").getTime();


        let now = new Date().getTime();


        let diferencia = fechaEstreno - now;

        let days = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diferencia % (1000 * 60)) / 1000);


        document.getElementById("estreno").innerHTML = + days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";


        if (diferencia < 0) {
            clearInterval(intervalo);
            document.getElementById("estreno").innerHTML = "La pelicula ya fue estrenada!";
        }
    }, 1000);


    let slide = 1;
    showSlides(slide);
    document.querySelector(".btnNex").addEventListener("click", () => plusSlide(1));
    document.querySelector(".btnPrev").addEventListener("click", () => plusSlide(-1));
    function plusSlide(n) {
        showSlides(slide += n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("slides");
        if (n > slides.length) { slide = 1 }
        if (n < 1) { slide = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slides[slide - 1].style.display = "block";
    }


    function scroll() {

        let cards = document.querySelector("#cards");
        let escenas = document.querySelector(".escenas");
        //cards
        if (window.scrollY >= 310) {
            cards.classList.add("entrada-cards");

        } else {
            cards.classList.remove("entrada-cards");
        }

        //escenas
        if (window.scrollY <= 800) {

            escenas.classList.add("entrada-escenas");
        } else {
            console.log("saco clase");

            escenas.classList.remove("entrada-escenas");
        }


    }

    window.addEventListener("scroll", scroll);




}
document.addEventListener("DOMContentLoaded", loadPage);