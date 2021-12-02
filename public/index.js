//  -=-=-=-=-=-=-=-=-=-=-= ELEMENTS SELECTION =-=-=-=-=-=-=-=-=-=-=-

const navItems = document.querySelector(".nav-items");
const homeNavIcons = document
  .querySelector(".home-lower-container")
  .querySelectorAll("svg");
const windTubine = document.querySelector("#WIND-TURBINE");
const moon = document.querySelector("#MOON");
const pizzaShip = document.querySelector("#PIZZA");
const basketballPlanet = document.querySelector("#BASKETBALL_PLANET");
const leafyProject = document.querySelector(".leafyProject");
const autoProject = document.querySelector(".autoProject");
const donaProject = document.querySelector(".donaProject");
const mimoProject = document.querySelector(".mimoProject");
const barsNav = document.querySelector(".bars");
//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

//  -=-=-=-=-=-=-=-=-=-=-= NAV BAR NAVIGATION =-=-=-=-=-=-=-=-=-=-=-

navItems.addEventListener("click", (e) => {
  // console.log(`${e.target.innerText.toLowerCase().replaceAll(" ", "-")}`);
  if (e.target.innerText.toLowerCase() === "resume") return;
  document
    .getElementById(`${e.target.innerText.toLowerCase().replaceAll(" ", "-")}`)
    .scrollIntoView({ behavior: "smooth" });
});

//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

//  -=-=-=-=-=-=-=-=-=-=-= HOME - NAV ICONS ANIMATION FUNCTIONS =-=-=-=-=-=-=-=-=-=-=-

// -=-=-=-=-=-= Make cat eyes open and blink when mouse is on top of it =-=-=-=-=-=-=-
const animateCatEyes = (icon) => {
  targets = [
    icon.querySelector("#eyeCoverLrft_1_"),
    icon.querySelector("#eyeCoverRight_1_"),
  ];

  anime({
    easing: "linear",
    duration: 100,
    targets: targets,
    scaleY: 0.38,
    loop: false,
  });

  const blink = anime.timeline({
    easing: "linear",
    duration: 100,
    loop: true,
    endDelay: 2000,
  });

  blink
    .add({
      targets: targets,
      scaleY: 1,
      endDelay: 0,
    })
    .add({
      targets: targets,
      scaleY: 0.38,
    });

  // make sure the animation stops and the eyes are closed when mouse leaves the icon
  icon.addEventListener("mouseleave", (e) => {
    blink.pause();
    // console.log("IN");
    anime({
      easing: "linear",
      duration: 100,
      targets: targets,
      scaleY: 1,
    });
  });
};

// -=-=-=-=-=-= Animate envelope: =-=-=-=-=-=-
const animateEnvelope = (icon) => {
  targets = {
    body: icon.querySelector("#BODY_1_"),
    lid: icon.querySelector("#LID_1_"),
    letter: icon.querySelector("#LETTER_1_"),
  };

  const closeEnv = anime.timeline({});
  closeEnv
    .add({
      targets: icon,
      translateY: "-15px",
      duration: 1000,
    })
    .add({
      targets: targets.letter,
      points: [{ value: "54.2,35.2 30.2,41.4 6.2,35.2 6.2,23.9 54.2,23.9 " }],
      duration: 200,
      easing: "linear",
    });
  //

  icon.addEventListener("mouseleave", (e) => {
    anime({
      duration: 500,
      targets: icon,
      translateY: "0",
    });
    anime({
      delay: 500,
      targets: targets.letter,
      points: [{ value: "54.2,35.2 30.2,41.4 6.2,35.2 6.2,13.9 54.2,13.9 " }],
    });
  });
};

// -=-=-=-=-=-= Animate project icon: =-=-=-=-=-=-
const animateBlocks = (icon) => {
  targets = [
    icon.querySelector("#rect021_1_"),
    icon.querySelector("#rect022_1_"),
    icon.querySelector("#rect023_1_"),
  ];

  const projectMerge = anime.timeline({});

  projectMerge.add({
    duration: 600,
    targets: targets,
    scaleX: 5,
    translateX: "-27px",
    delay: anime.stagger(200),
    easing: "linear",
  });

  icon.addEventListener("mouseleave", (e) => {
    anime({
      duration: 600,
      targets: targets,
      scaleX: 1,
      translateX: "0px",
      delay: anime.stagger(200),
      easing: "linear",
    });
  });
};
//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

//  -=-=-=-=-=-=-=-=-=-=-= HOME - NAV ICONS =-=-=-=-=-=-=-=-=-=-=-

// console.log(homeNavIcons[0].id, homeNavIcons[1].id, homeNavIcons[2].id);
homeNavIcons.forEach((icon) => {
  //
  // Open the gitHub page:
  if (icon.id === "gitHubMainIcon") {
    icon.addEventListener("mouseenter", (e) => {
      animateCatEyes(icon);
    });

    icon.addEventListener("click", (e) => {
      window.open("https://github.com/dartangnan", "_blank");
      return;
    });
  }
  //
  // Scroll to the contact-me section:
  if (icon.id === "emailMainIcon") {
    icon.addEventListener("mouseenter", (e) => {
      animateEnvelope(icon);
    });
    icon.addEventListener("click", (e) => {
      document
        .getElementById("contact-me")
        .scrollIntoView({ behavior: "smooth" });
    });
    return;
  }
  //
  // Scroll to the projects section:
  if (icon.id === "projectsMainIcon") {
    icon.addEventListener("mouseenter", (e) => {
      animateBlocks(icon);
    });
    icon.addEventListener("click", (e) => {
      document
        .getElementById("projects")
        .scrollIntoView({ behavior: "smooth" });
    });
  }
});

