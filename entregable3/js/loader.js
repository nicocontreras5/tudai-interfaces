function loader() {
    setTimeout(mostrarPagina, 3000);


    function mostrarPagina() {
        let loader= document.querySelector(".loader");
        loader.classList.add("d-none");
        let parallax = document.querySelector(".parallax");
        if (parallax != null) {
            parallax.classList.remove("d-none");
        }
        let nav = document.querySelector(".nav");
        let contenido = document.querySelector(".container");
        nav.classList.remove("d-none");
        contenido.classList.remove("d-none");
        
    }


}
document.addEventListener("DOMContentLoaded", loader);