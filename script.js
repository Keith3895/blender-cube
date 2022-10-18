if (window.matchMedia("(orientation: portrait)").matches) {
  // you're in PORTRAIT mode
  alert('use landscape mode for better experience.');
  window.location.reload();
}

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);


setTimeout(() => {
  document.querySelector('#wait').style.display = 'flex';
  document.querySelector('#wait').style.marginRight = '200px'
}, 8000);

document.querySelector('#wait').addEventListener("click", (event) => {
  document.querySelector('#side-1').scrollIntoView();
});
document.querySelector('#wait').addEventListener("click", (event) => {
  document.querySelector('#side-1').scrollIntoView();
});
function next(side){
  document.querySelector('#'+side).scrollIntoView();
  setTimeout(() => {
    document.querySelector('#side-2 .text-container').style.display = 'flex';
    // document.querySelector('#side-2 .text-container').style.paddingTop = '100px';
    document.querySelector('#side-2 .text-container').style.flexDirection='column';
  }, 7000);
}