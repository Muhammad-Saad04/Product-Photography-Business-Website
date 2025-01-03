Shery.imageEffect("#back", {
  style: 5,
  config: {
    a: { value: 1, range: [0, 30] },
    b: { value: -0.99, range: [-1, 1] },
    zindex: { value: -9996999, range: [-9999999, 9999999] },
    aspect: { value: 2.1045241809672386 },
    ignoreShapeAspect: { value: true },
    shapePosition: { value: { x: 0, y: 0 } },
    shapeScale: { value: { x: 0.5, y: 0.5 } },
    shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
    shapeRadius: { value: 0, range: [0, 2] },
    currentScroll: { value: 0 },
    scrollLerp: { value: 0.07 },
    gooey: { value: true },
    infiniteGooey: { value: true },
    growSize: { value: 4, range: [1, 15] },
    durationOut: { value: 1, range: [0.1, 5] },
    durationIn: { value: 1.5, range: [0.1, 5] },
    displaceAmount: { value: 0.5 },
    masker: { value: true },
    maskVal: { value: 1.24, range: [1, 5] },
    scrollType: { value: 0 },
    geoVertex: { range: [1, 64], value: 1 },
    noEffectGooey: { value: false },
    onMouse: { value: 1 },
    noise_speed: { value: 1.15, range: [0, 10] },
    metaball: { value: 0.2, range: [0, 2], _gsap: { id: 3 } },
    discard_threshold: { value: 0.5, range: [0, 1] },
    antialias_threshold: { value: 0, range: [0, 0.1] },
    noise_height: { value: 0.5, range: [0, 2] },
    noise_scale: { value: 10, range: [0, 100] },
  },
  gooey: true,
});
function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

init();

//Text changing animation on the first page
var elems = document.querySelectorAll(".elem");

elems.forEach(function (elem) {
  var h1s = elem.querySelectorAll("h1");
  var index = 0;
  var animating = false;
  document.querySelector("#back").addEventListener("click", function () {
    if (!animating) {
      animating = true;
      gsap.to(h1s[index], {
        top: "-=100%",
        ease: Expo.easeInOut,
        duration: 1,
        onComplete: function () {
          gsap.set(this._targets[0], { top: "100%" });
          animating = false;
        },
      });

      index === h1s.length - 1 ? (index = 0) : index++;

      gsap.to(h1s[index], {
        top: "-=100%",
        ease: Expo.easeInOut,
        duration: 1,
      });
    }
  });
});

//Page 2 animations

var clutter = "";

document
  .querySelector("#page2 h2")
  .textContent.split(" ")
  .forEach(function (word) {
    clutter += `<span> ${word} </span>`;

    document.querySelector("#page2 h2").innerHTML = clutter;
  });

gsap.to("#page2>h2>span", {
  scrollTrigger: {
    trigger: `#page2>h2>span`,
    start: "top bottom",
    end: "+=500",
    scroller: "#main",
    scrub: 0.5,
  },
  stagger: 0.2,
  color: "#fff",
});

gsap.from("#page2>h1", {
  y: 50,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: "#page2",
    scroller: "#main",
    start: "top 100%",
    end: "top 20%",

    scrub: 2,
  },
});

gsap.from("#page2 #camera-div", {
  scale: 0.5,
  duration: 1,
  scrollTrigger: {
    trigger: "#page2",
    scroller: "#main",
    start: "top 0",
    end: "bottom 70%",
    scrub: 3,
  },
});

// Page 3 animations

gsap.from("#page3 #behind-circle", {
  scale: 0,
  opacity: 0,
  duration: 0.2,
  scrollTrigger: {
    trigger: "#page2",
    scroller: "#main",
    start: "bottom 80%",
    end: "bottom 100%",
    scrub: 2,
  },
});

//Page 3 swiper js
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const cursor = document.querySelector("#cursor");
const targetDiv = document.querySelector(".swiper");

// Function to move the cursor follower smoothly
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});

// Show the cursor follower when entering the div
targetDiv.addEventListener("mouseenter", () => {
  cursor.style.opacity = 1; // Make the cursor visible
});

// Hide the cursor follower when leaving the div
targetDiv.addEventListener("mouseleave", () => {
  cursor.style.opacity = 0; // Make the cursor invisible
});

gsap.from(".swiper", {
  x: 50,
  opacity: 0,
  duration: 0.5,
  scrollTrigger: {
    trigger: "#page3",
    scroller: "#main",
    start: "top bottom",
    end: "bottom 95%",
    scrub: 3,
  },
});


// Page7 animations

var clutter2 = ""

document
  .querySelector("#page7>p")
  .textContent.split(" ")
  .forEach(function (word) {
    clutter2 += `<span> ${word} </span>`;

    document.querySelector("#page7 p").innerHTML = clutter2;
  });

gsap.to("#page7>p>span", {
  scrollTrigger: {
    trigger: `#page7>p`,
    start: "top bottom",
    end: "bottom bottom",
    scroller: "#main",
    scrub: 3,
  },
  stagger: 0.1,
  color: "#fff",
  y: -20
});



