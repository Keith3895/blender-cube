function test(e) {
  debugger
}
window.screen.orientation.onchange = (e) => {
  window.location.reload();
};
if (window.matchMedia("(orientation: portrait)").matches) {
  // you're in PORTRAIT mode

  // window.location.reload();
  document.querySelectorAll('section:not(#fliper)').forEach(el => el.style.display = 'none');
  document.querySelector('#fliper').style.display = 'flex';
} else {
  console.log('what');
  document.querySelector('#fliper').style.display = 'none';
  document.querySelectorAll('section:not(#fliper)').forEach(el => el.style.removeProperty('display'));

}


function start() {

  function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    var sections = document.querySelectorAll("section");
    var windowHeight = window.innerHeight;
    var elementVisible = 150;
    for (var i = 0; i < reveals.length; i++) {
      var elementTop = reveals[i].getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
    sections.forEach(el => {
      var elementTop = sections[i].getBoundingClientRect().top;
      var elementVisible = 150;
      if (elementTop < windowHeight - elementVisible)
        inview(el);
    });

  }

  // window.addEventListener("scroll", reveal);


  setTimeout(() => {

    document.querySelector('#wait').style.display = 'flex';
    document.querySelector('#wait').style.marginRight = '200px'
  }, 8000);

  document.querySelector('.icon-scroll').addEventListener("click", (event) => {
    document.querySelector('#side-1').scrollIntoView();
  });
}
function next(side) {
  document.querySelector(`#side-${side}-anim`).scrollIntoView();
  setTimeout(() => {
    console.log(`#side-${side + 1}`);
    console.log(document.querySelector(`#side-${side + 1}`));
    document.querySelector(`#side-${side}`).scrollIntoView();
  }, 8000);
}


function inview(target) {
  if (target.parentElement.id.includes('anim')) {
    setTimeout(() => {
      document.querySelector('#' + side).scrollIntoView();
    }, 8000);
  }
}

window.onload = () => {
  start();
}
document.addEventListener("DOMContentLoaded", loader());

function fullscreen() {
  // var conf = confirm("Fullscreen mode?");
  var docelem = document.documentElement;

  // if (conf == true) {
  if (docelem.requestFullscreen) {
    docelem.requestFullscreen();
  }
  else if (docelem.mozRequestFullScreen) {
    docelem.mozRequestFullScreen();
  }
  else if (docelem.webkitRequestFullscreen) {
    docelem.webkitRequestFullscreen();
  }
  else if (docelem.msRequestFullscreen) {
    docelem.msRequestFullscreen();
  }
  document.querySelector('.full').innerHTML = '<sub>⇲</sub><sup>⇱</sup>';
  if (document.fullscreenElement) {
    document.exitFullscreen();
    document.querySelector('.full').innerHTML = '<sup>⇱</sup><sub>⇲</sub>';
  }
  // }
}


function loader() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
          lazyImage.onload = () => {
            document.querySelectorAll("img.lazy").forEach(function (lazyImage) {
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.srcset = lazyImage.dataset.srcset;
                lazyImage.classList.remove("lazy");
                lazyImageObserver.unobserve(lazyImage);
                lazyImage.onload = loader();
            });
          };
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to event handlers here
  }
}


