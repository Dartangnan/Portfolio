//  -=-=-=-=-=-=-=-=-=-=-= ELEMENTS SELECTION =-=-=-=-=-=-=-=-=-=-=-

const navItems = document.querySelectorAll(".nav-items");
const homeNavIcons = document
  .querySelector(".home-lower-container")
  .querySelectorAll("svg");

//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

//  -=-=-=-=-=-=-=-=-=-=-= NAV BAR NAVIGATION =-=-=-=-=-=-=-=-=-=-=-

navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    console.log(`${e.target.innerText.toLowerCase().replaceAll(" ", "-")}`);
    if (e.target.innerText.toLowerCase() === "resume") return;
    document
      .getElementById(
        `${e.target.innerText.toLowerCase().replaceAll(" ", "-")}`
      )
      .scrollIntoView({ behavior: "smooth" });
  });
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
    console.log("IN");
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

console.log(homeNavIcons[0].id, homeNavIcons[1].id, homeNavIcons[2].id);
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
