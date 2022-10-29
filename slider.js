let slideIndex = 1;
showSlides(slideIndex);
showSlides(slideIndex,2);
showSlides(slideIndex,3);

function plusSlides(n,id) {
  showSlides(slideIndex += n,id);
}

function currentSlide(n,id) {
  showSlides(slideIndex = n,id);
}

function showSlides(n,id=1) {
  let i;
  let slides = document.getElementsByClassName("mySlides"+id);
  let dots = document.getElementsByClassName("dot"+id);
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}