
function loadPage() {

    function scroll() {

        
        let cards = document.querySelector(".cards");
        let car = document.querySelector(".car");
        
        
        
        let escenas = document.querySelector(".escenas");
        let mover = 0;
        // CAR
        
        
        // ESCENAS
        
        if (window.scrollY >= 250) {
            escenas.classList.add("entrada-escenas");
        } else {
            
            escenas.classList.remove("entrada-escenas");
        }
        
        // CARDS
        if (window.scrollY >= 910) {
            
            cards.classList.add("entrada-cards");
        } else {
            
            cards.classList.remove("entrada-cards");
        }
        mover = window.scrollY*2.5;
        car.style.marginRight  =  mover   + "px";
        
        
    }
    
    
       
    window.addEventListener("scroll", scroll);
    
    
    
  }document.addEventListener("DOMContentLoaded", loadPage);
