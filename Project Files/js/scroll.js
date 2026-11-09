//volume and audio

const audio = new Audio ("audio/audio.mp3");
const button = document.getElementById("volume-button");

button.onclick = function () {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause ();
    }
}

  //animation
const scrollElements = document.querySelectorAll(".js-scroll")

function elementInView(element, amountInView){
    const elementTop = element.getBoundingClientRect().top 
    const elementHeight = element.getBoundingClientRect().height

    if(elementTop + elementHeight * amountInView <= document.documentElement.clientHeight && elementTop + elementHeight * amountInView> 0) {
        return true
    }else{
        return false
    }
}

function elementOutOfView(element){
    const elementTop = element.getBoundingClientRect().top 
    const elementBottom = element.getBoundingClientRect().bottom 
    if(elementTop >= document.documentElement.clientHeight || elementBottom < 0){
      return true
    }else{
      return false
    }
  }

function displayScrollElement(element){
    element.classList.add("scrolled")
}

//hide scroll element
function hideScrollElement(element){
    element.classList.remove("scrolled")
}

function handleScrollEvent(){
    scrollElements.forEach(function(element){
        if (elementInView(element, .5)){
            displayScrollElement(element)
        }else if (elementOutOfView(element)){
            hideScrollElement(element)
        }
    })
}

window.addEventListener('scroll', throttle(handleScrollEvent, 100))

//utility
function throttle(fn, wait) {
    let inThrottle, lastFn, lastTime;
    return function () {
        const context = this,
        args = arguments;
        if (!inThrottle) {
            fn.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        }else{
            clearTimeout(lastFn);
            lastFn = setTimeout (function () {
                if (Date.now() - lastTime >= wait) {
                    fn.apply(context, args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
    };
};