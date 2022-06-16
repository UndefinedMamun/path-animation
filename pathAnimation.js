/// <reference path="./jquery-3.6.0.js" />

var animationContainer = document.querySelector('#path-animation');
var steps = document.getElementById('animation-steps')
var path = document.getElementById('curve-path')
const svg = $(animationContainer).children("svg")[0];

// calculating the width
const width = animationContainer.offsetWidth;
const height = animationContainer.offsetHeight;

// containerTop = () => $(animationContainer).offset().top - 191.578125;
// const getTop = () => $(animationContainer).offset().top;
const getTop = () => $($('.sticky')[0]).offset().top - 170;
containerTop = getTop();



$(path).css("stroke-dasharray", width);
$(path).css("stroke-dashoffset", width);
$(svg).attr("viewBox", `0 0 ${width} 600`);

var pathLength = Math.floor(path.getTotalLength());
// $(animationContainer).css("min-height", `${pathLength}px`);

console.log({ width, height, containerTop: getTop(), pathLength })

jQuery(function () {
  $(window).on('scroll', (e) => {
    const y = window.scrollY;
    const wrapperTop = containerTop;
    const distance = y - containerTop;

    console.log({ y, wrapperTop });

    if (wrapperTop < y) { // start animation
      const percent = (100 * distance) / pathLength;

      renderPath(percent < 100 ? percent : 100)
    } else {
      renderPath(0);
    }
  })
})

function moveObj(prcnt, element) {
  prcnt = (prcnt * pathLength) / 100;

  // Get x and y values at a certain point in the line
  pt = path.getPointAtLength(prcnt);
  pt.x = Math.round(pt.x);
  pt.y = Math.round(pt.y);

  element.style.webkitTransform = 'translate3d(' + pt.x + 'px,' + pt.y + 'px, 0)';
  element.classList.add("animate__fadeIn")
}


function renderPath(percentage) {
  $(path).animate({ "stroke-dashoffset": width - Math.round((width * percentage) / 100) }, 0)

  if (percentage > 19) {
    moveObj(20, steps.children[0]);
  } else {
    $(steps.children[0]).removeClass("animate__fadeIn")
  }

  if (percentage > 59) {
    moveObj(60, steps.children[1]);
  } else {
    $(steps.children[1]).removeClass("animate__fadeIn")
  }
  if (percentage > 94) {
    moveObj(95, steps.children[2]);
  } else {
    $(steps.children[2]).removeClass("animate__fadeIn")
  }
}

