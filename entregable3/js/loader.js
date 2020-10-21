function loader() {
    setTimeout(mostrarPagina, 3000);


    function mostrarPagina() {
        let loader= document.querySelector(".loader");
        loader.classList.add("d-none");
        let elements = document.querySelector(".capa");
        elements.classList.remove("d-none");
        


    }


}
document.addEventListener("DOMContentLoaded", loader);