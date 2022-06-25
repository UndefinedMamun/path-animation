/// <reference path="./jquery-3.6.0.js" />

const MaxPathLength = 1194;
const Threshold = 200; // in px; greater means the path will start drawing before we hit it.
var animationContainer = document.querySelector('#path-animation');
var steps = document.getElementById('animation-steps')
var path = document.getElementById('curve-path');
var stickyView = document.getElementById('stickyView');
const svg = $("#path-svg");
// adjusting the dynamic height
$(stickyView).css({ "height": `calc(100vh + ${MaxPathLength - Threshold}px)` })

var width = animationContainer.offsetWidth;
var height = animationContainer.offsetHeight;

const getTop = () => $($('.sticky')[0]).offset().top - Threshold;
var containerTop = getTop();

var pathLength = Math.floor(path.getTotalLength());
var animationDone = false;

jQuery(function () {
  draw();
  $(window).on('scroll', (e) => requestAnimationFrame(draw))
  $(window).on('resize', (e) => requestAnimationFrame(draw))
})

function moveObj(prcnt, element) {
  distance = (prcnt * pathLength) / 100;
  // Get x and y values at a certain point in the line
  pt = path.getPointAtLength(distance);
  const x = Math.round((pt.x * svg.width()) / 1078);
  const y = Math.round((pt.y * svg.height()) / 449);

  element.style.webkitTransform = 'translate3d(' + x + 'px,' + y + 'px, 0)';
  element.classList.add("animate__fadeIn")
}


function renderPath(percentage) {
  const w = MaxPathLength;
  if (!animationDone) {
    $(path).animate({ "stroke-dashoffset": w - Math.round((w * percentage) / 100) }, 0);
    $(".animation-bg").css({ "--right": `${1000 - percentage*10}px` })
  }

  if (percentage >= 16 || animationDone) {
    moveObj(16, steps.children[0]);
  } else {
    $(steps.children[0]).removeClass("animate__fadeIn")
  }

  if (percentage >= 55 || animationDone) {
    moveObj(55, steps.children[1]);
  } else {
    $(steps.children[1]).removeClass("animate__fadeIn")
  }
  // at 85% bring the element in the view.
  if (percentage >= 85 || animationDone) {
    // poisition it at 85% of the length;
    moveObj(85, steps.children[2]);
  } else {
    $(steps.children[2]).removeClass("animate__fadeIn")
  }

  if (percentage === 100 && !animationDone) {
    animationDone = true;
    // fixing the height
    $(stickyView).css({ "height": `100vh` });

    // Scrolling back the appropriate position
    window.scrollTo({
      top: window.scrollY - MaxPathLength + Threshold,
      left: 0,
      behavior: 'instant',
    });
  }
}

function draw() {
  const y = window.scrollY;
  const distance = y - containerTop;
  // console.log({ width, height, containerTop, pathLength, y })

  if (containerTop < y) { // start animation
    const percent = (100 * distance) / pathLength;

    renderPath(percent < 100 ? percent : 100)
  } else {
    renderPath(0);
  }
}

