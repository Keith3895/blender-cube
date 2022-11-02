var sideCounter = 1;
document.querySelector(`#side-${sideCounter}-anim`).scrollIntoView();
window.screen.orientation.onchange = (e) => {
  window.location.reload();
};
if (window.matchMedia("(orientation: portrait)").matches) {
  // you're in PORTRAIT mode

  // window.location.reload();
  document.querySelectorAll('section:not(#fliper)').forEach(el => el.style.display = 'none');
  document.querySelector('#fliper').style.display = 'flex';
  document.querySelector('#indicator').style.display = 'none';
} else {
  document.querySelector('#fliper').style.display = 'none';
  document.querySelectorAll('section:not(#fliper)').forEach(el => el.style.removeProperty('display'));

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
  addScroll();
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setTimeout(() => {
            // debugger
            // el.parentElement.querySelector('.content').style.display = "flex";
            entry.target.parentElement.querySelector('.content').style.display = null;
          }, 7000);
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



function addScroll() {
  var wrap = document.getElementById('wrap');
  var fps = new FullPageScroll(wrap);
  var indicator = document.createElement('div');
  indicator.id = 'indicator';
  var slideIndicators = [];
  fps.slides = Array.from(fps.slides);
  fps.slides.shift();
  fps.slides.forEach(function (slide, index) {
    var slideIndicator = document.createElement('div');
    slideIndicator.onclick = function () {
      fps.goToSlide(index);
    }
    if (index === fps.currentSlide) {
      slideIndicator.className = "active";
    }
    indicator.appendChild(slideIndicator);
    slideIndicators.push(slideIndicator);
  });
  document.body.appendChild(indicator);
  fps.onslide = function () {
    slideIndicators.forEach(function (slideIndicator, index) {
      if (index === fps.currentSlide) {
        slideIndicator.className = "active";
      } else {
        slideIndicator.className = "";
      }
    });
  }
}