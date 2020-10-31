
function loadPage() {

    function scroll() {

        
        let cards = document.querySelector(".cards");
        let car = document.querySelector(".car");
        
        
        
        let escenas = document.querySelector(".escenas");
        let mover = 0;
        // CAR
        
        
        // ESCENAS
        
        if (window.scrollY >= 300) {
            escenas.classList.add("entrada-escenas");
        } else {
            
            escenas.classList.remove("entrada-escenas");
        }
<<<<<<< HEAD
        
        // CARDS
        if (window.scrollY >= 920) {
=======
       

        if (window.scrollY >= 870) {
>>>>>>> e74632fdd515d02b73dae118345846bdfbf5988d
            
            cards.classList.add("entrada-cards");
        } else {
            
            cards.classList.remove("entrada-cards");
        }
        mover = window.scrollY*2.5;
        car.style.marginRight  =  mover   + "px";
        
        
    }
    
    
       
    window.addEventListener("scroll", scroll);
    
    
    
  }document.addEventListener("DOMContentLoaded", loadPage);