//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

//  -=-=-=-=-=-=-=-=-=-=-= HOME - TEXT BOX - INFO =-=-=-=-=-=-=-=-=-=-=-
document.querySelector(".home-main-text").style.opacity = 1;
document.querySelector(".home-main-text").style.transform = "translateY(0)";

[windTubine, moon, pizzaShip, basketballPlanet].forEach((item) => {
  item.addEventListener("click", (e) => {
    document.querySelector(`.${item.id}-text`).classList.toggle("class-hidden");
    document.querySelector(`.${item.id}-text`).style.left = `${e.pageX}px`;
    document.querySelector(`.${item.id}-text`).style.top = `${e.pageY}px`;
  });

  item.addEventListener("mouseleave", (e) => {
    if (e.toElement.classList.contains("hidden-info-box")) return;
    // console.log("mouse out", e.toElement);

    document.querySelector(`.${item.id}-text`).classList.add("class-hidden");
  });
});

//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

//  -=-=-=-=-=-=-=-=-=-=-= ABOUT ME AND PROJECTS - LAZY LOADING =-=-=-=-=-=-=-=-=-=-=-
const options = {
  root: null,
  threshold: 1,
};

let observer = new IntersectionObserver((entries, observer) => {
  // console.log(entries);
  if (entries[0].intersectionRatio === 0) return;
  // console.log("dentro");
  document.querySelector(".about-me-bg").classList.remove("left-hidden");
  document.querySelector(".text-container").classList.remove("left-hidden");
  document.querySelector(".tech-icons").classList.remove("right-hidden");
}, options);

observer.observe(document.querySelector(".about-me-title"));
//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

let projectObserver = new IntersectionObserver((entries, observer) => {
  if (entries[0].intersectionRatio === 0) return;
  // console.log(entries);
  entries[0].target.classList.remove("left-hidden");
  entries[0].target.classList.remove("right-hidden");
});

const projects = [leafyProject, autoProject, donaProject, mimoProject];
projects.forEach((item) => {
  projectObserver.observe(item);
});

// --------------------------------------------------
//

barsNav.addEventListener("click", (e) => {
  navItems.style.transition = "all 0.8s ease-out";
  navItems.classList.toggle("hidden-nav");
});

document.querySelector("body").addEventListener("click", (e) => {
  // console.log(e.target);
  if (e.target.classList.contains("fa-bars")) return;
  navItems.classList.add("hidden-nav");
});

//
let oldPosition = 0;
let navHeight = 0;
// --------------------------------------------------
document.addEventListener("scroll", (e) => {
  // console.log(pageYOffset, oldPosition, pageYOffset - oldPosition);
  if (innerWidth > 700) return;

  if (pageYOffset - oldPosition > 0) {
    oldPosition = pageYOffset;
    if (navHeight <= -100) return;
    document.querySelector("nav").style.transform = `translateY(${navHeight}%)`;
    navHeight -= 10;
  }

  if (pageYOffset - oldPosition < 0) {
    oldPosition = pageYOffset;
    if (navHeight >= 10) return;
    document.querySelector("nav").style.transform = `translateY(${navHeight}%)`;
    navHeight += 10;
  }

  if (pageYOffset < 5) {
    document.querySelector("nav").style.transform = `translateY(0%)`;
  }
});
// --------------------------------------------------

//  -=-=-=-=-=-=-=-=-=-=-= PROJECTS - ADDING THE FUNCTIONALITIES TO THE BUTTONS =-=-=-=-=-=-=-=-=-=-=-

document.getElementById("eye_1_auto").addEventListener("click", (e) => {
  window.open("https://documentfetcher.herokuapp.com/", "_blank");
  return;
});

document.getElementById("eye_1_dona").addEventListener("click", (e) => {
  window.open("https://donamoreira.herokuapp.com/", "_blank");
  return;
});

document.getElementById("eye_1_mimo").addEventListener("click", (e) => {
  window.open("https://studiomimo.herokuapp.com/", "_blank");
  return;
});

document.getElementById("gitHubLink_1_auto").addEventListener("click", (e) => {
  window.open("https://github.com/Dartangnan/onlineDocumentGatherer", "_blank");
  return;
});

document.getElementById("gitHubLink_1_dona").addEventListener("click", (e) => {
  window.open("https://github.com/Dartangnan/ladingPageDonaMoreira", "_blank");
  return;
});

document.getElementById("gitHubLink_1_mimo").addEventListener("click", (e) => {
  window.open("https://github.com/Dartangnan/studioMimo", "_blank");
  return;
});

document.getElementById("piic_1_auto").addEventListener("click", (e) => {
  document.querySelector(".gallery-container").classList.remove("invisible");
  document.querySelector(".img-gallery-main").src = "auto-img-xl.png";
  return;
});

document.getElementById("piic_1_dona").addEventListener("click", (e) => {
  document.querySelector(".gallery-container").classList.remove("invisible");
  document.querySelector(".img-gallery-main").src = "dona-img-xl.png";
  return;
});

document.getElementById("piic_1_mimo").addEventListener("click", (e) => {
  document.querySelector(".gallery-container").classList.remove("invisible");
  document.querySelector(".img-gallery-main").src = "mimo-img-xl.png";
  return;
});

document.querySelector(".exit-btn").addEventListener("click", (e) => {
  document.querySelector(".gallery-container").classList.add("invisible");
  return;
});

// --------------------------------------------------
