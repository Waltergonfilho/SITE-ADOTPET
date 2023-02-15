// Effect to scroll nav

const navtop = document.querySelector(".navbar");

window.addEventListener("scroll", activebar);

function activebar() {
  let obj = window.pageYOffset;
  if (obj > 80) {
    navtop.classList.add("active");
  } else {
    navtop.classList.remove("active");
  }
}

const menuToggle = document.querySelector(".nav-toggle");
const closeToggle = document.querySelector(".closeToggle");

menuToggle.addEventListener("click", activeMenu);
closeToggle.addEventListener("click", activeMenu);

function activeMenu() {
  let menuMobile = document
    .querySelector(".nav-menu")
    .classList.toggle("active-menu");
}

//============== Smooth Scroll ======================== //

// Identify the menu click
// Check the item that was clicked and reference it with the target
// Check distance between target and top
// Animate scroll to target

const menuItems = document.querySelectorAll('.scroll[href^="#"]');

function getScrollTopByHref(element) {
  const id = element.getAttribute("href");
  return document.querySelector(id).offsetTop;
}

function scrollToPosition(to) {
  smoothScrollTo(0, to);
}

function scrollToIdOnClick(event) {
  event.preventDefault();
  const to = getScrollTopByHref(event.currentTarget) - 80;
  scrollToPosition(to);
}

menuItems.forEach((navLink) => {
  navLink.addEventListener("click", scrollToIdOnClick);
});

// support old browsers / that do not support native smooth scroll
/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== "undefined" ? duration : 600;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 5000 / 60); // 60 fps
}

// Effect modal with formulary

const modal01 = document.querySelector("#join");
const btmodal = document.querySelector(".btmodal");
const btclose = document.querySelector(".btclose");
const btcover = document.querySelector(".cover");
const btmodal2 = document.querySelector(".btmodal2");

btcover.addEventListener("click", activemodal);
btclose.addEventListener("click", activemodal);
btmodal.addEventListener("click", activemodal);
btmodal2.addEventListener("click", activemodal);
function activemodal() {
  modal01.classList.toggle("active-modal");
}

// Gallery area

//selecting all required elements
const filterItem = document.querySelector(".items");
const filterImg = document.querySelectorAll(".gallery .image");
window.onload = () => {
  filterItem.onclick = (selectedItem) => {
    if (selectedItem.target.classList.contains("item")) {
      filterItem.querySelector(".active").classList.remove("active");
      selectedItem.target.classList.add("active");
      let filterName = selectedItem.target.getAttribute("data-name");
      filterImg.forEach((image) => {
        let filterImges = image.getAttribute("data-name");
        if (filterImges == filterName || filterName == "all") {
          image.classList.remove("hide");
          image.classList.add("show");
        } else {
          image.classList.add("hide");
          image.classList.remove("show");
        }
      });
    }
  };
  for (let i = 0; i < filterImg.length; i++) {
    filterImg[i].setAttribute("onclick", "preview(this)");
  }
};

//fullscreen image preview function

const previewBox = document.querySelector(".preview-box"),
  categoryName = previewBox.querySelector(".title p"),
  previewImg = previewBox.querySelector("img"),
  closeIcon = previewBox.querySelector(".icon"),
  shadow = document.querySelector(".shadow");
function preview(element) {
  let selectedPrevImg = element.querySelector("img").src;
  let selectedImgCategory = element.getAttribute("data-name");
  previewImg.src = selectedPrevImg;
  categoryName.textContent = selectedImgCategory;
  previewBox.classList.add("show");
  shadow.classList.add("show");
  closeIcon.onclick = () => {
    //if user click on close icon of preview box
    previewBox.classList.remove("show");
    shadow.classList.remove("show");
  };
}
