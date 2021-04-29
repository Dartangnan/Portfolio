const navItems = document.querySelectorAll(".nav-items");

document.getElementById("BASKETBALL-GROUP").style.transformOrigin = "50% 50%";
document.getElementById("ball-inside").style.transformOrigin = "46.5% 50.5%";

document.getElementById("ball-inside").addEventListener("mouseenter", (e) => {
  console.log(e.target, "IN");
  anime({
    targets: "#BASKETBALL-GROUP",
    scale: "1.1",
    duration: 800,
    easing: "easeOutQuint",
  });

  anime({
    targets: "#ball-inside",
    easing: "easeOutSine",
    rotate: "90deg",
    duration: 1000,
  });
});

document.getElementById("ball-inside").addEventListener("mouseout", (e) => {
  if (
    e.toElement.closest("#BASKETBALL_copy") &&
    e.toElement !== document.getElementById("XMLID_15_")
  )
    return;

  console.log(e, "OUT");
  document.querySelector(".basket-info").classList.add("class-hidden");
  anime({
    targets: "#BASKETBALL-GROUP",
    scale: "1.0",
    duration: 2000,
  });

  anime({
    targets: "#ball-inside",
    //   scale: "1.05",
    easing: "easeInSine",
    rotate: "-90deg",
    duration: 1000,
  });
});

document.querySelector(".basket-icon").addEventListener("click", (e) => {
  if (!e.target.closest("#BASKETBALL-GROUP")) return;
  console.log(e.target);
  console.log("in");
  document.querySelector(".basket-info").classList.toggle("class-hidden");
  console.log(document.querySelector(".basket-info").classList);
});
