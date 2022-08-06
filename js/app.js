"use strict";

//selection of element (new section)

/*****declare button****** */
const btnNewSection = document.querySelector(".newSection");
const btnCloseModal = document.querySelector(".closeModal");
const btnCreate = document.querySelector(".create");
const btnScrollUp = document.querySelector(".scrollUp");
const btnumbagur = document.querySelector(".barButton");

const model = document.querySelector(".medolForNewSection");
// create new fragment to improve the performance
const fragment = new DocumentFragment();
const openMenue = document.querySelector("#navbar__list");
const overlay = document.querySelector(".overlay");
let sections = Array.from(document.querySelectorAll("section"));
let list = document.querySelector("#navbar__list");

/**
 * End Global Variables
 *
 *
 * Start Helper Functions
 *
 */
// when press btn create new section
const openWindow = () => {
  model.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

//when press x button to close
const closeWindow = () => {
  model.classList.add("hidden");
  overlay.classList.add("hidden");
};

/**
 * End Helper Functions
 * Begin Main Functions
 */

// function to add daynamic new section in html
const createNewSction = () => {
  let title = document.querySelector(".sectionTitle").value;
  let pargraph1 = document.querySelector(".pargraph1").value;
  let pargraph2 = document.querySelector(".pargraph2").value;
  const section = document.createElement("section");

  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");

  div.setAttribute("class", "landing__container");
  h2.textContent = title;
  p1.textContent = pargraph1;
  p2.textContent = pargraph2;

  //to check the inputs contains data and not empty
  if (title && pargraph1 && pargraph2) {
    div.appendChild(h2);
    div.appendChild(p1);
    div.appendChild(p2);

    section.appendChild(div);

    section.setAttribute("id", title);
    section.setAttribute("data-nav", title);
    document.querySelector("main").appendChild(section);

    // to clear inputs
    document.querySelector(".sectionTitle").value = "";
    document.querySelector(".pargraph1").value = "";
    document.querySelector(".pargraph2").value = "";

    alert("ًًً😍Wow you create Section😍");

    // to update nav bar with new section
    createNavBar();
  } else {
    alert("please fill all fields");
  }
};

// build the nav bar

const createNavBar = () => {
  // to clear the nav bar to prevent duplicate it when add new section
  list.innerHTML = "";

  sections = Array.from(document.querySelectorAll("section"));
  sections.forEach((section) => {
    const sectionName = section.getAttribute("data-nav");
    const li = document.createElement("li");

    li.innerHTML = `<a  class='menu__link'>${sectionName}</a>`;

    // when click on li scroll to target section smoothly
    li.addEventListener("click", function () {
      section.scrollIntoView({ behavior: "smooth" });
    });

    // to improve the performance
    fragment.appendChild(li);
  });
  // to improve the performance I appended the fragment to list out the (for loop)
  list.appendChild(fragment);
};

// call function create nav bar
createNavBar();

// Add class 'active' to section when near top of viewport
const addActiveClass = () => {
  sections = Array.from(document.querySelectorAll("section"));
  list = document.querySelector("#navbar__list");
  // for loop to determine bounds of sections
  for (const sec of sections) {
    const sectionBound = sec.getBoundingClientRect();

    // if condition to determin the section in view port
    if (sectionBound.top > 0 && sectionBound.top < 300) {
      //for loop to check the  section contain active class
      for (let section of sections) {
        if (section.classList.contains("your-active-class")) {
          section.classList.remove("your-active-class");
        }
      }
      // set active class to the section in the view port
      sec.classList.add("your-active-class");
    }
  }
};

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// to handle cick on "create" in the the window to fill information to bulid section
btnCreate.addEventListener("click", function () {
  createNewSction();
  closeWindow();
});

// Set sections as active
window.addEventListener("scroll", addActiveClass);

/// to handle click event on create new section in var bar
btnNewSection.addEventListener("click", openWindow);
btnCloseModal.addEventListener("click", closeWindow);

// to do the page responsive
btnumbagur.addEventListener("click", function () {
  openMenue.classList.toggle("active");
});

// to handle the button scroll to up
window.addEventListener("scroll", function () {
  btnScrollUp.style.display = window.scrollY >= 500 ? "block" : "none";
});

btnScrollUp.addEventListener("click", function () {
  window.scrollTo(0, 0);
});
