
function loadPage() {
  
    function scroll() {

        
        let cards = document.querySelector(".cards");

        
        let escenas = document.querySelector(".escenas");
        
        if (window.scrollY >= 193) {
            escenas.classList.add("entrada-escenas");
        } else {
            
            escenas.classList.remove("entrada-escenas");
        }
       

        if (window.scrollY >= 870) {
            
           cards.classList.add("entrada-cards");
        } else {
            
            cards.classList.remove("entrada-cards");
        }
    }

    window.addEventListener("scroll", scroll);
  
    
    
  }document.addEventListener("DOMContentLoaded", loadPage);
