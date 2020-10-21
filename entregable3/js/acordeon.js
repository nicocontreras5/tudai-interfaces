
function loadPage() {
  
  let eventos = document.getElementsByClassName("accordion");
  
  for (let i = 0; i < eventos.length; i++) {
    eventos[i].addEventListener("click", function() {
      this.classList.toggle("active");
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
    });
  }

  
  
}document.addEventListener("DOMContentLoaded", loadPage);