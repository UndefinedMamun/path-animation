var animationContainer = document.querySelector('.animation-container');
var path = document.getElementById('curve-path')
var steps = document.getElementById('animation-steps')
console.log({path});
var obj = document.getElementById('obj');

var pathLength = Math.floor(path.getTotalLength());
console.log(pathLength)

function moveObj(prcnt, element) {
  prcnt = (prcnt * pathLength) / 100;

  // Get x and y values at a certain point in the line
  pt = path.getPointAtLength(prcnt);
  pt.x = Math.round(pt.x);
  pt.y = Math.round(pt.y);

  element.style.webkitTransform = 'translate3d(' + pt.x + 'px,' + pt.y + 'px, 0)';
  element.classList.add("animate__fadeIn")
}



var animationTimer = false;
function animationHandler(prcnt) {
  moveObj(prcnt);
  
  if(prcnt < 100)
  {
    animationTimer = setTimeout(function() {
      animationHandler(prcnt+1);
    },20)
  }
  else
  {
    animationTimer = setTimeout(function() { 
      animationHandler(0);
    }, 20);
  }
}

function anim() {
  if(animationTimer) {
    clearTimeout(animationTimer);
    animationTimer = false;
  }
  else
  {
    animationTimer = animationHandler(0);
  }
}
// Initialize
// moveObj(20);


function start() {
  const DURATION = 4000;
  console.log('draw start')
  animationContainer.classList.add('run');

  let percentage = 0;
  let interval = setInterval(() => {
    percentage++;
    console.log(percentage);

    if (percentage === 20) {
      moveObj(percentage, steps.children[0]);
    }
    if (percentage === 60) {
      moveObj(percentage, steps.children[1]);
    }
    if (percentage === 95) {
      moveObj(percentage, steps.children[2]);
    }
  }, DURATION/100);

  setTimeout(() => {
    clearInterval(interval);
    console.log('draw done')
  }, DURATION);
}

setTimeout(() => {
  start();
}, 1000);
