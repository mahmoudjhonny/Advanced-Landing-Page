//Random background option
let option = true;

// Variable To control the internval
let interval;

// Check if there's randombackground in local storage
let bgLocalStorage = localStorage.getItem("option");
if (bgLocalStorage !== null) {
  if (bgLocalStorage === "true") {
    option = true;
  } else {
    option = false;
  }
  //Remove Active Class from All Spans
  document.querySelectorAll(".random-background span").forEach((ele) => {
    ele.classList.remove("active");
  });
  if (bgLocalStorage === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}

//check if there's local storage color option
let mainColors = localStorage.getItem("color-option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);
  //Check for active class
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    //Add active class on color which in local storage
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}

// Change Active Class of random background
const randomBg = document.querySelectorAll(".random-background span");
randomBg.forEach((e) => {
  e.addEventListener("click", (ele) => {
    ele.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    ele.target.classList.add("active");
    if (ele.target.dataset.background === "yes") {
      option = true;
      randomizeImgs();
      localStorage.setItem("option", option);
    } else {
      option = false;
      clearInterval(interval);
      localStorage.setItem("option", option);
    }
  });
});

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    //Set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    //set color in localstorage
    localStorage.setItem("color-option", e.target.dataset.color);

    //Remove active class from all children
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    //Add active class on Self
    e.target.classList.add("active");
  });
});

// Select landing page element
let landingPage = document.querySelector(".landing-page");
//Get Array of imgs
let imgs = ["img-1.jpg", "img-2.jpg", "img-3.jpg", "img-4.jpg"];

//Get Random Number
const randomizeImgs = () => {
  if (option === true) {
    interval = setInterval(() => {
      let randomNum = Math.floor(Math.random() * imgs.length);
      //Change background image url
      landingPage.style.backgroundImage =
        'url("./imgs/' + imgs[randomNum] + '")';
    }, 1000);
  }
};

randomizeImgs();
