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
    }, 10000);
  }
};

randomizeImgs();

// Select Skills selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  // skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;
  // skills Outer height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // window height
  let windowHeight = this.innerHeight;
  // window scroll top
  let windowScrollTop = this.scrollY;
  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Gallery Section
let ourGalleryImg = document.querySelectorAll(".gallery img");
ourGalleryImg.forEach((img) => {
  img.addEventListener("click", () => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    // Create pop Up
    let popup = document.createElement("div");
    popup.className = "popUp-box";
    // create the image
    let image = document.createElement("img");
    image.src = img.src;
    // Add image on popup
    popup.appendChild(image);
    // Add popUp on overlay
    overlay.appendChild(popup);
    // Add heading for images
    if (img.alt !== null) {
      // create heading
      let image_heading = document.createElement("h3");
      // create text for heading
      let image_text = document.createTextNode(img.alt);
      // Append the text to the heading
      image_heading.appendChild(image_text);
      // Append image heading to popUp
      popup.appendChild(image_heading);
    }
    // Create close span
    let closeButton = document.createElement("span");
    // Create the close Button Span
    let closeButtonText = document.createTextNode("X");
    // Append Text to close Button
    closeButton.appendChild(closeButtonText);
    // Add Class to close Button
    closeButton.className = "close_btn";
    // Add close Button to overlay
    overlay.appendChild(closeButton);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className === "close_btn") {
    e.target.parentNode.remove();
  }
});
