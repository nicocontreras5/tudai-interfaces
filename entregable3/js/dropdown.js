function loader() {


    document.querySelector("#dropdown").addEventListener("click", contenidoDRop);
  
    function contenidoDRop() {

        let content= document.querySelector(".dropdown-content");
        content.classList.toggle("d-none");
    }


}
document.addEventListener("DOMContentLoaded", loader);